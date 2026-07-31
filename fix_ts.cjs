const fs = require('fs');

// Fix App.tsx
let appCode = fs.readFileSync('src/App.tsx', 'utf8');
const appRegex = /const \{ usersList, hasMore: hasMoreUsers, loadMore: loadMoreUsers, loadingMore: loadingMoreUsers, setUsersList \} = useOptimizedUsers\(20, rombelFilter\);/;
appCode = appCode.replace(appRegex, '');

const insertState = `const [cbtFilter, setCbtFilter] = useState<'semua' | 'tryout' | 'latihan'>('semua');
  const [rombelFilter, setRombelFilter] = useState<string>('Semua');
  const { usersList, hasMore: hasMoreUsers, loadMore: loadMoreUsers, loadingMore: loadingMoreUsers, setUsersList } = useOptimizedUsers(20, rombelFilter);`;
appCode = appCode.replace(/const \[cbtFilter, setCbtFilter\] = useState<'semua' \| 'tryout' \| 'latihan'>\('semua'\);\n\s*const \[rombelFilter, setRombelFilter\] = useState<string>\('Semua'\);/, insertState);

fs.writeFileSync('src/App.tsx', appCode, 'utf8');


// Fix useOptimizedUsers.ts
let usersHook = fs.readFileSync('src/hooks/useOptimizedUsers.ts', 'utf8');
usersHook = usersHook.replace(/d\.data\(\) \}/g, '...(d.data() as object) }');
usersHook = usersHook.replace(/ds\.data\(\) \}/g, '...(ds.data() as object) }');

fs.writeFileSync('src/hooks/useOptimizedUsers.ts', usersHook, 'utf8');

// Also fix in other hooks just in case
const hooksToFix = ['src/hooks/useOptimizedCourses.ts', 'src/hooks/useOptimizedExams.ts', 'src/hooks/useOptimizedAnnouncements.ts', 'src/hooks/useOptimizedLeaderboard.ts'];
hooksToFix.forEach(f => {
  let code = fs.readFileSync(f, 'utf8');
  code = code.replace(/d\.data\(\) \}/g, '...(d.data() as object) }');
  code = code.replace(/ds\.data\(\) \}/g, '...(ds.data() as object) }');
  fs.writeFileSync(f, code, 'utf8');
});

