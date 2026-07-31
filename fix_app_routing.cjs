const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const startMarker = `          {/* Role: Guru (Teacher) Workspace */}`;
const endMarker = `          {/* Exam Discussion View */}
          {activeTab === 'exam_discussion' && examSession && activeExam && (
            <ExamDiscussionView
              session={examSession}
              exam={activeExam}
              onBackToDashboard={() => setActiveTab('dashboard')}
              onRetakeExam={() => setActiveTab('exam_active')}
            />
          )}`;

const startIndex = code.indexOf(startMarker);
if (startIndex === -1) {
  console.error("Start marker not found.");
  process.exit(1);
}

const endIndex = code.indexOf(endMarker, startIndex) + endMarker.length;
if (endIndex - endMarker.length === -1) {
  console.error("End marker not found.");
  process.exit(1);
}

const originalBlock = code.substring(startIndex, endIndex);

const newBlock = `          {(user.role === 'admin' || user.role === 'guru') ? (
            <>
              {/* Role: Guru (Teacher) Workspace */}
              {user.role === 'guru' && activeTab === 'dashboard' && (
                <TeacherDashboard courses={courses} exams={exams} />
              )}

              {/* Role: Admin Workspace */}
              {user.role === 'admin' && activeTab === 'dashboard' && (
                <AdminDashboard
                  user={user}
                  onRoleChange={handleRoleChange}
                  courses={courses}
                  exams={exams}
                  announcements={announcements}
                  usersList={usersList}
                  hasMoreUsers={hasMoreUsers}
                  onLoadMoreUsers={loadMoreUsers}
                  loadingMoreUsers={loadingMoreUsers}
                  onAddCourse={handleAddCourse}
                  onDeleteCourse={handleDeleteCourse}
                  onAddExam={handleAddExam}
                  onDeleteExam={handleDeleteExam}
                  onAddQuestion={handleAddQuestion}
                  onDeleteQuestion={handleDeleteQuestion}
                  onAddAnnouncement={handleAddAnnouncement}
                  onDeleteAnnouncement={handleDeleteAnnouncement}
                  onAddUser={handleAddUser}
                  onDeleteUser={handleDeleteUser}
                  onBulkAddUsers={handleBulkAddUsers}
                />
              )}

              {/* Classroom Rombel Management */}
              {activeTab === 'classrooms' && (
                <ClassroomManagement user={user} />
              )}

              {/* Learning Path Modules */}
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
              )}
            </>
          ) : (
            <>
              {/* Role: Siswa (Student Dashboard) */}
              {activeTab === 'dashboard' && (
                <StudentDashboard
                  user={user}
                  courses={courses}
                  exams={exams}
                  announcements={announcements}
                  analytics={analytics}
                  examHistory={EXAM_HISTORY_DATA}
                  onStartCourse={handleStartCourse}
                  onStartExam={handleStartExam}
                  setActiveTab={(tab) => setActiveTab(tab as any)}
                />
              )}

              {/* Learning Journey Map */}
              {activeTab === 'journey' && (
                <LearningJourneyMap
                  user={user}
                  courses={courses}
                  onSelectLesson={(courseId) => {
                    setSelectedCourseId(courseId);
                    setActiveTab('modules');
                  }}
                />
              )}

              {/* Learning Path Modules */}
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
              )}

              {/* Tasks Workspace */}
              {activeTab === 'tasks' && (
                <TasksWorkspace user={user} />
              )}

              {/* Classroom Chat View */}
              {activeTab === 'classroom_chat' && (
                <ClassroomChatView user={user} />
              )}

              {/* CBT Tryouts List Tab */}
              {activeTab === 'cbt' && (
                <div className="space-y-6 pb-12">
                  <div className="bg-stone-900 rounded-3xl p-6 border border-stone-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-amber-300 bg-amber-950 px-3 py-1 rounded-full mb-1 border border-amber-800">
                        <FileText className="w-3.5 h-3.5 text-amber-400" />
                        <span>Simulasi Ujian Computer Based Test</span>
                      </div>
                      <h1 className="text-2xl font-extrabold text-stone-100">
                        Bank Ujian CBT & Tryout TKA Sosiologi SMA
                      </h1>
                      <p className="text-xs text-stone-400">Pilih paket tryout TKA atau Latihan Soal CBT 10 Bab Sosiologi SMA (Lengkap Bab 1 s.d. 10)</p>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex bg-stone-950 p-1.5 rounded-2xl border border-stone-800 text-xs font-bold gap-1 flex-wrap shrink-0">
                      <button
                        onClick={() => setCbtFilter('semua')}
                        className={\`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer \${
                          cbtFilter === 'semua'
                            ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                            : 'text-stone-400 hover:text-white'
                        }\`}
                      >
                        Semua Paket ({exams.length})
                      </button>
                      <button
                        onClick={() => setCbtFilter('tryout')}
                        className={\`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer \${
                          cbtFilter === 'tryout'
                            ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                            : 'text-stone-400 hover:text-white'
                        }\`}
                      >
                        🎯 Tryout TKA Resmi
                      </button>
                      <button
                        onClick={() => setCbtFilter('latihan')}
                        className={\`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer \${
                          cbtFilter === 'latihan'
                            ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                            : 'text-stone-400 hover:text-white'
                        }\`}
                      >
                        📝 Latihan 10 Bab
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {displayedExams.map((exam) => (
                      <div
                        key={exam.id}
                        className="bg-stone-900 rounded-3xl p-6 border border-stone-800 shadow-md hover:border-amber-500 transition-all space-y-4 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                              {exam.category}
                            </span>
                            <div className="flex items-center space-x-1 text-stone-400 text-xs font-medium">
                              <Clock className="w-3.5 h-3.5 text-amber-400" />
                              <span>{exam.duration_minutes} Menit</span>
                            </div>
                          </div>

                          <h2 className="text-lg font-bold text-stone-100">{exam.title}</h2>
                          <p className="text-xs text-stone-400 leading-relaxed">{exam.description}</p>
                        </div>

                        <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                          <div className="flex items-center space-x-1 text-amber-400 text-xs font-bold">
                            <Award className="w-4 h-4" />
                            <span>+{exam.xp_reward} Socio-Points</span>
                          </div>

                          <button
                            onClick={() => handleStartExam(exam.id)}
                            className="bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-stone-950 font-extrabold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md cursor-pointer flex items-center space-x-1.5"
                          >
                            <span>Mulai Kerjakan Ujian</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gamification & Leaderboard Tab */}
              {activeTab === 'leaderboard' && (
                <GamificationLeaderboard user={user} leaderboardData={leaderboard} />
              )}

              {/* Active CBT Exam Engine View */}
              {activeTab === 'exam_active' && activeExam && (
                <CbtExamView
                  exam={activeExam}
                  userId={user.id}
                  onSubmitExam={handleSubmitExam}
                  onCancelExam={() => setActiveTab('dashboard')}
                />
              )}

              {/* Exam Discussion View */}
              {activeTab === 'exam_discussion' && examSession && activeExam && (
                <ExamDiscussionView
                  session={examSession}
                  exam={activeExam}
                  onBackToDashboard={() => setActiveTab('dashboard')}
                  onRetakeExam={() => setActiveTab('exam_active')}
                />
              )}
            </>
          )}`;

const finalCode = code.substring(0, startIndex) + newBlock + code.substring(endIndex);
fs.writeFileSync('src/App.tsx', finalCode);
console.log("Successfully replaced the routing block");
