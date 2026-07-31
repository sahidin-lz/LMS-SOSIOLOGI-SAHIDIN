import React from 'react';
import { Bell } from 'lucide-react';
import { Announcement } from '../types';

interface AnnouncementWidgetProps {
  announcements: Announcement[];
}

export const AnnouncementWidget: React.FC<AnnouncementWidgetProps> = ({ announcements }) => {
  if (announcements.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
      <div className="flex items-center space-x-2 text-indigo-900 border-b border-slate-100 pb-3">
        <Bell className="w-5 h-5 text-indigo-600 animate-bounce" />
        <h2 className="font-bold text-base">Pengumuman LMS & Sekolah</h2>
      </div>

      <div className="space-y-3">
        {announcements.map((ann) => (
          <div key={ann.id} className="p-3.5 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                {ann.category}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">{ann.date}</span>
            </div>
            <h3 className="font-bold text-xs text-slate-800">{ann.title}</h3>
            <p className="text-[11px] text-slate-600 leading-snug">{ann.content}</p>
            <p className="text-[10px] text-indigo-600 font-semibold pt-0.5">— {ann.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
