const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldFunc = `  const handleGradeChange = useCallback((newGrade: number) => {
    if (!user) return;
    const updated = { ...user, grade: newGrade };
    setUser(updated);
    saveDocument('users', user.id, updated);

    if (updated.role === 'siswa' && newGrade !== 12 && mainPillar === 'tka') {
      setMainPillar('belajar');
      setActiveTab('dashboard');
    }
  }, [user, mainPillar]);`;

const newFunc = `  const handleGradeChange = useCallback((newGrade: number) => {
    if (!user) return;
    const updated = { ...user, grade: newGrade };
    setUser(updated);
    saveDocument('users', user.id, updated);

    if (updated.role === 'siswa' && newGrade !== 12 && activeTab === 'cbt') {
      setActiveTab('dashboard');
    }
  }, [user, activeTab]);`;

code = code.replace(oldFunc, newFunc);
fs.writeFileSync('src/App.tsx', code);
console.log("Fixed handleGradeChange");
