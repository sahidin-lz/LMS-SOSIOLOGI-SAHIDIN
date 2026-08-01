import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocFromServer,
  writeBatch
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

export async function seedInitialStudentsToFirestore(students: any[]) {
  try {
    const CHUNK_SIZE = 450; // Use slightly less than 500 limit for safety
    for (let i = 0; i < students.length; i += CHUNK_SIZE) {
      const chunk = students.slice(i, i + CHUNK_SIZE);
      const batch = writeBatch(db);
      
      chunk.forEach(student => {
        const docRef = doc(db, 'users', student.id);
        batch.set(docRef, student, { merge: true });
      });
      
      await batch.commit();
      console.log(`Berhasil batch write chunk: ${i} - ${i + chunk.length}`);
      // Small delay to prevent rate limiting
      if (i + CHUNK_SIZE < students.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    console.log(`Total berhasil batch write ${students.length} siswa`);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'users (batch)');
    throw error;
  }
}
