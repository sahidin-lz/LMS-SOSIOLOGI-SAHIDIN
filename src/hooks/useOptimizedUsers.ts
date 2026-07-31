import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  collection,
  query,
  getDocs,
  limit,
  startAfter,
  orderBy,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User } from '../types';
import { handleFirestoreError, OperationType } from '../lib/firestoreService';

/**
 * Custom Hook: useOptimizedUsers
 * Menggunakan Pagination (limit 20) & startAfter cursor untuk mencegah mendownload
 * ribuan data pengguna sekaligus di AdminDashboard & TeacherDashboard.
 */
export function useOptimizedUsers(pageSize: number = 20) {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchInitialUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const q = query(
        collection(db, 'users'),
        orderBy('name', 'asc'),
        limit(pageSize)
      );

      const querySnapshot = await getDocs(q);
      const fetched: User[] = [];
      querySnapshot.forEach((docSnap) => {
        fetched.push({ id: docSnap.id, ...docSnap.data() } as User);
      });

      setUsersList(fetched);
      if (querySnapshot.docs.length > 0) {
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setHasMore(querySnapshot.docs.length === pageSize);
      } else {
        setLastDoc(null);
        setHasMore(false);
      }
    } catch (err: any) {
      console.warn('[useOptimizedUsers] Fallback loading initial users query:', err);
      handleFirestoreError(err, OperationType.LIST, 'users');
      // If index or query fails, fetch basic collection
      try {
        const simpleSnap = await getDocs(query(collection(db, 'users'), limit(pageSize)));
        const simpleUsers: User[] = [];
        simpleSnap.forEach((ds) => simpleUsers.push({ id: ds.id, ...ds.data() } as User));
        setUsersList(simpleUsers);
        setHasMore(simpleSnap.docs.length === pageSize);
        if (simpleSnap.docs.length > 0) {
          setLastDoc(simpleSnap.docs[simpleSnap.docs.length - 1]);
        }
      } catch (e) {
        setError('Gagal memuat daftar pengguna.');
      }
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  const loadMore = useCallback(async () => {
    if (!lastDoc || !hasMore || loadingMore) return;
    setLoadingMore(true);
    try {
      const q = query(
        collection(db, 'users'),
        orderBy('name', 'asc'),
        startAfter(lastDoc),
        limit(pageSize)
      );

      const querySnapshot = await getDocs(q);
      const newUsers: User[] = [];
      querySnapshot.forEach((docSnap) => {
        newUsers.push({ id: docSnap.id, ...docSnap.data() } as User);
      });

      if (newUsers.length > 0) {
        setUsersList((prev) => {
          const existingIds = new Set(prev.map((u) => u.id));
          const uniqueNew = newUsers.filter((u) => !existingIds.has(u.id));
          return [...prev, ...uniqueNew];
        });
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setHasMore(newUsers.length === pageSize);
      } else {
        setHasMore(false);
      }
    } catch (err: any) {
      console.error('[useOptimizedUsers loadMore Error]', err);
      handleFirestoreError(err, OperationType.LIST, 'users');
    } finally {
      setLoadingMore(false);
    }
  }, [lastDoc, hasMore, loadingMore, pageSize]);

  useEffect(() => {
    fetchInitialUsers();
  }, [fetchInitialUsers]);

  const memoizedValue = useMemo(() => ({
    usersList,
    loading,
    loadingMore,
    hasMore,
    error,
    loadMore,
    refreshUsers: fetchInitialUsers,
    setUsersList,
  }), [usersList, loading, loadingMore, hasMore, error, loadMore, fetchInitialUsers]);

  return memoizedValue;
}
