const fs = require('fs');
let code = fs.readFileSync('src/components/AnalyticsChart.tsx', 'utf8');

const target = `      {/* Recharts Line Graph */}
      <div className="h-64 w-full pt-2">`;

const replace = `      {/* Recharts Line Graph */}
      {analytics.length === 0 ? (
        <div className="h-64 w-full flex items-center justify-center bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-500 text-[11px]">
          Belum ada riwayat pengerjaan Tryout untuk ditampilkan.
        </div>
      ) : (
      <div className="h-64 w-full pt-2">`;

code = code.replace(target, replace);
code = code.replace(`        </ResponsiveContainer>
      </div>`, `        </ResponsiveContainer>
      </div>
      )}`);

fs.writeFileSync('src/components/AnalyticsChart.tsx', code);
