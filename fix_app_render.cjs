const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /<AdminDashboard[\s\S]*?\/>/;
const replacement = `<AdminDashboard
                  user={user}
                  onRoleChange={handleRoleChange}
                  courses={courses}
                  exams={exams}
                  announcements={announcements}
                  usersList={usersList}
                  hasMoreUsers={hasMoreUsers}
                  onLoadMoreUsers={loadMoreUsers}
                  loadingMoreUsers={loadingMoreUsers}
                  rombelFilter={rombelFilter}
                  setRombelFilter={setRombelFilter}
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

code = code.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', code, 'utf8');
