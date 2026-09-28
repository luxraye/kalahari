import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics';

// Firebase configuration with environment variables and production fallbacks
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDJZHrIKTTOaXaW6OWyOq4u-QnGRFKwX04",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "kalahari-77856.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "kalahari-77856",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "kalahari-77856.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "963487185406",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:963487185406:web:07e7f4f587430a8ba8a8af",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-LVF6DBPYWQ"
};

// Check if valid Firebase configuration is active
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey.startsWith('AIzaSy') &&
  firebaseConfig.projectId === 'kalahari-77856'
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
  if (typeof window !== 'undefined') {
    isAnalyticsSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
        console.info("📊 [Kalahari.ai] Firebase Analytics initialized (G-LVF6DBPYWQ)");
      }
    }).catch(() => {});
  }

  console.info("⚡ [Kalahari.ai] Live Firebase Connected:", firebaseConfig.projectId);
} catch (error) {
  console.error("⚠️ [Kalahari.ai] Firebase initialization warning:", error);
}

export { app, auth, db, storage, analytics };
export default firebaseConfig;
