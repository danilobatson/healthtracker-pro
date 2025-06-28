// Firebase Admin SDK setup for server-side operations

import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { env } from '../config';

let app: App;
let db: Firestore;

try {
  // Initialize Firebase Admin if not already initialized
  if (!getApps().length) {
    app = initializeApp({
      credential: cert({
        projectId: env.FIREBASE_PROJECT_ID,
        privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
      }),
      projectId: env.FIREBASE_PROJECT_ID,
    });
  } else {
    app = getApps()[0];
  }

  // Get Firestore instance
  db = getFirestore(app);
  
  console.log('✅ Firebase Admin initialized successfully');
} catch (error) {
  console.error('❌ Firebase Admin initialization failed:', error);
  throw error;
}

export { db };
export default app;

// Helper functions for common Firestore operations
export const collections = {
  users: () => db.collection('users'),
  healthRecords: (userId: string) => db.collection(`users/${userId}/healthRecords`),
  medications: (userId: string) => db.collection(`users/${userId}/medications`),
  appointments: (userId: string) => db.collection(`users/${userId}/appointments`),
  insights: (userId: string) => db.collection(`users/${userId}/insights`),
  goals: (userId: string) => db.collection(`users/${userId}/goals`),
};

// Timestamp helpers
export const serverTimestamp = () => new Date();
export const toFirestoreTimestamp = (date: Date) => date;
export const fromFirestoreTimestamp = (timestamp: any) => {
  if (timestamp?.toDate) {
    return timestamp.toDate();
  }
  return timestamp instanceof Date ? timestamp : new Date(timestamp);
};
