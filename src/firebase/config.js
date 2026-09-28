import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics';

// Firebase configuration strictly loaded from environment variables (.env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ""
};

// Check if valid Firebase configuration is active
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId
);

let app = null;
let auth = null;
let db = null;
let storage = null;
let analytics = null;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);

  // Initialize analytics safely if supported by browser environment
  if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
    isAnalyticsSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
        console.info("📊 [Kalahari.ai] Firebase Analytics initialized");
      }
    }).catch(() => {});
  }

  console.info("⚡ [Kalahari.ai] Live Firebase Connected:", firebaseConfig.projectId);
} catch (error) {
  console.error("⚠️ [Kalahari.ai] Firebase initialization warning:", error);
}

export { app, auth, db, storage, analytics };
export default firebaseConfig;
