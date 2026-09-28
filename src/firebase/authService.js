import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from './config';

export const MASTER_ADMIN_EMAILS = [
  "gnakedi@bloodchain.life",
  "taylith338@gmail.com"
];
export const MASTER_ADMIN_EMAIL = "gnakedi@bloodchain.life";
export const MASTER_ADMIN_PASSCODE = "kalahari2026";

/**
 * Register a new Botswana company with Firebase Auth and store profile in Firestore
 */
export async function registerWithFirebase(email, password, profileData) {
  const isMasterAdmin = MASTER_ADMIN_EMAILS.includes(email.toLowerCase());

  if (!isFirebaseConfigured || !auth) {
    // Fallback adapter for offline / unconfigured mode
    const mockUser = {
      uid: "usr-" + Date.now(),
      email: email,
      company: profileData.company || "Botswana Enterprise",
      tin: profileData.tin || "C" + Math.floor(1000000000 + Math.random() * 9000000000),
      contactName: profileData.contactName || "Authorized Representative",
      phone: profileData.phone || "+267 71234567",
      ppraCode: profileData.ppraCode || "Customs Clearing Agent",
      role: isMasterAdmin ? "admin" : "client",
      invoicesProcessed: 0,
      penaltiesPreventedBwp: 0,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString()
    };
    return mockUser;
  }

  // Real Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Update display name
  if (profileData.contactName) {
    await updateProfile(user, { displayName: profileData.contactName });
  }

  const role = isMasterAdmin ? "admin" : "client";

  // Create user document in Cloud Firestore
  const userProfile = {
    uid: user.uid,
    email: user.email,
    company: profileData.company || "Botswana Enterprise",
    tin: profileData.tin || "C" + Math.floor(1000000000 + Math.random() * 9000000000),
    contactName: profileData.contactName || user.displayName || "Representative",
    phone: profileData.phone || "+267 71234567",
    ppraCode: profileData.ppraCode || "Customs Clearing Agent",
    role: role,
    invoicesProcessed: 0,
    penaltiesPreventedBwp: 0,
    createdAt: serverTimestamp(),
    lastActive: serverTimestamp()
  };

  if (db) {
    await setDoc(doc(db, "users", user.uid), userProfile);
  }

  return userProfile;
}

/**
 * Sign in existing user with Firebase Auth and retrieve profile from Firestore
 */
export async function signInWithFirebase(email, password) {
  const isMasterAdmin = MASTER_ADMIN_EMAILS.includes(email.toLowerCase());

  // Check Master Admin passcode override
  if ((isMasterAdmin || password === MASTER_ADMIN_PASSCODE) && password === MASTER_ADMIN_PASSCODE) {
    return {
      uid: "admin-master",
      email: email.includes('@') ? email : MASTER_ADMIN_EMAIL,
      company: "Kalahari.ai Operations (Master)",
      tin: "C0000000001",
      contactName: "Gift Jr Letso Nakedi",
      phone: "+267 72161038",
      role: "admin",
      ppraCode: "Master Administrator"
    };
  }

  if (!isFirebaseConfigured || !auth) {
    // Fallback adapter
    return {
      uid: "usr-" + Date.now(),
      email: email,
      company: email.includes('@') ? email.split('@')[1].split('.')[0].toUpperCase() + " Logistics" : "Botswana Client",
      tin: "C" + Math.floor(1000000000 + Math.random() * 9000000000),
      contactName: "Corporate Client",
      phone: "+267 71234567",
      role: isMasterAdmin ? "admin" : "client",
      ppraCode: "Customs Clearing Agent"
    };
  }

  // Real Firebase sign in
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  let profile = {
    uid: user.uid,
    email: user.email,
    contactName: user.displayName || "Representative",
    role: isMasterAdmin ? "admin" : "client"
  };

  if (db) {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        profile = { ...profile, ...docSnap.data() };
        // Update lastActive timestamp on sign in
        await setDoc(userDocRef, { lastActive: serverTimestamp() }, { merge: true });
      }
    } catch (e) {
      console.warn("Could not fetch user profile from Firestore:", e);
    }
  }

  // Fetch full profile from Firestore if available
  if (db) {
    try {
      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists()) {
        profile = { ...profile, ...docSnap.data() };
      }
    } catch (e) {
      console.warn("Could not fetch user profile from Firestore:", e);
    }
  }

  return profile;
}

/**
 * Sign out current user
 */
export async function signOutFromFirebase() {
  if (isFirebaseConfigured && auth) {
    await firebaseSignOut(auth);
  }
}

/**
 * Listen to real-time Firebase Auth state changes
 */
export function onFirebaseAuthStateChanged(callback) {
  if (!isFirebaseConfigured || !auth) {
    return () => {}; // No-op unsubscription
  }

  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      let profile = {
        uid: user.uid,
        email: user.email,
        contactName: user.displayName || "Representative",
        role: user.email?.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase() ? "admin" : "client"
      };

      if (db) {
        try {
          const docSnap = await getDoc(doc(db, "users", user.uid));
          if (docSnap.exists()) {
            profile = { ...profile, ...docSnap.data() };
          }
        } catch (e) {
          console.warn("Firestore profile fetch error:", e);
        }
      }
      callback(profile);
    } else {
      callback(null);
    }
  });
}
