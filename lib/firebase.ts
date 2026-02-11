import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence, connectFirestoreEmulator } from 'firebase/firestore';

// Check if we're using demo config
const isDemoConfig = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'demo-api-key';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:demo',
};

let app: FirebaseApp;
let db: ReturnType<typeof getFirestore>;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  
  // Connect to emulator in development if DEMO mode
  if (isDemoConfig && typeof window !== 'undefined') {
    try {
      connectFirestoreEmulator(db, 'localhost', 8080);
      console.log('🔥 Connected to Firebase Emulator');
    } catch {
      console.warn('⚠️ Firebase Emulator not available. Please follow the setup guide.');
    }
  }
  
  // Enable offline persistence (optional)
  if (typeof window !== 'undefined' && !isDemoConfig) {
    enableIndexedDbPersistence(db).catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
      } else if (err.code === 'unimplemented') {
        console.warn('Browser does not support persistence.');
      }
    });
  }
} else {
  app = getApps()[0];
  db = getFirestore(app);
}

export { app, db, isDemoConfig };
