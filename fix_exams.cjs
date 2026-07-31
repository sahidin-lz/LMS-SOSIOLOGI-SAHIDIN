const fs = require('fs');
let code = fs.readFileSync('src/data/sociologyData.ts', 'utf8');

code = code.replace(
  `import { TKA_EXAMS_EXTRA_3 } from './examsDataExtra3';`,
  `import { TKA_EXAMS_EXTRA_3 } from './examsDataExtra3';\nimport { TKA_EXAMS_MISSING } from './examsDataExtra4';`
);

code = code.replace(
  `export const EXAMS_DATA: Exam[] = [...TKA_EXAMS_EXTRA, ...TKA_EXAMS_EXTRA_2, ...TKA_EXAMS_EXTRA_3];`,
  `export const EXAMS_DATA: Exam[] = [...TKA_EXAMS_MISSING, ...TKA_EXAMS_EXTRA, ...TKA_EXAMS_EXTRA_2, ...TKA_EXAMS_EXTRA_3];`
);

fs.writeFileSync('src/data/sociologyData.ts', code);
