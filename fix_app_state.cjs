const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('rombelFilter')) {
  // Add state
  const stateRegex = /const \[cbtFilter, setCbtFilter\] = useState<'semua' \| 'tryout' \| 'latihan'>\('semua'\);/;
  const stateReplacement = `const [cbtFilter, setCbtFilter] = useState<'semua' | 'tryout' | 'latihan'>('semua');
  const [rombelFilter, setRombelFilter] = useState<string>('Semua');`;
  code = code.replace(stateRegex, stateReplacement);

  // Update hook call
  const hookRegex = /const \{ usersList, hasMore: hasMoreUsers, loadMore: loadMoreUsers, loadingMore: loadingMoreUsers, setUsersList \} = useOptimizedUsers\(20\);/;
  const hookReplacement = `const { usersList, hasMore: hasMoreUsers, loadMore: loadMoreUsers, loadingMore: loadingMoreUsers, setUsersList } = useOptimizedUsers(20, rombelFilter);`;
  code = code.replace(hookRegex, hookReplacement);
  
  // Pass to AdminDashboard
  const renderRegex = /<AdminDashboard\s+courses=\{courses\}\s+exams=\{exams\}\s+announcements=\{announcements\}\s+usersList=\{usersList\}\s+hasMoreUsers=\{hasMoreUsers\}\s+loadingMoreUsers=\{loadingMoreUsers\}\s+onLoadMoreUsers=\{loadMoreUsers\}\s+onLogout=\{handleLogout\}\s+onAddCourse=\{handleAddCourse\}\s+onDeleteCourse=\{handleDeleteCourse\}\s+onAddExam=\{handleAddExam\}\s+onDeleteExam=\{handleDeleteExam\}\s+onAddQuestion=\{handleAddQuestion\}\s+onDeleteQuestion=\{handleDeleteQuestion\}\s+onAddAnnouncement=\{handleAddAnnouncement\}\s+onDeleteAnnouncement=\{handleDeleteAnnouncement\}\s+onAddUser=\{handleAddUser\}\s+onDeleteUser=\{handleDeleteUser\}\s+onBulkAddUsers=\{handleBulkAddUsers\}\s+\/>/
  const renderReplacement = `<AdminDashboard
            courses={courses}
            exams={exams}
            announcements={announcements}
            usersList={usersList}
            hasMoreUsers={hasMoreUsers}
            loadingMoreUsers={loadingMoreUsers}
            onLoadMoreUsers={loadMoreUsers}
            rombelFilter={rombelFilter}
            setRombelFilter={setRombelFilter}
            onLogout={handleLogout}
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
          />`;
  code = code.replace(renderRegex, renderReplacement);
  
  fs.writeFileSync('src/App.tsx', code, 'utf8');
}
