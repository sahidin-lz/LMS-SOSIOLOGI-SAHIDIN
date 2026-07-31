const fs = require('fs');
let code = fs.readFileSync('src/components/CompetencyAnalysis.tsx', 'utf8');

const target = `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayCompetencies.map((comp) => {`;

const replace = `{displayCompetencies.length === 0 ? (
        <div className="text-center py-8 text-slate-500 text-xs">
          Belum ada data analisis kemampuan. Siswa belum mengerjakan ujian atau soal latihan.
        </div>
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayCompetencies.map((comp) => {`;

code = code.replace(target, replace);
code = code.replace(`        })}
      </div>`, `        })}
      </div>
      )}`);

fs.writeFileSync('src/components/CompetencyAnalysis.tsx', code);
