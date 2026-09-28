import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithFirebase, 
  registerWithFirebase, 
  signOutFromFirebase, 
  onFirebaseAuthStateChanged,
  MASTER_ADMIN_EMAIL,
  MASTER_ADMIN_EMAILS
} from '../firebase/authService';
import { isFirebaseConfigured } from '../firebase/config';

const AuthContext = createContext(null);

export { MASTER_ADMIN_EMAIL, MASTER_ADMIN_EMAILS };

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('kalahari_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(isFirebaseConfigured);

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
      } else {
        setCurrentUser(null);
        localStorage.removeItem('kalahari_auth_user');
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

  // Login via Firebase Auth
  const login = async (email, password) => {
    try {
      const user = await signInWithFirebase(email, password);
      setCurrentUser(user);
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
      return { success: true, user };
    } catch (err) {
      console.error("Registration error:", err);
      throw err;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOutFromFirebase();
    } catch (e) {
      console.warn("Sign out error:", e);
    }
    setCurrentUser(null);
  };

  const isAuthenticated = !!currentUser;
  const isAdmin = currentUser?.role === "admin" && MASTER_ADMIN_EMAILS.includes(currentUser?.email?.toLowerCase());

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      isAuthenticated,
      isAdmin,
      isFirebaseReady: isFirebaseConfigured,
      login,
      registerCompany,
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
