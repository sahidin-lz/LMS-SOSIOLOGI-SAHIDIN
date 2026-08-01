import React from 'react';
import { Award } from 'lucide-react';
import { Competency } from '../types';
import { INITIAL_COMPETENCY_ANALYSIS } from '../data/sociologyData';

interface CompetencyAnalysisProps {
  competencies?: Competency[];
}

export const CompetencyAnalysis: React.FC<CompetencyAnalysisProps> = ({ competencies = [] }) => {
  const displayCompetencies = competencies.length > 0 ? competencies : INITIAL_COMPETENCY_ANALYSIS;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Analisis Kemampuan Siswa Sesuai Soal Dikerjakan</h2>
            <p className="text-xs text-slate-600">Pemetaan kekuatan & kelemahan per butir soal & materi sosiologi</p>
          </div>
        </div>
        <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-3 py-1 rounded-full border border-indigo-100">
          Data Real-Time
        </span>
      </div>

      {displayCompetencies.length === 0 ? (
        <div className="text-center py-8 text-slate-600 text-[11px] bg-slate-50 rounded-2xl border border-slate-100 italic">
          Belum ada data analisis kemampuan. Siswa belum mengerjakan ujian atau soal latihan.
        </div>
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayCompetencies.map((comp) => {
          const mastery = comp.mastery_percentage || 0;
          let badgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-200';
          if (mastery < 50) {
            badgeClass = 'bg-red-100 text-red-800 border-red-200';
          } else if (mastery < 80) {
            badgeClass = 'bg-amber-100 text-amber-800 border-amber-200';
          }

          return (
            <div key={comp.topic_name} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-800">{comp.topic_name}</span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${badgeClass}`}>
                  {comp.status} ({mastery}%)
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    mastery >= 80
                      ? 'bg-blue-500'
                      : mastery >= 50
                      ? 'bg-orange-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${mastery}%` }}
                ></div>
              </div>

              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                💡 {comp.recommendation}
              </p>
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
};
