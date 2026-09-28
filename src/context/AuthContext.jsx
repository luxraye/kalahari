import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithFirebase, 
  registerWithFirebase, 
  signOutFromFirebase, 
  onFirebaseAuthStateChanged,
  MASTER_ADMIN_EMAIL, 
  MASTER_ADMIN_PASSCODE 
} from '../firebase/authService';
import { isFirebaseConfigured } from '../firebase/config';

const AuthContext = createContext(null);

export { MASTER_ADMIN_EMAIL, MASTER_ADMIN_PASSCODE };

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('kalahari_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => {
    return localStorage.getItem('kalahari_admin_unlocked') === 'true';
  });

  // Listen to Firebase auth state changes if configured
  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }

    const unsubscribe = onFirebaseAuthStateChanged((firebaseProfile) => {
      if (firebaseProfile) {
        setCurrentUser(firebaseProfile);
        localStorage.setItem('kalahari_auth_user', JSON.stringify(firebaseProfile));
        if (firebaseProfile.role === 'admin') {
          setIsAdminUnlocked(true);
        }
      } else {
        // If logged out from Firebase, clear user
        setCurrentUser(null);
        localStorage.removeItem('kalahari_auth_user');
        setIsAdminUnlocked(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sync state to local storage for quick offline hydration
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('kalahari_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('kalahari_auth_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('kalahari_admin_unlocked', isAdminUnlocked ? 'true' : 'false');
  }, [isAdminUnlocked]);

  // Login via Firebase Auth or Mock Adapter
  const login = async (email, password) => {
    try {
      const user = await signInWithFirebase(email, password);
      setCurrentUser(user);
      if (user.role === 'admin') {
        setIsAdminUnlocked(true);
      }
      return { success: true, user };
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  // Register via Firebase Auth & Firestore
  const registerCompany = async (formData) => {
    try {
      const user = await registerWithFirebase(formData.email, formData.password, formData);
      setCurrentUser(user);
      if (user.role === 'admin') {
        setIsAdminUnlocked(true);
      }
      return { success: true, user };
    } catch (err) {
      console.error("Registration error:", err);
      throw err;
    }
  };

  // Demo Login (Instant evaluation for prospects)
  const loginAsDemo = (role = "clearing") => {
    let demoUser;
    if (role === "admin") {
      demoUser = {
        uid: "admin-master",
        company: "Kalahari.ai Operations (Master)",
        tin: "C0000000001",
        contactName: "Gift Jr Letso Nakedi",
        email: MASTER_ADMIN_EMAIL,
        phone: "+267 72161038",
        role: "admin",
        ppraCode: "Master Administrator"
      };
      setIsAdminUnlocked(true);
    } else if (role === "clearing") {
      demoUser = {
        uid: "demo-broker",
        company: "Kgalagadi Mining & Auto Equipment Ltd",
        tin: "C0981248101",
        contactName: "Lesego Moeti",
        email: "lmoeti@kgalagadi-auto.co.bw",
        phone: "+267 391 4400",
        role: "client",
        ppraCode: "Customs Clearing Agent"
      };
    } else {
      demoUser = {
        uid: "demo-contractor",
        company: "Estate Construction (Pty) Ltd",
        tin: "C0847291033",
        contactName: "Kagiso Molosiwa",
        email: "reception@estateconstruction.co.bw",
        phone: "+267 318 1285",
        role: "client",
        ppraCode: "Code 03"
      };
    }

    setCurrentUser(demoUser);
    return demoUser;
  };

  // Dedicated Admin Passcode Verification
  const verifyAdminAccess = (passcode) => {
    if (passcode === MASTER_ADMIN_PASSCODE) {
      setIsAdminUnlocked(true);
      return true;
    }
    return false;
  };

  // Sign out
  const logout = async () => {
    try {
      await signOutFromFirebase();
    } catch (e) {
      console.warn("Sign out error:", e);
    }
    setCurrentUser(null);
    setIsAdminUnlocked(false);
  };

  const isAuthenticated = !!currentUser;
  const isAdmin = currentUser?.role === "admin" || isAdminUnlocked;

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      isAuthenticated,
      isAdmin,
      isAdminUnlocked,
      isFirebaseReady: isFirebaseConfigured,
      login,
      loginAsDemo,
      registerCompany,
      verifyAdminAccess,
      logout,
      setCurrentUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
