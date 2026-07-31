import { useState, useEffect, useCallback, useMemo } from 'react';
import { Course } from '../types';
import { COURSES_DATA } from '../data/sociologyData';
import { fetchCollection, saveDocument } from '../lib/firestoreService';

/**
 * Custom Hook: useOptimizedCourses
 * Menggunakan One-Time Fetch (getDocs) + IndexedDB Cache daripada continuous onSnapshot
 * untuk menghemat ratusan/ribuan read operations di Firestore.
 */
export function useOptimizedCourses() {
  const [courses, setCourses] = useState<Course[]>(COURSES_DATA);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fsCourses = await fetchCollection<Course>('courses');
      if (fsCourses && fsCourses.length > 0) {
        const courseMap = new Map<string, Course>();
        COURSES_DATA.forEach((c) => courseMap.set(c.id, c));
        fsCourses.forEach((c) => courseMap.set(c.id, c));
        setCourses(Array.from(courseMap.values()));
      } else {
        // Seed initial data ke Firestore jika kosong
        for (const c of COURSES_DATA) {
          await saveDocument('courses', c.id, c);
        }
        setCourses(COURSES_DATA);
      }
    } catch (err: any) {
      console.error('[useOptimizedCourses Error]', err);
      setError('Gagal memuat modul pembelajaran dari cache/Firestore');
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
