import React from 'react';
import { Target, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TryoutAnalytics } from '../types';

interface AnalyticsChartProps {
  analytics: TryoutAnalytics[];
  latestScore: number;
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ analytics, latestScore }) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <span>Grafik Progres Nilai Tryout TKA Sosiologi</span>
          </h2>
          <p className="text-xs text-slate-600">
            Perkembangan skor dari tryout ke tryout menuju target <span className="font-semibold text-emerald-600">85 Points</span> (Skala Maksimal 100 IRT TKA)
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs text-emerald-800 font-semibold self-start sm:self-auto">
          <ArrowUpRight className="w-4 h-4 text-emerald-600" />
          <span>Skor IRT Terbaru: {latestScore || 0} / 100</span>
        </div>
      </div>

      {/* Recharts Line Graph */}
      {analytics.length === 0 ? (
        <div className="h-64 w-full flex items-center justify-center bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-600 text-[11px]">
          Belum ada riwayat pengerjaan Tryout untuk ditampilkan.
        </div>
      ) : (
      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={analytics} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="exam_title" stroke="#64748b" fontSize={12} tickLine={false} />
            <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                borderRadius: '12px',
                color: '#fff',
                border: 'none',
                fontSize: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              name="Skor Tryout Kamu (IRT Max 100)"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ fill: '#4f46e5', r: 5 }}
              activeDot={{ r: 8, fill: '#fbbf24' }}
            />
            <Line
              type="monotone"
              dataKey="target_score"
              name="Target Passing Grade PTN"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      )}

      <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block"></span>
          <span>Nilai IRT Tryout Kamu (Max 100)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-0.5 border-t-2 border-dashed border-blue-400 inline-block"></span>
          <span>Target PTN Favorit (85+)</span>
        </div>
      </div>
    </div>
  );
};
