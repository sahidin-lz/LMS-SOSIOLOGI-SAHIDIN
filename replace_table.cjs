const fs = require('fs');
let code = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

const regex = /<div className="flex items-center space-x-2">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<div className="overflow-x-auto">[\s\S]*?<tbody className="divide-y divide-slate-100">[\s\S]*?\{usersList\.map\(\(u\) => \(\s*<tr key=\{u\.id\} className="hover:bg-slate-50">[\s\S]*?<td className="p-3">\s*<span className="px-2 py-1 rounded bg-slate-100 text-slate-700 font-bold text-\[10px\]">/

const replacement = `<div className="w-full flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                <label className="text-[11px] font-bold text-slate-600 shrink-0">Filter Rombel:</label>
                {uniqueRombels.map(rombel => (
                  <button
                    key={rombel}
                    onClick={() => setFilterRombel(rombel)}
                    className={\`px-3 py-1.5 rounded-full text-[10px] font-extrabold transition-all cursor-pointer whitespace-nowrap shrink-0 \${
                      filterRombel === rombel
                        ? 'bg-purple-600 text-white shadow-sm border border-purple-600'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }\`}
                  >
                    {rombel}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="p-3">Pengguna</th>
                    <th className="p-3">Kelas / Rombel</th>
                    <th className="p-3">Role Saat Ini</th>
                    <th className="p-3">XP Points</th>
                    <th className="p-3 text-right">Aksi Role Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {displayedUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="p-3">
                        <div className="font-bold text-slate-800">{u.name}</div>
                        <div className="text-[10px] text-slate-500">{u.email} • {u.schoolName || u.school}</div>
                      </td>
                      <td className="p-3">
                        <span className={\`px-2.5 py-1 rounded-full font-bold text-[10px] border \${getRombelBadgeColor(String(u.kelas || u.grade || ''))}\`}>`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/components/AdminDashboard.tsx', code, 'utf8');
