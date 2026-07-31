const fs = require('fs');

let code = fs.readFileSync('src/components/AdminDashboard.tsx', 'utf8');

const regex = /\{\/\* QUICK ACTIONS PANEL \(AKSI CEPAT ADMIN\) \*\/\}/;
const replacement = `{/* QUICK ACTIONS PANEL (AKSI CEPAT ADMIN) */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-sm border border-slate-200 space-y-3">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
          <button onClick={() => setAdminTab('courses')} className={\`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer \${adminTab === 'courses' ? 'bg-indigo-600 text-white shadow-sm border border-slate-200' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}\`}>
            <BookOpen className="w-4 h-4" />
            <span>Input Modul & Dokumen ({courses.length})</span>
          </button>
          <button onClick={() => setAdminTab('exams')} className={\`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer \${adminTab === 'exams' ? 'bg-amber-600 text-white shadow-sm border border-slate-200' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}\`}>
            <Award className="w-4 h-4" />
            <span>Input Tryout TKA & Soal ({exams.length})</span>
          </button>
          <button onClick={() => setAdminTab('users')} className={\`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer \${adminTab === 'users' ? 'bg-purple-600 text-white shadow-sm border border-slate-200' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}\`}>
            <Users className="w-4 h-4" />
            <span>Kelola User & Role ({usersList.length})</span>
          </button>
          <button onClick={() => setAdminTab('announcements')} className={\`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer \${adminTab === 'announcements' ? 'bg-blue-600 text-white shadow-sm border border-slate-200' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'}\`}>
            <Bell className="w-4 h-4" />
            <span>Pengumuman LMS ({announcements.length})</span>
          </button>
        </div>
      </div>

      {adminTab === 'courses' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-sm font-bold text-slate-800">Form Input Modul & Dokumen</h2>
            <form onSubmit={handleAddCourseSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Pilar</label>
                <select value={courseTargetPillar} onChange={(e) => setCourseTargetPillar(e.target.value as any)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500">
                  <option value="kelas">Materi Kelas (10-12)</option>
                  <option value="tka">Materi TKA Sosiologi</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Modul</label>
                <input required type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kelas</label>
                  <select value={courseGrade} onChange={(e) => setCourseGrade(Number(e.target.value) as any)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500">
                    <option value={10}>Kelas 10</option><option value={11}>Kelas 11</option><option value={12}>Kelas 12</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bab</label>
                  <input type="number" value={courseChapterNum} onChange={(e) => setCourseChapterNum(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi</label>
                <textarea required value={courseDesc} onChange={(e) => setCourseDesc(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Video / Sub-Materi</label>
                <input required type="text" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">File Dokumen (Opsional)</label>
                <input type="file" onChange={(e) => setSelectedDocumentFile(e.target.files?.[0] || null)} className="w-full text-xs" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">YouTube Video ID</label>
                <input type="text" value={lessonVideoUrl} onChange={(e) => setLessonVideoUrl(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Teks Materi</label>
                <textarea value={lessonTextBody} onChange={(e) => setLessonTextBody(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Poin Kunci (pisahkan dengan baris baru)</label>
                <textarea value={lessonKeyPoints} onChange={(e) => setLessonKeyPoints(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500" />
              </div>
              <button type="submit" disabled={isUploading} className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-sm">Simpan Modul</button>
            </form>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-base font-bold text-slate-800">Daftar Modul Pembelajaran ({courses.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map(course => (
                <div key={course.id} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2 hover:border-indigo-200 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">{course.category} • KLS {course.grade_level}</span>
                      <h3 className="font-bold text-sm mt-2 text-slate-800">{course.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{course.description}</p>
                    </div>
                    <div className="flex space-x-1">
                      <button onClick={() => setEditingCourse(course)} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => onDeleteCourse(course.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {adminTab === 'exams' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-sm font-bold text-slate-800">Form Input Paket Tryout</h2>
            <form onSubmit={handleAddExamSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Paket Ujian</label>
                <input required type="text" value={examTitle} onChange={(e) => setExamTitle(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                  <select value={examCategory} onChange={(e) => setExamCategory(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500">
                    <option value="Tryout TKA">Tryout TKA</option>
                    <option value="Ujian Akhir">Ujian Akhir</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kelas</label>
                  <select value={examGrade} onChange={(e) => setExamGrade(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500">
                    <option value={10}>10</option><option value={11}>11</option><option value={12}>12</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Durasi (Menit)</label>
                  <input required type="number" value={examDuration} onChange={(e) => setExamDuration(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Passing Score</label>
                  <input required type="number" value={examPassingScore} onChange={(e) => setExamPassingScore(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500" />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi</label>
                <textarea required value={examDesc} onChange={(e) => setExamDesc(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500" />
              </div>
              <button type="submit" disabled={isUploading} className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-all shadow-sm">Simpan Paket Ujian</button>
            </form>
            
            <div className="border-t border-slate-200 pt-5 mt-5">
              <h2 className="text-sm font-bold text-slate-800 mb-3">Tambah Butir Soal</h2>
              <form onSubmit={handleAddQuestionSubmit} className="space-y-4 text-xs">
                 <div>
                   <label className="block font-bold text-slate-700 mb-1">Pilih Paket Ujian</label>
                   <select required value={selectedExamId} onChange={(e) => setSelectedExamId(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500">
                     <option value="">-- Pilih Paket --</option>
                     {exams.map(ex => <option key={ex.id} value={ex.id}>{ex.title}</option>)}
                   </select>
                 </div>
                 <div>
                   <label className="block font-bold text-slate-700 mb-1">Teks Pertanyaan</label>
                   <textarea required value={qText} onChange={(e) => setQText(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                   <div>
                     <label className="block font-bold text-slate-700 mb-1">Tipe Soal</label>
                     <select value={qType} onChange={(e) => setQType(e.target.value as any)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500">
                       <option value="pilihan_ganda">Pilihan Ganda</option>
                       <option value="sebab_akibat">Sebab Akibat</option>
                       <option value="kompleks">Kompleks</option>
                     </select>
                   </div>
                   <div>
                     <label className="block font-bold text-slate-700 mb-1">Jawaban Benar</label>
                     <select value={qCorrect} onChange={(e) => setQCorrect(e.target.value as any)} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500">
                       <option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option>
                     </select>
                   </div>
                 </div>
                 <button type="submit" disabled={isUploading} className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-sm">Simpan Soal</button>
              </form>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-base font-bold text-slate-800">Daftar Paket Ujian ({exams.length})</h2>
            <div className="grid grid-cols-1 gap-4">
              {exams.map(exam => (
                <div key={exam.id} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-amber-200 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-full">{exam.category} • {exam.duration_minutes} Menit</span>
                      <h3 className="font-bold text-sm mt-2 text-slate-800">{exam.title} ({exam.questions?.length || 0} Soal)</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{exam.description}</p>
                    </div>
                    <div className="flex space-x-1">
                      <button onClick={() => onDeleteExam(exam.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {adminTab === 'users' && (
`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/components/AdminDashboard.tsx', code, 'utf8');
