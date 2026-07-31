const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldFilterStr = `                    {/* Filter Pills */}
                    <div className="flex bg-stone-950 p-1.5 rounded-2xl border border-stone-800 text-xs font-bold gap-1 flex-wrap shrink-0">
                      <button
                        onClick={() => setCbtFilter('semua')}
                        className={\`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer \${
                          cbtFilter === 'semua'
                            ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                            : 'text-stone-400 hover:text-white'
                        }\`}
                      >
                        Semua Paket ({exams.length})
                      </button>
                      <button
                        onClick={() => setCbtFilter('tryout')}
                        className={\`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer \${
                          cbtFilter === 'tryout'
                            ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                            : 'text-stone-400 hover:text-white'
                        }\`}
                      >
                        🎯 Tryout TKA Resmi
                      </button>
                      <button
                        onClick={() => setCbtFilter('latihan')}
                        className={\`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer \${
                          cbtFilter === 'latihan'
                            ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                            : 'text-stone-400 hover:text-white'
                        }\`}
                      >
                        📝 Latihan 10 Bab
                      </button>
                    </div>`;

code = code.replace(oldFilterStr, "");

fs.writeFileSync('src/App.tsx', code);
console.log("App.tsx modified, filter removed");
