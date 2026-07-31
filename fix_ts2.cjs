const fs = require('fs');
const hooksToFix = [
  'src/hooks/useOptimizedUsers.ts', 
  'src/hooks/useOptimizedCourses.ts', 
  'src/hooks/useOptimizedExams.ts', 
  'src/hooks/useOptimizedAnnouncements.ts', 
  'src/hooks/useOptimizedLeaderboard.ts'
];
hooksToFix.forEach(f => {
  let code = fs.readFileSync(f, 'utf8');
  code = code.replace(/\.\.\.\.\.\.\(d\.data\(\) as object\) \}/g, '...(d.data() as object) }');
  code = code.replace(/\.\.\.\.\.\.\(ds\.data\(\) as object\) \}/g, '...(ds.data() as object) }');
  fs.writeFileSync(f, code, 'utf8');
});
