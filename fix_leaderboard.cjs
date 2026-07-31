const fs = require('fs');

const lbHook = `import { useState, useEffect, useCallback, useMemo } from 'react';
import { collection, query, orderBy, limit, getDocsFromCache, getDocsFromServer } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User } from '../types';
import { INITIAL_LEADERBOARD } from '../data/sociologyData';

export function useOptimizedLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<User[]>(INITIAL_LEADERBOARD);
  const [loading, setLoading] = useState<boolean>(true);

  const loadLeaderboard = useCallback(async () => {
    setLoading(true);
    const q = query(
      collection(db, 'users'),
      orderBy('total_xp', 'desc'),
      limit(50)
    );

    // 1. Get from Cache first
    try {
      const cacheSnapshot = await getDocsFromCache(q);
      if (!cacheSnapshot.empty) {
        const cachedItems = cacheSnapshot.docs.map(d => ({ id: d.id, ...d.data() } as User));
        setLeaderboard(cachedItems);
        setLoading(false);
      }
    } catch (err) {
      console.warn('[useOptimizedLeaderboard] Cache miss:', err);
    }

    // 2. Revalidate from Server in background
    try {
      const serverSnapshot = await getDocsFromServer(q);
      if (!serverSnapshot.empty) {
        const serverItems = serverSnapshot.docs.map(d => ({ id: d.id, ...d.data() } as User));
        setLeaderboard(serverItems);
      }
    } catch (err) {
      console.error('[useOptimizedLeaderboard Error]', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  const memoizedValue = useMemo(() => ({
    leaderboard,
    loading,
  }), [leaderboard, loading]);

  return memoizedValue;
}
`;
fs.writeFileSync('src/hooks/useOptimizedLeaderboard.ts', lbHook, 'utf8');
