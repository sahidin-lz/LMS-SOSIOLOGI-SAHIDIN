const fs = require('fs');
let code = fs.readFileSync('src/hooks/useOptimizedUsers.ts', 'utf8');

const regex = /export function useOptimizedUsers\(pageSize: number = 20\) \{/;
const replacement = `export function useOptimizedUsers(pageSize: number = 20, rombelFilter: string = 'Semua') {`;

code = code.replace(regex, replacement);

const queryRegex = /const q = query\(usersRef, orderBy\('name', 'asc'\), limit\(pageSize\)\);/;
const queryReplacement = `const q = rombelFilter === 'Semua' 
      ? query(usersRef, orderBy('name', 'asc'), limit(pageSize))
      : query(usersRef, import('firebase/firestore').then(m => m.where) /* wait, where is not imported, let's just use string replacement carefully */`;
