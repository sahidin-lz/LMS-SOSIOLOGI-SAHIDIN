const fs = require('fs');
let code = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

const startIndex = code.indexOf("{adminTab === 'users' && (");
const endIndex = code.indexOf("{/* TAB 4: PENGUMUMAN LMS */}");

const usersTab = `{adminTab === 'users' && (
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
                      <span className={\`px-2.5 py-1 rounded-full font-bold text-[10px] border \${getRombelBadgeColor(String(u.kelas || u.grade || ''))}\`}>
                        {u.kelas || u.grade || '-'}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={\`px-2.5 py-1 rounded-full text-[10px] font-extrabold capitalize \${
                        u.role === 'siswa' ? 'bg-indigo-100 text-indigo-800' : u.role === 'guru' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                      }\`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 font-extrabold text-amber-600">{u.total_xp || u.xp || 500} XP</td>
                    <td className="p-3 text-right space-x-1">
                      <button onClick={() => handleToggleUserRole(u.id, 'siswa')} className={\`px-2 py-1 rounded-lg text-[10px] font-bold \${u.role === 'siswa' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}\`}>Siswa</button>
                      <button onClick={() => handleToggleUserRole(u.id, 'guru')} className={\`px-2 py-1 rounded-lg text-[10px] font-bold \${u.role === 'guru' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}\`}>Guru</button>
                      <button onClick={() => handleToggleUserRole(u.id, 'admin')} className={\`px-2 py-1 rounded-lg text-[10px] font-bold \${u.role === 'admin' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}\`}>Admin</button>
                      <button onClick={() => setEditingUser(u)} className="px-2 py-1 rounded-lg text-[10px] font-bold bg-amber-100 text-amber-800 mr-1">Edit</button>
                      <button onClick={() => handleDeleteUser(u.id)} className="p-1 text-red-500 hover:bg-red-50 rounded ml-1"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {hasMoreUsers && onLoadMoreUsers && (
            <div className="pt-4 border-t border-slate-100 flex justify-center">
              <button
                onClick={onLoadMoreUsers}
                disabled={loadingMoreUsers}
                className="px-5 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-xs flex items-center space-x-2 transition-all cursor-pointer border border-indigo-200"
              >
                {loadingMoreUsers ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                    <span>Memuat Data Selanjutnya dari Firestore...</span>
                  </>
                ) : (
                  <span>📥 Muat Lebih Banyak Pengguna (Paginated Load More)</span>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      `;

code = code.substring(0, startIndex) + usersTab + code.substring(endIndex);
fs.writeFileSync('src/components/AdminDashboard.tsx', code, 'utf8');
