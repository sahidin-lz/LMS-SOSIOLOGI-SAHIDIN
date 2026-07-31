const fs = require('fs');

let code = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

// 1. Update Props Interface
const propInterfaceRegex = /onBulkAddUsers\?: \(users: User\[\]\) => void;/;
const propInterfaceReplacement = `onBulkAddUsers?: (users: User[]) => void;
  rombelFilter?: string;
  setRombelFilter?: (val: string) => void;`;
code = code.replace(propInterfaceRegex, propInterfaceReplacement);

// 2. Update Component Args
const argsRegex = /onBulkAddUsers,\n}\) => \{/;
const argsReplacement = `onBulkAddUsers,
  rombelFilter = 'Semua',
  setRombelFilter,
}) => {`;
code = code.replace(argsRegex, argsReplacement);

// 3. Update Table Header
const thRegex = /<th className="p-3">Pengguna<\/th>\s*<th className="p-3">Role Saat Ini<\/th>/;
const thReplacement = `<th className="p-3">Pengguna</th>
                    <th className="p-3">Kelas / Rombel</th>
                    <th className="p-3">Role Saat Ini</th>`;
code = code.replace(thRegex, thReplacement);

// 4. Update Table Row
const trRegex = /<td className="p-3">\s*<span/
const trReplacement = `<td className="p-3">
                        <span className="px-2 py-1 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">
                          {u.kelas || u.grade || '-'}
                        </span>
                      </td>
                      <td className="p-3">
                        <span`;
code = code.replace(trRegex, trReplacement);

// 5. Add Rombel Filter Input above Table
const tableHeaderRegex = /<h2 className="text-base font-bold text-slate-800">Data Seluruh Pengguna Sistem Firebase<\/h2>\s*<span className="text-xs text-white0">Ubah role instan & tersimpan di Cloud<\/span>/;
const tableHeaderReplacement = `<div className="flex flex-col">
                <h2 className="text-base font-bold text-slate-800">Data Seluruh Pengguna Sistem Firebase</h2>
                <span className="text-xs text-white0">Ubah role instan & tersimpan di Cloud</span>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-[11px] font-bold text-slate-600">Filter Rombel:</label>
                <div className="flex bg-slate-100 rounded-lg p-1">
                  <input 
                    type="text" 
                    placeholder="Contoh: 12"
                    value={rombelFilter === 'Semua' ? '' : rombelFilter}
                    onChange={(e) => setRombelFilter && setRombelFilter(e.target.value || 'Semua')}
                    className="w-24 px-2 py-1 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {rombelFilter !== 'Semua' && (
                    <button 
                      onClick={() => setRombelFilter && setRombelFilter('Semua')}
                      className="ml-1 px-2 text-[10px] bg-slate-200 hover:bg-slate-300 rounded text-slate-600 font-bold"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>`;
code = code.replace(tableHeaderRegex, tableHeaderReplacement);

fs.writeFileSync('src/components/AdminDashboard.tsx', code, 'utf8');
