const fs = require('fs');

const annHook = `import { useState, useEffect, useCallback, useMemo } from 'react';
import { Announcement } from '../types';
import { INITIAL_ANNOUNCEMENTS } from '../data/sociologyData';
import { saveDocument } from '../lib/firestoreService';
import { collection, getDocsFromCache, getDocsFromServer } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useOptimizedAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [loading, setLoading] = useState<boolean>(true);

  const loadAnnouncements = useCallback(async () => {
    setLoading(true);
    const annRef = collection(db, 'announcements');

    // 1. Get from Cache first
    try {
      const cacheSnapshot = await getDocsFromCache(annRef);
      if (!cacheSnapshot.empty) {
        const cachedItems = cacheSnapshot.docs.map(d => ({ id: d.id, ...d.data() } as Announcement));
        setAnnouncements(cachedItems);
        setLoading(false);
      }
    } catch (err) {
      console.warn('[useOptimizedAnnouncements] Cache miss:', err);
    }

    // 2. Revalidate from Server in background
    try {
      const serverSnapshot = await getDocsFromServer(annRef);
      if (!serverSnapshot.empty) {
        const serverItems = serverSnapshot.docs.map(d => ({ id: d.id, ...d.data() } as Announcement));
        setAnnouncements(serverItems);
      } else {
        for (const a of INITIAL_ANNOUNCEMENTS) {
          await saveDocument('announcements', a.id, a);
        }
        setAnnouncements(INITIAL_ANNOUNCEMENTS);
      }
    } catch (err) {
      console.error('[useOptimizedAnnouncements Error]', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  const memoizedValue = useMemo(() => ({
    announcements,
    loading,
    refreshAnnouncements: loadAnnouncements,
    setAnnouncements,
  }), [announcements, loading, loadAnnouncements]);

  return memoizedValue;
}
`;
fs.writeFileSync('src/hooks/useOptimizedAnnouncements.ts', annHook, 'utf8');
