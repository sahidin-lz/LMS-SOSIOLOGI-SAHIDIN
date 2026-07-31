import { useState, useEffect, useMemo } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User } from '../types';
import { INITIAL_LEADERBOARD } from '../data/sociologyData';
import { handleFirestoreError, OperationType } from '../lib/firestoreService';

/**
 * Custom Hook: useOptimizedLeaderboard
 * Khusus fitur real-time seperti Papan Peringkat / Leaderboard.
 * Menggunakan onSnapshot dengan query limit(50) untuk performa real-time berbiaya rendah.
 */
export function useOptimizedLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<User[]>(INITIAL_LEADERBOARD);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unsubscribe: () => void = () => {};
    try {
      const q = query(
        collection(db, 'users'),
        orderBy('total_xp', 'desc'),
        limit(50)
      );

      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const items: User[] = [];
          snapshot.forEach((docSnap) => {
            items.push({ id: docSnap.id, ...docSnap.data() } as User);
          });
          if (items.length > 0) {
            setLeaderboard(items);
          }
          setLoading(false);
        },
        (error) => {
          console.warn('[useOptimizedLeaderboard Snapshot Warning]', error);
          handleFirestoreError(error, OperationType.GET, 'users');
          setLoading(false);
        }
      );
    } catch (err) {
      console.warn('[useOptimizedLeaderboard Init Error]', err);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const memoizedValue = useMemo(() => ({
    leaderboard,
    loading,
  }), [leaderboard, loading]);

  return memoizedValue;
}
