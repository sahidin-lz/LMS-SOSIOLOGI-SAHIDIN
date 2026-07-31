import { useState, useEffect, useCallback, useMemo } from 'react';
import { Announcement } from '../types';
import { INITIAL_ANNOUNCEMENTS } from '../data/sociologyData';
import { fetchCollection, saveDocument } from '../lib/firestoreService';

/**
 * Custom Hook: useOptimizedAnnouncements
 * One-time fetch pengumuman LMS dengan caching offline.
 */
export function useOptimizedAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [loading, setLoading] = useState<boolean>(true);

  const loadAnnouncements = useCallback(async () => {
    setLoading(true);
    try {
      const fsAnn = await fetchCollection<Announcement>('announcements');
      if (fsAnn && fsAnn.length > 0) {
        setAnnouncements(fsAnn);
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
