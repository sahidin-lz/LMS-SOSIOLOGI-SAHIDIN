import React from 'react';
import { ChevronRight, Play } from 'lucide-react';
import { Course } from '../types';

interface CourseListProps {
  courses: Course[];
  onStartCourse: (courseId: string) => void;
  onNavigate: () => void;
}

export const CourseList: React.FC<CourseListProps> = ({ courses, onStartCourse, onNavigate }) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Modul Belajar Kurikulum Sosiologi</h2>
          <p className="text-xs text-slate-500">Pilih modul kelas 10, 11, atau 12 untuk mulai belajar</p>
        </div>

        <button
          onClick={onNavigate}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 cursor-pointer"
        >
          <span>Lihat Semua</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => {
          const progressPercent = course.totalLessons > 0 ? Math.round((course.completedLessons / course.totalLessons) * 100) : 0;

          return (
            <div
              key={course.id}
              className="group bg-slate-50 hover:bg-indigo-50/40 rounded-2xl p-4 border border-slate-200 hover:border-indigo-300 transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                    Kelas {course.grade_level} SMA
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{course.category}</span>
                </div>

                <h3 className="font-bold text-sm text-slate-800 group-hover:text-indigo-700 transition-colors line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2">{course.description}</p>
              </div>

              <div className="space-y-2">
                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-medium text-slate-600">
                    <span>Progres Belajar</span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  onClick={() => onStartCourse(course.id)}
                  className="w-full py-2 bg-white hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 hover:border-indigo-600 font-semibold rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-2xs"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{progressPercent > 0 ? 'Lanjutkan Belajar' : 'Mulai Modul Ini'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
