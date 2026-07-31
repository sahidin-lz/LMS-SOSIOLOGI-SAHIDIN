import {
  collection,
  doc,
  getDocs,
  getDocsFromCache,
  getDocsFromServer,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocFromServer,
  Query,
} from 'firebase/firestore';
import { db } from './firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
    },
    operationType,
    path
  };
  console.error('Firestore Error [LMS Sosiologi]:', JSON.stringify(errInfo));
  return errInfo;
}

// Check Firestore connection on boot
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'lms_sosiologi_status', 'ping'));
    console.log('Firebase Firestore LMS Sosiologi connected successfully.');
  } catch (err) {
    console.warn('Firestore offline or initial ping error, fallback active:', err);
  }
}

// Sync helper for collections
export async function saveDocument(collectionName: string, docId: string, data: any) {
  try {
    await setDoc(doc(db, collectionName, docId), data, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${collectionName}/${docId}`);
  }
}

export async function deleteDocument(collectionName: string, docId: string) {
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${collectionName}/${docId}`);
  }
}

export async function fetchCollection<T>(collectionName: string): Promise<T[]> {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const items: T[] = [];
    querySnapshot.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as T);
    });
    return items;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, collectionName);
    return [];
  }
}

export function subscribeToCollection<T>(
  collectionName: string,
  onUpdate: (items: T[]) => void
) {
  return onSnapshot(
    collection(db, collectionName),
    (snapshot) => {
      const items: T[] = [];
      snapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...docSnap.data() } as T);
      });
      if (items.length > 0) {
        onUpdate(items);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, collectionName);
    }
  );
}

export async function cacheFirstFetch<T>(q: Query | ReturnType<typeof collection>): Promise<T[]> {
  try {
    const cacheSnapshot = await getDocsFromCache(q);
    if (!cacheSnapshot.empty) {
      const items: T[] = [];
      cacheSnapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...docSnap.data() } as T);
      });
      return items;
    }
  } catch (error) {
    console.warn('[Cache First Fetch] Cache miss or error:', error);
  }

  // Fallback to server
  try {
    const serverSnapshot = await getDocsFromServer(q);
    const items: T[] = [];
    serverSnapshot.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as T);
    });
    return items;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'cacheFirstFetch fallback');
    return [];
  }
}
