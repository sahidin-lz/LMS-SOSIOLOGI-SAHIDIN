const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add mainPillar state
code = code.replace(
  "  const [activeTab, setActiveTab] = useState",
  "  const [mainPillar, setMainPillar] = useState<'belajar' | 'tka'>('belajar');\n  const [activeTab, setActiveTab] = useState"
);

// 2. Modify handleGradeChange
const oldFunc = `  const handleGradeChange = useCallback((newGrade: number) => {
    if (!user) return;
    const updated = { ...user, grade: newGrade };
    setUser(updated);
    saveDocument('users', user.id, updated);

    if (updated.role === 'siswa' && newGrade !== 12 && activeTab === 'cbt') {
      setActiveTab('dashboard');
    }
  }, [user, activeTab]);`;

const newFunc = `  const handleGradeChange = useCallback((newGrade: number) => {
    if (!user) return;
    const updated = { ...user, grade: newGrade };
    setUser(updated);
    saveDocument('users', user.id, updated);

    if (updated.role === 'siswa' && newGrade !== 12 && mainPillar === 'tka') {
      setMainPillar('belajar');
      setActiveTab('dashboard');
    }
  }, [user, mainPillar]);`;
code = code.replace(oldFunc, newFunc);

// 3. Update Navbar instantiation
const oldNavbarStr = `<Navbar
          user={user}
          activeTab={activeTab as any}
          setActiveTab={(tab) => setActiveTab(tab as any)}
          onRoleChange={handleRoleChange}
          onGradeChange={handleGradeChange}
          onLogout={handleLogout}
          notifications={announcements as any}
        />`;

const newNavbarStr = `<Navbar
          user={user}
          mainPillar={mainPillar}
          setMainPillar={setMainPillar}
          activeTab={activeTab as any}
          setActiveTab={(tab) => setActiveTab(tab as any)}
          cbtFilter={cbtFilter}
          setCbtFilter={setCbtFilter}
          onRoleChange={handleRoleChange}
          onGradeChange={handleGradeChange}
          onLogout={handleLogout}
          notifications={announcements as any}
        />`;
code = code.replace(oldNavbarStr, newNavbarStr);

fs.writeFileSync('src/App.tsx', code);
console.log("App.tsx modified partially");
