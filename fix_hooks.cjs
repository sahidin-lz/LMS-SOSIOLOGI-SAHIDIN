const fs = require('fs');

const coursesHook = `import { useState, useEffect, useCallback, useMemo } from 'react';
import { Course } from '../types';
import { COURSES_DATA } from '../data/sociologyData';
import { saveDocument } from '../lib/firestoreService';
import { collection, getDocsFromCache, getDocsFromServer } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useOptimizedCourses() {
  const [courses, setCourses] = useState<Course[]>(COURSES_DATA);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    const coursesRef = collection(db, 'courses');

    // 1. Get from Cache first (Instant load)
    try {
      const cacheSnapshot = await getDocsFromCache(coursesRef);
      if (!cacheSnapshot.empty) {
        const cachedItems = cacheSnapshot.docs.map(d => ({ id: d.id, ...d.data() } as Course));
        
        // Merge with initial data
        const courseMap = new Map<string, Course>();
        COURSES_DATA.forEach((c) => courseMap.set(c.id, c));
        cachedItems.forEach((c) => courseMap.set(c.id, c));
        setCourses(Array.from(courseMap.values()));
        setLoading(false); // Disable loading immediately
      }
    } catch (err) {
      console.warn('[useOptimizedCourses] Cache miss:', err);
    }

    // 2. Revalidate from server in background
    try {
      const serverSnapshot = await getDocsFromServer(coursesRef);
      if (!serverSnapshot.empty) {
        const serverItems = serverSnapshot.docs.map(d => ({ id: d.id, ...d.data() } as Course));
        
        const courseMap = new Map<string, Course>();
        COURSES_DATA.forEach((c) => courseMap.set(c.id, c));
        serverItems.forEach((c) => courseMap.set(c.id, c));
        setCourses(Array.from(courseMap.values()));
      } else {
        for (const c of COURSES_DATA) {
          await saveDocument('courses', c.id, c);
        }
        setCourses(COURSES_DATA);
      }
    } catch (err: any) {
      console.error('[useOptimizedCourses Error]', err);
      if (courses.length === COURSES_DATA.length) {
         setError('Gagal memuat modul pembelajaran');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const updateCourseLocally = useCallback((updatedCourse: Course) => {
    setCourses((prev) => {
      const exists = prev.some((c) => c.id === updatedCourse.id);
      if (exists) {
        return prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c));
      }
      return [updatedCourse, ...prev];
    });
  }, []);

  const removeCourseLocally = useCallback((courseId: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
  }, []);

  const memoizedValue = useMemo(() => ({
    courses,
    loading,
    error,
    refreshCourses: loadCourses,
    updateCourseLocally,
    removeCourseLocally,
    setCourses,
  }), [courses, loading, error, loadCourses, updateCourseLocally, removeCourseLocally]);

  return memoizedValue;
}
`;
fs.writeFileSync('src/hooks/useOptimizedCourses.ts', coursesHook, 'utf8');
