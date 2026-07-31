const fs = require('fs');
let code = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

const regex = /const handleToggleUserRole = async \(id: string, newRole: Role\) => \{/;
const replacement = `const uniqueRombels = React.useMemo(() => {
    const rombels = new Set<string>();
    usersList.forEach(u => {
      const rombel = String(u.kelas || u.grade || '').trim();
      if (rombel && rombel !== 'undefined' && rombel !== 'null') {
        rombels.add(rombel);
      }
    });
    return ['Semua', ...Array.from(rombels).sort()];
  }, [usersList]);

  const displayedUsers = React.useMemo(() => {
    if (filterRombel === 'Semua') return usersList;
    return usersList.filter(u => {
      const rombel = String(u.kelas || u.grade || '').trim();
      return rombel === filterRombel;
    });
  }, [usersList, filterRombel]);

  const getRombelBadgeColor = (rombel: string) => {
    const r = rombel.toLowerCase();
    if (r.includes('10')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (r.includes('11')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (r.includes('12')) return 'bg-purple-50 text-purple-700 border-purple-200';
    return 'bg-slate-50 text-slate-700 border-slate-200';
  };

  const handleToggleUserRole = async (id: string, newRole: Role) => {`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/components/AdminDashboard.tsx', code, 'utf8');
