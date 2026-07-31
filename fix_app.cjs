const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// Remove mainPillar and tkaSubTab state
code = code.replace(
  "const [mainPillar, setMainPillar] = useState<'belajar' | 'tka'>('belajar');\n",
  ""
);
code = code.replace(
  "  const [tkaSubTab, setTkaSubTab] = useState<'materi' | 'latihan_bab' | 'try_out_tka'>('materi');\n",
  ""
);

// Replace Navbar call
const oldNavbarStr = `<Navbar
          user={user}
          mainPillar={mainPillar}
          setMainPillar={setMainPillar}
          activeTab={activeTab as any}
          setActiveTab={(tab) => setActiveTab(tab as any)}
          tkaSubTab={tkaSubTab}
          onSelectTkaSubTab={(sub) => {
            setMainPillar('tka');
            setTkaSubTab(sub);
            if (sub === 'try_out_tka') {
              setActiveTab('cbt');
            } else {
              setActiveTab('modules');
            }
          }}
          onSelectTkaModules={() => {
            setSelectedCourseId('course_tka_01');
            setActiveTab('modules');
          }}
          onRoleChange={handleRoleChange}
          onGradeChange={handleGradeChange}
          onLogout={handleLogout}
          notifications={announcements as any}
        />`;

const newNavbarStr = `<Navbar
          user={user}
          activeTab={activeTab as any}
          setActiveTab={(tab) => setActiveTab(tab as any)}
          onRoleChange={handleRoleChange}
          onGradeChange={handleGradeChange}
          onLogout={handleLogout}
          notifications={announcements as any}
        />`;

code = code.replace(oldNavbarStr, newNavbarStr);

// Also remove tkaSubTab from LearningModules call
const oldLearningModulesStr = `              {/* Learning Path Modules */}
              {activeTab === 'modules' && (
                <LearningModules
                  user={user}
                  courses={courses}
                  activeCourseId={selectedCourseId}
                  tkaSubTab={tkaSubTab}
                  onSelectTkaSubTab={(sub) => {
                    setTkaSubTab(sub);
                    if (sub === 'try_out_tka') {
                      setActiveTab('cbt');
                    }
                  }}
                  onCompleteLesson={handleCompleteLesson}
                  onStartExam={handleStartExam}
                />
              )}`;

const newLearningModulesStr = `              {/* Learning Path Modules */}
              {activeTab === 'modules' && (
                <LearningModules
                  user={user}
                  courses={courses}
                  activeCourseId={selectedCourseId}
                  onCompleteLesson={handleCompleteLesson}
                  onStartExam={handleStartExam}
                />
              )}`;

code = code.replace(oldLearningModulesStr, newLearningModulesStr);
code = code.replace(oldLearningModulesStr, newLearningModulesStr); // Replace twice if it's there twice (for the admin/guru block and siswa block)

fs.writeFileSync('src/App.tsx', code);
console.log("App.tsx modified successfully.");
