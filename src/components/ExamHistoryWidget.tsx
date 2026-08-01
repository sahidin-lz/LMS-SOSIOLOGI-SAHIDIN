import React from 'react';
import { ExamSession } from '../types';
import { History, Target, CheckCircle } from 'lucide-react';

interface ExamHistoryWidgetProps {
  history: ExamSession[];
}

export const ExamHistoryWidget: React.FC<ExamHistoryWidgetProps> = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm border border-slate-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-800">Riwayat Ujian Saya</h2>
            <p className="text-[11px] text-slate-600">Ujian CBT yang telah diselesaikan</p>
          </div>
        </div>
        <div className="text-center py-6 text-slate-400 text-xs">
          Belum ada riwayat ujian.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm border border-slate-200 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
          <History className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-slate-800">Riwayat Ujian Saya</h2>
          <p className="text-[11px] text-slate-600">Ujian CBT yang telah diselesaikan</p>
        </div>
      </div>

      <div className="space-y-4">
        {history.map((session) => (
          <div key={session.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col space-y-3 relative overflow-hidden group hover:border-indigo-500/50 transition-all">
            <div className="flex justify-between items-start gap-2">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-950 px-2.5 py-0.5 rounded-md border border-indigo-800 shadow-sm block w-max">
                  {session.category}
                </span>
                <h3 className="text-sm font-bold text-slate-800 leading-tight">
                  {session.exam_title}
                </h3>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  {new Date(session.start_time).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200">
              <div className="bg-white rounded-xl p-3 border border-slate-200/50">
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-600 font-semibold mb-1">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Skor Normal</span>
                </div>
                <div className="text-lg font-black text-blue-500">
                  {session.normal_score.toFixed(1)}
                </div>
              </div>
              <div className="bg-white rounded-xl p-3 border border-slate-200/50">
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-600 font-semibold mb-1">
                  <Target className="w-3.5 h-3.5 text-orange-600" />
                  <span>Skor IRT</span>
                </div>
                <div className="text-lg font-black text-orange-500">
                  {session.irt_score.toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
