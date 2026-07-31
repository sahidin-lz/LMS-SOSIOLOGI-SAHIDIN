const fs = require('fs');

const rawData = fs.readFileSync('full_prompt.json', 'utf8');
const data = JSON.parse(rawData);

const courses = [
  {
    id: 'course_10_bab1',
    title: 'Sosiologi Kelas 10 Bab 1: Pengantar Sosiologi',
    description: 'Menyelami akar Sosiologi sebagai ilmu sosial, dari guncangan sosial di Eropa hingga perkembangannya di Indonesia.',
    grade_level: 10,
    category: 'Konsep Dasar Sosiologi',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600',
    totalLessons: 6,
    completedLessons: 0,
    lessons: [
      { id: 'les_10_bab1_1', title: 'Pertemuan 1: Sejarah Perkembangan Sosiologi di Eropa dan Amerika', text_body: data.bab1.p1 },
      { id: 'les_10_bab1_2', title: 'Pertemuan 2: Sejarah Perkembangan Sosiologi di Indonesia', text_body: data.bab1.p2 },
      { id: 'les_10_bab1_3', title: 'Pertemuan 3: Pengertian dan Objek Kajian Sosiologi', text_body: data.bab1.p3 },
      { id: 'les_10_bab1_4', title: 'Pertemuan 4: Sosiologi sebagai Ilmu Pengetahuan', text_body: data.bab1.p4 },
      { id: 'les_10_bab1_5', title: 'Pertemuan 5: Sosiologi sebagai Ilmu dengan Paradigma Ganda', text_body: data.bab1.p5 },
      { id: 'les_10_bab1_6', title: 'Pertemuan 6: Fungsi, Peran Sosiologi, dan Hubungannya dengan Ilmu Lain', text_body: data.bab1.p6 },
    ].map((les, i) => ({
      ...les,
      course_id: 'course_10_bab1',
      chapter_number: 1,
      chapter_title: data.bab1.title,
      content_type: 'text',
      duration: '15 Min',
      xp_reward: 50,
      completed: false,
      bookmarked: false,
      key_takeaways: []
    }))
  },
  {
    id: 'course_10_bab2',
    title: 'Sosiologi Kelas 10 Bab 2: Gejala Sosial dalam Masyarakat Multikultural',
    description: 'Mengidentifikasi gejala-gejala sosial, menganalisisnya dalam masyarakat multikultural, dan memahami konsep multikulturalisme.',
    grade_level: 10,
    category: 'Masyarakat Multikultural',
    thumbnail: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=600',
    totalLessons: 6,
    completedLessons: 0,
    lessons: [
      { id: 'les_10_bab2_1', title: 'Pertemuan 1: Hakikat dan Karakteristik Gejala Sosial', text_body: data.bab2.p1 },
      { id: 'les_10_bab2_2', title: 'Pertemuan 2: Bentuk, Jenis, dan Tingkatan Gejala Sosial', text_body: data.bab2.p2 },
      { id: 'les_10_bab2_3', title: 'Pertemuan 3: Perbedaan dan Struktur Sosial dalam Masyarakat', text_body: data.bab2.p3 },
      { id: 'les_10_bab2_4', title: 'Pertemuan 4: Pendalaman Stratifikasi dan Diferensiasi Sosial', text_body: data.bab2.p4 },
      { id: 'les_10_bab2_5', title: 'Pertemuan 5: Heterogenitas, Prasangka, dan Stereotipe', text_body: data.bab2.p5 },
      { id: 'les_10_bab2_6', title: 'Pertemuan 6: Mewujudkan Masyarakat Multikultural', text_body: data.bab2.p6 },
    ].map((les, i) => ({
      ...les,
      course_id: 'course_10_bab2',
      chapter_number: 2,
      chapter_title: data.bab2.title,
      content_type: 'text',
      duration: '15 Min',
      xp_reward: 50,
      completed: false,
      bookmarked: false,
      key_takeaways: []
    }))
  },
  {
    id: 'course_10_bab3',
    title: 'Sosiologi Kelas 10 Bab 3: Identitas Diri, Tindakan Sosial, dan Hubungan Sosial',
    description: 'Mengupas eksistensi kita di tengah masyarakat melalui identitas diri, tindakan sosial (Max Weber), dan hubungan sosial.',
    grade_level: 10,
    category: 'Tindakan & Hubungan Sosial',
    thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953eb1b5ce?auto=format&fit=crop&q=80&w=600',
    totalLessons: 6,
    completedLessons: 0,
    lessons: [
      { id: 'les_10_bab3_1', title: 'Pertemuan 1: Hakikat Manusia dan Identitas Diri', text_body: data.bab3.p1 },
      { id: 'les_10_bab3_2', title: 'Pertemuan 2: Multidimensi Identitas, Status, dan Peran Sosial', text_body: data.bab3.p2 },
      { id: 'les_10_bab3_3', title: 'Pertemuan 3: Hakikat dan Jenis-Jenis Tindakan Sosial', text_body: data.bab3.p3 },
      { id: 'les_10_bab3_4', title: 'Pertemuan 4: Hubungan Sosial dan Syarat Interaksi Sosial', text_body: data.bab3.p4 },
      { id: 'les_10_bab3_5', title: 'Pertemuan 5: Pendekatan Interaksi dan Faktor Psikologis', text_body: data.bab3.p5 },
      { id: 'les_10_bab3_6', title: 'Pertemuan 6: Bentuk Interaksi (Asosiatif & Disosiatif)', text_body: data.bab3.p6 },
    ].map((les, i) => ({
      ...les,
      course_id: 'course_10_bab3',
      chapter_number: 3,
      chapter_title: data.bab3.title,
      content_type: 'text',
      duration: '15 Min',
      xp_reward: 50,
      completed: false,
      bookmarked: false,
      key_takeaways: []
    }))
  },
  {
    id: 'course_10_bab4',
    title: 'Sosiologi Kelas 10 Bab 4: Lembaga Sosial',
    description: 'Membedah rahasia keteraturan masyarakat melalui konsep Nilai, Norma, Pengendalian Sosial, hingga berbagai Tipe Lembaga Sosial.',
    grade_level: 10,
    category: 'Lembaga & Keteraturan Sosial',
    thumbnail: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=600',
    totalLessons: 6,
    completedLessons: 0,
    lessons: [
      { id: 'les_10_bab4_1', title: 'Pertemuan 1: Memahami Nilai Sosial', text_body: data.bab4.p1 },
      { id: 'les_10_bab4_2', title: 'Pertemuan 2: Mengkaji Norma Sosial', text_body: data.bab4.p2 },
      { id: 'les_10_bab4_3', title: 'Pertemuan 3: Hakikat Lembaga Sosial', text_body: data.bab4.p3 },
      { id: 'les_10_bab4_4', title: 'Pertemuan 4: Tipe & Jenis Lembaga (Keluarga & Pendidikan)', text_body: data.bab4.p4 },
      { id: 'les_10_bab4_5', title: 'Pertemuan 5: Lembaga Politik, Ekonomi, dan Agama', text_body: data.bab4.p5 },
      { id: 'les_10_bab4_6', title: 'Pertemuan 6: Tertib Sosial, Penyimpangan, dan Pengendalian', text_body: data.bab4.p6 },
    ].map((les, i) => ({
      ...les,
      course_id: 'course_10_bab4',
      chapter_number: 4,
      chapter_title: data.bab4.title,
      content_type: 'text',
      duration: '15 Min',
      xp_reward: 50,
      completed: false,
      bookmarked: false,
      key_takeaways: []
    }))
  }
];

let fileContent = fs.readFileSync('src/data/sociologyData.ts', 'utf8');

const course10Bab1Start = fileContent.indexOf('"id": "course_10_bab1"');
if (course10Bab1Start !== -1) {
    const previousBrace = fileContent.lastIndexOf('{', course10Bab1Start);
    // Find where course_11 starts
    const course11Start = fileContent.indexOf("id: 'course_11'");
    const nextCourseBrace = fileContent.lastIndexOf('{', course11Start);
    
    const part1 = fileContent.substring(0, previousBrace);
    const part2 = fileContent.substring(nextCourseBrace);

    let newCoursesJson = JSON.stringify(courses, null, 2);
    newCoursesJson = newCoursesJson.substring(1, newCoursesJson.length - 1).trim();

    const newFileContent = part1 + newCoursesJson + ',\n  ' + part2;
    fs.writeFileSync('src/data/sociologyData.ts', newFileContent, 'utf8');
    console.log("Successfully replaced with the EXACT text courses.");
} else {
    console.log("Could not find course_10_bab1.");
}
