import React from 'react';
import { Zap, Clock, Award, ChevronRight } from 'lucide-react';
import { Exam } from '../types';

interface ActiveTryoutWidgetProps {
  exams: Exam[];
  onStartExam: (examId: string) => void;
}

export const ActiveTryoutWidget: React.FC<ActiveTryoutWidgetProps> = ({ exams, onStartExam }) => {
  if (exams.length === 0) return null;

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl space-y-5">
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-orange-600" />
          <h2 className="font-bold text-base">Tryout CBT UTBK Aktif</h2>
        </div>
        <span className="text-[10px] uppercase font-extrabold bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full">
          HOT
        </span>
      </div>

      {exams.map((exam) => (
        <div
          key={exam.id}
          className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 space-y-3 hover:border-amber-400/50 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-400/20 text-orange-500 border border-amber-400/30">
              {exam.category}
            </span>
            <div className="flex items-center space-x-1 text-slate-400 text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>{exam.duration_minutes} Menit</span>
            </div>
          </div>

          <h3 className="font-bold text-sm text-slate-100">{exam.title}</h3>

          <p className="text-xs text-slate-400 line-clamp-2">{exam.description}</p>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-1 text-orange-500 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>+{exam.xp_reward} XP</span>
            </div>

            <button
              onClick={() => onStartExam(exam.id)}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3.5 py-1.5 rounded-lg text-xs transition-all shadow-xs cursor-pointer flex items-center space-x-1"
            >
              <span>Mulai CBT</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
