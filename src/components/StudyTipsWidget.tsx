import React from 'react';
import { Star } from 'lucide-react';

export const StudyTipsWidget: React.FC = () => {
  return (
    <div className="bg-amber-50/70 rounded-3xl p-6 border border-amber-200/80 space-y-3">
      <div className="flex items-center space-x-2 text-amber-800">
        <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
        <h3 className="font-bold text-sm">Tips Lolos UTBK Sosiologi</h3>
      </div>
      <p className="text-xs text-amber-900/80 leading-relaxed">
        Fokus pada pemahaman korelasi antar-konsep (seperti bagaimana <span className="font-semibold">Diferensiasi Sosial</span> dapat memicu <span className="font-semibold">Konflik Horizontal</span> jika terjadi Konsolidasi Etnis & Agama).
      </p>
    </div>
  );
};
