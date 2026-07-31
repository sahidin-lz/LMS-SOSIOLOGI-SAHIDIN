const fs = require('fs');

const content = fs.readFileSync('src/lib/firestoreService.ts', 'utf8');

if (!content.includes('getDocsFromCache')) {
    const newImports = `import {
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
} from 'firebase/firestore';`;

    const replacedContent = content.replace(/import {[\s\S]*?} from 'firebase\/firestore';/, newImports);

    const newFunctions = `
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
`;
    fs.writeFileSync('src/lib/firestoreService.ts', replacedContent + newFunctions, 'utf8');
}
