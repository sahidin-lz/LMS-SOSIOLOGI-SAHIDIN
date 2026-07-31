import { Course, Exam, LeaderboardUser, TryoutAnalytics, User } from '../types';
import { INITIAL_STUDENT_USERS, INITIAL_CLASSROOM_STUDENTS, TEACHER_USER } from './studentsData';
import { TKA_COURSES_EXTRA } from './unitsData';
import { TKA_COURSES_EXTRA_2 } from './unitsData2';
import { TKA_EXAMS_EXTRA } from './examsDataExtra';
import { TKA_EXAMS_EXTRA_2 } from './examsDataExtra2';
import { TKA_EXAMS_EXTRA_3 } from './examsDataExtra3';

export const INITIAL_USER: User = INITIAL_STUDENT_USERS[0];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = INITIAL_STUDENT_USERS.slice(0, 10).map((s, idx) => ({
  id: s.id,
  rank: idx + 1,
  name: s.name,
  school: 'SMA Negeri Sosiologi',
  grade: 12,
  xp: 3800 - idx * 60,
  badgeTitle: idx === 0 ? 'Socio Master Grandeur' : idx === 1 ? 'Pakar Teori Kritis' : 'Analis Sosial Muda',
  avatar: s.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(s.nisn)}`,
  change: idx === 1 ? 'up' : idx === 3 ? 'down' : 'same',
}));

export const TRYOUT_ANALYTICS_DATA: TryoutAnalytics[] = [
  { exam_title: 'Tryout 1', score: 120, date: '10 Jun', target_score: 150 },
  { exam_title: 'Tryout 2', score: 135, date: '24 Jun', target_score: 150 },
  { exam_title: 'Tryout 3', score: 130, date: '08 Jul', target_score: 150 },
  { exam_title: 'Tryout 4', score: 150, date: '22 Jul', target_score: 150 },
  { exam_title: 'Tryout 5 (Terbaru)', score: 165, date: '28 Jul', target_score: 150 },
];

export const COURSES_DATA: Course[] = [
  {
    id: 'course_tka_01',
    title: 'Unit 1 TKA Sosiologi: Sosiologi Sebagai Ilmu',
    description: 'Modul Pembelajaran TKA Sosiologi Unit 1 - Mengupas Sejarah, Objek Kajian, Ciri/Karakteristik (Empiris, Teoritis, Kumulatif, Non-etis), Posisi Ilmu, Metode Penelitian, Perspektif, Teori Tokoh Klasik (Comte, Durkheim, Marx, Weber), Fungsi, serta Peran Sosiologi secara utuh.',
    grade_level: 12,
    category: 'TKA Sosiologi (UTBK / Seleksi PTN)',
    thumbnail: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600',
    totalLessons: 9,
    completedLessons: 0,
    lessons: [
      {
        id: 'les_tka_1_a',
        course_id: 'course_tka_01',
        chapter_number: 1,
        chapter_title: 'UNIT 1: SOSIOLOGI SEBAGAI ILMU',
        title: 'A. Sejarah dan Perkembangan Ilmu Sosiologi',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 100,
        completed: false,
        bookmarked: true,
        key_takeaways: [
          'Diperkenalkan pertama kali oleh Auguste Comte (Bapak Sosiologi) dalam buku "Positive-Philosophy" (1842).',
          'Awalnya diusulkan nama "ethology" oleh John Stuart Mill, tetapi tidak banyak digunakan.',
          'Perkembangan pesat terjadi setelah Herbert Spencer dari Inggris menulis buku "Principles of Sociology".',
          'Sosiologi menyebar ke Amerika Serikat, Prancis, Jerman, hingga seluruh dunia termasuk Indonesia.',
          'Tokoh-tokoh penting lainnya: Karl Marx, Max Weber, dan Charles H. Cooley.'
        ],
        text_body: `A. SEJARAH DAN PERKEMBANGAN ILMU SOSIOLOGI

Siapa yang Memperkenalkan Sosiologi? 
Sosiologi pertama kali diperkenalkan oleh seorang filsuf dari Prancis bernama Auguste Comte. Ia menulis beberapa buku yang berisi cara-cara umum untuk mempelajari masyarakat.

Apa Ide Utamanya? 
Comte percaya bahwa untuk memahami masyarakat, penelitian harus dilakukan melalui tahapan-tahapan yang logis hingga mencapai tahap paling akhir, yaitu tahap ilmiah.

Kapan Sosiologi Lahir? 
Sosiologi dianggap lahir pada tahun 1842. Ini adalah momen ketika Auguste Comte menerbitkan buku terakhirnya yang berjudul "Positive-Philosophy".

Bagaimana Sosiologi Berkembang?
1. Istilah Sosiologi tidak langsung populer. Awalnya, ada usulan nama lain yaitu "ethology" dari John Stuart Mill, tetapi tidak banyak digunakan.
2. Perkembangan sosiologi menjadi sangat pesat setelah Herbert Spencer dari Inggris menulis buku "Principles of Sociology".
3. Setelah itu, sosiologi berkembang pesat di Amerika Serikat, Prancis, dan Jerman, sebelum akhirnya menyebar ke seluruh dunia, termasuk Indonesia.
4. Siapa Saja Tokoh-Tokoh Penting Lainnya? Selain Auguste Comte dan Herbert Spencer, ada banyak tokoh penting lain dalam perkembangan sosiologi, seperti Karl Marx, Max Weber, dan Charles H. Cooley.`
      },
      {
        id: 'les_tka_1_b',
        course_id: 'course_tka_01',
        chapter_number: 1,
        chapter_title: 'UNIT 1: SOSIOLOGI SEBAGAI ILMU',
        title: 'B. Objek Kajian & Karakteristik Ilmu Sosiologi',
        content_type: 'text',
        duration: '20 Min',
        xp_reward: 100,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Empiris: Berdasarkan fakta nyata di lapangan (observasi), tidak berspekulasi/menduga-duga.',
          'Teoritis: Menyusun kesimpulan logis (abstraksi) hubungan sebab-akibat dari pengamatan lapangan.',
          'Kumulatif: Teori lama diperbaiki, dikembangkan, dilengkapi, atau disanggah sesuai kondisi terkini.',
          'Non-Etis: Bebas nilai, objektif, netral tidak memihak, tidak menilai baik/buruk suatu fenomena.'
        ],
        text_body: `B. OBJEK KAJIAN DAN KARAKTERISTIK ILMU SOSIOLOGI

1. Empiris
Kata Kunci: Berdasarkan Fakta Nyata.
Penjelasan Mudah: Sosiologi mempelajari masyarakat berdasarkan kejadian yang benar-benar terjadi di lapangan, bukan hasil karangan atau dugaan (spekulasi). Semua kesimpulannya harus bisa dibuktikan melalui pengamatan (observasi) dan dapat diterima oleh akal sehat.

2. Teoritis
Kata Kunci: Menjelaskan Sebab-Akibat.
Penjelasan Mudah: Setelah mengumpulkan fakta, Sosiologi selalu berusaha menyusun kesimpulan logis untuk menjelaskan hubungan sebab-akibat dari sebuah gejala sosial. Tujuannya adalah untuk membangun sebuah teori yang bisa menjelaskan mengapa suatu fenomena terjadi.

3. Kumulatif
Kata Kunci: Membangun dan Menyempurnakan.
Penjelasan Mudah: Teori-teori dalam Sosiologi tidak muncul begitu saja. Teori yang baru dibangun di atas teori lama yang sudah ada, dengan cara memperbaiki, memperluas, dan menyempurnakannya. Jadi, ilmu Sosiologi terus berkembang dan "bertumpuk" menjadi lebih baik dari waktu ke waktu.

4. Non-etis
Kata Kunci: Objektif (Tidak Menghakimi).
Penjelasan Mudah: Sosiologi tidak bertugas untuk menilai apakah suatu hal di masyarakat itu baik atau buruk. Tugasnya adalah menjelaskan dan menganalisis fakta dari sebuah fenomena sosial secara apa adanya (objektif), tanpa memasukkan unsur penilaian pribadi.

--------------------------------------------------------------------------------
TABEL 1.1 CIRI ILMU SOSIOLOGI DAN CONTOH
--------------------------------------------------------------------------------

[CIRI: EMPIRIS]
• Keterangan: 
  - Berdasarkan kenyataan di masyarakat (hasil observasi atau melakukan pengamatan, penemuan, atau percobaan)
  - Dapat dibuktikan kebenarannya, tidak menduga-duga atau berspekulasi
• Contoh: 
  Liza sedang melakukan observasi lapangan guna memahami nilai norma masyarakat Minangkabau.

[CIRI: TEORITIS]
• Keterangan: 
  - Membuat abstraksi dari pengamatan lapangan
  - Atau membuat kesimpulan dari pengamatan lapangan.
• Contoh: 
  Liza menyimpulkan alasan dilakukannya upacara adat marapulai pada prosesi pernikahan adat Minangkabau sesuai data di lapangan yang didapat.

[CIRI: KUMULATIF]
• Keterangan: 
  - Kesimpulan yang sudah ada kemudian diperbaiki, dikembangkan, dilengkapi bahkan mungkin disanggah sesuai dengan keadaan terkini.
• Contoh: 
  - Penelitian 1: Kenakalan remaja itu, terjadi karena tidak ada keharmonisan dalam keluarga.
  - Penelitian 2: Kenakalan remaja dipengaruhi karena pergaulan teman sebaya yang cenderung negatif.
  - Kesimpulan Kumulatif: Jadi, penyebab kenakalan remaja yaitu ketidakharmonisan keluarga dan pergaulan teman sebaya yang negatif.

[CIRI: NON ETIS]
• Keterangan: 
  - Bebas nilai tidak menilai baik dan buruk sebuah fenomena sosial
  - Objektif
  - Netral tidak memihak
• Contoh: 
  Liza menjelaskan penyebab terjadinya praktik sex bebas di kalangan mahasiswa sesuai data di lapangan, bukan berdasarkan prasangka pribadi.`
      },
      {
        id: 'les_tka_1_c',
        course_id: 'course_tka_01',
        chapter_number: 1,
        chapter_title: 'UNIT 1: SOSIOLOGI SEBAGAI ILMU',
        title: 'C. Posisi Sosiologi sebagai Ilmu Pengetahuan',
        content_type: 'text',
        duration: '10 Min',
        xp_reward: 100,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Ilmu Murni (Pure Science): Digunakan untuk mendapatkan pengetahuan teoritis tentang masyarakat.',
          'Ilmu Terapan (Applied Science): Digunakan untuk memecahkan masalah secara praktis guna memperbaiki kehidupan masyarakat.'
        ],
        text_body: `C. POSISI SOSIOLOGI SEBAGAI ILMU PENGETAHUAN

ILMU MURNI (PURE SCIENCE)
• Keterangan: 
  Sosiologi sebagai ilmu murni digunakan untuk mendapatkan pengetahuan tentang masyarakat.
• Contoh: 
  Liza sedang melakukan penelitian mengenai penyebab dari konflik di bidang pertanahan yang sering terjadi di Indonesia.

ILMU TERAPAN (APPLIED SCIENCE)
• Keterangan: 
  Sosiologi sebagai ilmu terapan digunakan untuk memecahkan masalah secara praktis guna memperbaiki kehidupan masyarakat.
• Contoh: 
  Liza melakukan penelitian mengenai cara pencegahan konflik pertanahan di Indonesia.`
      },
      {
        id: 'les_tka_1_d',
        course_id: 'course_tka_01',
        chapter_number: 1,
        chapter_title: 'UNIT 1: SOSIOLOGI SEBAGAI ILMU',
        title: 'D. Metode-Metode dalam Ilmu Sosiologi',
        content_type: 'text',
        duration: '10 Min',
        xp_reward: 100,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Metode Kuantitatif: Meneliti fakta yang dapat diukur dengan angka menggunakan statistik, skala, indeks, tabel, dan formula matematika.',
          'Metode Kualitatif: Penelitian dilakukan secara mendalam dengan sumber data berupa kata-kata lisan atau tertulis.'
        ],
        text_body: `D. METODE-METODE DALAM ILMU SOSIOLOGI

Sosiologi sebagai ilmu dapat digunakan untuk melakukan penelitian sosial, baik dengan metode kuantitatif maupun kualitatif:

a. Metode Kuantitatif
Metode kuantitatif digunakan meneliti fakta yang dapat diukur dengan angka. Penarikan kesimpulan dalam penelitian kuantitatif menggunakan skala, indeks, tabel, dan formula-formula yang berkaitan dengan ilmu Matematika.

b. Metode Kualitatif
Metode kualitatif merupakan penelitian yang dilakukan secara mendalam dengan sumber data berupa kata-kata lisan atau tertulis.`
      },
      {
        id: 'les_tka_1_e',
        course_id: 'course_tka_01',
        chapter_number: 1,
        chapter_title: 'UNIT 1: SOSIOLOGI SEBAGAI ILMU',
        title: 'E. Perspektif / Paradigma Sosiologi',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 100,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Perspektif Evolusionis (Comte & Spencer): Memusatkan perhatian pada pola perkembangan dan perubahan masyarakat.',
          'Perspektif Interaksionis: Penekanan pada interaksi antara individu dan kelompok dengan simbol-simbol (isyarat, tanda, kata-kata).',
          'Perspektif Fungsionalis: Memandang masyarakat sebagai jaringan yang terorganisasi dan mempunyai aturan yang ditaati anggotanya.',
          'Perspektif Konflik: Kajian utama pada pertentangan antarkelas dan eksploitasi kelas sebagai penggerak utama sejarah.'
        ],
        text_body: `E. PERSPEKTIF SOSIOLOGI

Perspektif Sosiologi merupakan cara memandang atau memahami suatu fenomena berdasarkan keyakinan kita. Perspektif sering disebut juga dengan paradigma. Berikut ini beberapa perspektif dalam sosiologi, yaitu:

1. Perspektif Evolusionis
Perspektif evolusionis yaitu memusatkan perhatian pada pola perkembangan dan perubahan dalam masyarakat yang berbeda. Auguste Comte dan Herbert Spencer adalah tokoh-tokoh perspektif evolusionis.

2. Perspektif Interaksionis
Pusat penekanannya pada interaksi antara individu dan kelompok dengan simbol-simbol. Simbol-simbol tersebut dapat berupa isyarat, tanda, dan kata-kata.

3. Perspektif Fungsionalis
Perspektif ini memandang masyarakat sebagai sebuah jaringan yang terorganisasi dan mempunyai aturan ditaati oleh anggotanya.

4. Perspektif Konflik
Kajian utama perspektif ini adalah adanya pertentangan antarkelas dan eksploitasi kelas dalam masyarakat sebagai penggerak utama kekuatan-kekuatan dalam sejarah.`
      },
      {
        id: 'les_tka_1_f',
        course_id: 'course_tka_01',
        chapter_number: 1,
        chapter_title: 'UNIT 1: SOSIOLOGI SEBAGAI ILMU',
        title: 'F. Teori-Teori dalam Sosiologi',
        content_type: 'text',
        duration: '25 Min',
        xp_reward: 120,
        completed: false,
        bookmarked: true,
        key_takeaways: [
          'Auguste Comte: Positivisme (Hukum 3 Tahap: Teologis, Metafisika, Positif).',
          'Emile Durkheim: Fakta Sosial & Tipe Solidaritas (Mekanik & Organik).',
          'Karl Marx: Perjuangan Kelas dalam Ekonomi Kapitalisme (Kaum Borjuis/Kapitalis & Kaum Proletar/Buruh).',
          'Max Weber: Tindakan Sosial (Rasional Instrumental, Rasional Berorientasi Nilai, Tradisional, Afektif) & Etika Protestan (Calvinisme).'
        ],
        text_body: `F. TEORI-TEORI DALAM SOSIOLOGI

1. Auguste Comte
Auguste Comte mengemukakan tentang positivisme yaitu hukum tentang gejala-gejala sosial, yang berhubungan dengan perkembangan cara berpikir yang mendasari perkembangan masyarakat:
• Teologis: menjelaskan gejala sosial dengan bersumber pada kekuatan Tuhan, dewa.
• Metafisika: menjelaskan gejala sosial dengan bersumber pada kekuatan abstrak, gaib.
• Positif: menjelaskan gejala sosial dengan bersumber pada ilmu pengetahuan ilmiah.

2. Emile Durkheim
Fokus kajian sosiologi menurut Durkheim adalah fakta sosial.
Fakta sosial adalah cara bertindak, berpikir, dan berperasaan yang berada di luar diri individu tapi memiliki daya paksa atas dirinya. Misal: aturan, hukum, kepercayaan, adat istiadat.
Durkheim juga membagi masyarakat ke dalam 2 tipe solidaritas, antara lain:
• Mekanik: sederhana, homogen, belum ada pembagian kerja, diikat kesadaran kolektif.
• Organik: pembagian kerja dengan fungsi masing-masing, saling tergantung sehingga harus bekerja sama.

3. Karl Marx
Menurut Marx, sejarah masyarakat merupakan sejarah perjuangan kelas. Ekonomi kapitalisme melahirkan 2 kelas berbeda, yaitu:
• Kaum borjuis/kapitalis: orang-orang yang menguasai modal dan alat produksi.
• Kaum proletar/buruh: orang-orang yang tidak punya modal dan alat sehingga dieksploitasi.

4. Max Weber
Fokus kajian sosiologi menurut Weber adalah tindakan sosial.
Tindakan sosial yaitu tindakan yang mempertimbangkan dan berorientasi terhadap kehadiran atau perilaku orang lain.
• Tindakan sosial rasional instrumental, yakni memperhitungkan cara yang digunakan untuk mencapai tujuan.
• Tindakan sosial rasional berorientasi nilai, yakni memperhitungkan baik atau buruknya suatu tindakan.
• Tindakan tradisional, yakni tindakan meneruskan tradisi/cara-cara yang dituntunkan nenek moyang (tanpa pertimbangan rasional).
• Tindakan afektif, yakni luapan perasaan atau emosi, bersifat tidak rasional.

*Keterangan Tambahan Pemikiran Max Weber (Etika Protestan):
Kapitalisme muncul dan berkembang bersamaan dengan perkembangan ajaran Calvinisme dalam Protestan. Calvinisme mengajarkan umatnya untuk bekerja keras, disiplin, hidup sederhana, dan hemat. Dengan kerja keras umat Calvinis berharap mendapat kemakmuran yang menuntun ke surga.`
      },
      {
        id: 'les_tka_1_g',
        course_id: 'course_tka_01',
        chapter_number: 1,
        chapter_title: 'UNIT 1: SOSIOLOGI SEBAGAI ILMU',
        title: 'G. Fungsi Ilmu Sosiologi',
        content_type: 'text',
        duration: '12 Min',
        xp_reward: 100,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Penelitian Sosial: Mempelajari & menjelaskan fenomena sosial secara empiris.',
          'Perencanaan Sosial: Mempersiapkan masa depan kehidupan masyarakat secara ilmiah guna mengatasi potensi masalah sosial.',
          'Pembangunan Sosial: Peningkatan taraf hidup masyarakat berdasarkan realitas sosial/kondisi masyarakat.',
          'Pemecahan / Solusi Masalah Sosial: Penelitian sosial untuk menemukan solusi tepat dan diaplikasikan di masyarakat.'
        ],
        text_body: `G. FUNGSI SOSIOLOGI

Menurut Abdulsyani, fungsi Sosiologi dalam masyarakat sebagai berikut:

a. Penelitian Sosial
Ilmu Sosiologi diperlukan untuk mempelajari dan menjelaskan berbagai fenomena sosial dalam masyarakat. Dengan demikian, fenomena sosial dapat dijelaskan secara empiris.

b. Perencanaan Sosial
Perencanaan sosial merupakan kegiatan untuk mempersiapkan masa depan kehidupan masyarakat secara ilmiah. Perencanaan sosial bertujuan mengatasi kemungkinan terjadinya masalah sosial.

c. Pembangunan Sosial
Pembangunan menurut konsep Sosiologi merupakan proses peningkatan taraf hidup masyarakat berdasarkan realitas sosial atau kondisi masyarakat.

d. Pemecahan / Solusi Masalah Sosial
Masalah sosial merupakan fenomena sosial yang perlu dicari solusinya. Untuk mencari solusi tersebut diperlukan penelitian sosial. Dalam kegiatan penelitian sosial sosiolog mengamati perilaku masyarakat dan masalah sosial melalui pendekatan Sosiologi. Berdasarkan hasil penelitian, upaya mengatasi/solusi masalah sosial dapat ditemukan, selanjutnya diaplikasikan untuk mengatasi masalah sosial.`
      },
      {
        id: 'les_tka_1_h',
        course_id: 'course_tka_01',
        chapter_number: 1,
        chapter_title: 'UNIT 1: SOSIOLOGI SEBAGAI ILMU',
        title: 'H. Peran Ilmu Sosiologi',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 100,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          '1. Ahli Riset: Melakukan riset ilmiah & membuat laporan acuan pengambilan kebijakan.',
          '2. Konsultan Kebijakan: Meramal persoalan agar masalah sosial ditekan seminimal mungkin.',
          '3. Teknisi: Ilmuwan terapan mencari nilai/efektivitas suatu program masyarakat.',
          '4. Guru atau Pendidik: Menyumbangkan ilmu untuk penyelesaian masalah sehari-hari dan perkembangan ilmu.',
          '5. Pekerja Sosial: Membantu individu/kelompok menghadapi masalah keberfungsian sosial secara efektif.'
        ],
        text_body: `H. PERAN ILMU SOSIOLOGI

Menurut Horton dan Hunt, peran sosiolog di dalam masyarakat, antara lain:

1. Ahli Riset
Dalam hal ini, para sosiolog melakukan riset ilmiah dan membuat laporan ilmiah. Data yang diperoleh menjadi acuan dalam mengambil kebijakan tentang masalah sosial di masyarakat.

2. Konsultan Kebijakan
Kebijakan sosial merupakan suatu ramalan. Dengan kebijakan ini, suatu persoalan dapat diambil sebuah kebijakan dengan harapan masalah yang muncul dapat ditekan seminimal mungkin.

3. Teknisi
Dalam hal ini seorang sosiolog bekerja sebagai ilmuwan terapan, dimana mereka dapat menggunakan ilmunya dalam mencari nilai-nilai tertentu, seperti efektivitas suatu program dalam masyarakat.

4. Guru atau Pendidik
Dalam hal ini seorang sosiolog dapat menyumbangkan ilmunya di masyarakat agar dapat bermanfaat dalam penyelesaian persoalan sehari-hari dan juga bermanfaat untuk perkembangan ilmunya.

5. Pekerja Sosial
Dalam hal ini, sosiolog membantu individu atau kelompok dalam menghadapi masalah keberfungsian sosialnya secara efektif.`
      },
      {
        id: 'les_tka_1_i',
        course_id: 'course_tka_01',
        chapter_number: 1,
        chapter_title: 'UNIT 1: SOSIOLOGI SEBAGAI ILMU',
        title: 'I. Latihan Bab 1: Sosiologi Sebagai Ilmu (20 Soal)',
        content_type: 'text',
        duration: '30 Min',
        xp_reward: 150,
        completed: false,
        bookmarked: true,
        key_takeaways: [
          'Bagian 1 (Soal 1 - 5): Pilihan Ganda Biasa (PG 5 Opsi A-E).',
          'Bagian 2 (Soal 6 - 7): Pilihan Ganda Kompleks Kategori (Sesuai / Tidak Sesuai).',
          'Bagian 3 (Soal 8 - 20): Pilihan Ganda Kompleks Multi-Jawaban (MCMA).',
          'Kunci Jawaban & Pembahasan Lengkap terbuka setelah ujian disubmit.'
        ],
        text_body: `I. LATIHAN BAB 1: SOSIOLOGI SEBAGAI ILMU (20 SOAL CBT)

Sistem Latihan Bab 1 terintegrasi langsung dengan Engine Simulasi CBT (Computer Based Test) TKA Sosiologi.

ATURAN SIMULASI CBT:
1. Klik tombol "MULAI KERJAKAN SOAL DI SISTEM CBT" untuk masuk ke mode ujian interaktif.
2. Siswa akan mengerjakan 20 soal secara mandiri tanpa melihat kunci jawaban terlebih dahulu:
   - Bagian 1: Soal 1 - 5 (Pilihan Ganda Biasa Opsi A - E)
   - Bagian 2: Soal 6 - 7 (Pilihan Ganda Kompleks Kategori Sesuai / Tidak Sesuai)
   - Bagian 3: Soal 8 - 20 (Pilihan Ganda Kompleks Multi-Jawaban MCMA)
3. Setelah seluruh 20 soal dijawab dan dikumpulkan (submitted), skor nilai akhir, statistik akurasi, serta kunci jawaban & pembahasan rinci setiap soal akan terbuka secara otomatis.
4. Selamat mengerjakan dan semoga sukses!`
      }
    ]
  },
  {
    id: 'course_10',
    title: 'Sosiologi Kelas 10: Fondasi Sosiologi & Interaksi Sosial',
    description: 'Pelajari konsep dasar Sosiologi, fakta sosial Auguste Comte & Emile Durkheim, serta dinamika interaksi, nilai, dan norma masyarakat.',
    grade_level: 10,
    category: 'Konsep Dasar & Interaksi',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600',
    totalLessons: 4,
    completedLessons: 2,
    lessons: [
      {
        id: 'les_10_1',
        course_id: 'course_10',
        chapter_number: 1,
        chapter_title: 'Hakekat dan Objek Kajian Sosiologi',
        title: 'Sejarah Perkembangan Sosiologi & Tokoh Utama',
        content_type: 'video',
        youtube_id: 'L321K6G4dps',
        duration: '12 Min',
        xp_reward: 50,
        completed: true,
        bookmarked: false,
        key_takeaways: [
          'Auguste Comte memperkenalkan hukum tiga tahap pemikiran manusia: Teologis, Metafisis, dan Positivis.',
          'Emile Durkheim mendefinisikan Sosiologi sebagai ilmu yang mempelajari Fakta Sosial (cara bertindak, berpikir, dan merasa yang di luar individu).',
          'Sosiologi bersifat empiris, teoritis, kumulatif, dan non-etis.'
        ],
        text_body: `Sosiologi lahir pada abad ke-19 di Eropa sebagai respon terhadap Revolusi Industri di Inggris dan Revolusi Prancis. Auguste Comte dikenal sebagai 'Bapak Sosiologi' karena mencetuskan istilah Sociology dalam karyanya Cours de Philosophie Positive. 

Sosiologi memiliki empat ciri utama:
1. Empiris: Didasarkan pada observasi kenyataan dan akal sehat, bukan spekulasi.
2. Teoritis: Selalu berusaha menyusun abstraksi dari hasil observasi.
3. Kumulatif: Teori sosiologi dibentuk atas dasar teori-teori yang sudah ada sebelumnya.
4. Non-etis: Tidak menilai baik atau buruknya suatu fakta sosial, melainkan menjelaskan fakta tersebut secara analitis.`
      },
      {
        id: 'les_10_2',
        course_id: 'course_10',
        chapter_number: 1,
        chapter_title: 'Hakekat dan Objek Kajian Sosiologi',
        title: 'Fakta Sosial vs Tindakan Sosial (Durkheim vs Weber)',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: true,
        bookmarked: true,
        key_takeaways: [
          'Emile Durkheim menekankan pendekatan makro yaitu Fakta Sosial (Social Facts).',
          'Max Weber menekankan pendekatan mikro yaitu Tindakan Sosial (Social Action) yang memiliki makna subjektif.',
          '4 Tipe Tindakan Sosial Max Weber: Rasional Instrumental, Rasional Bernilai, Afektif, dan Tradisional.'
        ],
        text_body: `Perdebatan mendasar dalam metodologi Sosiologi dipelopori oleh Emile Durkheim dan Max Weber:

1. Fakta Sosial (Emile Durkheim)
Fakta sosial adalah struktur sosial serta norma-norma yang berada di luar individu (external) dan memiliki kekuatan memaksa (coercive) terhadap tindakan individu. Contohnya: hukum, norma kesopanan, aturan agama, dan adat istiadat.

2. Tindakan Sosial (Max Weber)
Menurut Weber, sosiologi adalah ilmu yang memahami tindakan sosial melalui pemahaman penafsiran (Verstehen). Tindakan sosial adalah tindakan individu yang diarahkan kepada orang lain dan mengandung makna subjektif.

Weber membagi tindakan sosial menjadi empat kategori:
- Tindakan Rasional Instrumental: Didasari pertimbangan rasional antara tujuan dan alat.
- Tindakan Rasional Bernilai: Mengutamakan nilai moral/etika tanpa terlalu memperhitungkan hasil akhir.
- Tindakan Afektif: Didorong oleh emosi atau perasaan spontan.
- Tindakan Tradisional: Didasarkan pada kebiasaan yang diwariskan turun-temurun.`
      },
      {
        id: 'les_10_3',
        course_id: 'course_10',
        chapter_number: 2,
        chapter_title: 'Interaksi Sosial dan Sosialisasi',
        title: 'Syarat dan Faktor Pendorong Interaksi Sosial',
        content_type: 'video',
        youtube_id: 'dQw4w9WgXcQ',
        duration: '18 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Syarat terjadinya interaksi sosial: Kontak Sosial (langsung/tidak langsung) dan Komunikasi.',
          'Faktor Pendorong: Imitasi, Sugesti, Identifikasi, Simpati, Empati, dan Motivasi.'
        ],
        text_body: `Interaksi sosial adalah hubungan timbal balik antara individu dengan individu, individu dengan kelompok, maupun kelompok dengan kelompok.

Dua syarat mutlak terjadinya interaksi sosial:
1. Kontak Sosial: Hubungan fisik atau simbolis. Terbagi menjadi Kontak Primer (tatap muka langsung) dan Kontak Sekunder (melalui perantara teknologi/orang lain).
2. Komunikasi: Pengiriman dan penerimaan pesan antara dua pihak sehingga terjadi saling pemahaman (meaning/makna).`
      },
      {
        id: 'les_10_4',
        course_id: 'course_10',
        chapter_number: 3,
        chapter_title: 'Nilai dan Norma Sosial',
        title: 'Tingkatan Norma Sosial dalam Masyarakat',
        content_type: 'text',
        duration: '10 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          '4 Tingkatan Norma menurut daya mengikatnya: Usage (Cara), Folkways (Kebiasaan), Mores (Tata Kelakuan), dan Custom (Adat Istiadat).'
        ],
        text_body: `Norma sosial adalah pedoman perilaku yang dibuat untuk mengatur kehidupan bersama. Berdasarkan tingkat sanksi atau daya mengikatnya:

1. Usage (Cara): Sanksinya sangat ringan, sekadar teguran/cemoohan (misal: menyendawa saat makan).
2. Folkways (Kebiasaan): Perbuatan berulang-ulang (misal: memberi salam pada orang tua).
3. Mores (Tata Kelakuan): Memiliki daya ikat kuat yang bersumber dari norma moral (misal: larangan mencuri).
4. Custom (Adat Istiadat): Norma yang mendarah daging dan integratif dalam tata cara adat bersanksi berat (misal: pengasingan adat).`
      }
    ]
  },
  {
    id: 'course_11',
    title: 'Sosiologi Kelas 11: Struktur, Partikularisme & Konflik Sosial',
    description: 'Menganalisis diferensiasi sosial, stratifikasi sosial, kelompok sosial, serta dinamika konflik dan integrasi sosial dalam masyarakat multikultural.',
    grade_level: 11,
    category: 'Struktur & Dinamika Kelompok',
    thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600',
    totalLessons: 3,
    completedLessons: 1,
    lessons: [
      {
        id: 'les_11_1',
        course_id: 'course_11',
        chapter_number: 1,
        chapter_title: 'Kelompok Sosial di Masyarakat',
        title: 'Paguyuban (Gemeinschaft) vs Patembayan (Gesellschaft)',
        content_type: 'text',
        duration: '14 Min',
        xp_reward: 60,
        completed: true,
        bookmarked: true,
        key_takeaways: [
          'Ferdinand Tönnies membagi kelompok sosial menjadi Gemeinschaft dan Gesellschaft.',
          'Gemeinschaft didasari ikatan batin yang murni, privat, dan alamiah (keluarga, ikatan darah, kerabat).',
          'Gesellschaft didasari ikatan rasional, kontraktual, dan orientasi keuntungan (kontrak kerja, perseroan).'
        ],
        text_body: `Ferdinand Tönnies mengklasifikasikan bentuk kehidupan bersama dalam masyarakat menjadi dua:

1. Gemeinschaft (Paguyuban)
Bentuk kehidupan bersama di mana anggotanya diikat oleh hubungan batin yang murni, bersifat alamiah, kekal, dan intim.
Terbagi 3 jenis:
- Gemeinschaft by blood (karena ikatan darah/kekerabatan)
- Gemeinschaft of place (karena kesamaan tempat tinggal/tetangga dekat)
- Gemeinschaft of mind (karena kesamaan ideologi/jiwa pemikiran)

2. Gesellschaft (Patembayan)
Bentuk kehidupan bersama yang bersifat pamrih, rasional, dan kontraktual jangka pendek. Contoh: hubungan antara pengusaha dan karyawan atau kontrak bisnis antarperusahaan.`
      },
      {
        id: 'les_11_2',
        course_id: 'course_11',
        chapter_number: 2,
        chapter_title: 'Diferensiasi & Stratifikasi Sosial',
        title: 'Bentuk & Dasar Stratifikasi Sosial (Pitirim Sorokin)',
        content_type: 'video',
        youtube_id: 'dQw4w9WgXcQ',
        duration: '16 Min',
        xp_reward: 60,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Diferensiasi bersifat horisontal (tanpa tingkatan kelas).',
          'Stratifikasi sosial bersifat vertikal (pembagian kelas atas, menengah, bawah).',
          'Dasar stratifikasi: Kekayaan, Kekuasaan, Kehormatan, dan Pendidikan.'
        ],
        text_body: `Pitirim A. Sorokin mendefinisikan stratifikasi sosial sebagai pembedaan penduduk atau masyarakat ke dalam kelas-kelas secara bertingkat (hierarkis).`
      },
      {
        id: 'les_11_3',
        course_id: 'course_11',
        chapter_number: 3,
        chapter_title: 'Konflik Sosial & Integrasi',
        title: 'Teori Konflik Ralf Dahrendorf & Lewis Coser',
        content_type: 'text',
        duration: '20 Min',
        xp_reward: 60,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Dahrendorf: Konflik bersumber dari distribusi kekuasaan dan otoritas yang tidak merata dalam Imperatively Coordinated Associations.',
          'Coser: Konflik memiliki fungsi positif sebagai alat mempererat integrasi in-group.'
        ],
        text_body: `Teori konflik memandang masyarakat selalu berada dalam proses perubahan yang ditandai oleh pertentangan kepentingan antar kelompok.`
      }
    ]
  },
  {
    id: 'course_12',
    title: 'Sosiologi Kelas 12: Perubahan Sosial, Globalisasi & Kearifan Lokal',
    description: 'Mengkaji teori perubahan sosial, modernisasi, dampak globalisasi, ketimpangan sosial ekonomi, dan strategi pemberdayaan komunitas lokal.',
    grade_level: 12,
    category: 'Perubahan Sosial & Globalisasi',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600',
    totalLessons: 3,
    completedLessons: 0,
    lessons: [
      {
        id: 'les_12_1',
        course_id: 'course_12',
        chapter_number: 1,
        chapter_title: 'Perubahan Sosial Masyarakat',
        title: 'Teori Siklus vs Teori Perkembangan (Evolusi & Revolusi)',
        content_type: 'video',
        youtube_id: 'L321K6G4dps',
        duration: '15 Min',
        xp_reward: 70,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Teori Siklus (Oswald Spengler, Arnold Toynbee): Perubahan sosial bagai roda berputar (lahir, berkembang, kejayaan, hancur).',
          'Teori Linier / Evolusi (Unilinear, Universal, Multilinear): Masyarakat berkembang menuju bentuk yang lebih modern secara berlanjut.'
        ],
        text_body: `Perubahan sosial meliputi perubahan dalam struktur, nilai, norma, dan pola perilaku masyarakat.`
      },
      {
        id: 'les_12_2',
        course_id: 'course_12',
        chapter_number: 2,
        chapter_title: 'Globalisasi & Ketimpangan',
        title: 'Dampak Neoliberalisme & Konsumerisme Budaya Modern',
        content_type: 'text',
        duration: '16 Min',
        xp_reward: 70,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Giddens: Globalisasi adalah intensifikasi hubungan sosial dunia yang menghubungkan tempat-tempat terpisah.',
          'Dampak negatif: Westernisasi, Anomi, Guncangan Budaya (Culture Shock), dan Ketimpangan Budaya (Culture Lag).'
        ],
        text_body: `William F. Ogburn mengemukakan konsep Culture Lag (ketimpangan budaya) ketika pertumbuhan unsur materiil lebih cepat dibandingkan unsur non-materiil (sikap/mentalitas).`
      },
      {
        id: 'les_12_3',
        course_id: 'course_12',
        chapter_number: 3,
        chapter_title: 'Kearifan Lokal & Pemberdayaan',
        title: 'Pemberdayaan Komunitas Berbasis Kearifan Lokal',
        content_type: 'text',
        duration: '14 Min',
        xp_reward: 70,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Kearifan lokal memuat gagasan, nilai, dan pandangan setempat yang bersifat bijaksana dan mendarah daging.',
          'Prinsip pemberdayaan: Partisipatif, Kesetaraan, dan Berkelanjutan.'
        ],
        text_body: `Pemberdayaan masyarakat bertujuan membangun kemandirian tanpa mengikis identitas kebudayaan asli.`
      }
    ]
  },
  ...TKA_COURSES_EXTRA,
  ...TKA_COURSES_EXTRA_2,
];

export const TKA_EXAMS_2025: Exam[] = [
  {
    id: 'exam_tka_2025_resmi',
    title: 'Tryout TKA Sosiologi SMA Tahun 2025 - 30 Soal Standar Nasional',
    grade_level: 12,
    category: 'Tryout TKA',
    duration_minutes: 45,
    total_questions: 30,
    description: 'Simulasi Resmi Ujian Tes Kemampuan Akademik (TKA) Sosiologi SMA/MA/SMK Tahun 2025. Mencakup 30 Indikator Soal standar nasional dengan 3 model soal resmi (Pilihan Ganda Biasa, Pilihan Ganda Kompleks/Benar-Salah, dan Soal Uji Kasus/Infografis/Grafik).',
    xp_reward: 400,
    passing_score: 75,
    questions: [
      {
        id: 'q_tka_2025_01',
        exam_id: 'exam_tka_2025_resmi',
        number: 1,
        question_type: 'pilihan_ganda',
        text: 'Dahulu, masyarakat desa hidup rukun dan saling membantu melalui kegiatan gotong royong, seperti membersihkan lingkungan bersama-sama. Namun, belakangan ini kegiatan tersebut mulai ditinggalkan. Banyak warga lebih memilih menyewa jasa kebersihan karena kesibukan pekerjaan masing-masing. Perubahan ini menimbulkan kekhawatiran di kalangan tokoh masyarakat karena dinilai dapat mengikis nilai kebersamaan yang menjadi ciri khas desa.\n\nApa makna perubahan perilaku masyarakat desa jika ditinjau dari sudut pandang sosiologi?',
        option_a: 'Perubahan gaya hidup karena meningkatnya pendapatan masyarakat desa.',
        option_b: 'Pergeseran sistem ekonomi dari komunal menuju individualisme.',
        option_c: 'Perubahan nilai sosial yang memengaruhi interaksi antarwarga.',
        option_d: 'Penurunan semangat kerja kolektif karena pengaruh globalisasi.',
        option_e: 'Kecenderungan masyarakat dalam menyesuaikan diri dengan tren modern.',
        correct_answer: 'C',
        topic: 'Ruang Lingkup & Ciri Sosiologi',
        explanation: 'Dari sudut pandang sosiologi, peralihan dari kegiatan gotong royong menuju penyewaan jasa kebersihan mencerminkan perubahan nilai sosial yang secara langsung memengaruhi pola interaksi sosial antarwarga desa.'
      },
      {
        id: 'q_tka_2025_02',
        exam_id: 'exam_tka_2025_resmi',
        number: 2,
        question_type: 'pilihan_ganda',
        text: 'Pandemi COVID-19 yang melanda dunia sejak awal tahun 2020 telah membawa perubahan dalam berbagai aspek kehidupan, termasuk cara kita berinteraksi dan menjaga hubungan sosial. Kebijakan jaga jarak atau physical distancing menjadi norma baru yang wajib dipatuhi, sementara aktivitas tatap muka, termasuk pembelajaran, beralih secara drastis menjadi daring.\n\nApa yang memungkinkan interaksi sosial tetap terjadi pada masa pandemi meskipun terdapat pembatasan tatap muka secara langsung?',
        option_a: 'Individu memahami teknologi informasi.',
        option_b: 'Komunikasi tetap terjalin melalui media daring.',
        option_c: 'Semua pihak mengikuti aturan dengan taat.',
        option_d: 'Lingkungan sekitar menyediakan jaringan internet.',
        option_e: 'Siswa dan guru menggunakan handphone.',
        correct_answer: 'B',
        topic: 'Syarat Interaksi Sosial',
        explanation: 'Dua syarat utama interaksi sosial adalah kontak sosial dan komunikasi. Walaupun kontak fisik langsung dibatasi, interaksi sosial tetap berlangsung karena komunikasi tetap terjalin melalui media daring.'
      },
      {
        id: 'q_tka_2025_03',
        exam_id: 'exam_tka_2025_resmi',
        number: 3,
        question_type: 'pilihan_ganda',
        text: 'Nasionalisme sebagai masyarakat yang lahir di Indonesia muncul pertama kali setelah Indische Partij terbentuk pada 1912. Partai ini melibatkan segala etnis, termasuk Eropa dan peranakan Indo. Kemudian peranakan Indo melebur dengan momentum nasionalisme berikutnya, Sumpah Pemuda 1928. Sumpah Pemuda menjadi ajang persatuan antara peranakan Tionghoa, Arab, dan Indo untuk jati dirinya sebagai orang Indonesia. Peristiwa ini mempertemukan kalangan tersebut untuk mengkampanyekan persatuan. Berangsur-angsur setelah Sumpah Pemuda, berdirilah partai berbasis etnis yang mendukung nasionalisme. Kemudian pergerakan secara etnik perlahan pun melebur dengan kelompok nasionalisme lainnya. Tanpa sekat, dan bermuara pada kemerdekaan Indonesia.\n\nMengapa sumpah pemuda pada kasus tersebut bisa dikategorikan sebagai simbol multikulturalisme?',
        option_a: 'Mencerminkan proses asimilasi nilai dan tujuan budaya-budaya yang berbeda demi menjaga identitas asli setiap etnik.',
        option_b: 'Mengakomodasi berbagai etnik dari latar belakang berbeda untuk mendukung penghapusan identitasnya menjadi Indonesia.',
        option_c: 'Terdapat dorongan untuk membangun partikularisme melalui partai-partai bernuansa etnik dalam meraih kemerdekaan.',
        option_d: 'Bersifat tidak eksklusif untuk satu kelompok etnik melainkan inklusif dan terbuka bagi semua etnik yang hidup di Indonesia.',
        option_e: 'Adanya bentuk tuntutan agar etnik yang bergabung turut serta menjadi bagian dari kelompok mayoritas.',
        correct_answer: 'D',
        topic: 'Masyarakat Multikultural',
        explanation: 'Sumpah Pemuda menjadi simbol multikulturalisme karena bersifat inklusif, merangkul dan terbuka bagi semua kelompok etnik tanpa sifat eksklusif atau dominasi etnik tertentu.'
      },
      {
        id: 'q_tka_2025_04',
        exam_id: 'exam_tka_2025_resmi',
        number: 4,
        question_type: 'pilihan_ganda',
        text: 'Di sebuah desa yang sedang berkembang, hidup dua kelompok masyarakat dengan latar belakang budaya dan kebiasaan yang berbeda, yaitu satu kelompok berasal dari penduduk asli desa dan kelompok lainnya berasal dari warga pendatang. Pada awalnya, hubungan antara kedua kelompok kerap diwarnai kesalahpahaman saat rapat desa, karena perbedaan cara pandang dan nilai-nilai budaya yang dianut. Kondisi ini menimbulkan ketegangan sosial yang menghambat pembangunan desa. Melihat hal ini, tokoh masyarakat menginisiasi kegiatan bersama seperti gotong royong, pelatihan kewirausahaan, dan dialog antarbudaya. Melalui proses ini, kedua kelompok mulai saling memahami, menghargai perbedaan, dan bekerja sama dalam pembangunan desa. Mereka juga sepakat untuk tetap mempertahankan budaya masing-masing, sambil merancang kegiatan budaya bersama yang melibatkan semua warga tanpa membedakan asal-usul.\n\nBerdasarkan ilustrasi tersebut, bentuk hubungan sosial apakah yang akhirnya terwujud di antara kedua kelompok masyarakat di atas?',
        option_a: 'Asimilasi, karena kedua kelompok membentuk budaya baru dengan menghilangkan perbedaan.',
        option_b: 'Kontravensi, karena terjadi perbedaan pandangan meskipun belum sampai pada konflik terbuka.',
        option_c: 'Koersi, karena kedua kelompok menyelesaikan konflik dengan dominasi kelompok yang lebih kuat.',
        option_d: 'Persaingan, karena masing-masing kelompok tetap mempertahankan identitas budaya secara tertutup.',
        option_e: 'Akomodasi, karena terdapat upaya meredakan ketegangan dengan kesepakatan bersama dan saling membantu.',
        correct_answer: 'E',
        topic: 'Akomodasi & Hubungan Sosial',
        explanation: 'Proses meredakan ketegangan sosial melalui dialog, kegiatan bersama, dan kesepakatan saling menghormati budaya masing-masing dinamakan akomodasi sosial.'
      },
      {
        id: 'q_tka_2025_05',
        exam_id: 'exam_tka_2025_resmi',
        number: 5,
        question_type: 'kompleks',
        text: 'Di salah satu kota besar, warga merasa resah karena sering terjadi penyerangan oleh sekelompok remaja bermotor. Para pelaku membawa senjata tajam. Aksi kekerasan ini umumnya berlangsung pada malam hari, terutama di kawasan Simpang Tiga, jalur utama yang sering dilalui warga ketika malam. Pihak kepolisian menyatakan bahwa insiden ini bukan yang pertama kali terjadi. Dalam dua bulan terakhir, telah terjadi lima kasus serupa dengan pola yang sama yaitu dilakukan oleh remaja dan menyasar warga yang sedang sendirian.\n\nMengapa peristiwa yang terjadi dalam ilustrasi tersebut dianggap sebagai gejala sosial?\n\n(1) Kasus tersebut merupakan gejala sosial dengan dampak keresahan dan menimbulkan ketakutan di masyarakat (BENAR).\n(2) Kasus ini termasuk gejala sosial akibat adanya penyimpangan perilaku dari norma sosial yang berlaku di masyarakat (BENAR).\n(3) Aksi kekerasan dalam kasus ini terjadi secara individu dan tidak berulang sama sekali sehingga bukan gejala sosial (SALAH).',
        option_a: '(1) dan (2) Benar',
        option_b: '(1) dan (3) Benar',
        option_c: '(2) dan (3) Benar',
        option_d: 'Semua Pernyataan Benar',
        option_e: 'Semua Pernyataan Salah',
        correct_answer: 'A',
        topic: 'Gejala Sosial & Penyimpangan',
        explanation: 'Peristiwa tersebut dianggap gejala sosial karena menimbulkan dampak keresahan kolektif di masyarakat, terjadi secara berulang (5 kasus), dan bersumber dari penyimpangan norma.'
      },
      {
        id: 'q_tka_2025_06',
        exam_id: 'exam_tka_2025_resmi',
        number: 6,
        question_type: 'pilihan_ganda',
        text: 'Pemerintah desa membiarkan para penduduk melakukan urbanisasi. Berdasarkan infografis, perdesaan memiliki potensi utama sebagai "Pusat Pemeliharaan Keanekaragaman Hayati", "Penghasil Utama Pasokan Pangan", dan "Pengurangan Dampak Lingkungan". Jika urbanisasi terus terjadi tanpa terkendali, apa dampak negatif gejala sosial yang paling relevan berdasarkan kasus pada infografis?',
        option_a: 'Pengangguran di wilayah pedesaan akan terus meningkat karena lapangan kerja semakin sempit.',
        option_b: 'Sumber-sumber hayati akan rusak karena pencemaran lingkungan akibat pembangunan yang masif.',
        option_c: 'Kerusakan lingkungan di pedesaan akibat alih fungsi lahan terjadi karena industrialisasi semakin pesat.',
        option_d: 'Kenaikan harga terjadi seiring penurunan pasokan pangan karena banyak lahan yang tidak tergarap.',
        option_e: 'Pemanasan global terus meningkat karena polusi udara di perkotaan tidak diimbangi dengan penghijauan.',
        correct_answer: 'D',
        topic: 'Urbanisasi & Dampak Pasokan Pangan',
        explanation: 'Desa merupakan penghasil utama pasokan pangan. Apabila terjadi urbanisasi besar-besaran, lahan di desa menjadi tidak tergarap, produksi pangan menurun, sehingga berdampak pada kenaikan harga bahan pangan.'
      },
      {
        id: 'q_tka_2025_07',
        exam_id: 'exam_tka_2025_resmi',
        number: 7,
        question_type: 'kompleks',
        text: 'Sebuah penelitian kualitatif bertujuan menelaah fenomena pentingnya keterlibatan perempuan dalam partai politik, parlemen, dan lembaga yudikatif guna memperjuangkan kebijakan berbasis kesetaraan gender.\n\nManakah pernyataan yang menunjukkan tujuan penelitian kualitatif studi kasus dari permasalahan tersebut? (Jawaban Benar lebih dari satu):\n(1) Untuk mengidentifikasi kesempatan dan peran yang dapat diambil perempuan dalam aktivitas politik di partai.\n(2) Untuk memahami kontribusi spesifik perempuan terhadap dinamika dan keputusan politik di dalam partai.\n(3) Untuk mengetahui sejauh mana kesetaraan gender terwujud dalam struktur dan praktik partai politik.',
        option_a: '(1), (2), dan (3) Benar',
        option_b: '(1) dan (2) Benar',
        option_c: '(2) dan (3) Benar',
        option_d: 'Hanya (1) Benar',
        option_e: 'Semua Pernyataan Salah',
        correct_answer: 'A',
        topic: 'Tujuan Penelitian Kualitatif Studi Kasus',
        explanation: 'Tujuan penelitian kualitatif studi kasus mencakup identifikasi peran, pemahaman kontribusi spesifik, serta pengukuran wujud kesetaraan gender dalam struktur partai.'
      },
      {
        id: 'q_tka_2025_08',
        exam_id: 'exam_tka_2025_resmi',
        number: 8,
        question_type: 'pilihan_ganda',
        text: 'Berikut merupakan langkah-langkah penelitian sosial yang akan dilakukan peneliti:\n(1) Mengumpulkan data melalui wawancara, observasi, dan dokumentasi.\n(2) Menentukan landasan teori dan konsep yang relevan.\n(3) Mengolah dan menganalisis data hasil penelitian.\n(4) Menyusun latar belakang penelitian berdasarkan data resmi.\n(5) Menarik kesimpulan dan memberikan rekomendasi kebijakan.\n\nManakah urutan langkah-langkah penelitian yang termasuk tahapan pelaksanaan penelitian sosial?',
        option_a: 'Mengumpulkan data melalui wawancara, observasi, dan dokumentasi dan Menentukan landasan teori dan konsep yang relevan.',
        option_b: 'Mengumpulkan data melalui wawancara, observasi, dan dokumentasi dan Mengolah dan menganalisis data hasil penelitian.',
        option_c: 'Mengumpulkan data melalui wawancara, observasi, dan dokumentasi dan Menarik kesimpulan dan memberikan rekomendasi kebijakan.',
        option_d: 'Menentukan landasan teori dan konsep yang relevan dan Menyusun latar belakang penelitian berdasarkan data resmi.',
        option_e: 'Menyusun latar belakang penelitian berdasarkan data resmi dan Menarik kesimpulan dan memberikan rekomendasi kebijakan.',
        correct_answer: 'B',
        topic: 'Tahapan Pelaksanaan Penelitian Sosial',
        explanation: 'Tahap pelaksanaan penelitian sosial (fieldwork) meliputi pengumpulan data di lapangan (wawancara, observasi, dokumentasi) dan pengolahan serta analisis data hasil penelitian.'
      },
      {
        id: 'q_tka_2025_09',
        exam_id: 'exam_tka_2025_resmi',
        number: 9,
        question_type: 'pilihan_ganda',
        text: 'Penggunaan media sosial yang sangat banyak digemari oleh remaja menimbulkan kekhawatiran dapat mempengaruhi perilaku dan moral mereka. Kenakalan remaja yang makin rumit sering dihubungkan dengan interaksi mereka dengan konten online tertentu. Seorang peneliti melakukan penelitian pada remaja usia 13-18 tahun yang sering memakai media sosial dengan menyebarkan kuesioner online kepada 150 remaja untuk mengukur frekuensi penggunaan media sosial dan tingkat kenakalan remaja.\n\nManakah pernyataan yang menunjukkan metode penelitian yang sesuai dengan teknik pengumpulan data yang dilakukan?',
        option_a: 'Penelitian eksperimen dengan teknik penentuan sampel stratified sampling karena penelitian ini membandingkan pada kelompok pengguna media sosial maupun yang tidak.',
        option_b: 'Penelitian eksploratif dengan teknik penentuan sampel cluster sampling berdasarkan wilayah untuk mengeksplorasi fenomena penggunaan media sosial.',
        option_c: 'Penelitian kuantitafif dengan teknik penentuan sampel simple random sampling berdasarkan rentang usia yang diambil secara acak untuk menganalisis pengaruh penggunaan media sosial terhadap tingkat kenakalan remaja.',
        option_d: 'Penelitian lapangan dengan teknik penentuan sampel area sampling berdasarkan area tertentu untuk mengobservasi fenomena penggunaan media sosial.',
        option_e: 'Penelitian kualitatif dengan teknik penentuan sampel purposive sampling dengan menentukan kriteria tertentu untuk memahami dampak kenakalan.',
        correct_answer: 'C',
        topic: 'Metode Penelitian Kuantitatif & Sampling',
        explanation: 'Penggunaan angket/kuesioner terukur pada 150 responden acak berbasis usia untuk menguji hubungan variabel termasuk penelitian kuantitatif dengan simple random sampling.'
      },
      {
        id: 'q_tka_2025_10',
        exam_id: 'exam_tka_2025_resmi',
        number: 10,
        question_type: 'kompleks',
        text: 'Penelitian sosial bertujuan menelaah secara komprehensif fenomena meningkatnya jumlah pengemis anak di ruang publik. Fokus utama diarahkan pada identifikasi faktor penyebab anak berada di jalanan, kemiskinan, keterbatasan pendidikan, dan eksploitasi.\n\nPernyataan manakah yang menggambarkan kontribusi penelitian sosial dalam menyelesaikan permasalahan sosial tersebut?\n(1) Menambah wawasan tentang dampak fisik, psikologis maupun sosial yang dialami oleh pengemis di bawah umur.\n(2) Memberikan solusi atau saran kepada pemerintah untuk dapat dijadikan sebagai dasar pengambilan kebijakan.\n(3) Menjadi referensi utama bagi peneliti selanjutnya dan memberikan manfaat bagi para pembaca.',
        option_a: '(1), (2), dan (3) Benar',
        option_b: '(1) dan (2) Benar',
        option_c: '(2) dan (3) Benar',
        option_d: 'Hanya (2) Benar',
        option_e: 'Semua Pernyataan Salah',
        correct_answer: 'A',
        topic: 'Manfaat Penelitian Sosial',
        explanation: 'Kontribusi penelitian sosial meliputi penyediaan wawasan komprehensif, penyampaian masukan kebijakan praktis bagi pemerintah, serta menjadi referensi akademik berkelanjutan.'
      },
      {
        id: 'q_tka_2025_11',
        exam_id: 'exam_tka_2025_resmi',
        number: 11,
        question_type: 'pilihan_ganda',
        text: 'Perhatikan data hasil penelitian mengenai "Tingkat Partisipasi Komunitas dalam Kegiatan Lingkungan per Jenis Kegiatan":\n- Daur Ulang Sampah: 50 orang\n- Penanaman Pohon: 80 orang\n- Bersih Sungai: 120 orang\n\nBerdasarkan grafik hasil penelitian di atas, penjelasan manakah yang paling tepat mengenai pola partisipasi komunitas dalam kegiatan lingkungan?',
        option_a: 'Semua jenis kegiatan lingkungan memiliki tingkat partisipasi yang seragam dan tinggi.',
        option_b: 'Kegiatan bersih sungai adalah yang paling populer dan menarik partisipasi komunitas terbanyak.',
        option_c: 'Masyarakat cenderung tidak tertarik pada kegiatan lingkungan yang bersifat fisik seperti penanaman pohon.',
        option_d: 'Daur ulang sampah merupakan kegiatan yang paling sukses dalam menarik jumlah peserta terbanyak.',
        option_e: 'Tidak ada perbedaan yang signifikan antara partisipasi dalam penanaman pohon dan daur ulang sampah.',
        correct_answer: 'B',
        topic: 'Interpretasi Data Penelitian',
        explanation: 'Grafik menunjukkan batang partisipasi terbanyak ditempati oleh kegiatan Bersih Sungai (120 orang), sehingga kegiatan bersih sungai merupakan yang paling populer.'
      },
      {
        id: 'q_tka_2025_12',
        exam_id: 'exam_tka_2025_resmi',
        number: 12,
        question_type: 'pilihan_ganda',
        text: 'Di sebuah sekolah, sekelompok siswa membentuk komunitas bernama "Green Youth Club" yang fokus pada isu lingkungan. Mereka memulai dengan saling berbagi informasi tentang daur ulang dan pengelolaan sampah organik, lalu rutin melakukan kegiatan seperti membersihkan taman sekolah, membuat kompos, dan menyosialisasikan gaya hidup ramah lingkungan. Anggota komunitas ini berasal dari berbagai kelas dan latar belakang, namun mereka merasa memiliki tujuan bersama dan saling mendukung dalam kegiatan yang dijalankan.\n\nJika dikaji dari konsep kelompok sosial, bagaimana proses terbentuknya komunitas Green Youth Club tersebut?',
        option_a: 'Komunitas terbentuk secara spontan tanpa adanya kesamaan visi dan nilai.',
        option_b: '"Green Youth Club" termasuk kelompok semu karena hanya berkumpul sesekali.',
        option_c: 'Kelompok tersebut terbentuk karena interaksi sosial yang berkelanjutan dan tujuan bersama.',
        option_d: 'Komunitas itu dibentuk secara paksa oleh sekolah sehingga tidak mencerminkan kelompok sosial.',
        option_e: 'Kelompok ini bukan kelompok sosial karena anggotanya berasal dari kelas yang berbeda.',
        correct_answer: 'C',
        topic: 'Proses Pembentukan Kelompok Sosial',
        explanation: 'Kelompok sosial terbentuk atas dasar interaksi sosial yang teratur dan berkelanjutan serta adanya kesadaran akan kesamaan tujuan bersama.'
      },
      {
        id: 'q_tka_2025_13',
        exam_id: 'exam_tka_2025_resmi',
        number: 13,
        question_type: 'pilihan_ganda',
        text: 'Perhatikan tabel hasil penelitian kualitatif mengenai "Tabel Persepsi, hambatan, dan harapan publik mengenai pelayanan pemerintah" yang mengelompokkan data berdasarkan Tema Utama, Subtema, dan Kutipan Informan (Informan 1, Informan 3, Informan 4, dst).\n\nBagaimana langkah-langkah penelitian yang tepat agar peneliti bisa menghasilkan sajian data tersebut?',
        option_a: 'Peneliti membuat panduan wawancara yang diturunkan dari rumusan masalah penelitian, lalu melakukan pengumpulan data, mengecek kelengkapan jawaban, mengidentifikasi hasil jawaban, lalu mengelompokkannya dalam kategori yang sama.',
        option_b: 'Peneliti membuat daftar pertanyaan tertutup, mengujicobakannya dalam kelompok kecil, mengecek kelengkapan jawaban, lalu menyimpulkan jawaban setiap responden.',
        option_c: 'Peneliti membuat kuesioner dengan jenis pertanyaan campuran, lalu melakukan pengumpulan data, mengecek kelengkapan jawaban, mengklasifikasi jawaban setiap responden.',
        option_d: 'Peneliti merumuskan pertanyaan-pertanyaan pokok dari judul penelitian, lalu membuat panduan wawancara, melakukan uji coba terbatas, melakukan pengumpulan data, lalu penyajian data.',
        option_e: 'Peneliti merumuskan indikator dari variabel, lalu menurunkan indikator menjadi butir pertanyaan, melakukan uji coba terbatas, melakukan pengumpulan data, lalu penyajian data.',
        correct_answer: 'A',
        topic: 'Langkah Penelitian Kualitatif & Koding Data',
        explanation: 'Sajian data kualitatif berwujud koding tematik dibuat melalui penyusunan panduan wawancara, pengumpulan data informan, dilanjutkan reduksi data dan kategorisasi data.'
      },
      {
        id: 'q_tka_2025_14',
        exam_id: 'exam_tka_2025_resmi',
        number: 14,
        question_type: 'pilihan_ganda',
        text: 'Di beberapa kota di Indonesia mulai banyak terjadi konflik antara kelompok pedagang pasar tradisional dan pengelola pusat perbelanjaan modern/mal yang baru dibangun. Para pedagang pasar tradisional merasa dirugikan karena kehadiran mal tersebut mengakibatkan turunnya jumlah pembeli di pasar tradisional. Mereka menganggap bahwa pembangunan pusat perbelanjaan tidak memperhatikan keberlangsungan ekonomi masyarakat kecil. Sementara itu, pihak pengelola mal merasa bahwa pembangunan tersebut sah dan merupakan bentuk kemajuan ekonomi kota. Ketegangan makin meningkat setelah terjadi aksi demonstrasi yang diwarnai kericuhan.\n\nApa bentuk konflik sosial yang terjadi berdasarkan ilustrasi tersebut?',
        option_a: 'Konflik antar kelas sosial karena terjadi benturan antara pedagang tradisional dan pedagang di mal.',
        option_b: 'Konflik antarkelompok kepentingan karena adanya perbedaan kepentingan ekonomi yang berbeda.',
        option_c: 'Konflik politik antar institusi dalam hal ini kelompok pedagang di mal ingin mengalahkan pedagang pasar tradisional.',
        option_d: 'Konflik budaya akibat perubahan nilai dimana pedagang pasar tradisional kehilangan pelanggan sejak adanya mal.',
        option_e: 'Konflik antarpribadi karena perbedaan individu yang terjadi diantara para pedagang tradisional kepada pedagang di mal.',
        correct_answer: 'B',
        topic: 'Bentuk Konflik Sosial',
        explanation: 'Konflik ini tergolong konflik antarkelompok kepentingan (interest group conflict) karena didorong perbedaan kepentingan ekonomi antara pedagang kecil dan pengembang perbelanjaan modern.'
      },
      {
        id: 'q_tka_2025_15',
        exam_id: 'exam_tka_2025_resmi',
        number: 15,
        question_type: 'pilihan_ganda',
        text: 'Pada suatu daerah terjadi ketegangan antara komunitas adat dengan perusahaan perkebunan sawit. Konflik ini bermula dari klaim terhadap hak kepemilikan lahan. Perusahaan berpegang pada izin yang mereka miliki, sementara komunitas adat merasa terabaikan. Konflik ini mengakibatkan terjadinya bentrokan fisik dan pemblokiran jalan oleh warga. Mediasi awal gagal total dan situasi berada pada titik kritis.\n\nBagaimana strategi yang tepat untuk mencapai kedamaian yang berkelanjutan antara komunitas adat dan perusahaan perkebunan?',
        option_a: 'Memulai kembali negosiasi antara manajemen perusahaan dan perwakilan komunitas adat tanpa melibatkan campur tangan pihak ketiga yang netral.',
        option_b: 'Melakukan dialog multi-pihak yang melibatkan pemerintah, akademisi, dan organisasi non pemerintah untuk membangun pemahaman bersama.',
        option_c: 'Melakukan arbitrase dengan menunjuk pihak ketiga yang independen dan memiliki kewenangan untuk membuat keputusan mengikat secara hukum.',
        option_d: 'Mengembangkan program kemitraan usaha bersama antara kedua belah pihak dengan sistem pembagian keuntungan yang di bagi secara adil.',
        option_e: 'Membentuk forum musyawarah desa yang difasilitasi oleh tokoh masyarakat setempat untuk mencari solusi terbaik yang berbasis kearifan lokal.',
        correct_answer: 'B',
        topic: 'Penanganan Konflik Sosial',
        explanation: 'Strategi penanganan konflik sengketa lahan yang berkelanjutan memerlukan dialog multi-pihak (multi-stakeholder dialogue) yang menyertakan pemerintah, akademisi, dan LSM independen.'
      },
      {
        id: 'q_tka_2025_16',
        exam_id: 'exam_tka_2025_resmi',
        number: 16,
        question_type: 'pilihan_ganda',
        text: 'Di Desa Tanjung Harapan, sebuah perusahaan tambang mulai beroperasi setelah mendapatkan izin dari pemerintah daerah. Perusahaan tersebut membuka lahan secara besar-besaran, termasuk wilayah hutan adat yang selama ini dikelola secara turun-temurun oleh masyarakat lokal. Masyarakat adat menolak keberadaan tambang karena merasa tidak dilibatkan dalam proses perizinan dan khawatir kehilangan sumber penghidupan. Dalam beberapa bulan terakhir, terjadi aksi protes yang berujung pada bentrokan antara warga dan aparat keamanan.\n\nBerdasarkan ilustrasi tersebut, apa penyebab utama terjadinya konflik sosial di Desa Tanjung Harapan?',
        option_a: 'Pemerintah daerah tidak mampu mengelola hasil tambang dengan baik.',
        option_b: 'Perusahaan tidak memberikan pelatihan kerja kepada masyarakat sekitar.',
        option_c: 'Masyarakat adat tidak memiliki pengetahuan tentang kegiatan pertambangan modern.',
        option_d: 'Kurangnya komunikasi dan partisipasi masyarakat dalam proses pengambilan keputusan.',
        option_e: 'Terjadi benturan kepentingan antara perusahaan dan hak masyarakat adat atas lahan.',
        correct_answer: 'E',
        topic: 'Penyebab Konflik Sosial',
        explanation: 'Penyebab utama konflik sosial adalah benturan kepentingan langsung antara eksploitasi lahan oleh perusahaan dan hak ulayat/adat masyarakat atas sumber penghidupan.'
      },
      {
        id: 'q_tka_2025_17',
        exam_id: 'exam_tka_2025_resmi',
        number: 17,
        question_type: 'pilihan_ganda',
        text: 'Konflik mulai terjadi ketika proyek pabrik yang didukung pemerintah lokal mulai dibangun di tanah yang secara tradisional menghidupi petani lokal. Petani mengatakan bahwa mereka tidak diberi informasi dan mengkhawatirkan nasib mereka akibat hilangnya mata pencaharian. Protes petani akhirnya viral di media sosial dan akhirnya mendapatkan perhatian dari pemerintah. Pemerintah lokal mengundang pihak petani dan pabrik untuk duduk bersama berdialog dengan fasilitasi tim perdamaian. Kesepakatan akhirnya terwujud dalam bentuk kompensasi, dibangunnya zona penyangga pertanian dan dilibatkannya warga (petani) dalam pengawasan proyek.\n\nBerdasarkan ilustrasi tersebut, apa cara yang paling efektif untuk meredakan konflik dan menciptakan harmoni sosial?',
        option_a: 'Memindahkan lahan pertanian ke lokasi lain tanpa perundingan.',
        option_b: 'Melakukan dialog untuk menciptakan kesepakatan yang inklusif.',
        option_c: 'Menawarkan bagi hasil saham kepada petani tanpa jaminan tanah.',
        option_d: 'Menekan protes dengan melakukan mobilisasi aparat keamanan.',
        option_e: 'Melanjutkan konstruksi tanpa mempertimbangkan keberatan warga.',
        correct_answer: 'B',
        topic: 'Akomodasi & Harmoni Sosial',
        explanation: 'Melakukan dialog musyawarah untuk menciptakan kesepakatan inklusif merupakan jalan paling efektif meredakan konflik dan mewujudkan integrasi sosial.'
      },
      {
        id: 'q_tka_2025_18',
        exam_id: 'exam_tka_2025_resmi',
        number: 18,
        question_type: 'pilihan_ganda',
        text: 'Perhatikan infografis "JENIS-JENIS KELOMPOK SOSIAL DI SEKITAR KITA":\n1. Kelompok Primer: Hubungan dekat dan bersifat personal (seperti keluarga atau sahabat).\n2. Kelompok Sekunder: Interaksi lebih formal dan berorientasi pada tujuan tertentu (seperti organisasi sekolah).\n3. Kelompok Formal: Memiliki struktur, aturan, dan keanggotaan resmi (Pramuka).\n4. Kelompok Informal: Terbentuk secara spontan tanpa aturan resmi (teman bermain).\n\nManakah pernyataan yang paling tepat menunjukkan perbedaan kelompok sosial pada infografis tersebut?',
        option_a: 'Keluarga menunjukkan kelompok informal yang terbentuk secara spontan dan alami dari interaksi sosial yang terjadi karena adanya kesamaan minat, hobi, atau tujuan.',
        option_b: 'Kelompok belajar menunjukkan kelompok primer yang ditandai oleh adanya hubungan yang sangat erat, personal, intim, dan interaksi tatap muka yang sering.',
        option_c: 'Organisasi pramuka menunjukkan kelompok primer yang ditandai dengan adanya hubungan yang sangat erat, personal, intim, dan interaksi tatap muka yang sering.',
        option_d: 'Teman bermain menunjukkan kelompok formal yang dibentuk secara sengaja dan terencana dengan tujuan serta struktur yang jelas dan memiliki aturan yang tertulis.',
        option_e: 'Organisasi OSIS menunjukkan kelompok sekunder yang dicirikan oleh hubungan yang lebih formal, impersonal, dan berdasarkan tujuan atau kepentingan tertentu.',
        correct_answer: 'E',
        topic: 'Kategori Kelompok Sosial',
        explanation: 'OSIS merupakan bentuk kelompok sekunder dan formal yang memiliki hubungan impersonal, berstruktur tertulis, dan berorientasi pada tujuan tertentu.'
      },
      {
        id: 'q_tka_2025_19',
        exam_id: 'exam_tka_2025_resmi',
        number: 19,
        question_type: 'pilihan_ganda',
        text: 'Di Kelurahan Maju Jaya, warga terdiri dari beragam kelompok sosial seperti penduduk asli, pendatang dari kota, serta etnis minoritas. Dalam kegiatan pembangunan balai warga, kelompok penduduk asli selalu diundang dalam rapat musyawarah, sementara kelompok lain jarang dilibatkan. Kelompok pendatang dan etnis minoritas juga kesulitan memperoleh informasi tentang kegiatan warga karena akses informasi hanya beredar di lingkaran tertentu. Akibatnya, kelompok yang tidak terlibat merasa tersisih dan mulai muncul perasaan tidak dihargai. Ketegangan mulai terlihat ketika beberapa warga menyuarakan ketidakpuasan dalam forum daring lokal.\n\nManakah pernyataan yang menjadi pemicu awal terjadinya ketegangan antara kelompok pendatang dan etnis minoritas?',
        option_a: 'Ketidakadilan dalam pengambilan keputusan musyawarah membentuk jarak sosial antar kelompok dan menurunkan rasa dihargai.',
        option_b: 'Kesenjangan dalam akses informasi memperkuat stigma sosial dan mendorong eksklusi kelompok minoritas.',
        option_c: 'Dominasi kelompok mayoritas memperlemah solidaritas sosial dan merenggangkan relasi antar kelompok masyarakat.',
        option_d: 'Ketimpangan dalam hak partisipasi membentuk jurang sosial, menurunkan rasa saling percaya antar kelompok.',
        option_e: 'Ketidaksetaraan dalam pembagian peran memperkuat stratifikasi sosial dan menghambat mobilitas kelompok.',
        correct_answer: 'D',
        topic: 'Ketidaksetaraan & Eksklusi Sosial',
        explanation: 'Pemicu awal ketegangan sosial adalah adanya ketimpangan hak partisipasi publik yang menimbulkan distrik/jurang sosial dan menurunkan tingkat kepercayaan antarwarga.'
      },
      {
        id: 'q_tka_2025_20',
        exam_id: 'exam_tka_2025_resmi',
        number: 20,
        question_type: 'pilihan_ganda',
        text: 'Sebuah studi di Kota Bahari menunjukkan bahwa ketimpangan pendapatan antara kelompok kaya dan miskin semakin lebar dalam 10 tahun terakhir. Akses terhadap fasilitas pendidikan, kesehatan, dan pekerjaan berkualitas lebih mudah diperoleh oleh kelompok masyarakat atas. Sementara itu, masyarakat miskin harus bergantung pada layanan publik yang terbatas dan sering kali berkualitas rendah. Ketidakpuasan mulai muncul di media sosial dan ruang publik. Beberapa kelompok masyarakat melakukan aksi protes untuk menuntut keadilan sosial.\n\nApakah dampak sosial yang mungkin terjadi akibat adanya ketidakpuasan masyarakat miskin terhadap layanan publik?',
        option_a: 'Menimbulkan aksi protes masyarakat miskin untuk menyuarakan pendapat.',
        option_b: 'Menimbulkan kerentanan kelompok miskin akibat terbatasnya akses terhadap fasilitas publik.',
        option_c: 'Menimbulkan ketidaksetaraan yang membuat kelompok miskin semakin terhambat dan merasa tidak adil.',
        option_d: 'Menimbulkan rendahnya partisipasi masyarakat miskin dalam proses pengambilan keputusan publik.',
        option_e: 'Menimbulkan kebijakan pemerintah yang diarahkan untuk memperbaiki layanan publik di wilayah miskin.',
        correct_answer: 'A',
        topic: 'Ketimpangan Pendapatan & Layanan Publik',
        explanation: 'Akibat langsung dari akumulasi ketidakpuasan kelompok miskin terhadap ketimpangan fasilitas publik adalah munculnya aksi protes massa untuk menuntut keadilan.'
      },
      {
        id: 'q_tka_2025_21',
        exam_id: 'exam_tka_2025_resmi',
        number: 21,
        question_type: 'pilihan_ganda',
        text: 'Pemerintah Kota Madani membuka program beasiswa bagi pelajar SMA yang berasal dari keluarga kurang mampu. Program ini tidak hanya berdasarkan nilai akademik, tetapi juga mempertimbangkan latar belakang ekonomi dan akses pendidikan siswa. Selain itu, fasilitas transportasi gratis diberikan khusus bagi siswa dari daerah terpencil untuk memudahkan mereka bersekolah.\n\nBerdasarkan ilustrasi di atas, bagaimana prinsip kesetaraan sosial diterapkan dalam pelayanan publik?',
        option_a: 'Kesetaraan kesempatan, karena siswa diberi peluang yang setara untuk maju.',
        option_b: 'Kesetaraan budaya, karena pemerintah menghormati adat dan kebiasaan lokal.',
        option_c: 'Kesetaraan ekonomi, karena pemerintah memberikan bantuan kepada semua warga.',
        option_d: 'Kesetaraan hukum, karena semua siswa diperlakukan sama tanpa melihat latar belakang.',
        option_e: 'Kesetaraan politik, karena semua siswa mendapat hak suara dalam menentukan program.',
        correct_answer: 'A',
        topic: 'Prinsip Kesetaraan Sosial',
        explanation: 'Prinsip kesetaraan kesempatan (equality of opportunity) diwujudkan dengan memberikan jaminan akses khusus bagi siswa kurang mampu agar memiliki peluang yang setara dalam pendidikan.'
      },
      {
        id: 'q_tka_2025_22',
        exam_id: 'exam_tka_2025_resmi',
        number: 22,
        question_type: 'pilihan_ganda',
        text: 'Di sebuah kawasan pinggiran perkotaan yang padat penduduk, banyak keluarga hidup tanpa memiliki akses ke air bersih, sanitasi dan jaringan listrik yang stabil. Di kawasan ini banyak orang tua yang bekerja di sektor informal dengan pendapatan tidak teratur. Anak-anak di daerah ini sering putus sekolah karena mendukung ekonomi orang tuanya. Penduduknya merasa terasing dari perkembangan kota dan tidak banyak menerima dukungan dari program pemerintah. Hal ini menunjukkan adanya ketimpangan sosial dan hal tersebut pada akhirnya berkontribusi pada meningkatnya kemiskinan.\n\nMengapa ketimpangan sosial dapat meningkatkan angka kemiskinan pada masyarakat perkotaan pada kasus tersebut?',
        option_a: 'Tradisi budaya yang memprioritaskan pendidikan formal daripada informal, sehingga mengabaikan keterampilan hidup yang relevan dengan kondisi masyarakat.',
        option_b: 'Penolakan kelompok marginal untuk direlokasi ke lingkungan yang lebih sehat, yang menyebabkan mereka tetap tinggal di wilayah tanpa akses layanan dasar.',
        option_c: 'Kurangnya motivasi warga untuk memperbaiki kehidupan mereka sendiri karena tidak adanya bentuk pengangguran yang nyata di wilayah masyarakat berada.',
        option_d: 'Akses yang tidak merata terhadap layanan dasar dan ketidakberpihakan kebijakan yang menyebabkan warga terpinggirkan dan tidak mendapat layanan memadai.',
        option_e: 'Perencanaan keuangan buruk dan tingkat konsumsi yang tidak berimbang menyebabkan pendapatan dari sektor informal sulit mencukupi kebutuhan dasar.',
        correct_answer: 'D',
        topic: 'Ketimpangan & Kemiskinan Struktural Perkotaan',
        explanation: 'Ketimpangan sosial memicu kemiskinan karena diskriminasi atau ketidakmerataan akses ke infrastruktur dasar (air, sanitasi, listrik) dan kebijakan publik yang kurang berpihak.'
      },
      {
        id: 'q_tka_2025_23',
        exam_id: 'exam_tka_2025_resmi',
        number: 23,
        question_type: 'pilihan_ganda',
        text: 'Globalisasi mendorong pertumbuhan ekonomi di negara-negara berkembang terutama di sektor industri dan jasa. Namun, pembangunan seringkali tidak merata dan terpusat di kota-kota besar. Padahal, akses terhadap pendidikan dan teknologi sebelumnya memang sudah banyak terpusat di wilayah kota. Meskipun hal ini tampak menguntungkan, perusahaan multinasional yang masuk ke negara berkembang sebenarnya diuntungkan karena bisa membayar upah rendah kepada pekerja lokal. Sebagian bahkan tidak memberikan hak-hak yang adil seperti pekerja dari negara asal mereka.\n\nMengapa globalisasi pada kasus tersebut dapat menimbulkan kesenjangan sosial?',
        option_a: 'Kesenjangan sosial pada kasus muncul karena pertumbuhan ekonomi Indonesia yang lambat dibandingkan negara lain.',
        option_b: 'Kesenjangan sosial pada kasus terjadi karena adanya alienasi/keterasingan pekerja dari produk yang dihasilkannya.',
        option_c: 'Kesenjangan sosial pada kasus terjadi karena kurangnya perencanaan dan peran pemerintah dalam pembangunan ekonomi.',
        option_d: 'Kesenjangan sosial pada kasus terjadi karena industrialisasi merupakan perubahan sosial dampaknya tidak bisa diprediksi.',
        option_e: 'Kesenjangan sosial pada kasus terjadi karena tidak adanya kesadaran dari pekerja untuk memperjuangkan keadilan sosial.',
        correct_answer: 'C',
        topic: 'Globalisasi & Dampak Kesenjangan',
        explanation: 'Kesenjangan timbul karena arus globalisasi dan investasi perusahaan multinasional berjalan tanpa perencanaan dan perlindungan regulasi pemerintah yang memadai bagi pekerja lokal.'
      },
      {
        id: 'q_tka_2025_24',
        exam_id: 'exam_tka_2025_resmi',
        number: 24,
        question_type: 'pilihan_ganda',
        text: 'Desa Wirausaha yang dahulu mengandalkan pertanian tradisional kini mulai berubah. Sejak adanya akses internet dan media sosial, banyak pemuda desa membuka toko daring untuk menjual produk kerajinan tangan ke luar negeri. Selain itu, beberapa keluarga mengadopsi gaya hidup konsumtif dan mulai meninggalkan tradisi gotong royong. Bahasa asing juga mulai sering digunakan dalam pergaulan anak muda.\n\nApa bentuk dampak globalisasi yang paling menonjol terhadap kehidupan ekonomi masyarakat?',
        option_a: 'Globalisasi menyebabkan desa kembali pada ekonomi subsisten dan lokal.',
        option_b: 'Globalisasi menyebabkan masyarakat menolak transaksi dengan pihak luar.',
        option_c: 'Globalisasi menyebabkan peningkatan aktivitas jual beli melalui platform digital.',
        option_d: 'Globalisasi menyebabkan seluruh hasil kerajinan digunakan untuk kebutuhan pribadi.',
        option_e: 'Globalisasi menyebabkan masyarakat berhenti memproduksi barang tradisional.',
        correct_answer: 'C',
        topic: 'Dampak Ekonomi Digital Globalisasi',
        explanation: 'Dampak ekonomi globalisasi paling nyata terlihat dari dibukanya akses pemasaran internasional bagi perajin desa melalui platform toko daring dan internet.'
      },
      {
        id: 'q_tka_2025_25',
        exam_id: 'exam_tka_2025_resmi',
        number: 25,
        question_type: 'pilihan_ganda',
        text: 'Di sebuah sekolah menengah, para murid mengikuti program pembelajaran berbasis teknologi digital. Setiap siswa dibekali gawai untuk mengakses materi pembelajaran dari rumah maupun di sekolah. Guru memanfaatkan platform pembelajaran daring yang memungkinkan diskusi kelas berlangsung secara virtual. Selain itu, siswa juga diperkenalkan pada tren budaya global melalui media sosial, seperti gaya hidup sehat, komunitas kreatif, hingga diskusi lintas negara tentang isu sosial.\n\nBagaimana keterlibatan masyarakat dalam aktivitas berbasis digital merefleksikan konsekuensi sosial yang diakibatkan oleh arus globalisasi?',
        option_a: 'Teknologi memperluas akses ruang belajar karena siswa belajar dari jejaring global, mencerminkan pendidikan yang kolaboratif.',
        option_b: 'Teknologi memudahkan akses nilai baru karena siswa terbiasa informasi global, mencerminkan pola pikir masyarakat yang terbuka.',
        option_c: 'Teknologi meningkatkan refleksi terhadap perbedaan karena siswa berdiskusi lintas latar, mencerminkan tumbuhnya toleransi sosial.',
        option_d: 'Teknologi mendorong partisipasi budaya digital karena siswa aktif di media sosial, mencerminkan pergeseran ekspresi masyarakat.',
        option_e: 'Teknologi memperkuat interaksi lintas budaya karena berinteraksi dengan komunitas global, mencerminkan luasnya wawasan global.',
        correct_answer: 'B',
        topic: 'Globalisasi & Perubahan Pola Pikir Digital',
        explanation: 'Kemudahan mengakses informasi dan budaya global melalui gawai membentuk pola pikir masyarakat yang semakin terbuka (open-minded) terhadap nilai-nilai baru.'
      },
      {
        id: 'q_tka_2025_26',
        exam_id: 'exam_tka_2025_resmi',
        number: 26,
        question_type: 'pilihan_ganda',
        text: 'Kampung Cempaka dulunya merupakan permukiman padat dengan kegiatan sosial yang tinggi. Warga sering mengadakan kerja bakti, arisan RT, dan kegiatan keagamaan bersama. Namun, sejak banyak rumah dijual dan dibeli oleh pendatang dari luar daerah, suasana sosial berubah. Warga baru lebih tertutup, tidak aktif dalam kegiatan warga, dan lebih memilih berinteraksi melalui media sosial. Meskipun kawasan menjadi lebih bersih dan tertata, namun hubungan antarwarga melemah.\n\nApa dampak jangka panjang dari pola interaksi sosial yang mulai berubah di Kampung Cempaka?',
        option_a: 'Kesadaran kolektif dalam menjaga lingkungan mulai melemah secara bertahap.',
        option_b: 'Partisipasi warga dalam kegiatan rutin mengalami penurunan yang tidak disadari.',
        option_c: 'Rasa memiliki terhadap komunitas perlahan terkikis karena kurangnya keterlibatan.',
        option_d: 'Kegiatan sosial berubah bentuk tanpa memperkuat hubungan antarwarga.',
        option_e: 'Norma sosial tetap bertahan meskipun jumlah interaksi warga semakin terbatas.',
        correct_answer: 'C',
        topic: 'Perubahan Sosial & Relasi Komunitas',
        explanation: 'Pergeseran pola interaksi dari tatap muka komunal menjadi tertutup/individual berdampak jangka panjang pada terkikisnya rasa memiliki (sense of community) terhadap lingkungan.'
      },
      {
        id: 'q_tka_2025_27',
        exam_id: 'exam_tka_2025_resmi',
        number: 27,
        question_type: 'pilihan_ganda',
        text: 'Di era digital saat ini, media sosial menjadi salah satu sumber utama informasi bagi masyarakat. Namun, tidak semua informasi yang tersebar dapat dipertanggungjawabkan. Baru-baru ini, di sebuah kota kecil, beredar pesan berantai di aplikasi pengirim pesan yang menyebutkan akan terjadi gempa besar dan mengimbau warga untuk segera mengungsi. Informasi tersebut ternyata tidak berasal dari lembaga resmi dan terbukti hoaks. Akibatnya, banyak warga panik, meninggalkan rumah, bahkan terjadi penjarahan di beberapa toko.\n\nMengapa masalah sosial dalam ilustrasi tersebut merupakan dampak dari globalisasi?',
        option_a: 'Globalisasi memfasilitasi peningkatan interaksi dan relasi sosial secara tatap muka yang intens antarwarga.',
        option_b: 'Globalisasi mendorong kembalinya nilai-nilai tradisional dan kearifan lokal yang mampu menyaring informasi.',
        option_c: 'Globalisasi menyebabkan homogenitas budaya sehingga masyarakat lebih mudah percaya pada satu jenis informasi.',
        option_d: 'Globalisasi memungkinkan penyebaran informasi, termasuk hoaks, secara cepat dan masif melintasi batas geografis.',
        option_e: 'Globalisasi menekankan pentingnya peran lembaga formal dalam mengontrol setiap bentuk komunikasi masyarakat.',
        correct_answer: 'D',
        topic: 'Globalisasi & Penyebaran Hoaks Digital',
        explanation: 'Arus globalisasi teknologi memungkinkan transmisi informasi berlangsung sangat masif dan cepat melintasi batas wilayah tanpa dapat dibendung, sehingga risiko sebaran hoaks meningkat.'
      },
      {
        id: 'q_tka_2025_28',
        exam_id: 'exam_tka_2025_resmi',
        number: 28,
        question_type: 'pilihan_ganda',
        text: 'Dalam dua tahun terakhir, banyak siswa di sebuah SMA mulai meninggalkan kebiasaan menggunakan bahasa daerah dalam percakapan sehari-hari. Mereka lebih sering menggunakan istilah dalam bahasa Inggris yang dipopulerkan melalui media sosial, film, dan budaya pop barat. Selain itu, pakaian adat mulai jarang dipakai, bahkan saat acara sekolah. Sebagian siswa merasa budaya lokal sudah ketinggalan zaman dan tidak menarik untuk ditampilkan.\n\nSikap manakah yang paling sesuai untuk membangun kesadaran siswa agar tetap menghargai budaya daerah tanpa menolak budaya luar?',
        option_a: 'Mendorong siswa untuk lebih sering menampilkan budaya lokal dalam kegiatan sekolah yang bersifat terbuka.',
        option_b: 'Mengarahkan siswa untuk menekankan unsur-unsur lokal dalam proyek yang menampilkan identitas global.',
        option_c: 'Menanamkan rasa bangga terhadap budaya lokal sambil tetap membuka ruang eksplorasi budaya luar.',
        option_d: 'Menyediakan platform yang memfasilitasi siswa dalam menggabungkan nilai-nilai lokal dan global secara kreatif.',
        option_e: 'Mengutamakan nilai-nilai budaya daerah dalam seluruh bentuk kegiatan tanpa menghilangkan pengaruh luar sepenuhnya.',
        correct_answer: 'C',
        topic: 'Sikap Kritis Menghadapi Globalisasi',
        explanation: 'Sikap selektif terbaik adalah menumbuhkan rasa bangga dan apresiasi terhadap akar budaya lokal (kebudayaan sendiri) tanpa menutup diri atau bersikap a priori terhadap budaya global.'
      },
      {
        id: 'q_tka_2025_29',
        exam_id: 'exam_tka_2025_resmi',
        number: 29,
        question_type: 'pilihan_ganda',
        text: 'Indonesia, China, India, Pakistan, dan Nigeria menyumbang 75% dari total beban polusi udara global karena tingkat polusi udara yang tinggi dan jumlah populasi yang besar. Udara yang berisi partikel halus (PM 2.5) berpotensi mengurangi usia hidup rata-rata warga Indonesia hingga 1,4 tahun dibanding jika kualitas udara di Indonesia memenuhi standar WHO. Pencemaran udara oleh pelaku industri menjadi sorotan karena berkontribusi tinggi terhadap polusi udara.\n\nApa rekomendasi yang paling tepat diberikan kepada institusi pendidikan tinggi agar bisa berkontribusi dalam mengatasi masalah tersebut?',
        option_a: 'Mendampingi masyarakat menuntut pemerintah menggratiskan pengobatan untuk penyakit gangguan pernafasan.',
        option_b: 'Menjalin kerja sama dengan negara-negara maju agar berinvestasi di sektor industri dengan konsep energi terbaharukan.',
        option_c: 'Membangun pusat riset yang berkonsentrasi pada lingkungan agar menghasilkan strategi dan pembangunan berkelanjutan.',
        option_d: 'Menjalin kerja sama dengan berbagai pihak untuk membuat program penanaman sejuta pohon di wilayah hutan gundul.',
        option_e: 'Mengembangkan program pengabdian kepada masyarakat untuk memberikan edukasi cara mengelola limbah rumah tangga.',
        correct_answer: 'C',
        topic: 'Sikap Kritis & Peran Riset Perguruan Tinggi',
        explanation: 'Wujud nyata peranan akademis institusi pendidikan tinggi adalah membangun pusat riset lingkungan untuk merumuskan teknologi dan kebijakan pembangunan berkelanjutan.'
      },
      {
        id: 'q_tka_2025_30',
        exam_id: 'exam_tka_2025_resmi',
        number: 30,
        question_type: 'pilihan_ganda',
        text: 'Masuknya budaya asing ke Indonesia yang dipercepat oleh arus globalisasi dan teknologi membawa pengaruh besar. Desa Trunyan di Bali memiliki tradisi pemakaman unik: jenazah tidak dikubur atau dibakar, melainkan diletakkan di atas tanah dan dibiarkan membusuk secara alami. Tradisi ini menarik minat wisatawan. Namun, meningkatnya kunjungan wisatawan memunculkan tantangan baru seperti meningkatnya volume sampah, komersialisasi budaya yang berisiko mengubah makna spiritual dari tradisi tersebut.\n\nApa rekomendasi paling strategis yang bisa dilakukan pemuda Desa Trunyan untuk menjaga nilai budaya di tengah arus globalisasi?',
        option_a: 'Mengampanyekan gaya hidup lokal melalui media sosial dengan pendekatan visual modern.',
        option_b: 'Meningkatkan daya tarik ekonomi dari tradisi dengan memperluas pasar souvenir khas pemakaman.',
        option_c: 'Menjadi pemandu wisata profesional agar bisa menjelaskan budaya secara sistematis dan netral.',
        option_d: 'Meningkatkan penggunaan bahasa asing dalam promosi budaya agar lebih diterima wisatawan asing.',
        option_e: 'Membuat festival tahunan dengan atraksi budaya yang diatur oleh sponsor dan pihak swasta.',
        correct_answer: 'A',
        topic: 'Penguatan Budaya Lokal di Era Global',
        explanation: 'Generasi muda dapat memanfaatkan kekuatan media digital modern untuk mengampanyekan edukasi pelestarian nilai budaya lokal secara inspiratif dan kreatif.'
      }
    ]
  }
];

export const EXAMS_DATA: Exam[] = [
  ...TKA_EXAMS_2025,
  ...TKA_EXAMS_EXTRA,
  ...TKA_EXAMS_EXTRA_2,
  ...TKA_EXAMS_EXTRA_3,
  {
    id: 'exam_latihan_bab_1',
    title: 'Latihan Bab 1: Sosiologi Sebagai Ilmu (20 Soal)',
    grade_level: 10,
    category: 'Latihan Bab',
    duration_minutes: 40,
    total_questions: 20,
    description: 'Paket latihan resmi Bab 1 Sosiologi Sebagai Ilmu mencakup 20 soal lengkap: Pilihan Ganda Biasa, PGK Kategori (Sesuai/Tidak Sesuai), dan PGK Multi-Jawaban (MCMA) beserta kunci jawaban & pembahasan.',
    xp_reward: 300,
    passing_score: 75,
    questions: [
      {
        id: 'q_latihan_1_1',
        exam_id: 'exam_latihan_bab_1',
        number: 1,
        question_type: 'pilihan_ganda',
        text: 'Secara etimologis, istilah "Sosiologi" berasal dari kata socius (bahasa Latin) yang berarti kawan atau masyarakat, dan logos (bahasa Yunani) yang berarti kata atau berbicara. Berdasarkan pengertian etimologis tersebut, sosiologi dapat diartikan sebagai ilmu yang...',
        option_a: 'Mengkaji interaksi individu dalam kelompok',
        option_b: 'Berbicara tentang masyarakat',
        option_c: 'Mengamati pola-pola perilaku manusia',
        option_d: 'Menjelaskan fenomena sosial secara ilmiah',
        option_e: 'Menemukan solusi untuk masalah sosial',
        correct_answer: 'B',
        topic: 'Pengertian Etimologis Sosiologi',
        explanation: 'Sosiologi berasal dari kata socius (kawan/masyarakat) dan logos (kata/berbicara), sehingga secara etimologis diartikan sebagai ilmu yang berbicara tentang masyarakat.'
      },
      {
        id: 'q_latihan_1_2',
        exam_id: 'exam_latihan_bab_1',
        number: 2,
        question_type: 'pilihan_ganda',
        text: 'Salah satu karakteristik sosiologi adalah teoritis, yang berarti...',
        option_a: 'Sosiologi membangun teori berdasarkan fakta di lapangan',
        option_b: 'Teori sosiologi dikembangkan dari teori yang sudah ada sebelumnya',
        option_c: 'Sosiologi tidak menilai baik atau buruknya suatu fenomena sosial',
        option_d: 'Sosiologi berusaha menyusun abstraksi dari hasil observasi di lapangan',
        option_e: 'Sosiologi digunakan untuk memecahkan masalah praktis di masyarakat',
        correct_answer: 'D',
        topic: 'Karakteristik Sosiologi',
        explanation: 'Karakteristik teoritis berarti sosiologi selalu berusaha menyusun abstraksi (kesimpulan logis) dari hasil observasi di lapangan untuk merumuskan teori.'
      },
      {
        id: 'q_latihan_1_3',
        exam_id: 'exam_latihan_bab_1',
        number: 3,
        question_type: 'pilihan_ganda',
        text: 'Menurut Auguste Comte, tahapan cara berpikir masyarakat yang menjelaskan gejala sosial dengan menggunakan akal budi, tetapi masih terikat pada ide-ide abstrak yang tidak dapat dibuktikan secara empiris, disebut tahap...',
        option_a: 'Teologis',
        option_b: 'Metafisika',
        option_c: 'Positif',
        option_d: 'Rasional',
        option_e: 'Eksperimental',
        correct_answer: 'B',
        topic: 'Hukum 3 Tahap Auguste Comte',
        explanation: 'Tahap metafisika adalah tahap transisi di mana manusia menjelaskan gejala sosial dengan mengacu pada kekuatan/ide-ide abstrak yang belum dapat dibuktikan secara empiris ilmiah.'
      },
      {
        id: 'q_latihan_1_4',
        exam_id: 'exam_latihan_bab_1',
        number: 4,
        question_type: 'pilihan_ganda',
        text: 'Seorang sosiolog yang memberikan pelatihan kepada masyarakat adat mengenai cara melestarikan tradisi mereka di tengah gempuran modernisasi, menjalankan peran sebagai...',
        option_a: 'Ahli Riset',
        option_b: 'Pendidik',
        option_c: 'Teknisi',
        option_d: 'Konsultan Kebijakan',
        option_e: 'Pekerja Sosial',
        correct_answer: 'B',
        topic: 'Peran Sosiolog',
        explanation: 'Sosiolog yang memberikan edukasi, pelatihan, dan pengajaran kepada masyarakat berperan sebagai Pendidik atau Guru.'
      },
      {
        id: 'q_latihan_1_5',
        exam_id: 'exam_latihan_bab_1',
        number: 5,
        question_type: 'pilihan_ganda',
        text: 'Objek kajian sosiologi adalah masyarakat, yang di dalamnya mencakup hubungan dan interaksi sosial. Manakah pernyataan berikut yang paling tepat mendefinisikan hubungan antara individu dan masyarakat dalam sosiologi?',
        option_a: 'Individu adalah objek pasif yang dibentuk oleh masyarakat.',
        option_b: 'Masyarakat adalah objek pasif yang dibentuk oleh individu.',
        option_c: 'Individu dan masyarakat saling memengaruhi secara timbal balik.',
        option_d: 'Individu dan masyarakat adalah dua entitas yang terpisah.',
        option_e: 'Masyarakat ada tanpa adanya individu.',
        correct_answer: 'C',
        topic: 'Objek Kajian Sosiologi',
        explanation: 'Dalam sosiologi, hubungan antara individu dan masyarakat bersifat dialektis/timbal balik (saling memengaruhi).'
      },
      {
        id: 'q_latihan_1_6',
        exam_id: 'exam_latihan_bab_1',
        number: 6,
        question_type: 'kompleks',
        text: 'Dua perusahaan taksi (konvensional & daring) bersaing ketat. Perusahaan konvensional menuntut regulasi pembatasan taksi daring demi ekonomi mereka. Taksi daring berargumen memberi kemudahan konsumen. Pemerintah kesulitan menentukan kebijakan. Tentukan analisis yang SESUAI menurut Perspektif Konflik:',
        statement_1: 'Persaingan antara taksi konvensional dan taksi daring adalah bentuk perjuangan kelas (Perspektif Konflik).',
        statement_2: 'Pemerintah sebagai pihak yang berkuasa menjadi arena perebutan kekuasaan antara dua kelompok.',
        statement_3: 'Ketidakseimbangan kekuasaan antara perusahaan besar dengan individu adalah akar masalahnya.',
        statement_4: 'Konflik ini dapat diselesaikan dengan mencari fungsi yang harmonis bagi kedua belah pihak.',
        option_a: '(1), (2), dan (3) Sesuai; (4) Tidak Sesuai',
        option_b: '(1) dan (3) Sesuai; (2) dan (4) Tidak Sesuai',
        option_c: '(2) dan (4) Sesuai; (1) dan (3) Tidak Sesuai',
        option_d: 'Hanya (4) yang Sesuai',
        option_e: 'Semua pernyataan Sesuai',
        correct_answer: 'A',
        topic: 'Perspektif Konflik (PGK Kategori)',
        explanation: 'Pernyataan (1), (2), dan (3) Sesuai dengan analisis Perspektif Konflik. Pernyataan (4) Tidak Sesuai karena pencarian keseimbangan harmonis adalah ciri Fungsionalisme Struktural. Kunci A.'
      },
      {
        id: 'q_latihan_1_7',
        exam_id: 'exam_latihan_bab_1',
        number: 7,
        question_type: 'kompleks',
        text: 'Tentukan apakah pernyataan berikut Sesuai atau Tidak Sesuai dengan penggunaan metode kualitatif untuk memahami persaingan taksi konvensional dan daring:',
        statement_1: 'Menghitung jumlah pendapatan harian taksi daring dan taksi konvensional.',
        statement_2: 'Melakukan wawancara mendalam dengan supir taksi konvensional untuk memahami keresahan mereka.',
        statement_3: 'Mengumpulkan data berupa opini dan pengalaman pengguna taksi daring melalui survei.',
        statement_4: 'Mengamati dan menganalisis interaksi antara supir dan penumpang.',
        option_a: '(1), (2), dan (3) Sesuai',
        option_b: '(1) dan (3) Sesuai',
        option_c: '(2) dan (4) Sesuai; (1) dan (3) Tidak Sesuai',
        option_d: 'Hanya (4) yang Sesuai',
        option_e: 'Semua pernyataan Sesuai',
        correct_answer: 'C',
        topic: 'Metode Kualitatif (PGK Kategori)',
        explanation: 'Metode kualitatif menekankan data non-angka dan wawancara mendalam (2) serta pengamatan interaksi (4). Menghitung pendapatan (1) dan survei kuantitatif (3) adalah metode kuantitatif. Kunci C.'
      },
      {
        id: 'q_latihan_1_8',
        exam_id: 'exam_latihan_bab_1',
        number: 8,
        question_type: 'pilihan_ganda',
        text: 'Pudarnya gotong royong di desa karena warga memilih membayar upah buruh sawah. Sosiolog A menyebut ini evolusi spesialisasi, Sosiolog B melihat perubahan nilai individualisme. Manakah pernyataan yang paling tepat terkait perspektif sosiologi? (Pilih dua jawaban yang benar)',
        option_a: 'Pendapat Sosiolog A sejalan dengan perspektif fungsionalis.',
        option_b: 'Pendapat Sosiolog B sejalan dengan perspektif interaksionis simbolik.',
        option_c: 'Kedua sosiolog menggunakan perspektif konflik.',
        option_d: 'Sosiolog B melihat fenomena tersebut dari sisi perubahan makna dan nilai sosial.',
        option_e: 'Sosiolog A melihat fenomena ini sebagai disfungsi dalam sistem sosial.',
        correct_answer: 'A, D',
        topic: 'Perspektif Sosiologi (MCMA)',
        explanation: 'Sosiolog A menekankan pembagian kerja/spesialisasi (fungsionalis). Sosiolog B menekankan pergeseran makna dan nilai sosial (interaksionis simbolik). Kunci A dan D.'
      },
      {
        id: 'q_latihan_1_9',
        exam_id: 'exam_latihan_bab_1',
        number: 9,
        question_type: 'pilihan_ganda',
        text: 'Berdasarkan studi kasus pudarnya gotong royong di atas, metode penelitian yang paling sesuai untuk memahami perubahan nilai yang diungkapkan oleh Sosiolog B adalah... (Pilih dua jawaban yang benar)',
        option_a: 'Survei dengan kuesioner tertutup untuk mendapatkan data kuantitatif.',
        option_b: 'Observasi partisipan untuk memahami pola perilaku warga sehari-hari.',
        option_c: 'Wawancara mendalam untuk menggali pandangan pribadi warga tentang gotong royong.',
        option_d: 'Analisis statistik untuk mengukur korelasi antara upah dan ikatan sosial.',
        option_e: 'Eksperimen untuk melihat pengaruh insentif finansial terhadap gotong royong.',
        correct_answer: 'B, C',
        topic: 'Metode Penelitian Kualitatif (MCMA)',
        explanation: 'Metode kualitatif yang paling tepat untuk mendalami nilai sosial adalah Observasi Partisipan (B) dan Wawancara Mendalam (C).'
      },
      {
        id: 'q_latihan_1_10',
        exam_id: 'exam_latihan_bab_1',
        number: 10,
        question_type: 'pilihan_ganda',
        text: 'Manakah pernyataan yang mencerminkan fungsi sosiologi sebagai ilmu terapan dalam kasus pudarnya gotong royong di desa? (Pilih dua jawaban yang benar)',
        option_a: 'Menganalisis penyebab pudarnya gotong royong untuk mendapatkan pemahaman teoritis.',
        option_b: 'Mengembangkan program pemberdayaan komunitas untuk menghidupkan kembali semangat gotong royong.',
        option_c: 'Merumuskan kebijakan desa yang mendorong partisipasi warga dalam kegiatan sosial.',
        option_d: 'Menjelaskan secara sistematis tahapan perubahan sosial di desa tersebut.',
        option_e: 'Menguji validitas teori Durkheim tentang solidaritas mekanik dan organik.',
        correct_answer: 'B, C',
        topic: 'Fungsi Sosiologi Terapan (MCMA)',
        explanation: 'Fungsi ilmu terapan (Applied Science) diwujudkan melalui aksi praktis: membuat program pemberdayaan komunitas (B) dan merumuskan kebijakan desa (C).'
      },
      {
        id: 'q_latihan_1_11',
        exam_id: 'exam_latihan_bab_1',
        number: 11,
        question_type: 'pilihan_ganda',
        text: 'Sosiolog meneliti dampak media sosial pada remaja. Ditemukan interaksi langsung berkurang namun tumbuh pola baru maya. Peneliti menyimpulkan hal ini wajar dalam modernitas tanpa memberikan label moral. Karakteristik sosiologi yang diterapkan adalah... (Pilih dua jawaban yang benar)',
        option_a: 'Teoritis',
        option_b: 'Empiris',
        option_c: 'Kumulatif',
        option_d: 'Non-etis',
        option_e: 'Murni',
        correct_answer: 'B, D',
        topic: 'Karakteristik Sosiologi (MCMA)',
        explanation: 'Empiris (B) karena hasil pengamatan nyata di lapangan, dan Non-etis (D) karena tidak memberi nilai moral baik/buruk pada fenomena tersebut.'
      },
      {
        id: 'q_latihan_1_12',
        exam_id: 'exam_latihan_bab_1',
        number: 12,
        question_type: 'pilihan_ganda',
        text: 'Manakah dari pernyataan berikut yang merupakan objek kajian sosiologi? (Pilih dua jawaban yang benar)',
        option_a: 'Interaksi antara individu dengan teknologi AI.',
        option_b: 'Hubungan antara harga komoditas dan pasar saham.',
        option_c: 'Keteraturan sosial dalam sebuah komunitas.',
        option_d: 'Kepercayaan pribadi seorang individu.',
        option_e: 'Pola perubahan iklim di suatu wilayah.',
        correct_answer: 'A, C',
        topic: 'Objek Kajian Sosiologi (MCMA)',
        explanation: 'Objek sosiologi mencakup interaksi individu dalam konteks sosial/teknologi (A) dan keteraturan sosial masyarakat (C).'
      },
      {
        id: 'q_latihan_1_13',
        exam_id: 'exam_latihan_bab_1',
        number: 13,
        question_type: 'pilihan_ganda',
        text: 'Menurut Max Weber, tindakan sosial yang didasari oleh perasaan atau emosi tanpa pertimbangan rasional disebut... (Pilih dua jawaban yang benar)',
        option_a: 'Tindakan rasional instrumental, karena bertujuan mencapai sesuatu.',
        option_b: 'Tindakan afektif, karena didorong oleh luapan emosi.',
        option_c: 'Tindakan tradisional, karena merupakan kebiasaan turun-temurun.',
        option_d: 'Tindakan non-etis, karena tidak memedulikan nilai moral.',
        option_e: 'Tindakan irasional, karena tidak didasari oleh akal sehat.',
        correct_answer: 'B, E',
        topic: 'Tindakan Sosial Max Weber (MCMA)',
        explanation: 'Tindakan berlandaskan perasaan spontan adalah Tindakan Afektif (B) dan tergolong Tindakan Irasional (E).'
      },
      {
        id: 'q_latihan_1_14',
        exam_id: 'exam_latihan_bab_1',
        number: 14,
        question_type: 'pilihan_ganda',
        text: 'Sosiologi disebut sebagai ilmu murni (pure science). Pernyataan yang mencerminkan hal tersebut adalah... (Pilih dua jawaban yang benar)',
        option_a: 'Penelitian sosiologi bertujuan untuk memecahkan masalah praktis.',
        option_b: 'Sosiologi berupaya menyusun abstraksi dari fenomena sosial.',
        option_c: 'Sosiologi digunakan untuk merumuskan kebijakan.',
        option_d: 'Tujuan sosiologi adalah mendapatkan pengetahuan tentang masyarakat.',
        option_e: 'Sosiologi mengajarkan cara-cara untuk mengubah masyarakat.',
        correct_answer: 'B, D',
        topic: 'Posisi Sosiologi sebagai Ilmu Murni (MCMA)',
        explanation: 'Fungsi ilmu murni berfokus pada menyusun abstraksi/teori (B) dan memperoleh ilmu pengetahuan mendalam tentang masyarakat (D).'
      },
      {
        id: 'q_latihan_1_15',
        exam_id: 'exam_latihan_bab_1',
        number: 15,
        question_type: 'pilihan_ganda',
        text: 'Sosiologi memiliki karakteristik kumulatif. Manakah contoh yang sesuai dengan karakteristik tersebut? (Pilih dua jawaban yang benar)',
        option_a: 'Teori-teori sosiologi yang sudah ada disempurnakan dan dikembangkan.',
        option_b: 'Seorang peneliti mengobservasi suatu fenomena secara langsung di lapangan.',
        option_c: 'Penelitian sosiologi tidak dipengaruhi oleh nilai-nilai pribadi peneliti.',
        option_d: 'Teori sosiologi tentang globalisasi dilengkapi dengan temuan penelitian terbaru.',
        option_e: 'Sosiologi menggunakan metode ilmiah dalam penelitiannya.',
        correct_answer: 'A, D',
        topic: 'Ciri Sosiologi Kumulatif (MCMA)',
        explanation: 'Kumulatif ditunjukkan dengan menyempurnakan teori lama (A) serta melengkapi teori globalisasi dengan temuan empiris terbaru (D).'
      },
      {
        id: 'q_latihan_1_16',
        exam_id: 'exam_latihan_bab_1',
        number: 16,
        question_type: 'pilihan_ganda',
        text: 'Metode penelitian kualitatif dalam sosiologi memiliki ciri-ciri... (Pilih dua jawaban yang benar)',
        option_a: 'Menggunakan data berupa angka yang diolah secara statistik.',
        option_b: 'Sumber datanya berupa kata-kata lisan atau tulisan.',
        option_c: 'Berfokus pada pemahaman mendalam.',
        option_d: 'Menekankan pada generalisasi hasil penelitian.',
        option_e: 'Dilakukan melalui survei kuesioner.',
        correct_answer: 'B, C',
        topic: 'Metode Penelitian Kualitatif (MCMA)',
        explanation: 'Penelitian kualitatif berkarakteristik menggunakan deskripsi kata-kata (B) serta mengejar pemahaman makna secara mendalam (C).'
      },
      {
        id: 'q_latihan_1_17',
        exam_id: 'exam_latihan_bab_1',
        number: 17,
        question_type: 'pilihan_ganda',
        text: 'Menurut Perspektif Konflik, perbedaan-perbedaan sosial dan ketidaksetaraan dalam masyarakat disebabkan oleh... (Pilih dua jawaban yang benar)',
        option_a: 'Solidaritas sosial yang melemah.',
        option_b: 'Perjuangan kelas antara kelompok yang berkuasa dan yang dikuasai.',
        option_c: 'Perebutan sumber daya yang langka.',
        option_d: 'Adanya disfungsi sosial.',
        option_e: 'Interaksi yang tidak harmonis.',
        correct_answer: 'B, C',
        topic: 'Perspektif Konflik (MCMA)',
        explanation: 'Perspektif Konflik menyatakan ketimpangan berakar dari pertentangan kelas (B) dan perebutan sumber daya langka (C).'
      },
      {
        id: 'q_latihan_1_18',
        exam_id: 'exam_latihan_bab_1',
        number: 18,
        question_type: 'pilihan_ganda',
        text: 'Peran sosiolog sebagai teknisi ditunjukkan oleh pernyataan... (Pilih dua jawaban yang benar)',
        option_a: 'Melakukan penelitian untuk mendapatkan data tentang masyarakat.',
        option_b: 'Merancang program sosialisasi untuk mengatasi masalah sosial.',
        option_c: 'Mengolah data riset untuk membuat program pembangunan yang efektif.',
        option_d: 'Mengajarkan mata pelajaran sosiologi di sekolah.',
        option_e: 'Menjadi konsultan untuk sebuah perusahaan.',
        correct_answer: 'B, C',
        topic: 'Peran Sosiolog sebagai Teknisi (MCMA)',
        explanation: 'Sebagai teknisi, sosiolog mengaplikasikan ilmu untuk merancang program sosialisasi (B) dan efektivitas pembangunan (C).'
      },
      {
        id: 'q_latihan_1_19',
        exam_id: 'exam_latihan_bab_1',
        number: 19,
        question_type: 'pilihan_ganda',
        text: 'Peneliti menyebarkan kuesioner kepada 500 responden untuk mengukur tingkat kepuasan layanan publik, lalu mengolah data dengan rumus statistik. Pendekatan ini sesuai dengan metode... (Pilih dua jawaban yang benar)',
        option_a: 'Kuantitatif',
        option_b: 'Kualitatif',
        option_c: 'Statistik',
        option_d: 'Survei',
        option_e: 'Eksperimen',
        correct_answer: 'A, D',
        topic: 'Metode Kuantitatif & Survei (MCMA)',
        explanation: 'Penggunaan kuesioner massal dan pengolahan angka statistik adalah ciri khas metode Kuantitatif (A) dan teknik Survei (D).'
      },
      {
        id: 'q_latihan_1_20',
        exam_id: 'exam_latihan_bab_1',
        number: 20,
        question_type: 'pilihan_ganda',
        text: 'Sebuah komunitas memiliki struktur rapi, tetapi terjadi persaingan sengit antar-anggota untuk memperebutkan posisi ketua adat. Analisis yang paling sesuai dengan Perspektif Konflik adalah... (Pilih dua jawaban yang benar)',
        option_a: 'Persaingan tersebut adalah bagian dari sistem sosial yang harmonis.',
        option_b: 'Persaingan adalah manifestasi dari perebutan kekuasaan dan status.',
        option_c: 'Adanya persaingan merupakan disfungsi dalam struktur sosial.',
        option_d: 'Persaingan ini dapat dijelaskan melalui analisis interaksi simbolik.',
        option_e: 'Konflik ini muncul karena adanya kelompok-kelompok yang saling bertentangan.',
        correct_answer: 'B, E',
        topic: 'Analisis Perspektif Konflik (MCMA)',
        explanation: 'Perspektif konflik memandang persaingan perebutan status ketua adat sebagai perebutan kekuasaan/status (B) dan pertentangan antarkelompok (E).'
      }
    ]
  },
];

export const INITIAL_TASKS: any[] = [
  {
    id: 'task_01',
    course_id: 'course_10',
    chapter_title: 'Hakekat & Objek Kajian Sosiologi',
    title: 'Analisis Studi Kasus: Fenomena Cyberbullying & Fakta Sosial',
    description: 'Analisislah fenomena perundungan siber (cyberbullying) di kalangan remaja Indonesia menggunakan konsep Fakta Sosial Emile Durkheim. Jelaskan daya paksa eksternal dan sanksi sosial yang muncul.',
    type: 'INDIVIDUAL',
    deadline: '05 Agustus 2026',
    max_score: 100,
  },
  {
    id: 'task_02',
    course_id: 'course_11',
    chapter_title: 'Struktur & Konflik Sosial',
    title: 'Tugas Kelompok (Smart Grouping): Pemetaan Konflik & Integrasi Sosial',
    description: 'Bekerja secara kelompok (4 orang). Pilih 1 konflik sosial nyata di Indonesia (misal: konflik pemilu, relokasi lahan, atau ketimpangan ekonomi). Buat diagram pemetaan aktor, akar masalah, serta strategi pemecahan masalah (akomodasi/integrasi). Cukup 1 perwakilan kelompok yang mengunggah berkas Laporan PDF.',
    type: 'GROUP',
    deadline: '12 Agustus 2026',
    max_score: 100,
  },
];

export const INITIAL_SUBMISSIONS: any[] = [
  {
    id: 'sub_01',
    task_id: 'task_01',
    task_title: 'Analisis Studi Kasus: Fenomena Cyberbullying & Fakta Sosial',
    type: 'INDIVIDUAL',
    submitted_by: 'FAHRI RIZKI RAMADHAN',
    submitted_at: '28 Juli 2026, 14:30 WIB',
    answer_text: 'Berdasarkan observasi pada fenomena cyberbullying, budaya netizen terbentuk sebagai Fakta Sosial karena norma perilakunya berada di luar individu dan memiliki kekuatan coercive (memaksa). Remaja cenderung takut mengalami ostrasisme atau celaan sosial apabila tidak mengikuti tren atau opini mayoritas grup.',
    file_name: 'Laporan_Analisis_Cyberbullying_Fahri.pdf',
    grade: 92,
    teacher_feedback: 'Analisis yang sangat tajam, Fahri! Kaitan antara daya paksa eksternal Durkheim dan fenomena media sosial dijelaskan secara runtut.',
    status: 'Sudah Dinilai',
  },
  {
    id: 'sub_02',
    task_id: 'task_02',
    task_title: 'Tugas Kelompok: Pemetaan Konflik & Integrasi Sosial',
    type: 'GROUP',
    group_name: 'Kelompok 2 - Socio Thinkers',
    group_members: ['FAHRI RIZKI RAMADHAN', 'MUHAMMAD AFRAZ GHAZAWAN', 'MUHAMMAD ARKAN RYANDIKHA', 'MADINE MEUTIARANISSA GITA'],
    submitted_by: 'MADINE MEUTIARANISSA GITA (Perwakilan Kelompok)',
    submitted_at: '29 Juli 2026, 10:15 WIB',
    answer_text: 'Kelompok kami memetakan konflik agraria relokasi lahan di Jawa Tengah dengan pendekatan Teori Konflik Ralf Dahrendorf. Hasil pemetaan menunjukkan adanya ketidakseimbangan otoritas antara konsorsium pengembang dan komunitas petani lokal.',
    file_name: 'Makalah_Pemetaan_Konflik_Kelompok2.pdf',
    status: 'Menunggu Penilaian',
  },
];

export const INITIAL_COMMENTS: any[] = [
  {
    id: 'cmt_1',
    lesson_id: 'les_10_1',
    user_name: 'MUHAMMAD AFRAZ GHAZAWAN',
    user_role: 'siswa',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=1000000002',
    text: 'Sangat jelas penjelasan tentang Hukum Tiga Tahap Auguste Comte! Apakah tahap Positivis di Indonesia sudah sepenuhnya diterapkan dalam pembuatan kebijakan sosial?',
    created_at: '2 jam yang lalu',
    likes: 5,
    replies: [
      {
        id: 'cmt_1_1',
        lesson_id: 'les_10_1',
        user_name: 'Sahidin, S.Pd., Gr.',
        user_role: 'guru',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Sahidin',
        text: 'Pertanyaan kritis yang bagus Afraz! Di Indonesia, kebijakan sosial berbasis data empiris (evidence-based policy) merupakan wujud pemikiran positivis yang terus ditingkatkan.',
        created_at: '1 jam yang lalu',
        likes: 8,
      }
    ]
  },
  {
    id: 'cmt_2',
    lesson_id: 'les_10_1',
    user_name: 'MADINE MEUTIARANISSA GITA',
    user_role: 'siswa',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=1000000027',
    text: 'Ciri non-etis dalam sosiologi membuat sosiologi berbeda dengan filsafat moral ya. Sosiologi menjelaskan mengapa sesuatu terjadi, bukan menghakimi.',
    created_at: '30 menit yang lalu',
    likes: 3,
  }
];

export const INITIAL_CLASSROOMS: any[] = [
  {
    id: 'class_12_soshum_putra',
    name: '12 SOSHUM PUTRA',
    grade_level: 12,
    academic_year: '2026/2027',
    teacher_name: 'Sahidin, S.Pd., Gr.',
    total_students: 26,
    description: 'Rombongan Belajar 12 SOSHUM PUTRA (26 Siswa)',
    students: INITIAL_CLASSROOM_STUDENTS.filter(s => s.classroom_name === '12 SOSHUM PUTRA')
  },
  {
    id: 'class_12_soshum_putri',
    name: '12 SOSHUM PUTRI',
    grade_level: 12,
    academic_year: '2026/2027',
    teacher_name: 'Sahidin, S.Pd., Gr.',
    total_students: 25,
    description: 'Rombongan Belajar 12 SOSHUM PUTRI (25 Siswa)',
    students: INITIAL_CLASSROOM_STUDENTS.filter(s => s.classroom_name === '12 SOSHUM PUTRI')
  }
];

export const INITIAL_SYLLABUS: any[] = [
  {
    id: 'syl_12_1',
    grade_level: 12,
    semester: 1,
    chapter_code: 'BAB-01',
    topic_name: 'Sosiologi Sebagai Ilmu & Perubahan Sosial',
    basic_competency: 'Memahami sosiologi sebagai ilmu dan menganalisis fenomena perubahan sosial.',
    learning_objective: 'Siswa dapat menjelaskan teori-teori sosiologi dan penerapannya dalam kehidupan bermasyarakat.',
    meeting_count: 6,
    has_daily_test: true,
    file_source: 'Silabus_Kemenag_Kurikulum_Merdeka_12.xlsx'
  },
  {
    id: 'syl_12_2',
    grade_level: 12,
    semester: 1,
    chapter_code: 'BAB-02',
    topic_name: 'Globalisasi, Modernisasi & Kearifan Lokal',
    basic_competency: 'Menganalisis dampak globalisasi terhadap komunitas lokal.',
    learning_objective: 'Siswa mampu merumuskan strategi pemberdayaan masyarakat berbasis kearifan lokal.',
    meeting_count: 8,
    has_daily_test: true,
    file_source: 'Silabus_Kemenag_Kurikulum_Merdeka_12.xlsx'
  }
];

export const INITIAL_COMPETENCY_ANALYSIS: any[] = [
  {
    topic_name: 'Fakta Sosial & Tokoh Sosiologi',
    total_questions_attempted: 20,
    correct_count: 18,
    mastery_percentage: 90,
    status: 'Sangat Paham',
    recommendation: 'Kemampuan penalaran teori sangat tinggi! Lanjutkan ke soal HOTS TKA tingkat lanjut.'
  },
  {
    topic_name: 'Interaksi Sosial & Syarat Kontak',
    total_questions_attempted: 25,
    correct_count: 22,
    mastery_percentage: 88,
    status: 'Sangat Paham',
    recommendation: 'Pemahaman konsep interaksi sosial sangat baik.'
  },
  {
    topic_name: 'Konflik Sosial & Akomodasi',
    total_questions_attempted: 15,
    correct_count: 9,
    mastery_percentage: 60,
    status: 'Cukup Paham',
    recommendation: 'Perlu latihan tambahan pada materi bentuk-bentuk akomodasi (Arbitrase vs Mediasi).'
  },
  {
    topic_name: 'Metodologi Penelitian Sosial',
    total_questions_attempted: 12,
    correct_count: 5,
    mastery_percentage: 42,
    status: 'Perlu Remedial',
    recommendation: 'Disarankan mengulang Modul 3: Teknik Pengambilan Sampel & Analisis Data Kualitatif.'
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'ann_1',
    title: 'Jadwal Simulasi Tryout TKA Sosiologi Nasional 2026',
    category: 'Jadwal Ujian',
    date: '30 Juli 2026',
    author: 'Sahidin, S.Pd., Gr.',
    content: 'Simulasi Tryout CBT TKA Sosiologi dengan sistem penilaian IRT (Maksimal 200) & Skor Normal akan diselenggarakan serentak. Silakan berlatih menggunakan Paket Tryout 1 dan 2.',
  },
  {
    id: 'ann_2',
    title: 'Pembaruan Modul Pembelajaran Kelas 12: Teori Perubahan Sosial Modern',
    category: 'Pembaruan Materi',
    date: '28 Juli 2026',
    author: 'Sahidin, S.Pd., Gr.',
    content: 'Materi video dan rangkuman baru tentang Globalisasi, Modernisasi, dan Pemetaan Kearifan Lokal telah ditambahkan ke Modul Kelas 12.',
  },
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif_1',
    title: 'Misi CBT TKA Baru Dibuka!',
    message: 'Sahidin, S.Pd., Gr. menugaskan Tryout TKA Paket 1 (Penilaian IRT Maksimal 200 & Skor Normal). Kerjakan sebelum 2 Agustus 2026.',
    type: 'cbt' as const,
    date: 'Hari ini, 08:30',
    isRead: false,
    linkTab: 'cbt' as const,
  },
  {
    id: 'notif_2',
    title: 'Tugas Studi Kasus Kelompok',
    message: 'Sahidin, S.Pd., Gr. menambahkan Tugas Penelitian Sosial Kelompok untuk Rombel 12 SOSHUM.',
    type: 'task' as const,
    date: 'Kemarin, 14:15',
    isRead: false,
    linkTab: 'tasks' as const,
  },
  {
    id: 'notif_3',
    title: 'Tanggapan Guru di Forum Diskusi',
    message: 'Sahidin, S.Pd., Gr. merespons pertanyaan Anda tentang Teori Anomie Merton.',
    type: 'discussion' as const,
    date: '27 Juli 2026',
    isRead: true,
    linkTab: 'modules' as const,
  }
];


