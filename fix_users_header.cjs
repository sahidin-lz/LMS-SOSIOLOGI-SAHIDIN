const fs = require('fs');
let code = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

const lines = code.split('\n');

const startIndex = 1314;
const endIndex = 1334;

const newHeader = `      {adminTab === 'users' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div className="flex flex-col">
              <h2 className="text-base font-bold text-slate-800">Data Seluruh Pengguna Sistem Firebase</h2>
              <span className="text-xs text-slate-500">Ubah role instan & tersimpan di Cloud</span>
            </div>
          </div>
          <div className="w-full flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
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
          </div>`;

code = lines.slice(0, startIndex - 1).join('\n') + '\n' + newHeader + '\n' + lines.slice(endIndex).join('\n');
fs.writeFileSync('src/components/AdminDashboard.tsx', code, 'utf8');
