import { Course, Exam, LeaderboardUser, TryoutAnalytics, User } from '../types';
import { INITIAL_STUDENT_USERS, INITIAL_CLASSROOM_STUDENTS, TEACHER_USER } from './studentsData';
import { TKA_COURSES_EXTRA } from './unitsData';
import { TKA_COURSES_EXTRA_2 } from './unitsData2';
import { TKA_EXAMS_EXTRA } from './examsDataExtra';
import { TKA_EXAMS_EXTRA_2 } from './examsDataExtra2';
import { TKA_EXAMS_EXTRA_3 } from './examsDataExtra3';
import { TKA_EXAMS_MISSING } from './examsDataExtra4';

export const INITIAL_USER: User = INITIAL_STUDENT_USERS[0];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = INITIAL_STUDENT_USERS.slice(0, 10).map((s, idx) => ({
  id: s.id,
  rank: idx + 1,
  name: s.name,
  school: 'SMAIT As-Syifa Boarding School Wanareja',
  grade: 12,
  xp: 0,
  badgeTitle: 'Siswa Baru',
  avatar: s.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(s.nisn)}`,
  change: 'same',
}));

export const TRYOUT_ANALYTICS_DATA: TryoutAnalytics[] = [];

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
4. Siapa Saja Tokoh-Tokoh Penting Lainnya? Selain Auguste Comte dan Herbert Spencer, ada banyak tokoh penting lain dalam perkembangan sosiologi, seperti Karl Marx, Max Weber, dan Charles H. Cooley.

Konsep Penting: Bapak Sosiologi
Auguste Comte adalah tokoh yang pertama kali memperkenalkan sosiologi pada tahun 1842 melalui bukunya "Positive-Philosophy".

Cara Mudah Membaca: Asal Sosiologi
Sosiologi lahir di Eropa karena guncangan revolusi industri dan revolusi Prancis.`
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
  Liza menjelaskan penyebab terjadinya praktik sex bebas di kalangan mahasiswa sesuai data di lapangan, bukan berdasarkan prasangka pribadi.

Konsep Penting: Karakteristik Sosiologi
Sosiologi memiliki 4 ciri utama: Empiris, Teoritis, Kumulatif, dan Non-etis.

Cara Mudah Membaca: Ciri Sosiologi
Ingat ETKN! Empiris (fakta), Teoritis (abstraksi), Kumulatif (diperbaiki), Non-etis (tidak menilai baik/buruk).

Studi Kasus: Sikap Non-etis
Seorang sosiolog meneliti fenomena geng motor. Sosiolog tersebut tidak menilai apakah perbuatan geng motor itu baik atau buruk, melainkan mencari tahu MENGAPA fenomena itu terjadi.`
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
  Liza melakukan penelitian mengenai cara pencegahan konflik pertanahan di Indonesia.

Konsep Penting: Ilmu Murni vs Terapan
Sosiologi sebagai ilmu murni (Pure Science) bertujuan mengembangkan ilmu pengetahuan, sedangkan sebagai ilmu terapan (Applied Science) bertujuan memecahkan masalah praktis masyarakat.`
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
Metode kualitatif merupakan penelitian yang dilakukan secara mendalam dengan sumber data berupa kata-kata lisan atau tertulis.

Cara Mudah Membaca: Kuantitatif vs Kualitatif
Kuantitatif berhubungan dengan angka dan statistik. Kualitatif berhubungan dengan makna, deskripsi, dan pemahaman mendalam.

Studi Kasus: Pemilihan Metode
Jika meneliti "Angka kemiskinan di desa X", gunakan Kuantitatif. Jika meneliti "Makna kemiskinan bagi warga desa X", gunakan Kualitatif.`
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
Kajian utama perspektif ini adalah adanya pertentangan antarkelas dan eksploitasi kelas dalam masyarakat sebagai penggerak utama kekuatan-kekuatan dalam sejarah.

Konsep Penting: Perspektif Sosiologi
Ada tiga perspektif utama: Struktural Fungsional, Konflik, dan Interaksionisme Simbolik.

Cara Mudah Membaca: Perbedaan Perspektif
Fungsional (Harmoni/Sistem), Konflik (Persaingan/Kekuasaan), Interaksionisme Simbolik (Makna/Individu).`
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
Kapitalisme muncul dan berkembang bersamaan dengan perkembangan ajaran Calvinisme dalam Protestan. Calvinisme mengajarkan umatnya untuk bekerja keras, disiplin, hidup sederhana, dan hemat. Dengan kerja keras umat Calvinis berharap mendapat kemakmuran yang menuntun ke surga.

Konsep Penting: Tokoh Sosiologi
Emile Durkheim (Fakta Sosial), Karl Marx (Konflik Kelas), Max Weber (Tindakan Sosial).

Cara Mudah Membaca: Tokoh Klasik
Durkheim fokus pada tatanan (struktur). Marx fokus pada ketimpangan (ekonomi). Weber fokus pada makna individu (tindakan).`
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
Masalah sosial merupakan fenomena sosial yang perlu dicari solusinya. Untuk mencari solusi tersebut diperlukan penelitian sosial. Dalam kegiatan penelitian sosial sosiolog mengamati perilaku masyarakat dan masalah sosial melalui pendekatan Sosiologi. Berdasarkan hasil penelitian, upaya mengatasi/solusi masalah sosial dapat ditemukan, selanjutnya diaplikasikan untuk mengatasi masalah sosial.

Konsep Penting: Fungsi Sosiologi
Fungsi sosiologi meliputi Perencanaan sosial, Penelitian, Pembangunan, dan Pemecahan masalah sosial.

Studi Kasus: Fungsi Pembangunan
Sosiolog memberikan data kebiasaan warga lokal kepada pemerintah sebelum membangun bendungan, agar pembangunan tidak ditolak warga.`
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
Dalam hal ini, sosiolog membantu individu atau kelompok dalam menghadapi masalah keberfungsian sosialnya secara efektif.

Cara Mudah Membaca: Peran Sosiolog
1. Ahli Riset (mencari data)
2. Konsultan Kebijakan (memberi masukan ke pemerintah)
3. Teknisi (terlibat langsung dalam program)
4. Pendidik (mengajar dan menyebarkan ilmu).`
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
    "id": "course_10_bab1",
    "title": "Sosiologi Kelas 10 Bab 1: Pengantar Sosiologi",
    "description": "Menyelami akar Sosiologi sebagai ilmu sosial, dari guncangan sosial di Eropa hingga perkembangannya di Indonesia.",
    "grade_level": 10,
    "category": "Konsep Dasar Sosiologi",
    "thumbnail": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600",
    "totalLessons": 6,
    "completedLessons": 0,
    "lessons": [
      {
        "id": "les_10_bab1_1",
        "title": "Pertemuan 1: Sejarah Perkembangan Sosiologi di Eropa dan Amerika",
        "text_body": "Sosiologi pada awalnya merupakan bagian dari filsafat sosial yang membahas masyarakat. Menurut Brigette Berger dan Peter L. Berger (dalam Sunarto, 2004), sosiologi berkembang menjadi ilmu yang berdiri sendiri karena adanya ancaman terhadap tatanan sosial yang selama ini dianggap seharusnya diterima saja (threats to the taken-for-granted world).\n\nL. Laeyendecker (dalam Sunarto, 2004) mengidentifikasi ancaman tersebut meliputi Revolusi Industri dan Revolusi Prancis, kapitalisme pada akhir abad ke-15, perubahan di bidang sosial dan politik, perubahan akibat gerakan reformasi yang dicetuskan Martin Luther, meningkatnya individualisme, lahirnya ilmu pengetahuan modern, dan berkembangnya kepercayaan pada diri sendiri. Menurut Laeyendecker, ancaman-ancaman tersebut menyebabkan perubahan-perubahan jangka panjang yang ketika itu sangat mengguncang masyarakat Eropa.\n\nAnthony Giddens (2001) menyatakan latar belakang lahirnya sosiologi adalah serangkaian perubahan besar yang disebabkan oleh dua revolusi besar yang terjadi di Eropa pada abad ke-18 dan abad ke-19. Kedua peristiwa ini secara permanen mengubah cara hidup manusia yang telah berlangsung selama ribuan tahun.\n\nAuguste Comte (1798-1857), seorang filsuf Prancis, melihat perubahan-perubahan yang terjadi pada masyarakat Eropa saat itu tidak saja berakibat positif, seperti berkembangnya demokrasi dalam masyarakat, tetapi juga berdampak negatif. Masyarakat tidak lagi mengetahui cara mengatasi perubahan akibat revolusi dan hukum-hukum yang dapat dipakai untuk mengatur tatanan sosial masyarakat. Comte menyarankan agar semua penelitian tentang masyarakat ditingkatkan menjadi suatu ilmu yang berdiri sendiri. Ia memberi nama bagi ilmu yang akan lahir itu dengan istilah sosiologi. Comte menyatakan bahwa sosiologi adalah ilmu tentang gejala sosial yang tunduk pada hukum alam dan tidak berubah-ubah. Demikian, atas jasanya terhadap lahirnya sosiologi Auguste Comte disebut sebagai Bapak Sosiologi.\n\nIstilah sosiologi dipopulerkan oleh Herbert Spencer (1820-1903), melalui buku Principles of Sociology. Di dalam buku tersebut. Spencer mengembangkan sistem penelitian tentang masyarakat, ia menerapkan teori evolusi organik pada masyarakat dan mengembangkan teori besar tentang evolusi sosial yang diterima secara luas di masyarakat.\n\nSosiologi baru berkembang menjadi sebuah ilmu setelah Emile Durkheim (1858-1917) mengembangkan metodologi sosiologi melalui bukunya, The Rules of Sociological Method (1895). Durkheim menyatakan bahwa sosiologi memiliki objek kajian yang jelas, yaitu fakta sosial. Sementara untuk metodologi, Durkheim mengemukakan konsep bebas nilai (value free).\n\nTokoh lain yang pemikirannya banyak berpengaruh dalam perkembangan sosiologi adalah Max Weber (1864-1920). Salah satu pemikirannya adalah mengenai perubahan sosial. Weber berpendapat bahwa ide dan nilai merupakan faktor yang sama pentingnya dengan ekonomi dalam perubahan sosial. Menurut Weber, motivasi dan ide-ide manusia merupakan pendorong terjadinya perubahan. Ia juga berpendapat bahwa struktur dalam masyarakat terbentuk dari serangkaian tindakan yang saling memengaruhi.\n\nSelain di Eropa, sosiologi juga berkembang di Benua Amerika. Salah satu sosiolog ternama dari Amerika Serikat adalah Talcott Parsons. Talcott Parsons dikenal dengan teorinya tentang mekanisme masyarakat dan prinsip organisasi yang melatarbelakangi struktur sosial. Parsons mengembangkan analisis fungsional dan menerapkannya pada berbagai karya tulisnya, salah satunya adalah The Social System (1951) yang secara rinci menguraikan fungsi berbagai struktur bagi dipertahankannya sistem sosial.\n\nCara Mudah Membaca: Sosiologi lahir karena adanya ancaman terhadap tatanan sosial yang stabil (threats to the taken-for-granted world). Ingat dua pemicu utama: Revolusi Industri (ekonomi) dan Revolusi Prancis (politik)!\n\nKonsep Penting: Fakta Sosial dan Bebas Nilai\nMenurut Emile Durkheim, sosiologi memiliki objek kajian yang jelas, yaitu *fakta sosial*. Fakta sosial adalah cara bertindak, berpikir, dan merasa yang berada di luar individu dan memiliki daya paksa. Durkheim juga mengemukakan konsep bebas nilai (value free).\n\nStudi Kasus: Mengapa Sosiologi Muncul di Eropa, Bukan di Asia?\nCoba bayangkan Anda hidup di Eropa pada abad ke-18. Mesin uap ditemukan, memicu Revolusi Industri. Ratusan ribu petani bermigrasi ke kota mencari kerja, namun berujung pada kota yang kumuh, polusi, dan kemiskinan baru. Di saat yang sama, Revolusi Prancis meruntuhkan kekuasaan raja. Tatanan masyarakat yang ratusan tahun tenang, tiba-tiba runtuh seketika. Di tengah kekacauan (chaos) inilah, para pemikir seperti Auguste Comte menyadari perlunya sebuah ilmu khusus untuk mendiagnosis \"penyakit\" masyarakat dan mengembalikan keteraturan, yang kemudian dinamakan Sosiologi.\n\nTimeline: Urutan Tokoh Sosiologi Klasik\n- Auguste Comte (1798-1857): Bapak Sosiologi yang memberi nama ilmu ini.\n- Herbert Spencer (1820-1903): Mempopulerkan sosiologi lewat analogi evolusi biologi.\n- Emile Durkheim (1858-1917): Mengukuhkan sosiologi sebagai ilmu empiris dengan metode yang ketat.\n- Max Weber (1864-1920): Mengkaji pentingnya ide, nilai, dan tindakan sosial manusia dalam perubahan.",
        "course_id": "course_10_bab1",
        "chapter_number": 1,
        "chapter_title": "Bab 1: Pengantar Sosiologi",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      },
      {
        "id": "les_10_bab1_2",
        "title": "Pertemuan 2: Sejarah Perkembangan Sosiologi di Indonesia",
        "text_body": "Sosiologi di Indonesia mengalami perkembangan yang cukup signifikan setelah Proklamasi Kemerdekaan tanggal 17 Agustus 1945. Soenario Kolopaking adalah orang yang pertama kali memberikan kuliah sosiologi dalam bahasa Indonesia pada tahun 1948 di Akademi Ilmu Politik Yogyakarta (sekarang menjadi Fakultas Ilmu Sosial dan Politik UGM).\n\nSejak saat itu, sosiologi mulai mendapat tempat dalam insan akademisi di Indonesia, apalagi setelah semakin terbukanya kesempatan bagi masyarakat Indonesia untuk menuntut ilmu di luar negeri. Sejak tahun 1950, banyak pelajar Indonesia yang khusus memperdalam sosiologi di luar negeri kemudian mengajarkan ilmu itu di Indonesia.\n\nBuku sosiologi dalam bahasa Indonesia pertama kali ditulis oleh Djody Gondokusumo dengan judul Sosiologi Indonesia (1946) yang memuat beberapa pengertian mendasar dari sosiologi. Sekitar tahun 1950, muncul buku Sosiologi yang diterbitkan oleh Bardosono yang merupakan sebuah diktat kuliah sosiologi mahasiswa.\n\nSelanjutnya, bermunculan buku-buku sosiologi baik yang ditulis oleh orang Indonesia maupun terjemahan dari bahasa asing. Contohnya, buku Sosiologi untuk Masyarakat Indonesia (1920) karya Hassan Shadily (catatan: tahun 1920 kemungkinan merujuk pada era awal atau karya klasik, namun literatur Shadily banyak berkembang pasca-kemerdekaan) dan buku Social Changes in Yogyakarta (1962) karya Selo Soemardjan.\n\nTulisan-tulisan tentang masalah-masalah sosiologi juga tersebar di berbagai majalah, koran, dan jurnal. Selain itu, muncul pula fakultas ilmu sosial dan politik di berbagai universitas di Indonesia. Di beberapa universitas, didirikan jurusan sosiologi yang diharapkan dapat mempercepat dan memperluas perkembangan sosiologi di Indonesia.\n\nTokoh yang juga sangat berperan dalam perkembangan sosiologi di Indonesia adalah Selo Soemardjan. Selain banyak menulis buku sosiologi, Soemardjan juga mengajar sosiologi di Universitas Indonesia (UI) dan merupakan pendiri Fakultas Ilmu Pengetahuan Kemasyarakatan (sekarang menjadi Fakultas Ilmu Sosial dan Ilmu Politik) di universitas tersebut. Perannya yang besar membuat Selo Soemardjan dikenal sebagai Bapak Sosiologi Indonesia.\n\nTugas: Menganalisis Sejarah Lokal\nCarilah satu peristiwa sejarah di daerahmu (misal: perang kemerdekaan, pembentukan desa, atau masuknya agama tertentu). Analisislah bagaimana peristiwa tersebut mempengaruhi tatanan sosial masyarakat saat itu. Apakah ada perubahan kelas sosial atau nilai-nilai baru yang muncul?",
        "course_id": "course_10_bab1",
        "chapter_number": 1,
        "chapter_title": "Bab 1: Pengantar Sosiologi",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      },
      {
        "id": "les_10_bab1_3",
        "title": "Pertemuan 3: Pengertian dan Objek Kajian Sosiologi",
        "text_body": "Istilah sosiologi berasal dari kata socius dan logos. Socius (bahasa Latin) berarti 'kawan' dan logos (bahasa Yunani) berarti 'kata' atau 'berbicara'. Menurut Kamus Besar Bahasa Indonesia (KBBI), sosiologi adalah pengetahuan atau ilmu tentang sifat, perilaku, dan perkembangan masyarakat; ilmu tentang struktur sosial, proses sosial, dan perubahannya.\n* Max Weber: Sosiologi mempelajari tindakan-tindakan sosial.\n* Pitirim A. Sorokin: Sosiologi mempelajari hubungan dan pengaruh timbal balik antara aneka macam gejala-gejala sosial.\n* William F. Ogburn & Meyer F. Nimkoff: Sosiologi adalah ilmu tentang penelitian ilmiah terhadap interaksi sosial dan hasilnya adalah organisasi sosial.\n* Anthony Giddens: Sosiologi merupakan studi tentang kehidupan sosial manusia, kelompok, dan masyarakat.\n* Soerjono Soekanto: Sosiologi merupakan ilmu yang mempelajari masyarakat secara keseluruhan dan hubungan-hubungan antara orang-orang dalam masyarakat.\n* Selo Soemardjan dan Soelaiman Soemardi: Sosiologi adalah ilmu yang mempelajari struktur sosial dan proses sosial, termasuk perubahan sosial.\n* Joseph Roucek dan Roland Warren: Sosiologi adalah ilmu yang mempelajari hubungan antarmanusia.\n\nObjek kajian sosiologi adalah masyarakat.\n* Selo Soemardjan mengatakan bahwa masyarakat adalah orang-orang yang hidup bersama dan menghasilkan kebudayaan.\n* J. L. Gillin dan J. P. Gillin mengatakan bahwa masyarakat adalah kelompok manusia yang terbesar. Mereka mempunyai kebiasaan, tradisi, sikap, dan perasaan persatuan yang sama.\n* Auguste Comte, masyarakat merupakan kelompok makhluk hidup dengan realitas-realitas baru yang berkembang menurut hukum-hukumnya sendiri dan pola perkembangan tersendiri.\n\nDalam mempelajari masyarakat sebagai objek kajian, sosiologi memfokuskan studinya pada:\na. hubungan timbal balik antara manusia satu dan manusia lainnya;\nb. hubungan antara individu dan kelompok;\nc. hubungan antara kelompok yang satu dan kelompok lainnya; dan\nd. proses yang timbul dari hubungan-hubungan tersebut dalam masyarakat.\n\nMax Weber melihat bahwa pokok kajian sosiologi adalah tindakan sosial. Namun, tidak semua tindakan manusia dapat dianggap sebagai tindakan sosial. Suatu tindakan disebut tindakan sosial hanya jika tindakan tersebut dilakukan dengan mempertimbangkan perilaku orang lain. Max Weber mengelompokkan tindakan sosial menjadi empat, yaitu tindakan tradisional, tindakan afektif, tindakan rasional instrumental, dan tindakan rasionalitas berorientasi nilai.\n\nC. Wright Mills, pokok bahasan sosiologi adalah imajinasi sosiologi (sociological imagination). Dalam buku \"The Sociological Imagination\" (1959), Mills menyebutkan bahwa imajinasi sosiologi diperlukan untuk dapat memahami apa yang terjadi di masyarakat maupun yang ada dalam diri manusia.\n\nPeter L. Berger, pokok bahasan sosiologi adalah pengungkapan realitas sosial. Seorang sosiolog harus bisa menyingkap berbagai fenomena yang menjadi suatu realitas yang tidak terduga.\n\nKonsep Penting: Imajinasi Sosiologi\nC. Wright Mills menekankan pada kemampuan melihat hubungan antara pengalaman personal dan kekuatan sosial yang lebih besar.\n\nCara Mudah Membaca: Ingat 4 jenis tindakan Weber dengan akronim TARA: Tradisional, Afektif, Rasional Instrumental, dan Rasional nilai.",
        "course_id": "course_10_bab1",
        "chapter_number": 1,
        "chapter_title": "Bab 1: Pengantar Sosiologi",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      },
      {
        "id": "les_10_bab1_4",
        "title": "Pertemuan 4: Sosiologi sebagai Ilmu Pengetahuan",
        "text_body": "Sosiologi merupakan ilmu pengetahuan yang berdiri sendiri karena telah memenuhi segenap unsur-unsur ilmu pengetahuan. Adapun ciri-ciri sosiologi sebagai ilmu pengetahuan adalah sebagai berikut.\n* a. Sosiologi bersifat empiris. Sosiologi tidak spekulatif dan hanya menggunakan akal sehat. Sosiologi melakukan kajian tentang masyarakat berdasarkan hasil observasi.\n* b. Sosiologi bersifat teoretis. Sosiologi berusaha menyusun abstraksi dari hasil-hasil observasi. Abstraksi adalah kerangka dari unsur-unsur yang didapat dari observasi, disusun secara logis. Tujuannya juga menjelaskan hubungan sebab akibat.\n* c. Sosiologi bersifat kumulatif. Teori-teori sosiologi dibentuk berdasarkan teori-teori yang telah ada sebelumnya, dalam arti memperbaiki, memperluas, dan memperhalus teori-teori lama.\n* d. Sosiologi bersifat nonetis. Sosiologi tidak mencari baik atau buruk suatu fakta, tetapi menjelaskan fakta-fakta tersebut secara analitis.\n\nKonsep Penting: Sifat Ilmu Sosiologi\nEmpiris, Teoretis, Kumulatif, dan Nonetis.\n\nCara Mudah Membaca: Sosiologi itu ETKN (Empiris, Teoretis, Kumulatif, Nonetis).",
        "course_id": "course_10_bab1",
        "chapter_number": 1,
        "chapter_title": "Bab 1: Pengantar Sosiologi",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      },
      {
        "id": "les_10_bab1_5",
        "title": "Pertemuan 5: Sosiologi sebagai Ilmu dengan Paradigma Ganda",
        "text_body": "Paradigma dapat diartikan sebagai kerangka teoretis (theoretical framework), kerangka konseptual (conceptual framework), kerangka pemikiran (frame of thinking), sudut pandang (perspective), atau pendekatan (approach). Ritzer menyatakan paradigma adalah pandangan yang mendasar dari ilmuwan tentang apa yang menjadi pokok persoalan yang semestinya dipelajari suatu cabang ilmu pengetahuan.\n\nGeorge Ritzer dan Wendy W. Murphy dalam bukunya, Introduction to Sociology (2020), menulis bahwa sosiologi tidak memiliki sebuah paradigma dominan atau tunggal. Sosiologi merupakan ilmu dengan berbagai paradigma atau paradigma ganda (multiple-paradigm science).\n\nDalam bukunya, Sociology: A Multiple Paradigm Science (1975), Ritzer menyatakan ada tiga paradigma utama sosiologi. Ketiganya adalah paradigma fakta sosial (social facts), definisi sosial (social-definition), dan perilaku sosial (social-behavior).\n\na. Paradigma Fakta Sosial\nModel paradigma ini adalah karya Emile Durkheim, khususnya buku The Rules of Sosiological Method dan Suicide. Berdasarkan paradigma ini, kajian sosiologi adalah fakta sosial, baik sesuatu yang berbenda atau nyata ada (material entity) dan tidak nyata ada (non material entity), seperti ide atau gagasan. Teori yang termasuk paradigma ini antara lain teori fungsionalisme struktural, teori konflik, dan teori sistem.\n\nb. Paradigma Definisi Sosial\nModel paradigma ini adalah berbagai karya Max Weber tentang tindakan sosial (social action). Weber tertarik pada makna subyektif yang diberikan individu terhadap tindakan yang dilakukannya. Bagi Weber, pokok persoalan ilmu sosial adalah hal mikro seperti proses pendefinisian sosial dan akibat-akibat dari suatu aksi serta interaksi sosial, bukan hal makro seperti struktur sosial atau pranata sosial. Teori yang termasuk paradigma ini antara lain teori tindakan sosial (action theory), teori interaksionisme simbolik (symbolic interactionism), teori fenomenologi (phenomenology), dan eksistensialisme (existentialism).\n\nc. Paradigma Perilaku Sosial\nModel paradigma ini adalah karya B. F. Skinner. Subyek dari paradigma ini adalah perilaku (behavior) individu yang menimbulkan akibat atau perubahan terhadap tindakan selanjutnya, khususnya penghargaan (reward) yang memancing perilaku yang diinginkan serta hukuman (punishment) yang mencegah perilaku yang tidak diinginkan. Menurut teori ini, manusia bukan makhluk bebas, seseorang menyesuaikan perilaku terkait respons terhadap lingkungan sosialnya. Teori yang termasuk paradigma ini antara lain teori pertukaran (exchange theory).\n\nKonsep Penting: Paradigma Ganda Sosiologi\nSosiologi tidak memiliki paradigma tunggal. Ritzer membaginya menjadi tiga: Fakta Sosial, Definisi Sosial, dan Perilaku Sosial.",
        "course_id": "course_10_bab1",
        "chapter_number": 1,
        "chapter_title": "Bab 1: Pengantar Sosiologi",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      },
      {
        "id": "les_10_bab1_6",
        "title": "Pertemuan 6: Fungsi, Peran Sosiologi, dan Hubungannya dengan Ilmu Lain",
        "text_body": "Sosiologi merupakan ilmu pengetahuan murni, karena sosiologi memiliki pengetahuan (knowledge), sistematis, dan objektif. Sosiologi disebut sebagai ilmu pengetahuan terapan karena sosiologi menggunakan cara-cara pengetahuan ilmiah untuk memecahkan masalah-masalah praktis.\n\na. Fungsi Sosiologi\nFungsi sosiologi bagi masyarakat adalah sebagai berikut.\n1. Untuk pembangunan: Sosiologi berfungsi untuk memberikan data sosial yang diperlukan pada tahap perencanaan, pelaksanaan, maupun penilaian pembangunan.\n2. Untuk penelitian: Berdasarkan data yang dihasilkan dari penelitian sosiologis, para pengambil keputusan dapat menyusun rencana penyelesaian suatu masalah sosial.\n3. Untuk advokasi kebijakan: Sosiologi berfungsi sebagai basis data dan sumber berlangsungnya advokasi kebijakan dalam isu-isu publik, seperti pemberdayaan masyarakat marjinal (kelas buruh, petani, dan nelayan) atau konflik horizontal di masyarakat.\n\nb. Peran Sosiologi (Bentuk-bentuk peran sosiolog)\n1. Sosiolog sebagai ahli riset: Berfokus pada pengumpulan dan penggunaan data. Sosiolog melakukan riset ilmiah.\n2. Sosiolog sebagai konsultan kebijakan: Prediksi sosiologi dapat membantu memperkirakan pengaruh kebijakan sosial yang mungkin terjadi.\n3. Sosiolog sebagai praktisi: Beberapa sosiolog terlibat dalam perencanaan dan pelaksanaan kegiatan masyarakat.\n4. Sosiolog sebagai guru atau pendidik: Mengajar merupakan salah satu kegiatan yang dapat digeluti.\n\nHubungan Sosiologi dengan Ilmu Lain\nSeorang sosiolog, sama seperti psikolog, antropolog, ilmuwan politik, ahli ekonomi, dan ilmuwan sosial lainnya, mempelajari perilaku sosial dan perubahan sosial (Andersen, 2007). Perbedaan antara sosiologi dan disiplin ilmu lainnya bukan pada topik masing-masing penelitian, tetapi dalam perspektif disiplin masing-masing terhadap objek kajiannya.\n\nCara Mudah Membaca: Peran Sosiolog\nIngat 4 peran: Riset, Konsultan, Praktisi, dan Pendidik (RKPP).",
        "course_id": "course_10_bab1",
        "chapter_number": 1,
        "chapter_title": "Bab 1: Pengantar Sosiologi",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      }
    ]
  },
  {
    "id": "course_10_bab2",
    "title": "Sosiologi Kelas 10 Bab 2: Gejala Sosial dalam Masyarakat Multikultural",
    "description": "Mengidentifikasi gejala-gejala sosial, menganalisisnya dalam masyarakat multikultural, dan memahami konsep multikulturalisme.",
    "grade_level": 10,
    "category": "Masyarakat Multikultural",
    "thumbnail": "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=600",
    "totalLessons": 6,
    "completedLessons": 0,
    "lessons": [
      {
        "id": "les_10_bab2_1",
        "title": "Pertemuan 1: Hakikat dan Karakteristik Gejala Sosial",
        "text_body": "Gejala sosial adalah peristiwa-peristiwa yang terjadi di antara dan oleh manusia, baik secara individu maupun secara kelompok (Gulo, 2010). Suatu peristiwa atau proses disebut gejala sosial karena perilaku oleh individu yang terlibat di dalamnya saling terkait. Menurut tokoh sosiologi klasik Émile Durkheim, gejala sosial harus dipahami sebagai fakta objektif yang berada di luar subjek atau di luar diri individu (social facts).\n\nGejala sosial sangat luas, antara lain mencakup gejala ekonomi, politik, budaya, dan moral. Hal ini sangat berbeda dengan gejala alam. Gejala-gejala alam adalah peristiwa-peristiwa yang berlangsung di alam raya dan bukan karena perbuatan manusia secara langsung. Sebaliknya, gejala sosial murni muncul akibat aktivitas dan dinamika masyarakat.\n\nAktivitas masyarakat ini mempunyai pengaruh yang sangat kuat dalam menentukan kegiatan individu, bahkan seringkali lebih kuat daripada sekadar pengaruh lingkungan geografis atau lingkungan teknis. Setiap gejala sosial bisa menjadi dampak sekaligus penyebab dari gejala sosial yang lain. Misalnya, keyakinan agama memengaruhi praktik ekonomi, atau kepentingan ekonomi ikut menentukan arah kebijakan politik.\n\nKarakteristik Gejala Sosial:\n* KOMpleks (Rumit dan saling berkaitan)\n* Objektif kurang (Lebih condong kualitatif dan subjektif per wilayah)\n* Dinamis (Terus berubah, tidak statis)\n* Over (Beranekaragam wujudnya)\n* Tidak Universal (Hanya berlaku di lingkungan masyarakat tertentu saja)\n* Ada kualitatif (Bersifat kualitatif, sulit diukur matematis pasti)\n* Diprediksi sulit (Sulit diramalkan ujungnya)\n* Irrasional seringkali (Tidak mudah dimengerti)\n\nDefinisi: Gejala Sosial\nFakta objektif yang berada di luar subjek (Durkheim).\n\nStudi Kasus: Kemacetan Lalu Lintas\nKemacetan bukan hanya masalah teknis, tapi gejala sosial yang melibatkan perilaku pengguna jalan, kebijakan, dan urbanisasi.",
        "course_id": "course_10_bab2",
        "chapter_number": 2,
        "chapter_title": "Bab 2: Gejala Sosial dalam Masyarakat Multikultural",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      },
      {
        "id": "les_10_bab2_2",
        "title": "Pertemuan 2: Bentuk, Jenis, dan Tingkatan Gejala Sosial",
        "text_body": "A. Bentuk dan Jenis Gejala Sosial\nMenurut pandangan Guglielmo Carchedi, gejala sosial dapat dikelompokkan ke dalam dua bentuk struktural utama:\n* Bentuk gejala sosial yang menentukan (the determinant social phenomenon): Ini adalah kondisi akar yang mengondisikan atau memunculkan keberadaan gejala lain. Contohnya, krisis ekonomi.\n* Bentuk gejala sosial yang ditentukan (the determined social phenomenon): Ini adalah efek atau kondisi reproduksi dari gejala penentu tadi. Contohnya, meningkatnya angka pengangguran akibat krisis ekonomi.\n\nSelain bentuk, sosiolog ternama Pitirim A. Sorokin membagi jenis gejala sosial ke dalam pengelompokan yang lebih aplikatif:\n* Gejala sosial religius: Terkait sistem keagamaan (misal: perayaan hari raya bersama).\n* Gejala sosial ekonomi: Terkait pemenuhan kebutuhan hidup (misal: inflasi harga sembako, maraknya UMKM).\n* Gejala sosial politik: Terkait kekuasaan dan pemerintahan (misal: pemilu, unjuk rasa).\n* Gejala sosial hukum: Terkait kepatuhan pada aturan tertulis negara.\n\nB. Tingkatan Gejala Sosial\nMenurut Norman Blaikie, skala terjadinya gejala sosial sangat bervariasi. Terdapat tiga tingkatan utama:\n* Gejala Sosial Mikro: Skala individu dan kelompok kecil.\n* Gejala Sosial Meso: Skala organisasi, lembaga, kelompok sosial menengah.\n* Gejala Sosial Makro: Berskala besar seperti kota, negara, bahkan badan multinasional.\n\nKonsep Penting: Skala Gejala Sosial\nMikro (individu), Meso (organisasi), Makro (global/negara).",
        "course_id": "course_10_bab2",
        "chapter_number": 2,
        "chapter_title": "Bab 2: Gejala Sosial dalam Masyarakat Multikultural",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      },
      {
        "id": "les_10_bab2_3",
        "title": "Pertemuan 3: Perbedaan dan Struktur Sosial dalam Masyarakat",
        "text_body": "Dalam kehidupan masyarakat luas, keberagaman melahirkan berbagai perbedaan sosial. Perbedaan ini tak berdiri sendiri, melainkan terstruktur ke dalam sebuah sistem yang disebut Struktur Sosial.\n\nPara ahli Sosiologi memiliki definisi khas untuk mendeskripsikan kerangka ini:\n* George C. Homans: Struktur sosial adalah perilaku sosial elementer dalam kehidupan sehari-hari masyarakat.\n* Talcott Parsons: Struktur ditekankan pada sistem keterkaitan antarmanusia yang ajeg.\n* James Samuel Coleman: Melihatnya sebagai pola hubungan antarmanusia dan antarkelompok manusia.\n* William Kornblum: Menitikberatkan pada pola perilaku berulang-ulang yang sukses menciptakan ikatan antarindividu/kelompok.\n* Soerjono Soekanto: Melihat struktur sebagai hubungan timbal balik antara posisi-posisi sosial (status) dan peranan-peranan sosial (role).\n* Abdul Syani: Sebuah tatanan sosial yang merupakan jaringan dari unsur pokok seperti kelompok, kebudayaan, kekuasaan, wewenang, dan stratifikasi.\n\nStruktur Horizontal dan Vertikal di Indonesia\nMenurut tokoh sosiolog nasional, J. Nasikun, struktur masyarakat Indonesia secara spesifik dapat dipotret dari dua sudut pandang:\n* Secara Horizontal: Ditandai dengan kenyataan adanya kesatuan sosial budaya berdasar perbedaan suku bangsa, agama, dan adat. Ini sering disebut sebagai Diferensiasi Sosial. Diferensiasi berarti 'berbeda, tetapi sejajar letaknya'.\n* Secara Vertikal: Ditandai dengan kenyataan adanya lapisan masyarakat atau sistem tingkatan kekayaan, kekuasaan, hingga pendidikan. Ini secara akademis disebut sebagai Stratifikasi Sosial.\n\nKonsep Penting: Horizontal vs Vertikal\nHorizontal = Diferensiasi (Kesetaraan). Vertikal = Stratifikasi (Hierarki).\n\nCara Mudah Membaca: Diferensiasi itu menyamping (sama rata), Stratifikasi itu menanjak (berkelas).",
        "course_id": "course_10_bab2",
        "chapter_number": 2,
        "chapter_title": "Bab 2: Gejala Sosial dalam Masyarakat Multikultural",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      },
      {
        "id": "les_10_bab2_4",
        "title": "Pertemuan 4: Pendalaman Stratifikasi dan Diferensiasi Sosial",
        "text_body": "1. Stratifikasi Sosial (Pembedaan Vertikal)\nIstilah stratifikasi berasal dari kata stratum (lapisan). Menurut Pitirim A. Sorokin, stratifikasi sosial adalah pembedaan penduduk atau masyarakat ke dalam kelas-kelas yang tersusun secara bertingkat (hierarki).\n\nTerdapat tiga bentuk sistem stratifikasi sosial yang dijabarkan oleh Soerjono Soekanto:\n* Pelapisan Terbuka (Open Stratification): Setiap orang memiliki kesempatan emas untuk naik kelas berdasarkan prestasinya.\n* Pelapisan Tertutup (Closed Stratification): Sangat ketat dan sulit berpindah kelas, karena kelas didasarkan pada keturunan biologis (contoh: Sistem Kasta di masyarakat Hindu ortodoks).\n* Pelapisan Campuran: Perpaduan keduanya.\n\n2. Diferensiasi Sosial (Pembedaan Horizontal)\nDiferensiasi berakar pada kenyataan keragaman setara di muka bumi. Pengelompokan ini murni berdasarkan atribut yang sejajar, di antaranya:\n* Diferensiasi Ras: Tokoh Ralph Linton membagi secara umum menjadi Ras Mongoloid, Kaukasoid, dan Negroid.\n* Diferensiasi Suku Bangsa (Etnis): Pengelompokan berdasar budaya dan identitas kesukuan.\n* Diferensiasi Klan: Kesatuan keturunan darah berdasar garis ayah (Patrilineal) dan ibu (Matrilineal).\n* Diferensiasi Agama: Indonesia negara Pancasila mengakui Islam, Protestan, Katolik, Hindu, Buddha, dan Konghucu secara setara di mata konstitusi.\n\nCara Mudah Membaca: Stratifikasi dan Diferensiasi\nStratifikasi ada 3 jenis: Terbuka, Tertutup, Campuran. Diferensiasi contohnya Ras, Suku, Klan, Agama.",
        "course_id": "course_10_bab2",
        "chapter_number": 2,
        "chapter_title": "Bab 2: Gejala Sosial dalam Masyarakat Multikultural",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      },
      {
        "id": "les_10_bab2_5",
        "title": "Pertemuan 5: Heterogenitas, Prasangka, dan Stereotipe",
        "text_body": "Kombinasi luar biasa dari stratifikasi (vertikal) dan diferensiasi (horizontal) menghasilkan apa yang disebut dengan Heterogenitas. Dalam masyarakat perkotaan yang modern, heterogenitas (keanekaragaman) yang kompleks adalah sebuah keniscayaan tak terelakkan. Heterogenitas ini lahir dari spesialisasi fungsi; masyarakat tidak lagi sekadar petani yang homogen, melainkan ada yang bekerja sebagai dokter, buruh pabrik, teknisi, guru, hingga content creator.\n\n1. Prasangka (Prejudice)\nPrasangka dalam hubungan antar kelompok merupakan sikap bermusuhan (antipati) atau mencurigai yang ditujukan pada kelompok tertentu atas dasar dugaan atau firasat tanpa bukti empiris (fakta) yang memadai. Menurut pakar sosial Michael Banton, prasangka mirip dengan istilah antagonisme (rasa permusuhan).\n\n2. Stereotipe\nBerbeda tipis namun amat berkaitan dengan prasangka, Stereotipe adalah 'Labeling' atau 'Asumsi Pikiran' yang teramat kaku dan menyederhanakan (over-simplified) terhadap kelompok sosial. William Kornblum menyebutnya sebagai citra kaku tak berdasar. Bedanya, stereotipe berada pada level pandangan (kognitif), sementara prasangka berada pada emosi (afektif). Stereotipe tidak selalu negatif (meski banyak yang negatif).\n\nDefinisi: Prasangka vs Stereotipe\nPrasangka adalah sikap (emosi negatif), sedangkan stereotipe adalah pandangan (label kognitif).",
        "course_id": "course_10_bab2",
        "chapter_number": 2,
        "chapter_title": "Bab 2: Gejala Sosial dalam Masyarakat Multikultural",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      },
      {
        "id": "les_10_bab2_6",
        "title": "Pertemuan 6: Mewujudkan Masyarakat Multikultural",
        "text_body": "Di tengah gempuran heterogenitas, stratifikasi, diferensiasi, prasangka, dan stereotipe, bagaimana sebuah negara besar seperti Indonesia bisa bertahan? Jawabannya terletak pada paradigma luhur: Multikulturalisme.\n\n1. Hakikat Masyarakat Multikultural\nMasyarakat multikultural adalah tingkat paripurna dari interaksi sosial modern. Multikulturalisme adalah ideologi, yakni sebuah paham yang mengakui sekaligus menjamin kesederajatan (kesetaraan hak, kewajiban, dan martabat) bagi semua kelompok sosial yang berbeda-beda tanpa mengenal dominasi kelompok mayoritas maupun minoritas. Jantung dari multikulturalisme adalah 'Kesederajatan di dalam Perbedaan'.\n\n2. Karakteristik Masyarakat Multikultural (Pierre L. van den Berghe)\n* Masyarakat terbagi (segmentasi) ke dalam kelompok sub-kebudayaan berbeda.\n* Lembaga sosial yang tumbuh cenderung nonkomplementer (kurang melengkapi).\n* Kesulitan dalam mengembangkan konsensus (kesepakatan) nilai dasar.\n* Relatif sering mengalami pergesekan konflik horizontal ringan.\n* Integrasi nasional terjadi sering karena paksaan struktur/kebergantungan rantai ekonomi antar-etnis.\n* Secara historis, ada kecenderungan dominasi politik satu kelompok atas kelompok lain.\n\n3. Nilai-Nilai Mulia Multikultural & Faktor Pendorong (H.A.R Tilaar)\nMencegah perpecahan, kita harus menumbuhkan nilai: Demokratis, Pluralisme, dan Humanisme.\n\n4. Multikulturalisme di Indonesia\nMengapa Nusantara kita ini luar biasa majemuk? Jawabannya ada pada akar pembentuknya: letak geografis silang perdagangan, kondisi kepulauan, serta struktur tanah & iklim yang melahirkan ragam bentuk mata pencaharian adaptif. Untuk menjaga ini, kita wajib melawan patologi sosial berupa etnosentrisme (budayaku yang paling benar) dan primordialisme sempit.\n\nDefinisi: Multikulturalisme\nIdeologi yang mengakui dan mengagungkan kesederajatan semua kelompok sosial.",
        "course_id": "course_10_bab2",
        "chapter_number": 2,
        "chapter_title": "Bab 2: Gejala Sosial dalam Masyarakat Multikultural",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      }
    ]
  },
  {
    "id": "course_10_bab3",
    "title": "Sosiologi Kelas 10 Bab 3: Identitas Diri, Tindakan Sosial, dan Hubungan Sosial",
    "description": "Mengupas eksistensi kita di tengah masyarakat melalui identitas diri, tindakan sosial (Max Weber), dan hubungan sosial.",
    "grade_level": 10,
    "category": "Tindakan & Hubungan Sosial",
    "thumbnail": "https://images.unsplash.com/photo-1529156069898-49953eb1b5ce?auto=format&fit=crop&q=80&w=600",
    "totalLessons": 6,
    "completedLessons": 0,
    "lessons": [
      {
        "id": "les_10_bab3_1",
        "title": "Pertemuan 1: Hakikat Manusia dan Identitas Diri",
        "text_body": "Manusia pada hakikatnya hidup sebagai makhluk individu sekaligus makhluk sosial. Sebagai makhluk individu, manusia memiliki kepribadian yang unik. Kata individu dalam konsep manusia menunjukkan bahwa manusia adalah makhluk yang otonom.\n\nSelain sebagai makhluk individu, manusia juga merupakan makhluk sosial. Menurut filsuf klasik Aristoteles, manusia pada kodratnya adalah zoon politikon atau makhluk sosial. Dia tidak akan memperoleh keutamaan dan menjadi baik jika dia tidak mempunyai teman dan hidup terasing dari masyarakatnya.\n\nDalam Kamus Besar Bahasa Indonesia (KBBI), identitas diartikan sebagai ciri-ciri atau keadaan khusus seseorang; jati diri. Richard Jenkins (1996) dalam Giddens (2009) menyebutkan bahwa identitas adalah pemahaman kita atas siapa diri kita dan atas siapa orang-orang lainnya, serta termasuk pemahaman orang-orang tersebut atas diri mereka dan atas diri kita. Dengan demikian, identitas manusia pasti merupakan 'identitas sosial' karena terbentuk melalui proses interaksi sosial yang terus-menerus.\n\nMenurut sosiolog Anthony Giddens (2009), identitas dapat dibedakan menjadi dua jenis utama:\n* Identitas primer: Adalah identitas yang terbentuk pada awal kehidupan individu di lingkungan terdekat, termasuk di dalamnya gender, ras, dan etnis.\n* Identitas sekunder: Adalah identitas yang dibentuk dari pengembangan identitas primer dan mencakup juga identitas yang terkait erat dengan peran serta status sosial di masyarakat luas.\n\nTimeline: Pembentukan Identitas\nBayi (Identitas Primer dari keluarga/etnis) -> Dewasa (Identitas Sekunder dari profesi/status).",
        "course_id": "course_10_bab3",
        "chapter_number": 3,
        "chapter_title": "Bab 3: Identitas Diri, Tindakan Sosial, dan Hubungan Sosial",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      },
      {
        "id": "les_10_bab3_2",
        "title": "Pertemuan 2: Multidimensi Identitas, Status, dan Peran Sosial",
        "text_body": "Identitas seseorang dalam kelompok atau masyarakat tentu tidak akan dilihat dari satu sudut pandang saja, melainkan akan dilihat dari sudut pandang, cara, dan ukuran yang sangat beragam. Berbagai sudut pandang, cara, dan ukuran dari identitas seseorang tersebut dinamakan dengan multidimensi identitas.\n\nKetika kita membahas tentang identitas individu maupun kelompok di dalam masyarakat, kita pasti akan membahas pula tentang status dan peran yang disandangnya secara simultan. Ini berarti bahwa setiap individu di masyarakat memiliki beberapa status atau kedudukan yang disandang sekaligus dalam satu waktu kehidupan mereka.\n\nStatus atau kedudukan seseorang di masyarakat terkait erat dengan hak, kewajiban, dan tanggung jawab yang harus dilaksanakannya secara konsisten. Status atau kedudukan dapat didefinisikan sebagai posisi secara umum seseorang di dalam struktur masyarakat dalam hubungannya dengan orang-orang lain di sekitarnya. Misalnya, status sebagai guru, siswa, orang tua, atau anak.\n\nTiap status yang dimiliki seseorang memiliki peran yang disandangnya secara inheren. Peran adalah perilaku yang diharapkan oleh pihak lain atau masyarakat terhadap seseorang dalam melaksanakan hak dan kewajiban sesuai dengan status yang disandangnya tersebut. Status bersifat struktural-statis, sedangkan peran bersifat fungsional-dinamis. Konflik peran dapat terjadi ketika seseorang memiliki multidimensi status yang menuntut ekspektasi perilaku yang saling bertabrakan satu sama lain.\n\nStudi Kasus: Konflik Peran\nSeorang polisi (peran aparat penegak hukum) harus menilang anaknya sendiri (peran ayah) yang melanggar lampu merah. Ini adalah konflik peran klasik.",
        "course_id": "course_10_bab3",
        "chapter_number": 3,
        "chapter_title": "Bab 3: Identitas Diri, Tindakan Sosial, dan Hubungan Sosial",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      },
      {
        "id": "les_10_bab3_3",
        "title": "Pertemuan 3: Hakikat dan Jenis-Jenis Tindakan Sosial",
        "text_body": "Menurut sosiolog klasik Max Weber, tindakan sosial adalah tindakan individu yang mempunyai makna atau arti subjektif bagi dirinya sendiri dan diarahkan kepada tindakan orang lain. Suatu tindakan manusia baru akan bermakna secara sosiologis jika tindakan tersebut ditujukan secara sadar atau memperhitungkan keberadaan dan reaksi orang lain di sekitarnya.\n\nSebagai anggota masyarakat, tindakan manusia dapat memengaruhi atau dipengaruhi oleh kondisi masyarakat setempat. Secara umum, tindakan manusia di masyarakat dapat dikelompokkan sebagai berikut:\n1. Tindakan Manusia untuk Memenuhi Kebutuhan Hidup: Kebutuhan primer (biologis), kebutuhan sekunder (sosial), dan kebutuhan integratif (psikis/moral).\n2. Tindakan Manusia Muncul dari Luapan Emosi: Bersifat positif maupun negatif.\n3. Tindakan Manusia Merupakan Implementasi dari Ciri Kebudayaan yang Dianutnya.\n\nMenurut Max Weber, tindakan sosial dapat dikelompokkan secara spesifik menjadi empat tipe rasionalitas:\n* Tindakan Sosial Tradisional: Tindakan yang dilakukan pada situasi tertentu sebagai hasil dari tradisi, adat istiadat, dan warisan masa lalu.\n* Tindakan Sosial Afektif: Tindakan ini sebagian besar dikuasai oleh perasaan, sentimen, atau emosi spontan, tanpa pertimbangan akal budi yang matang.\n* Tindakan Sosial Rasionalitas Berorientasi Nilai: Tindakan ini berkaitan erat dengan nilai-nilai dasar yang berkembang di dalam masyarakat (seperti nilai agama, etika, estetika).\n* Tindakan Sosial Rasional Instrumental: Tindakan ini dilakukan berdasarkan pada pertimbangan akal sehat secara rasional dengan memperhitungkan secara matang kesesuaian antara cara (instrumen) yang digunakan dan tujuan akhir yang hendak dicapai.\n\nStudi Kasus: Tindakan Sosial\nMemilih sekolah berdasarkan prospek kerja yang cerah adalah Tindakan Rasional Instrumental, sedangkan memberi sedekah tanpa mengharapkan balasan adalah Rasional Berorientasi Nilai.",
        "course_id": "course_10_bab3",
        "chapter_number": 3,
        "chapter_title": "Bab 3: Identitas Diri, Tindakan Sosial, dan Hubungan Sosial",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      },
      {
        "id": "les_10_bab3_4",
        "title": "Pertemuan 4: Hubungan Sosial dan Syarat Interaksi Sosial",
        "text_body": "Dalam Kamus Besar Bahasa Indonesia (KBBI), hubungan sosial berarti hubungan seseorang dengan orang lain dalam pergaulan hidup di tengah-tengah masyarakat. Secara umum, hubungan sosial adalah hubungan timbal balik antarindividu dan saling memengaruhi satu sama lain atas dasar kesadaran saling tolong-menolong. Unsur utama dan paling mendasar yang membangun hubungan sosial adalah interaksi sosial.\n\nInteraksi sosial didefinisikan sebagai hubungan timbal balik berupa aksi saling memengaruhi antarindividu, antara individu dan kelompok, serta antarkelompok. Menurut sosiolog Charles P. Loomis, sebuah hubungan baru dapat dikategorikan sebagai interaksi sosial jika memiliki empat ciri spesifik berikut:\n* Jumlah pelaku dua orang atau lebih.\n* Komunikasi antarpelaku menggunakan simbol-simbol atau lambang.\n* Adanya dimensi waktu yang meliputi masa lalu, masa kini, dan masa depan.\n* Memiliki tujuan tertentu yang hendak dicapai.\n\nSementara itu, menurut sosiolog Indonesia Soerjono Soekanto, syarat terjadinya interaksi sosial secara mutlak adalah adanya kontak sosial dan komunikasi. Kontak sosial bisa saja terjadi tanpa adanya komunikasi lanjutan. Kontak sosial tanpa komunikasi tidak memiliki makna apa-apa dalam sebuah interaksi sosiologis karena masing-masing pihak tidak bisa saling memahami maksud, makna tindakan, dan perasaan masing-masing. Komunikasi adalah proses pengiriman dan penerimaan pesan atau berita antara dua orang atau lebih sehingga pesan yang dimaksud dapat dipahami secara tepat.\n\nKonsep Penting: Syarat Interaksi Sosial\nMenurut Soerjono Soekanto, harus ada Kontak Sosial dan Komunikasi.\n\nCara Mudah Membaca: Tanpa kontak dan komunikasi, interaksi hanya angan-angan (K2).",
        "course_id": "course_10_bab3",
        "chapter_number": 3,
        "chapter_title": "Bab 3: Identitas Diri, Tindakan Sosial, dan Hubungan Sosial",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      },
      {
        "id": "les_10_bab3_5",
        "title": "Pertemuan 5: Pendekatan Interaksi dan Faktor Psikologis",
        "text_body": "Untuk mempelajari interaksi sosial secara ilmiah, sosiolog menggunakan pendekatan tertentu yang dikenal dengan perspektif interaksionis (interactionist perspective). Salah satu pendekatan utama dalam perspektif ini adalah interaksionisme simbolik.\n\nMenurut W. I. Thomas, seseorang tidak langsung bereaksi terhadap rangsangan dari luar, melainkan menilai atau mempertimbangkan terlebih dahulu berdasarkan definisi atas situasi yang dibuatnya. Herbert Blumer kemudian menyatakan bahwa terdapat tiga pokok pikiran dalam interaksionisme simbolik, yaitu act (tindakan), thing (sesuatu), dan meaning (arti).\n\nPendekatan lain dikemukakan oleh Erving Goffman melalui teori dramaturgi. Menurut Goffman, dalam setiap interaksi ada individu yang membuat pernyataan (expression) dan ada individu lain yang memperoleh kesan (impression). Goffman menyebut usaha sadar ini sebagai pengaturan kesan (impression management).\n\nInteraksi sosial merupakan proses yang cukup kompleks karena dilandasi oleh beberapa faktor psikologis pendorong:\n1. Imitasi: Tindakan meniru orang lain, baik gaya bicara, tingkah laku, adat, pola pikir, maupun penampilan fisik.\n2. Sugesti: Berlangsung ketika seseorang memberi pandangan atau pernyataan sikap yang dianutnya dan langsung diterima oleh orang lain tanpa berpikir kritis.\n3. Identifikasi: Kecenderungan atau keinginan mendalam seseorang untuk menjadi sama persis (meniru keseluruhan diri) dengan pihak lain.\n4. Simpati: Kondisi ketertarikan seseorang kepada orang lain secara emosional.\n5. Empati: Merupakan kelanjutan dari simpati, berupa simpati mendalam yang dapat memengaruhi kondisi fisik dan jiwa seseorang secara nyata (ikut bertindak nyata menolong).\n\nDefinisi: Faktor Psikologis Interaksi\nImitasi, Sugesti, Identifikasi, Simpati, dan Empati.\n\nStudi Kasus: Demam K-Pop\nBanyak remaja mengidentifikasi diri mereka dengan idolanya, yang merupakan bentuk dari Identifikasi dan Imitasi.",
        "course_id": "course_10_bab3",
        "chapter_number": 3,
        "chapter_title": "Bab 3: Identitas Diri, Tindakan Sosial, dan Hubungan Sosial",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      },
      {
        "id": "les_10_bab3_6",
        "title": "Pertemuan 6: Bentuk Interaksi (Asosiatif & Disosiatif)",
        "text_body": "Menurut sosiolog Gillin dan Gillin, interaksi sosial berlangsung dalam dua jenis proses sosial makro, yaitu proses asosiatif dan proses disosiatif. \n\na. Proses Asosiatif meliputi bentuk-bentuk sebagai berikut:\n1. Kerja Sama: Usaha bersama antarindividu atau kelompok untuk mencapai tujuan bersama. Bentuknya: Kerukunan, Bargaining, Kooptasi, Koalisi, Joint Venture.\n2. Akomodasi: Usaha meredakan pertentangan tanpa menghancurkan lawan. Tujuannya adalah menghasilkan sintesis titik temu.\n3. Asimilasi: Usaha mengurangi perbedaan antar-kelompok guna mencapai satu kesepakatan utuh berdasarkan kepentingan bersama (peleburan budaya).\n4. Akulturasi: Berpadunya dua kebudayaan berbeda membentuk kebudayaan baru tanpa menghilangkan ciri kepribadian budaya masing-masing.\n\nb. Proses Disosiatif meliputi bentuk-bentuk sebagai berikut:\n1. Persaingan (Kompetisi): Perjuangan berbagai pihak mencapai tujuan tertentu secara damai dan sportif (fair play) dengan menjunjung tinggi batasan aturan baku.\n2. Kontravensi: Bentuk proses sosial yang berada di antara persaingan dan pertentangan. Ditandai rasa tidak puas, tidak suka yang disembunyikan, kebencian, dan keraguan terhadap kepribadian orang lain secara rahasia.\n3. Pertentangan (Konflik): Perjuangan individu/kelompok memenuhi tujuan dengan cara menantang pihak lawan secara terbuka disertai ancaman atau kekerasan fisik. Terjadi karena perbedaan pendapat, kebudayaan, kepentingan, atau perubahan sosial.\n\nKonsep Penting: Asosiatif vs Disosiatif\nAsosiatif: Kerja sama, Akomodasi, Asimilasi, Akulturasi (menyatukan).\nDisosiatif: Persaingan, Kontravensi, Konflik (memisahkan).",
        "course_id": "course_10_bab3",
        "chapter_number": 3,
        "chapter_title": "Bab 3: Identitas Diri, Tindakan Sosial, dan Hubungan Sosial",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      }
    ]
  },
  {
    "id": "course_10_bab4",
    "title": "Sosiologi Kelas 10 Bab 4: Lembaga Sosial",
    "description": "Membedah rahasia keteraturan masyarakat melalui konsep Nilai, Norma, Pengendalian Sosial, hingga berbagai Tipe Lembaga Sosial.",
    "grade_level": 10,
    "category": "Lembaga & Keteraturan Sosial",
    "thumbnail": "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=600",
    "totalLessons": 6,
    "completedLessons": 0,
    "lessons": [
      {
        "id": "les_10_bab4_1",
        "title": "Pertemuan 1: Memahami Nilai Sosial",
        "text_body": "Nilai (value) dalam konteks sosiologi berhubungan dengan pertanyaan mengapa dan bagaimana suatu kondisi dapat terjadi di masyarakat. Soerjono Soekanto mendefinisikan nilai sebagai konsepsi abstrak dalam diri manusia mengenai apa yang dianggap baik dan buruk.\n\nCiri-ciri nilai sosial adalah sebagai berikut.\na. Konstruksi masyarakat sebagai hasil interaksi antarwarga masyarakat.\nb. Disebarkan antara sesama warga masyarakat (bukan bawaan individu sejak lahir).\nc. Terbentuk melalui sosialisasi (proses belajar).\nd. Bagian dari usaha pemenuhan kebutuhan dan kepuasan sosial manusia.\n\nProf. Dr. Notonegoro membagi nilai sosial menjadi tiga.\na. Nilai Materiel: Segala sesuatu yang berguna bagi unsur fisik manusia.\nb. Nilai Vital: Segala sesuatu yang berguna bagi manusia untuk mengadakan kegiatan dan aktivitas.\nc. Nilai Kerohanian: Segala sesuatu yang berguna bagi batin (rohani) manusia (kebenaran, keindahan, kebaikan, religius).\n\nNilai juga dapat dibedakan berdasarkan cirinya, yaitu nilai dominan dan nilai yang mendarah daging.\na. Nilai dominan adalah nilai yang dianggap penting dibandingkan nilai lainnya (diukur dari banyak penganut, lamanya dianut, prestise).\nb. Nilai yang mendarah daging adalah nilai yang telah menjadi kepribadian dan kebiasaan sehingga seseorang menjalankannya tanpa melalui proses berpikir atau pertimbangan lagi, melainkan secara tidak sadar.\n\nKonsep Penting: Pembagian Nilai Notonegoro\nMateriel, Vital, dan Kerohanian.\n\nCara Mudah Membaca: Ingat M-V-K. Materiel (fisik), Vital (aktivitas), Kerohanian (batin).",
        "course_id": "course_10_bab4",
        "chapter_number": 4,
        "chapter_title": "Bab 4: Lembaga Sosial",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      },
      {
        "id": "les_10_bab4_2",
        "title": "Pertemuan 2: Mengkaji Norma Sosial",
        "text_body": "Norma adalah aturan atau ketentuan yang mengikat warga kelompok dalam masyarakat. Norma dipakai sebagai panduan, tatanan, dan pengendali tingkah laku yang sesuai dengan harapan masyarakat. Kaidah atau norma yang ada di dalam masyarakat adalah aplikasi atau perwujudan dari nilai-nilai yang dianut oleh masyarakat.\n\nDilihat dari kekuatan mengikat terhadap anggota masyarakat, norma dibedakan menjadi beberapa tingkatan. Tiap tingkatan norma memiliki kekuatan memaksa yang berbeda.\n1. Cara (Usage): Norma yang paling lemah daya pengikatnya karena orang yang melanggar hanya mendapat sanksi dari masyarakat berupa cemoohan atau ejekan.\n2. Kebiasaan (Folkways): Aturan dengan kekuatan mengikat yang lebih kuat daripada usage. Kebiasaan adalah perbuatan yang dilakukan berulang-ulang sehingga menjadi bukti bahwa orang yang melakukannya menyukai dan menyadari perbuatannya.\n3. Tata Kelakuan (Mores): Aturan yang sudah diterima masyarakat secara sadar atau tidak sadar dan dijadikan alat pengawas atau kontrol terhadap anggota-anggota masyarakat. Pelanggaran diberi sanksi berat.\n4. Adat Istiadat (Custom): Norma ini pada umumnya tidak tertulis, tetapi memiliki sanksi, baik langsung maupun tidak langsung. Sanksinya berupa sikap penolakan dari masyarakat (bahkan dikeluarkan dari masyarakat).\n\nKlasifikasi Norma meliputi: Norma agama, Norma kesusilaan (hati nurani), Norma kesopanan (relatif), Norma kebiasaan (habit), dan Norma hukum (memaksa oleh negara).\n\nTimeline: Tingkatan Norma\nCara (Usage) -> Kebiasaan (Folkways) -> Tata Kelakuan (Mores) -> Adat Istiadat (Custom).",
        "course_id": "course_10_bab4",
        "chapter_number": 4,
        "chapter_title": "Bab 4: Lembaga Sosial",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      },
      {
        "id": "les_10_bab4_3",
        "title": "Pertemuan 3: Hakikat Lembaga Sosial",
        "text_body": "Istilah lembaga sosial merupakan terjemahan dari istilah bahasa Inggris social institution yang merujuk pada dua pengertian, yakni sistem nilai dan norma-norma sosial serta bentuk atau organ sosial. Soerjono Soekanto mendefinisikan lembaga sosial sebagai himpunan norma dari segala tingkatan yang berkisar pada suatu kebutuhan pokok dalam kehidupan masyarakat.\n\nProses sejumlah norma menjadi lembaga sosial disebut pelembagaan atau institusionalisasi. Timbulnya lembaga sosial dapat diklasifikasikan ke dalam dua cara, yaitu secara tidak terencana (lahir bertahap dalam kehidupan masyarakat) dan secara terencana (perencanaan matang oleh pihak berwenang).\n\nKarakteristik Lembaga Sosial:\na. Memiliki simbol sendiri.\nb. Memiliki tata tertib dan tradisi.\nc. Usianya lebih lama (diwariskan generasi ke generasi).\nd. Memiliki alat kelengkapan.\ne. Memiliki ideologi.\nf. Memiliki tingkat kekebalan/daya tahan.\n\nFungsi Lembaga Sosial dibedakan atas dua bentuk:\na. Fungsi manifes (nyata): fungsi yang disadari dan menjadi harapan banyak orang.\nb. Fungsi laten: fungsi yang tidak disadari dan bukan menjadi tujuan utama banyak orang (fungsi tersembunyi).\n\nDefinisi: Institusionalisasi\nProses panjang dari sekadar kebiasaan (norma) hingga mengeras menjadi lembaga sosial yang diakui dan ditaati.",
        "course_id": "course_10_bab4",
        "chapter_number": 4,
        "chapter_title": "Bab 4: Lembaga Sosial",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      },
      {
        "id": "les_10_bab4_4",
        "title": "Pertemuan 4: Tipe & Jenis Lembaga (Keluarga & Pendidikan)",
        "text_body": "Menurut Lewis Gillin dan John Philip Gillin, tipe lembaga sosial dapat diklasifikasikan sebagai berikut.\na. Berdasarkan sudut perkembangannya: Crescive Institution (tak sengaja) & Enacted Institution (sengaja dibentuk).\nb. Berdasarkan sistem nilai yang diterima: Basic Institution (penting) & Subsidiary Institution (tambahan).\nc. Berdasarkan sudut penerimaan: Approved Institution (diterima) & Unsanctioned Institution (ditolak).\nd. Berdasarkan sudut penyebarannya: General Institution & Restricted Institution.\ne. Berdasarkan sudut fungsinya: Operative Institution & Regulative Institution.\n\nJenis Lembaga Sosial:\n1. Lembaga Keluarga: Merupakan unit sosial terkecil. Susunan keluarga di masyarakat ada sistem bilateral, unilateral, patrilineal, dan matrilineal. Fungsinya meliputi Reproduksi, Sosialisasi, Afeksi (kasih sayang), Ekonomi, Pengawasan sosial, Proteksi (perlindungan), Pemberian Status.\n\n2. Lembaga Pendidikan: Dibentuk sebagai wadah sosialisasi nilai-nilai ideal untuk melengkapi pendidikan informal di keluarga. Fungsi manifes: Mempersiapkan mencari nafkah, mengembangkan bakat, melestarikan kebudayaan, menanamkan keterampilan berdemokrasi. Fungsi laten: Mengurangi pengendalian orang tua, menyediakan sarana pembangkangan (kritis), dan memperpanjang masa remaja.\n\nCara Mudah Membaca: Fungsi Lembaga\nManifes = Nyata/Disadari. Laten = Tersembunyi/Tidak Disadari.",
        "course_id": "course_10_bab4",
        "chapter_number": 4,
        "chapter_title": "Bab 4: Lembaga Sosial",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      },
      {
        "id": "les_10_bab4_5",
        "title": "Pertemuan 5: Lembaga Politik, Ekonomi, dan Agama",
        "text_body": "Jenis Lembaga Sosial (Lanjutan):\n3. Lembaga Politik: Keseluruhan tata nilai dan norma yang berkaitan dengan kekuasaan dinamakan lembaga politik. Mengurus bentuk negara dan pemerintahan. Fungsi lembaga politik: Memelihara ketertiban internal, menjaga keamanan eksternal (diplomasi/perang), mengusahakan kesejahteraan umum, dan mengatur proses persaingan politik agar terhindar dari perpecahan bangsa.\n\n4. Lembaga Ekonomi: Berfungsi mengatur pembagian kerja dalam pemenuhan kebutuhan pokok demi kelangsungan hidup. Berperan memberi pedoman untuk mendapatkan pangan, barter/jual beli, penetapan harga, penggunaan tenaga kerja, sistem upah, dan PHK.\n\n5. Lembaga Agama: Menurut Durkheim (1966), agama adalah sistem terpadu terdiri atas kepercayaan dan praktik terkait hal yang suci (sacred/Ilahi) vs profan (duniawi). Berfungsi sebagai pedoman hidup, mengatur hubungan manusia dengan Tuhan dan sesama, tuntunan benar-salah, menanamkan keyakinan pahala, pedoman keindahan (estetika), pedoman eksistensi, hiburan/rekreasi (meditasi), dan memberi identitas sosial.\n\nStudi Kasus: Lembaga Agama\nRumah ibadah sering kali menjadi pusat pemberdayaan ekonomi masyarakat, ini merupakan bukti fungsi tambahan (subsidiary) lembaga agama.",
        "course_id": "course_10_bab4",
        "chapter_number": 4,
        "chapter_title": "Bab 4: Lembaga Sosial",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      },
      {
        "id": "les_10_bab4_6",
        "title": "Pertemuan 6: Tertib Sosial, Penyimpangan, dan Pengendalian",
        "text_body": "Lembaga-lembaga menyosialisasikan konformitas (berperilaku sesuai harapan masyarakat). Jika gagal, akan timbul perilaku nonkonformis atau Penyimpangan Sosial (Deviant Behavior).\n1. Penyimpangan Sosial\n* Edwin H. Sutherland (Teori Asosiasi Diferensial): Penyimpangan dipelajari lewat pergaulan.\n* Edwin M. Lemert (Teori Pelabelan/Labeling Theory): Seseorang menyimpang karena cap dari masyarakat (Penyimpangan Primer & Sekunder).\n* Robert K. Merton (Teori Anomi): Penyimpangan terjadi karena struktur sosial gagal menyelaraskan tujuan dengan cara pencapaiannya.\n\n2. Pengendalian Sosial\nMenurut Joseph Roucek, pengendalian sosial membujuk atau memaksa individu agar menyesuaikan diri. Sifatnya: Preventif (mencegah sebelum terjadi) dan Represif (memulihkan sesudah terjadi). Cara pengendalian bisa lisan, kekerasan, imbalan/hukuman, sosialisasi, dan tekanan sosial.\n\n3. Keteraturan Sosial\nKeteraturan sosial terjadi melalui proses berurutan:\n1. Tertib Sosial (Social Order): Keadaan aman di mana tiap orang tahu hak & kewajibannya.\n2. Order: Sistem norma berkembang dan dipatuhi.\n3. Keajegan: Kondisi ini berlangsung terus-menerus dan konsisten.\n4. Pola: Corak yang sangat tetap hingga menjadi 'model' bagi generasi selanjutnya.\n\nStudi Kasus: Perilaku Menyimpang\nSeorang anak yang bergaul dengan geng motor dan mulai ikut balap liar menunjukkan Teori Asosiasi Diferensial (Sutherland).",
        "course_id": "course_10_bab4",
        "chapter_number": 4,
        "chapter_title": "Bab 4: Lembaga Sosial",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": []
      }
    ]
  },
{
    "id": "course_11_bab1",
    "title": "Sosiologi Kelas 11 Bab 1: Kelompok Sosial",
    "description": "Mempelajari pembentukan kelompok sosial, dinamika kelompok, dan ragam kelompok menurut para ahli.",
    "grade_level": 11,
    "category": "Struktur & Dinamika Kelompok",
    "thumbnail": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600",
    "totalLessons": 6,
    "completedLessons": 0,
    "lessons": [
      {
        "id": "les_11_bab1_1",
        "course_id": "course_11_bab1",
        "chapter_number": 1,
        "chapter_title": "Bab 1: Kelompok Sosial",
        "title": "Pertemuan 1: Hakikat, Syarat & Ciri Kelompok Sosial",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Kelompok sosial merupakan suatu gejala yang sangat penting dalam kehidupan kita karena sebagian besar kegiatan kita berlangsung di dalamnya.\n\nSejak dilahirkan manusia diperkirakan sudah mempunyai dua hasrat atau kebutuhan pokok bagi kehidupannya, yaitu:\na. Keinginan untuk menjadi satu dengan manusia lain di sekelilingnya; dan\nb. Keinginan untuk menjadi satu dengan lingkungan alamnya.\n\nKeterikatan dan ketergantungan antara manusia satu dengan yang lain mendorong manusia untuk membentuk kelompok masyarakat yang disebut kelompok sosial atau social group. Berikut pandangan para ahli tentang pengertian kelompok sosial:\na. Roland L. Warren berpendapat bahwa kelompok sosial merupakan kelompok yang terdiri atas dua atau lebih manusia dan di antara mereka terdapat beberapa pola interaksi yang dapat dipahami oleh anggota atau orang lain secara keseluruhan.\nb. Mayor Polak berpendapat bahwa kelompok sosial adalah sejumlah orang yang saling berhubungan dalam sebuah struktur.\nc. Wila Huky berpendapat bahwa kelompok merupakan suatu unit yang terdiri atas dua orang atau lebih yang saling berinteraksi atau saling berkomunikasi.\nd. Robert K. Merton mendefinisikan kelompok sebagai sekelompok orang yang saling berinteraksi sesuai dengan pola yang telah mapan.\ne. R. M. Maclver dan Charles H. Cooley berpendapat bahwa kelompok sosial merupakan himpunan atau kesatuan manusia yang hidup bersama karena ada hubungan timbal balik yang saling memengaruhi dan juga kesadaran untuk saling menolong.\n\nDapat kita simpulkan bahwa kelompok sosial adalah kumpulan individu yang memiliki hubungan dan saling berinteraksi.\n\nMenurut Soerjono Soekanto (2015), himpunan manusia baru dapat dikatakan sebagai kelompok sosial apabila memiliki beberapa persyaratan berikut:\na. Adanya kesadaran sebagai bagian dari kelompok yang bersangkutan.\nb. Ada hubungan timbal balik antara anggota yang satu dengan yang lain dalam kelompok itu.\nc. Ada suatu faktor pengikat yang dimiliki bersama oleh anggota-anggota kelompok sehingga hubungan di antara mereka bertambah erat. Faktor tadi dapat berupa kepentingan yang sama, tujuan yang sama, ideologi politik yang sama, dan lain-lain.\nd. Memiliki struktur, kaidah, dan pola perilaku yang sama.\ne. Memiliki sistem dan proses.\n\nCara Mudah Membaca: Ingat syarat kelompok sosial ala Soerjono Soekanto dengan akronim KITA FOKUS: Kesadaran, Interaksi timbal balik, Tujuan/Faktor pengikat sama, Aturan/Struktur, dan FOKUS pada Sistem yang berproses.\n\nStudi Kasus: Menjadi Bagian Bimbingan Belajar\nBayangkan suasana di sebuah institusi bimbingan belajar, misalnya saat kita berinteraksi di ruang kelas atau dalam bimbingan tutor reguler. Di sana, para pengajar (tutor) dan para siswa saling bertemu secara rutin. Kalian memiliki pola interaksi yang jelas, ada kesadaran dari para tutor bahwa mereka pengajar, dan siswa menyadari posisinya. Faktor pengikatnya jelas: tujuan akademik bersama. Inilah wujud nyata syarat kelompok sosial di sekitarmu!\n\nTimeline: Pandangan Ahli\n- Roland L. Warren: Menekankan pada pola interaksi yang dipahami secara keseluruhan.\n- Mayor Polak: Fokus pada hubungan orang-orang di dalam sebuah struktur sosial.\n- Robert K. Merton: Menyoroti pola interaksi yang telah mapan dan definisi keanggotaan."
      },
      {
        "id": "les_11_bab1_2",
        "course_id": "course_11_bab1",
        "chapter_number": 1,
        "chapter_title": "Bab 1: Kelompok Sosial",
        "title": "Pertemuan 2: Proses, Faktor Pembentuk & Pengelompokan",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Manusia adalah makhluk sosial yang secara kodrati tidak dapat hidup tanpa orang lain. Oleh karena itu, untuk mencapai kodrat kemanusiaannya, manusia harus membentuk dan mengembangkan hubungan sosial dengan manusia lain.\n\nBruce Tuckman (2001) menyebutkan terdapat lima tahap dalam proses pembentukan dan perkembangan kelompok yaitu forming, storming, norming, performing, dan adjourning.\na. Pada tahap forming, para anggota kelompok masih saling mempelajari perilaku satu sama lain dan tugas-tugas yang harus dilakukan.\nb. Pada tahap storming, terjadi persaingan dan konflik antaranggota yang saling mempertahankan pendapatnya.\nc. Pada tahap norming, terjadi konsensus atau kesepakatan dalam kelompok. Hubungan antaranggota mulai dekat.\nd. Pada tahap performing, sudah terjalin rasa kebersamaan dan kepercayaan. Seluruh anggota kelompok sudah melakukan tugas dan fungsinya secara penuh.\ne. Tahap adjourning khusus berlaku pada kelompok yang dibentuk untuk tujuan jangka pendek atau bersifat sementara. Pada saat tujuan sudah tercapai, kelompok tersebut dibubarkan.\n\nSuatu kelompok sosial dapat terbentuk apabila terdapat sedikitnya dua orang anggota yang saling berinteraksi dan memengaruhi. Georg Simmel menyebut kelompok kecil yang terdiri atas dua orang ini sebagai dyad. Selain dyad, terdapat pula kelompok kecil yang disebut triad.\n\nFaktor Pembentuk Kelompok Sosial:\na. Kepentingan yang Sama (Kelompok kepentingan/Asosiasi)\nb. Pertalian Darah atau Keturunan yang Sama\nc. Daerah atau Wilayah yang Sama\n\nCara Mudah Membaca: Ingat 5 Tahap Tuckman dengan F-S-N-P-A: Forming (Membentuk/Mengenal), Storming (Konflik/Badai), Norming (Sepakat Norma), Performing (Bekerja maksimal), Adjourning (Bubar).\n\nStudi Kasus: Gerbong Kereta Kelas Ekonomi\nPernahkah kamu melakukan perjalanan antarkota, menggunakan kereta api kelas ekonomi? Saat kamu duduk berhadapan dengan penumpang lain, perlahan tercipta obrolan kecil (Forming). Kalian berbagi ruang, kadang sedikit menyesuaikan posisi duduk agar sama-sama nyaman (Norming). Meski ini kelompok berumur pendek (hanya selama perjalanan), interaksi intens dalam satu wilayah gerbong membuktikan bagaimana manusia secara alami membentuk pengelompokan demi bertahan dan beradaptasi. Begitu sampai stasiun tujuan, kelompok ini membubarkan diri (Adjourning)."
      },
      {
        "id": "les_11_bab1_3",
        "course_id": "course_11_bab1",
        "chapter_number": 1,
        "chapter_title": "Bab 1: Kelompok Sosial",
        "title": "Pertemuan 3: Ragam Kelompok (Durkheim, Tönnies, Cooley, Sumner)",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "1. Klasifikasi Menurut Émile Durkheim\nÉmile Durkheim membagi kelompok sosial menjadi dua:\na. Solidaritas Mekanik: Ciri dari masyarakat yang masih sederhana dan belum mengenal pembagian kerja. Mengutamakan persamaan perilaku dan diikat kesadaran kolektif.\nb. Solidaritas Organik: Bentuk solidaritas yang telah mengenal pembagian kerja. Unsur-unsurnya saling bergantung. Ikatan utama adalah kesepakatan antar profesi.\n\n2. Klasifikasi Menurut Ferdinand Tönnies\na. Gemeinschaft (Paguyuban): Bentuk kehidupan bersama di mana anggota-anggotanya memiliki hubungan batin yang kuat bersifat alamiah dan kekal (Keluarga, kerabat, tetangga perdesaan). Dibagi menjadi: Gemeinschaft by blood, Gemeinschaft of place, Gemeinschaft of mind.\nb. Gesellschaft (Patembayan): Kehidupan publik sebagai sekumpulan orang yang secara kebetulan hadir bersama. Hubungannya bersifat sementara, semu, kontraktual, dan rasional (Pedagang, industri).\n\n3. Klasifikasi Menurut Charles H. Cooley dan Ellsworth Faris\nCharles H. Cooley menyatakan terdapat kelompok primer (pergaulan, kerja sama, dan tatap muka yang intim seperti keluarga). Ellsworth Faris melengkapinya dengan kelompok sekunder (formal, tidak pribadi, dan berciri kelembagaan seperti partai politik).\n\n4. Klasifikasi Menurut William G. Sumner\nMembagi kelompok menjadi in-group (kelompok dalam) dan out-group (kelompok luar). In-group feeling menimbulkan etnosentrisme.\n\nCara Mudah Membaca: Ingat konsep Ferdinand Tönnies dengan PAGU-Batin, PATEM-Kontrak. Paguyuban (Gemeinschaft) = Ikatan Batin kuat (Keluarga). Patembayan (Gesellschaft) = Ikatan Kontrak rasional (Perusahaan/Pedagang).\n\nStudi Kasus: Dinamika Transaksi Jual Beli\nCoba bedakan dua situasi ini: Di sebuah warung makanan tradisional lokal, pembeli dan penjual sering kali saling kenal akrab, saling menyapa nama, mencerminkan nilai Paguyuban (Gemeinschaft). Sebaliknya, ketika kamu berbelanja di swalayan atau toserba modern dan melakukan pembayaran secara digital menggunakan barcode (QRIS), hubungan antara kasir dan dirimu murni transaksional, profesional, dan mekanis. Itulah wujud nyata dari Patembayan (Gesellschaft) di era modern."
      },
      {
        "id": "les_11_bab1_4",
        "course_id": "course_11_bab1",
        "chapter_number": 1,
        "chapter_title": "Bab 1: Kelompok Sosial",
        "title": "Pertemuan 4: Ragam Kelompok (Merton, Formal/Informal, Perilaku Kolektif)",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "5. Klasifikasi Menurut Robert K. Merton\nMerton membagi kelompok menjadi:\n- Membership group: Kelompok di mana setiap orang secara fisik menjadi anggota.\n- Reference group: Kelompok sosial yang menjadi acuan bagi seseorang secara psikologis untuk membentuk pribadi dan perilakunya (Tipe normatif & Tipe perbandingan).\n\n6. Kelompok Formal dan Kelompok Informal\n- Formal: Punya aturan tegas, struktur dan administrasi pasti (organisasi).\n- Informal: Tidak memiliki struktur pasti, terbentuk atas dasar seringnya pertemuan (klik).\n\n7. Kelompok Okupasional dan Kelompok Volunter\n- Okupasional: Beranggotakan orang-orang dengan profesi sejenis dan punya kode etik (IDI, PGRI).\n- Volunter: Anggota memiliki kepentingan sama tanpa mendapat perhatian masyarakat (sukarelawan bencana).\n\n8. Kelompok Sosial Tidak Teratur\n- Kerumunan: Hadir secara fisik di suatu tempat, spontan, sementara (antrean).\n- Publik: Perhatian pada hal yang sama tapi tidak kumpul di satu tempat (pemirsa TV).\n\n9. Perilaku Kolektif\nPerilaku yang lahir secara spontan, relatif tidak terorganisasi dan dipicu oleh rangsangan yang sama. Lima faktor menurut Gustave Le Bon: Situasi sosial, Ketegangan struktural, Berkembangnya kepercayaan umum, Faktor penunjang kecemasan, Mobilisasi oleh pemimpin.\n\nCara Mudah Membaca: Bedakan Kerumunan & Publik: Kerumunan = Fisik kumpul, Spontan (antre karcis/restoran). Publik = Fisik terpisah, Fokus sama (nonton TV di rumah masing-masing)."
      },
      {
        "id": "les_11_bab1_5",
        "course_id": "course_11_bab1",
        "chapter_number": 1,
        "chapter_title": "Bab 1: Kelompok Sosial",
        "title": "Pertemuan 5: Partikularisme, Eksklusivisme, & Pola Hubungan",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Dimensi hubungan antarkelompok meliputi sejarah, institusi, gerakan sosial, perilaku, perilaku kolektif, dan sikap.\n\nPartikularisme adalah sistem yang mengutamakan kepentingan pribadi atau kelompok khusus di atas kepentingan umum (sukuisme). Seseorang memperlakukan in-groupnya sebaik mungkin dan mengabaikan out-group. Secara sosiologis, sikap ini memicu konflik di masyarakat heterogen.\n\nEksklusivisme adalah paham yang mempunyai kecenderungan untuk memisahkan diri dari masyarakat. Sisi positifnya dapat mempertahankan kebudayaan asli, namun sisi negatifnya mereka sangat tertutup pada pengaruh budaya lain dan perubahan progresif.\n\nPola Hubungan Antarkelompok (Michael Banton):\n1. Akulturasi: Kebudayaan dua ras berbaur.\n2. Dominasi: Suatu ras menguasai yang lain (Genosida, Pengusiran, Perbudakan, Segregasi, Asimilasi).\n3. Paternalisme: Dominasi kelompok pendatang atas pribumi.\n4. Integrasi: Pola hubungan yang mengakui perbedaan ras tanpa memberi fungsi pembeda.\n5. Pluralisme: Mengakui persamaan hak politik/perdata.\n\nStudi Kasus: Jaringan Bengkel Otomotif Lokal\nDalam dunia usaha, kadang kala pemilik usaha hanya mau menerima karyawan yang berasal dari kampung asalnya saja atau yang satu marga dengannya. Hal ini merupakan contoh nyata dari Partikularisme. Di satu sisi, ini memperkuat kepercayaan internal, namun secara sosiologis di ranah publik/profesional, hal ini bisa menghambat profesionalisme dan memicu kesenjangan sosial jika diterapkan di lingkungan masyarakat majemuk."
      },
      {
        "id": "les_11_bab1_6",
        "course_id": "course_11_bab1",
        "chapter_number": 1,
        "chapter_title": "Bab 1: Kelompok Sosial",
        "title": "Pertemuan 6: Dinamika, Kepemimpinan, Organisasi & Jejaring Sosial",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Dinamika kelompok adalah gerak sekumpulan orang yang saling berhubungan dan memiliki tujuan bersama yang dapat menimbulkan perubahan. Faktor intern dinamika meliputi konflik individu, perbedaan kepentingan, dan beda paham. Faktor ekstern meliputi perubahan situasi, pergantian anggota, dan perubahan ekonomi.\n\nKepemimpinan:\nPemimpin adalah orang yang memengaruhi perilaku, pendapat, dan sikap orang lain. \n- Pemimpin instrumental: berorientasi tugas.\n- Pemimpin ekspresif: pemimpin sosioemosional tanpa pengakuan formal.\nGaya Kepemimpinan: Otoriter, Demokratis, Laissez-faire.\n- Transformasional: Bertujuan untuk perubahan ke arah lebih baik, karismatik, memotivasi, dan memperhatikan individu pengikutnya.\n- Transaksional: Bersifat kontraktual (imbalan ditukar dengan loyalitas).\n\nOrganisasi:\nSuatu bentuk persekutuan antara dua orang atau lebih yang bekerja bersama serta secara formal terikat dalam pencapaian tujuan dengan hirarki pemimpin-bawahan.\n\nJejaring Sosial:\nStruktur sosial yang dibentuk dari simpul-simpul antarindividu/organisasi yang diikat dengan relasi spesifik (teman, ide, nilai). Fungsinya memudahkan penerimaan informasi dan membangun kerja sama.\n\nKonformitas:\nBentuk interaksi ketika seseorang berperilaku sesuai harapan kelompok/masyarakat (menaati norma). Masyarakat tradisional memiliki konformitas tinggi, sedangkan masyarakat perkotaan konformitasnya lebih rendah karena banyaknya perubahan."
      }
    ]
  },
  {
    "id": "course_11_bab2",
    "title": "Sosiologi Kelas 11 Bab 2: Permasalahan Sosial Akibat Pengelompokan Sosial",
    "description": "Membahas masalah sosial, perspektif teori makro/mikro, serta ketidakadilan, eksklusi, dan KKN.",
    "grade_level": 11,
    "category": "Struktur & Dinamika Kelompok",
    "thumbnail": "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600",
    "totalLessons": 6,
    "completedLessons": 0,
    "lessons": [
      {
        "id": "les_11_bab2_1",
        "course_id": "course_11_bab2",
        "chapter_number": 2,
        "chapter_title": "Bab 2: Permasalahan Sosial Akibat Pengelompokan Sosial",
        "title": "Pertemuan 1: Pengertian, Elemen, dan Hakikat Masalah Sosial",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Istilah 'masalah sosial' mengandung dua kata kunci utama, yakni 'masalah' dan 'sosial'. Kata sosial membedakan masalah ini dengan masalah ekonomi, politik, biologi, fisika, kimia, dll. Kata masalah mengacu pada kondisi, situasi atau perilaku yang tidak diinginkan, aneh, bertentangan, tidak benar, dan sulit diselesaikan tanpa upaya bersama.\n\nPandangan Para Tokoh:\n- Arnold Marshall Rose: Situasi yang telah memengaruhi sebagian besar masyarakat dan diyakini dapat diubah lewat aksi kolektif.\n- Earl Raab dan Gertrude Jaeger Selznick: Masalah hubungan sosial yang menantang masyarakat atau menciptakan hambatan besar.\n- Richard dan Richard: Pola perilaku yang tidak diinginkan dan ditolak sebagian besar anggota karena melanggar moral.\n- Soerjono Soekanto: Ketidaksesuaian antara unsur kebudayaan yang membahayakan kelompok.\n\nDua Elemen Penting:\na. Elemen Objektif: Keberadaan kondisi nyata yang secara objektif berbahaya.\nb. Elemen Subjektif: Keyakinan/kesadaran masyarakat bahwa kondisi tersebut berbahaya dan wajib diatasi.\n\nMasalah sosial selalu mengandung optimisme untuk dapat diubah melalui kebijakan atau gerakan sosial.\n\nCara Mudah Membaca: Untuk menghafal 4 Tokoh Pengertian Masalah Sosial, ingat kata: \"RAJA ROSA RICO ANTO\". RAJA (Raab & Jaeger), ROSA (Arnold Rose), RICO (Richard & Richard), dan ANTO (Soerjono Soekanto).\n\nStudi Kasus: Eksklusi Akses Internet di Desa Terpencil\nSebuah desa di pedalaman tidak mendapatkan sinyal internet sama sekali selama bertahun-tahun (Elemen Objektif). Ketika anak-anak mereka gagal ujian nasional karena tidak bisa mengakses portal digital, masyarakat desa mulai bersatu dan berdemo menuntut menara pemancar (Elemen Subjektif terbentuk karena ada kesadaran bahaya)."
      },
      {
        "id": "les_11_bab2_2",
        "course_id": "course_11_bab2",
        "chapter_number": 2,
        "chapter_title": "Bab 2: Permasalahan Sosial",
        "title": "Pertemuan 2: Perspektif Teori Makro dan Mikro Masalah Sosial",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "1. Teori Fungsionalisme (Struktural-Fungsional)\nMelihat institusi masyarakat punya perannya masing-masing. Jika gagal (disfungsi), terjadi masalah sosial.\n- Patologi Sosial: Masalah diibaratkan penyakit karena lumpuhnya institusi moral (keluarga, dll).\n- Disorganisasi Sosial: Melemahnya norma akibat perubahan sosial terlalu cepat.\n\n2. Teori Konflik\nMasalah timbul dari pertentangan kepentingan dan perebutan sumber daya langka antara kelompok dominan dan subordinat.\n- Konflik Antarkelas (Borjuis vs Proletar)\n- Konflik Ras/Etnis\n- Konflik Gender\n(Teori Marxisme melihat ekonomi/kapitalisme sebagai akar masalah, non-Marxisme melihat benturan ideologi).\n\n3. Teori Interaksionisme Simbolik\nMasalah sosial di level mikro akibat pertukaran simbol dan pemberian makna negatif.\n- Teori Pelabelan (Labelling Theory): Seseorang jadi menyimpang karena diberi cap/stigma buruk oleh masyarakat.\n- Konstruksionisme Sosial: Realitas sosial adalah konstruksi pemikiran manusia.\n(Teori Asosiasi Diferensial/Edwin Sutherland: Penyimpangan dipelajari dari pergaulan).\n\nCara Mudah Membaca: Ingat 3 Teori Sosiologi Utama dengan \"FUNSI KONTRAS INSIM\"\nFUNSI (Fungsionalisme - semua punya fungsi), KONTRAS (Konflik - benturan kelas/ras), INSIM (Interaksionisme Simbolik - pelabelan mikro melalui simbol).\n\nStudi Kasus: Stigma Mantan Narapidana (Labelling Theory)\nSeorang remaja yang pernah mencuri sandal keluar dari penjara. Di kampungnya, semua orang menjuluki dan memperlakukannya sebagai \"si maling seumur hidup\". Akibat tidak ada yang mau memberi pekerjaan, ia frustrasi dan akhirnya benar-benar menjadi perampok profesional (Asosiasi Diferensial)."
      },
      {
        "id": "les_11_bab2_3",
        "course_id": "course_11_bab2",
        "chapter_number": 2,
        "chapter_title": "Bab 2: Permasalahan Sosial",
        "title": "Pertemuan 3: Faktor Penyebab dan Dinamika Pengelompokan Sosial",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Empat Faktor Penyebab Utama Masalah Sosial (Soekanto):\n- Ekonomi: Kemiskinan kultural/struktural.\n- Biologis: Penyakit endemis/epidemi.\n- Psikologis: Depresi, stres, penyakit saraf (neurosis), bunuh diri.\n- Sosial Budaya: Perceraian, kriminalitas, konflik rasial.\n\nEnam Ukuran Penentu Masalah Sosial:\n1. Perbedaan mencolok antara nilai ideal dan kenyataan.\n2. Sumber utama permasalahan.\n3. Akibat destruktif meluas.\n4. Adanya pihak penentu (otoritas).\n5. Atensi/perhatian serius masyarakat.\n6. Dapat diperbaiki/dicarikan jalan keluar ilmiah.\n\nDampak Pengelompokan Sosial:\n- Partikularisme: Mementingkan ego/kelompok sendiri di atas umum (memicu disintegrasi).\n- Eksklusivisme: Memisahkan diri dari masyarakat (positif menjaga budaya murni, negatif tertutup dan menolak kemajuan).\n- Eksklusi Sosial (Anthony Giddens): Pengucilan sekelompok orang dari arus utama (eksklusi dari pendapatan, lapangan kerja, fasilitas publik, dan interaksi setara).\n\nCara Mudah Membaca: Ingat 4 Faktor Penyebab Masalah Sosial: \"EBI PSI SOS\"\nE (Ekonomi), BI (Biologis), PSI (Psikologis), dan SOS (Sosial Budaya). Ebi yang lezat bisa bikin pusing kalau jadi masalah sosial!\n\nStudi Kasus: Partikularisme Pengusaha Suku X\nSeorang manajer HRD perusahaan perkebunan kelapa sawit hanya mau menerima lamaran kerja dari pelamar yang berasal dari suku yang sama dengannya, meskipun kualifikasinya rendah (Sikap Partikularisme). Akibatnya, pelamar lokal dari suku asli sekitar terancam menganggur dan memicu demonstrasi anarkis."
      },
      {
        "id": "les_11_bab2_4",
        "course_id": "course_11_bab2",
        "chapter_number": 2,
        "chapter_title": "Bab 2: Permasalahan Sosial",
        "title": "Pertemuan 4: Ketidakadilan (Stereotipe, Marginalisasi, Subordinasi, Dominasi)",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Ketidakadilan merupakan tindakan sewenang-wenang yang melanggar asas proporsionalitas pembagian hak individu/kelompok. Ada 4 manifestasi utamanya:\n\na. Stereotipe: Pemberian label, cap, atau penilaian sifat tertentu secara subjektif dan sepihak berdasarkan kategori kelompok (membelah \"kami\" yang superior dan \"mereka\" yang inferior).\nb. Marginalisasi: Peminggiran struktural kelompok dari lembaga sosial arus utama (ekonomi, pendidikan, kebijakan publik).\nc. Subordinasi (Penomorduaan): Perlakuan diskriminatif terhadap identitas sosial tertentu (seperti gender/minoritas) dengan anggapan posisi mereka lebih rendah.\nd. Dominasi: Kendali kekuasaan sewenang-wenang dan otoriter oleh sekelompok orang terhadap kelompok lain yang bergantung pada mereka (perbudakan, apartheid, feodalisme).\n\nCara Mudah Membaca: Ingat 4 Bentuk Ketidakadilan dengan \"SEMAR SUKA DOMINO\"\nSEMAR (Stereotipe, Marginalisasi), SUKA (Subordinasi), dan DOMINO (Dominasi).\n\nStudi Kasus: Subordinasi Gender di Dunia Korporasi\nDi sebuah perusahaan finansial besar, karyawan perempuan yang berprestasi tinggi ditolak naik jabatan menjadi manajer puncak dengan alasan stereotipe \"perempuan terlalu emosional dan akan sibuk mengurus anak\" (Stereotipe & Subordinasi). Posisi tersebut otomatis diberikan kepada laki-laki yang kemampuannya di bawahnya."
      },
      {
        "id": "les_11_bab2_5",
        "course_id": "course_11_bab2",
        "chapter_number": 2,
        "chapter_title": "Bab 2: Permasalahan Sosial",
        "title": "Pertemuan 5: Kesenjangan Sosial Ekonomi, Kemiskinan & Intoleransi",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Kesenjangan Ekonomi:\n- Klasik: Beda hierarki kelas, kekayaan, prestise (gender, usia, pendidikan).\n- Baru: Perbedaan gaya hidup (lifestyle), konsumsi barang mewah, akses IT.\n\nKemiskinan sebagai Masalah Struktural:\nBank Dunia menetapkan garis kemiskinan ekstrem di bawah US$1,9 per hari.\n- Absolut: Di bawah garis kemiskinan (tak bisa beli makanan dasar).\n- Relatif: Penilaian subyektif (merasa miskin karena tetangga lebih kaya).\n- Natural: Cacat/bencana/usia lanjut.\n- Kultural: Mentalitas malas, boros, pasrah.\n- Struktural: Akibat kebijakan tak adil, korupsi elit, akses diblokir (Sistemik).\nTeori tokoh: Henry George (monopoli tanah), Karl Marx (eksploitasi borjuis), Robert Malthus (penduduk tumbuh deret ukur, makanan deret hitung).\n\nIntoleransi:\nPandangan fanatik mengabaikan sistem nilai di luar kelompoknya (memicu hate speech). Berakar dari:\n- Primordialisme (pegang teguh ikatan tradisi/suku kaku).\n- Etnosentrisme (mengagungkan budaya sendiri berlebihan dan merendahkan yang lain).\n\nCara Mudah Membaca: Ingat 3 Jenis Kemiskinan Utama menurut Baswir: \"NAKUL STRUKTUR\" (NAtural, KULtural, STRUKTURal).\n\nStudi Kasus: Teori Populasi Malthus dalam Kemiskinan\nDi sebuah kawasan kumuh bantaran sungai, satu keluarga memiliki 8 orang anak tanpa pekerjaan tetap. Pertumbuhan anak melesat (deret ukur), namun pasokan makanan di rumah sangat terbatas karena harga beras melonjak tinggi (deret hitung), menciptakan kelaparan kronis."
      },
      {
        "id": "les_11_bab2_6",
        "course_id": "course_11_bab2",
        "chapter_number": 2,
        "chapter_title": "Bab 2: Permasalahan Sosial",
        "title": "Pertemuan 6: Bahaya KKN dan Penelitian Sosial Pemecahan Masalah",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Korupsi: Berasal dari corruptio (busuk). Penyalahgunaan kekuasaan publik/jabatan demi keuntungan pribadi merugikan negara.\nKolusi: Permufakatan rahasia melawan hukum antar-pihak demi meraup keuntungan (gratifikasi).\nNepotisme: Mengutamakan keluarga/kroni untuk diberi jabatan strategis, bukan berdasar kemampuan objektif (meritokrasi).\n\nPenelitian Sosial Berbasis Pemecahan Masalah:\n(1) Metode Preventif: Mencegah sebelum masalah pecah.\n(2) Metode Represif: Penegakan hukum sesudah masalah terjadi.\nPenelitian ilmiah meliputi 8 tahapan: Menentukan topik, Studi pendahuluan, Rumusan masalah, Teori/Metode (kualitatif/kuantitatif), Menyusun rancangan, Mengumpulkan data, Analisis/Kesimpulan, dan Laporan.\n\nCara Mudah Membaca: Ingat 3 Sumber Informasi Studi Pendahuluan: \"TUMAN TEMPAT\" (TUlisan/pustaka, MANusia/narasumber, TEMPAT/observasi lokasi).\n\nStudi Kasus: Penelitian Sosial KKN Dana Desa\nSeorang peneliti sosiologi muda mengendus adanya mark-up anggaran pembangunan jembatan desa (KKN). Ia menyusun proposal, melakukan wawancara rahasia dengan warga (Pengumpulan Data), menganalisis kwitansi fiktif (Analisis Data), lalu menyusun rekomendasi preventif bagi KPK."
      }
    ]
  },
  {
    "id": "course_11_bab3",
    "title": "Sosiologi Kelas 11 Bab 3: Konflik Sosial & Pemecahan Masalah Kontemporer",
    "description": "Membahas teori konflik, kekerasan, resolusi konflik, dan penelitian sosial berbasis pemecahan masalah.",
    "grade_level": 11,
    "category": "Struktur & Dinamika Kelompok",
    "thumbnail": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600",
    "totalLessons": 6,
    "completedLessons": 0,
    "lessons": [
      {
        "id": "les_11_bab3_1",
        "course_id": "course_11_bab3",
        "chapter_number": 3,
        "chapter_title": "Bab 3: Konflik Sosial",
        "title": "Pertemuan 1: Pengaruh Struktur Sosial terhadap Munculnya Konflik",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Struktur sosial dalam bentuk diferensiasi (horizontal) dan stratifikasi (vertikal) dapat memicu konflik jika tak dikelola adil. Empat konsekuensi utamanya:\n1. Primordialisme: Memegang teguh secara kaku hal-hal yang dibawa sejak lahir (suku, ras, asal daerah, agama).\n2. Etnosentrisme: Sikap subjektif yang menilai kebudayaan lain menggunakan kacamata dan ukuran kebudayaan sendiri (fanatisme suku).\n3. Politik Aliran (Sektarian): Organisasi politik dikelilingi oleh jaringan ormas yang diikat kesamaan ideologi/aliran agama.\n4. Konsolidasi: Penguatan internal kelompok yang melahirkan antipati, prasangka, dan kecurigaan ke luar kelompok.\n\nCara Mudah Membaca: Ingat konsekuensi ini dengan \"PRISMA\"\nPrimordialisme (Sejak lahir) -> Rasial-etnosentrisme (Menilai dengan standar sendiri) -> Ideologi-aliran (Politik sektarian) -> Solidaritas-konsolidasi (Kuat ke dalam, antipati ke luar) -> MAsalah konflik.\n\nStudi Kasus:\nDi sebuah kawasan perumahan, warga Suku A mendirikan paguyuban eksklusif yang hanya membolehkan anggota berbelanja di toko sesama suku mereka (Konsolidasi keluar yang antipati). Akibatnya, Suku B merasa tersisih dan membangun blokade tandingan, memicu konflik horizontal."
      },
      {
        "id": "les_11_bab3_2",
        "course_id": "course_11_bab3",
        "chapter_number": 3,
        "chapter_title": "Bab 3: Konflik Sosial",
        "title": "Pertemuan 2: Hakikat Konflik Sosial dan Teori Kekerasan",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Konflik (Latin: configere = saling memukul). Menurut Soerjono Soekanto: Proses sosial menantang pihak lawan disertai ancaman/kekerasan. Lewis Coser: Perjuangan menetralkan/melenyapkan lawan demi nilai, status, kekuasaan langka. Ralf Dahrendorf: Pertentangan akibat asosiasi yang dikoordinasikan paksa (polarisasi penguasa dan dikuasai).\n\nKekerasan (Violence) adalah lanjutan konflik. Johan Galtung mengartikannya sebagai penyebab perbedaan antara yang potensial dan aktual. \n- Kekerasan Langsung: Melukai fisik, membunuh.\n- Kekerasan Tidak Langsung: Mengekang hak, intimidasi, memfitnah (cyberbullying).\n\nTeori Kekerasan:\n1. Faktor Individual: Agresivitas individu memicu kekerasan (kelainan jiwa, psikopat).\n2. Faktor Kelompok: Benturan identitas kelompok kaku saat interaksi (suporter bola).\n3. Dinamika Kelompok (Ted Robert Gurr): Akibat deprivasi relatif (kehilangan rasa memiliki/ketertinggalan) karena perubahan cepat yang tidak diimbangi sistem nilai.\n\nCara Mudah Membaca: Ingat rumus \"INDINGKRAT\" (INdividu, DING/Dinamika-Deprivasi, KRAT/Kelompok).\n\nStudi Kasus: Konflik suporter sepak bola ekstrem di perkotaan (Faktor Kelompok). Ketika individu masuk stadion, identitas pribadi lebur jadi identitas kolektif kelompok. Senggolan kecil di tribun memicu tawuran karena harga diri kelompok dilecehkan."
      },
      {
        "id": "les_11_bab3_3",
        "course_id": "course_11_bab3",
        "chapter_number": 3,
        "chapter_title": "Bab 3: Konflik Sosial",
        "title": "Pertemuan 3: Kronologi Kerusuhan Massal dan Ragam Macam Konflik",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Tahapan Kerusuhan Massal (N.J. Smelser):\n1. Situasi Sosial Kondusif: Ketiadaan saluran komunikasi resmi menampung keluhan.\n2. Tekanan Sosial (Strain): Norma dilanggar sepihak.\n3. Perkembangan Kebencian/Pencetus: Benci meledak karena pemantik kecil (rumor).\n4. Mobilisasi Aksi: Massa diorganisasi menyerang target.\n5. Kontrol Sosial Aparat: Polisi turun tangan mengendalikan massa.\n\nCara Mudah Membaca: \"SI-TEK-BEN-MOB-KON\" (SItuasi, TEKanan, BENci/pencetus, MOBilisasi, KONtrol).\n\nFaktor Pemicu (Wiese & Becker): Beda individu, budaya, kepentingan, dan perubahan terlalu cepat.\n\nRagam Konflik:\n- Dimensi: Vertikal (rakyat vs elite) & Horizontal (antar rakyat setara).\n- Tipe (Simon Fisher): Tanpa Konflik, Laten (tersembunyi), Terbuka, Permukaan.\n- Bentuk (Coser): Realistis (kekecewaan rasional) & Nonrealistis (emosional meredakan tegang/mencari kambing hitam).\n\nStudi Kasus: Pengkambinghitaman minoritas saat krisis ekonomi (Konflik Nonrealistis Coser). Tuduhan bukan karena minoritas merebut sumber daya langsung, tapi untuk meredakan ketegangan internal massa mayoritas."
      },
      {
        "id": "les_11_bab3_4",
        "course_id": "course_11_bab3",
        "chapter_number": 3,
        "chapter_title": "Bab 3: Konflik Sosial",
        "title": "Pertemuan 4: Dampak Ganda Konflik dan Strategi Pencegahan Dini",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Dampak Negatif Konflik: Keretakan hubungan, kerusakan harta/jiwa, kepribadian agresif, dominasi pemenang.\n\nDampak Positif (Lewis A. Coser): Konflik bukan tanda kelemahan, melainkan menghidupkan dan memperkuat struktur sosial jika diungkapkan tanpa kekerasan. \n- Memperjelas aspek yang buram.\n- Menyesuaikan kembali norma.\n- Meningkatkan solidaritas in-group saat menghadapi out-group.\n- Memunculkan kompromi baru saat kekuatan seimbang.\n\nUU RI No. 7 Tahun 2012 tentang Penanganan Konflik Sosial memiliki 3 pilar: Pencegahan, Penghentian, dan Pemulihan.\nPencegahan meliputi: mengakui HAM, menghargai beda pikiran, toleransi aktif, musyawarah, tegakkan supremasi hukum tanpa tebang pilih, kembangkan Bhinneka Tunggal Ika, dan sistem peringatan dini (early warning).\n\nCara Mudah Membaca: Ingat pilar pencegahan dengan \"DIALOG ADIL\" (DIni peringatan, Akui HAM, LOGika toleransi, Aparat hukum adil, DILakukan musyawarah).\n\nStudi Kasus: Sengketa tata ruang pasar diselesaikan dengan regulasi bersama (Dampak positif: melahirkan norma kompromi seimbang antara pedagang dan Pemda)."
      },
      {
        "id": "les_11_bab3_5",
        "course_id": "course_11_bab3",
        "chapter_number": 3,
        "chapter_title": "Bab 3: Konflik Sosial",
        "title": "Pertemuan 5: Resolusi, Manajemen & Pengendalian Konflik",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Konflik dikendalikan melalui Safety Valve (Katup Penyelamat) menurut Coser (jalan keluar sementara tanpa hancurkan struktur).\n\nBentuk Pengendalian:\n1. Kompromi: Saling kurangi tuntutan.\n2. Konsiliasi: Melalui lembaga resmi demokratis (DPR).\n3. Mediasi: Pihak ketiga (Mediator) netral, menasihati, tapi KEPUTUSANNYA TIDAK MENGIKAT HUKUM.\n4. Arbitrase: Pihak ketiga (Wasit/Hakim), KEPUTUSANNYA MUTLAK MENGIKAT secara hukum.\n\nCara Mudah Membaca: \"ME-TI-AR-MUT\" (MEdiasi-TIdak mengikat, ARbitrase-MUTlak mengikat).\n\nTransformasi Konflik (Simon Fisher/Wehr): Peacemaking (diplomatik), Peacekeeping (jaga agar tak meletus), Conflict Management, Peacebuilding (bangun infrastruktur jangka panjang).\n\nStudi Kasus: Sengketa batas wilayah dua desa gagal diselesaikan lewat Mediasi Kades. Akhirnya diselesaikan lewat Arbitrase di pengadilan. Keputusan hakim didasarkan peta agraria dan mengikat mutlak kedua desa."
      },
      {
        "id": "les_11_bab3_6",
        "course_id": "course_11_bab3",
        "chapter_number": 3,
        "chapter_title": "Bab 3: Konflik Sosial",
        "title": "Pertemuan 6: Penelitian Sosial Berbasis Pemecahan Konflik",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Pemetaan Konflik menggunakan model SIPABIO (Amr Abdalla):\nSource (Sumber), Issues (Isu), Parties (Aktor), Attitudes (Sikap), Behavior (Perilaku), Intervention (Intervensi Pihak Ketiga), Outcome (Hasil/Dampak).\n\nPengumpulan data lapangan via Observasi (Anecdotal record, Rating scale, Check list, Human instrument/peneliti sendiri). \nLalu melalui Editing (merapikan tanpa ubah makna) dan Coding (memberi kode angka untuk tabulasi).\n\nAlat Analisis Visual Konflik:\n- Segitiga ABC: Attitudes (Sikap), Behaviour (Perilaku), Contradiction (Kontradiksi).\n- Model Bawang (Onion Model): Posisi luar (apa yg dikatakan), Kepentingan tengah (yg diinginkan), Kebutuhan dasar inti (yg mutlak dibutuhkan).\n- Pohon Konflik: Akar (penyebab), Batang (masalah utama), Daun (dampak).\n- Piramida Konflik: Tingkat aktor (Elite puncak, Tokoh madya, Massa dasar).\n\nStudi Kasus: Penelitian tawuran SMK via Pohon Konflik. Batang: tawuran mingguan. Akar: dendam senioritas. Daun: fasilitas rusak & drop out massal pelajar."
      }
    ]
  },
  {
    "id": "course_11_bab4",
    "title": "Sosiologi Kelas 11 Bab 4: Membangun Harmoni Sosial",
    "description": "Membahas harmoni, integrasi, inklusi, kohesi sosial, dan resolusi pasca-konflik.",
    "grade_level": 11,
    "category": "Struktur & Dinamika Kelompok",
    "thumbnail": "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=600",
    "totalLessons": 6,
    "completedLessons": 0,
    "lessons": [
      {
        "id": "les_11_bab4_1",
        "course_id": "course_11_bab4",
        "chapter_number": 4,
        "chapter_title": "Bab 4: Membangun Harmoni Sosial",
        "title": "Pertemuan 1 & 2: Hakikat & Syarat Integrasi Sosial",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Harmoni Sosial: Kondisi individu hidup sejalan dan serasi dengan tujuan masyarakatnya tanpa pemaksaan seragam, melainkan lewat toleransi dan dialog di tengah pluralisme.\nIntegrasi Sosial: Proses penyesuaian unsur-unsur berbeda menjadi satu kesatuan yang padu (KBBI: pembauran hingga menjadi bulat).\n\nTokoh Integrasi:\n- Abu Ahmadi: Kerja sama dari individu hingga lembaga menghasilkan konsensus nilai.\n- Abdul Syani: Tidak cukup kumpul fisik, harus ada solidaritas dan perasaan manusiawi.\n- Michael Banton: Membatasi fungsi perbedaan ras dalam pekerjaan/hak (tidak ada diskriminasi).\n\nSyarat Terwujudnya Integrasi (Ogburn & Nimkoff):\n1. Anggota saling mengisi kebutuhan fisik/sosial.\n2. Menciptakan konsensus bersama tentang norma/nilai.\n3. Norma berlaku cukup lama dan dijalankan konsisten.\n\nFaktor Kecepatan Integrasi (\"BUMBU HOMPIMPA\"):\n- Besar kecilnya kelompok (Kelompok kecil lebih cepat).\n- Homogenitas (Makin seragam/homogen makin cepat).\n- Mobilitas Geografis (Sering pindah = lambat integrasi).\n- Efektivitas Komunikasi (Komunikasi terbuka = cepat).\n\nCara Mudah Membaca: Ingat pilar dasar harmoni: \"SERASI\" (SEjalan tujuan, RAs tidak membatasi hak - Banton, Solidaritas kemanusiaan - Ahmadi/Syani).\n\nStudi Kasus: Kampung Damai dihuni asli dan pendatang beda suku. Saat perayaan besar, mereka gotong-royong mendirikan tenda tanpa memandang latar belakang pekerjaan, menunjukkan konsensus nilai kemanusiaan."
      },
      {
        "id": "les_11_bab4_2",
        "course_id": "course_11_bab4",
        "chapter_number": 4,
        "chapter_title": "Bab 4: Membangun Harmoni Sosial",
        "title": "Pertemuan 3 & 4: Bentuk, Proses & Akomodasi Integrasi",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Bentuk Integrasi:\n- Normatif: Disatukan oleh norma/ideologi (Bhinneka Tunggal Ika).\n- Fungsional: Disatukan saling ketergantungan pembagian kerja (pedagang, petani).\n- Koersif: Disatukan paksaan/kekerasan oleh penguasa (polisi pakai gas air mata menertibkan demo).\n\nProses Integrasi: Diawali akomodasi (meredakan pertentangan) -> kerja sama -> koordinasi -> asimilasi batas hilang.\n\nAkulturasi vs Asimilasi vs Akomodasi:\n- Akulturasi: Dua budaya bersatu tapi kepribadian/ciri asli TIDAK hilang (A + B = AB). Menara Kudus (Hindu + Islam).\n- Asimilasi: Dua budaya melebur bentuk budaya baru, batas lama HILANG (A + B = C). Syaratnya: tak ada isolasi, bawa manfaat, persamaan sifat, budaya materi mudah diadopsi.\n- Akomodasi: Menyelesaikan konflik tanpa hancurkan lawan (Mediasi, Arbitrase, Kompromi, Stalemate, Adjudikasi pengadilan, Segregasi pemisahan, Minority Consent lapang dada).\n\nCara Mudah Membaca: \"AKU TETAP, ASI HILANG, AKO MEDIASI\" (Akulturasi tetap cirinya, Asimilasi hilang aslinya, Akomodasi penyelesaian via Mediasi).\n\nStudi Kasus: Pasar mempertemukan kuli, pedagang sayur beda etnis. Tak pernah bentrok karena saling butuh roda ekonomi berputar (Integrasi Fungsional)."
      },
      {
        "id": "les_11_bab4_3",
        "course_id": "course_11_bab4",
        "chapter_number": 4,
        "chapter_title": "Bab 4: Membangun Harmoni Sosial",
        "title": "Pertemuan 5: Faktor Pendorong & Ancaman Disintegrasi",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Faktor Pendorong Integrasi: Toleransi, Kesempatan ekonomi seimbang, Saling hargai tulus, Penguasa terbuka pada kritik, Amalgamasi (perkawinan campuran beda budaya), dan Adanya Musuh Bersama dari luar.\n\nDisintegrasi Sosial (Selo Soemardjan & Soerjono Soekanto):\nAkibat perubahan sosial lembaga yang tak diimbangi adaptasi seimbang, memicu disorganisasi. Terjadi ketidakserasian, sanksi menjadi mandul, tokoh hilang wibawa, memicu Chaos (kacau fisik) dan Anomie (tanpa aturan, hilang kompas moral baik/buruk).\n\nCara Mudah Membaca: Ingat ciri runtuh ketertiban: \"ANOMALI KATA\" (ANOMie, LogIka sanksi mandul, KAcaunya masyarakat, Tokoh hilang wibawa).\n\nStudi Kasus: Krisis ekonomi jatuh memicu kekosongan wibawa hukum. Warga menjarah tanpa rasa bersalah karena penegak hukum lumpuh (Anomie di tengah Chaos)."
      },
      {
        "id": "les_11_bab4_4",
        "course_id": "course_11_bab4",
        "chapter_number": 4,
        "chapter_title": "Bab 4: Membangun Harmoni Sosial",
        "title": "Pertemuan 6: Triad Harmoni (Kesetaraan, Inklusi, Kohesi)",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Kesetaraan Sosial: Kebebasan penuh dari diskriminasi. \n5 Kategori: Hukum (peradilan adil), Politik (hak milih), Sosial (tanpa dominasi), Ekonomi (bagi adil resiko), Moral (martabat intrinsik sama). \nCara Mudah Membaca: \"HOPE-M\" (Hukum, Otoritas Politik, Pembagian Ekonomi, Eksistensi sosial, Moral).\n3 Konsep Kesetaraan: Kesempatan (lewat meritokrasi), Sejak awal (Tindakan Afirmatif/affirmative action oleh negara), dan Hasil. (Dijamin UUD 1945 Pasal 27).\n\nInklusi Sosial: Partisipasi aktif semua warga terutama kelompok marginal/difabel dalam semua kegiatan publik dengan menyingkirkan hambatan struktural.\n\nKohesi Sosial: Kekuatan pengikat anggota agar tetap bersatu berkat kepercayaan sosial (trust) (Durkheim). Cartwright & Zander menyebut dipengaruhi potensi kelompok dan motif keanggotaan.\n\nStudi Kasus: Pembangunan trotoar guiding block kuning & jembatan penyeberangan lift untuk tunanetra & pengguna kursi roda. Partisipasi mereka meningkat nyata (Inklusi sosial aktif)."
      },
      {
        "id": "les_11_bab4_5",
        "course_id": "course_11_bab4",
        "chapter_number": 4,
        "chapter_title": "Bab 4: Membangun Harmoni Sosial",
        "title": "Pertemuan 7: Praktik Strategis Aksi Harmoni (Siklus)",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Tindakan Harmoni di 2 Level (Manisha Sharma):\nA. Individu: Empati diri, persahabatan inklusif.\nB. Institusi: Keluarga (kerjasama), Masyarakat (patuh hukum), Negara (Lindu HAM & adil).\n\nAksi Sosial Kolaboratif anti-bullying melewati Siklus Baku:\n1. Perencanaan: FGD (Focus Group Discussion), Analisis SWOT (Strengths, Weaknesses, Opportunities, Threats), menyusun rencana.\n2. Pelaksanaan: Eksekusi aksi, izin lokasi, dokumentasi jalannya kegiatan.\n3. Evaluasi & Pelaporan: Mengamati dampak via survei, menyusun Laporan resmi (Awal: Judul, Daftar isi; Isi: SWOT, Latar belakang; Penutup: Kesimpulan, Lampiran foto).\n\nCara Mudah Membaca: Ingat tahapan aksi: \"PETA LARI\" (PErencanaan matang, TA LA/PelaksaNAan lapangan, R/RI: Evaluasi dan pelapoRAn).\n\nStudi Kasus: Siswa SMA merancang kampanye anti-bullying via podcast (siniar). Riset dulu dengan guru BK (Perencanaan), merekam materi bersama OSIS (Pelaksanaan), menyebar kuesioner ke pendengar (Evaluasi dampak)."
      },
      {
        "id": "les_11_bab4_6",
        "course_id": "course_11_bab4",
        "chapter_number": 4,
        "chapter_title": "Bab 4: Membangun Harmoni Sosial",
        "title": "Pertemuan 8: Resolusi Pascakonflik & Kehidupan Damai",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Fungsionalisme Struktural (Equilibrium): Tiap bagian masyarakat saling berkaitan untuk menjaga harmoni/integrasi. Keseimbangan rusak jika diskriminasi dibiarkan.\n\nUU RI No. 7 Tahun 2012 tentang Penanganan Konflik Sosial (Pemulihan/Recovery):\n1. Rekonsiliasi (Pasal 37): Perundingan damai, restitusi ganti rugi, pemaafan lewat pranata adat.\n2. Rehabilitasi (Pasal 38): Perbaikan aspek psikologis/mental trauma korban & layanan medis dasar.\n3. Rekonstruksi (Pasal 39): Pembangunan kembali sarana/prasarana bangunan fisik (pasar/rumah ibadah rusak).\n\nTransformasi Sosial pascakonflik adalah perubahan nilai/norma.\nReintegrasi Sosial (Soerjono Soekanto): Proses pembentukan KEMBALI norma/nilai baru untuk menyesuaikan lembaga.\nKoeksistensi Sosial: Kelompok berbeda identitas mampu hidup bersama dalam 1 ruang tanpa kekerasan, saling menghormati.\n\nCara Mudah Membaca: 3 Pilar Recovery UU 7/2012 \"REKONSILIASI FISIK PSIKIS\"\nRekonsiliasi (damai), Fisik/Rekonstruksi (bangun gedung), Psikis/Rehabilitasi (pulihkan mental).\n\nStudi Kasus: Pasca-kerusuhan komunal, kades kumpulkan warga bertikai (Rekonsiliasi), tim psikolog masuk beri trauma healing anak (Rehabilitasi), dan warga gotong-royong bangun ulang pasar yang hangus (Rekonstruksi)."
      }
    ]
  },
  {
    "id": "course_12_bab1",
    "title": "Sosiologi Kelas 12 Bab 1: Perubahan Sosial dan Dampaknya",
    "description": "Membahas konsep perubahan, teori makro sosiologis, modernisasi, serta penyesuaian masyarakat (adjustment) akibat dampak budaya era disrupsi.",
    "grade_level": 12,
    "category": "Dinamika Makro Sosial",
    "thumbnail": "https://images.unsplash.com/photo-1558486012-817176f84c6d?auto=format&fit=crop&q=80&w=600",
    "totalLessons": 6,
    "completedLessons": 0,
    "lessons": [
      {
        "id": "les_12_bab1_1",
        "course_id": "course_12_bab1",
        "chapter_number": 1,
        "chapter_title": "Bab 1: Perubahan Sosial dan Dampaknya",
        "title": "Pertemuan 1: Hakikat dan Karakteristik Perubahan Sosial",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Albert O. Hirschman mengemukakan bahwa kebosanan manusia merupakan salah satu penyebab utama perubahan. Manusia secara psikologis selalu tidak puas dan kreatif mencari sesuatu yang baru.\n\nPandangan Para Tokoh:\n- Selo Soemardjan: Perubahan pada lembaga kemasyarakatan yang memengaruhi sistem sosial (nilai, sikap, perilaku).\n- Kingsley Davis: Perubahan dalam struktur dan fungsi masyarakat.\n- William F. Ogburn: Menekankan pada kondisi teknologis (budaya materiil) yang memicu penyesuaian pikiran.\n\nPerubahan dapat berwujud kemajuan (progress) yang memudahkan hidup, atau kemunduran (regress) yang merugikan.\n\nKarakteristik Perubahan (Macionis):\n1. Terjadi di setiap masyarakat (universal).\n2. Sulit dikontrol sepenuhnya arah perkembangannya.\n3. Melahirkan kontroversi beda pemaknaan nilai.\n4. Menguntungkan satu pihak, sekaligus merugikan pihak lain.\n\nCara Mudah Membaca: Ingat dengan \"HAK-KAR-TOK\" (HAKikat struktur, KARakteristik Macionis - kontroversial/tak terkontrol, TOKoh Selo, Davis, Ogburn).\n\nStudi Kasus: Transformasi E-Commerce\nDulu ibu belanja ke pasar fisik. Kini lewat aplikasi HP (E-commerce). Ogburn melihat teknologi HP merubah struktur. Sisi kemajuan: hemat waktu (progress). Kontroversi (Macionis): menguntungkan pembeli, tapi merugikan pedagang pasar kecil yang sepi."
      },
      {
        "id": "les_12_bab1_2",
        "course_id": "course_12_bab1",
        "chapter_number": 1,
        "chapter_title": "Bab 1: Perubahan Sosial",
        "title": "Pertemuan 2 & 3: Faktor Penyebab, Pendorong & Penghambat",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Faktor Internal (Dalam masyarakat):\n1. Penduduk bertambah/berkurang.\n2. Penemuan Baru: Discovery (baru ketemu gagasan) menjadi Invention (diakui/diterapkan). 3 Polanya: Memancar, Menjalar, Memusat.\n3. Pertentangan (Konflik).\n4. Revolusi/Pemberontakan.\n\nFaktor Eksternal (Luar masyarakat):\n1. Lingkungan Fisik/Bencana Alam.\n2. Peperangan.\n3. Pengaruh kebudayaan asing (Akulturasi, Asimilasi, Sintesis). Lewat jalan penetrasi damai atau paksa.\n\nFaktor Pendorong: Difusi (kontak budaya luar), edukasi maju, toleransi atas deviasi kreatif, pelapisan terbuka (meritokrasi), orientasi masa depan, ketidakpuasan sistem.\n\nFaktor Penghambat:\n- Kurang hubungan dengan dunia luar.\n- Mengagungkan tradisi lama berlebih (konservatif).\n- Kepentingan mapan yang tertanam kuat (Vested Interest) agar tidak goyah hak istimewanya.\n- Prasangka buruk terhadap budaya asing.\n\nCara Mudah Membaca: \"IN-EKS-PEN\" (Internal, Eksternal, Penemuan) dan \"DIF-PEN-DOR-HAM\" (Difusi, Penetrasi, Pendorong, Penghambat).\n\nStudi Kasus: Bencana Lumpur Lapindo\nWarga harus pindah desa karena desa asal tenggelam lumpur. Ini perubahan murni akibat Faktor Eksternal Lingkungan Alam yang memaksa warga merubah matapencaharian dan adaptasi budaya di tempat baru."
      },
      {
        "id": "les_12_bab1_3",
        "course_id": "course_12_bab1",
        "chapter_number": 1,
        "chapter_title": "Bab 1: Perubahan Sosial",
        "title": "Pertemuan 4: Teori Fungsionalisme dan Teori Konflik",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Teori Fungsionalisme (Talcott Parsons): \nPerubahan itu lambat dan berevolusi menuju keseimbangan (equilibrium). Syarat sebuah sistem bertahan wajib melalui skema AGIL:\n- A (Adaptation): Lincah menyesuaikan diri dari ancaman luar.\n- G (Goal Attainment): Menggerakkan sumber daya mencapai target.\n- I (Integration): Mengatur harmoni agar tidak cerai berai.\n- L (Latency): Memelihara pola budaya dan memotivasi moral.\n\nTeori Konflik (Karl Marx, Ralf Dahrendorf):\nPerubahan mutlak terjadi karena perebutan sumber daya ekonomi dan ketimpangan wewenang antar kelas. Revolusi adalah motor utama pendobrak kekakuan (status quo).\n\nCara Mudah Membaca: Teori FUNG-KON. Fungsional mencari equilibrium AGIL (Harmoni), sedangkan Teori Konflik menganggap revolusi kelas adalah mesin kemajuan (Benturan).\n\nStudi Kasus: Lahirnya Ojek Online\nKonflik antara ojek pangkalan (tradisional) vs ojek online menuntut intervensi. Ini bukti dari Dahrendorf: benturan keras menghasilkan reorganisasi regulasi negara (ditetapkan aturan tarif baru), mendobrak kekakuan status quo."
      },
      {
        "id": "les_12_bab1_4",
        "course_id": "course_12_bab1",
        "chapter_number": 1,
        "chapter_title": "Bab 1: Perubahan Sosial",
        "title": "Pertemuan 5: Teori Siklus, Linier, Gerakan, & Modernisasi",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Teori Siklus (Melingkar berulang): Perubahan sejarah selalu berputar kembali. \nSorokin membagi budaya berputar 3 tahap: Ideasional (iman), Idealistis (iman+akal), Sensational/Indrawi (hanya materi inderawi).\n\nTeori Linier / Perkembangan (Garis lurus maju):\n- Comte (Hukum 3 Tahap: Teologis, Metafisik, Positif/Ilmiah).\n- Spencer (Sederhana menuju peradaban rumit).\n- Durkheim (Solidaritas Mekanik ke Organik).\n\nTeori Gerakan Sosial (Aberle):\n- Alternative (ubah perilaku sedikit individu).\n- Redemptive (ubah seluruh perilaku individu).\n- Reformative (ubah struktur segi tertentu tanpa hancurkan negara).\n- Transformative (revolusi ubah total negara).\n\nTeori Modernisasi: Negara terbelakang perlahan akan meniti jalur negara Barat menuju industri.\n\nCara Mudah Membaca: \"SIK-LIN-GER-MOD\" (Siklus berputar, Linier lurus maju, Gerakan sosial merubah, Modernisasi cetak biru barat).\n\nStudi Kasus: Tren Baju Vintage (Retro)\nCelana cutbray 1970-an kini dipakai lagi oleh generasi milenial. Perubahan mode ini membuktikan pandangan teori Siklus: budaya bisa berputar mengulang pola sejarah masa lalu."
      },
      {
        "id": "les_12_bab1_5",
        "course_id": "course_12_bab1",
        "chapter_number": 1,
        "chapter_title": "Bab 1: Perubahan Sosial",
        "title": "Pertemuan 6 & 7: Bentuk Perubahan & Modernisasi Manusia",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Bentuk Perubahan:\n1. Evolusi (lambat, tak sengaja) vs Revolusi (cepat, mengubah sendi pokok. Syarat revolusi: ada momentum, pemimpin, keinginan bersama, dll).\n2. Perubahan Kecil (potongan rambut, gaya) vs Besar (Urbanisasi masal merubah wajah kota).\n3. Direncanakan (oleh Agent of Change lewat Rekayasa Sosial) vs Tidak Direncanakan (bencana).\n4. Struktural (merombak pondasi dasar) vs Proses (menyempurnakan yg ada).\n\nModernisasi (Johan W. Schoorl & Soekanto): Penerapan iptek ilmiah dalam kemasyarakatan. Beda dengan Westernisasi (imitasi gaya kebaratan tanpa akal) atau Sekularisasi (penolakan nilai agama di ruang publik).\nCiri Manusia Modern (Alex Inkeles): Menghargai waktu, terbuka pada inovasi, percaya iptek rasional, dan menghargai imbalan kerja setimpal berdasar prestasi nyata (Meritokrasi).\n\nCara Mudah Membaca: \"EVO-REVO-STRUK\" (Evolusi/Revolusi, Struktural/Proses) & \"MOD-MAN-CIRI\" (Modernisasi butuh manusia berciri Alex Inkeles).\n\nStudi Kasus: E-Tilang Lalu Lintas\nSistem E-Tilang merekam nomor plat via kamera AI. Ini contoh Modernisasi yang direncanakan pemerintah (Agent of Change), memakai indikator objektif teknologi, bebas kongkalikong dan menghargai administrasi tertib."
      },
      {
        "id": "les_12_bab1_6",
        "course_id": "course_12_bab1",
        "chapter_number": 1,
        "chapter_title": "Bab 1: Perubahan Sosial",
        "title": "Pertemuan 8: Patologi Perubahan & Kesinambungan Sosial",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Perubahan masif tanpa kesiapan melahirkan dampak negatif (patologi sosial):\n1. Disorganisasi & Chaos: Norma memudar, kekacauan massal.\n2. Anomie (Emile Durkheim): Keadaan tanpa aturan baku, masyarakat hilang kompas moral.\n3. Cultural Lag / Ketertinggalan Budaya (Ogburn): Teknologi budaya material berubah sangat cepat, tapi tidak diikuti kesiapan mental dan hukum (budaya non-material tertinggal).\n4. Mestizo Culture: Mencampur budaya meniru gaya asing secara imitasi buta tanpa tahu makna aslinya.\n5. Juvenile Delinquency: Kenakalan remaja antisosial.\n\nSelo Soemardjan menegaskan pentingnya Penyesuaian (Adjustment). Jika gagal, masyarakat masuk Ketidakpenyesuaian (Maladjustment). Kesinambungan negara wajib dikawal lewat integrasi infrastruktur merata, hilangkan primordial etnosentris, dan toleransi.\n\nCara Mudah Membaca: \"DAM-NEG-DIS-IN\" (Dampak negatif lahirkan Disorganisasi, Anomie, Cultural Lag, dan harus diatasi lewat Integrasi / Adjustment).\n\nStudi Kasus: Kecanduan Judi Online\nRemaja cerdik memakai smartphone canggih (budaya material melesat tinggi), namun memakainya untuk slot taruhan karena hukum siber & etika digital lemah (budaya non-material tertinggal). Inilah contoh nyata patologi Cultural Lag yang berujung Anomie moral."
      }
    ]
  },
  {
    "id": "course_12_bab2",
    "title": "Sosiologi Kelas 12 Bab 2: Globalisasi dan Masyarakat Digital",
    "description": "Mempelajari akar sejarah globalisasi, sistem dunia, teori kontemporer, era disrupsi, hukum siber, dan pemberdayaan komunitas.",
    "grade_level": 12,
    "category": "Dinamika Makro Sosial",
    "thumbnail": "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=600",
    "totalLessons": 6,
    "completedLessons": 0,
    "lessons": [
      {
        "id": "les_12_bab2_1",
        "course_id": "course_12_bab2",
        "chapter_number": 2,
        "chapter_title": "Bab 2: Globalisasi",
        "title": "Pertemuan 1: Fondasi Globalisasi & Dunia Berwajah Banyak",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Globalisasi adalah ketergantungan antarmasyarakat dunia dalam bidang budaya, ekonomi, dan interaksi tanpa dihalangi batas geografi.\n\n5 Pilar Konseptual Globalisasi (\"Dunia Berwajah Banyak\"):\n1. Internasionalisasi: Meluasnya arus perdagangan internasional.\n2. Liberalisasi: Melonggarkan kontrol/regulasi pemerintah terhadap pasar bebas.\n3. Universalisasi: Penyebaran material/gagasan ke seluruh bumi.\n4. Westernisasi: Adopsi gaya hidup budaya Barat (Amerika).\n5. Deteritorialisasi: Pengaburan batas geografis akibat interaksi siber.\n\nRobin Cohen & Paul Kennedy menyatakan globalisasi mengubah ruang dan waktu secara instan, menyatukan pasar, memunculkan masalah global (iklim/terorisme), melahirkan \"Globalisme\" (kesadaran dunia adalah satu kesatuan utuh).\n\nCara Mudah Membaca: Ingat pilar konsep dengan \"IN-LIB-WEST-DE\" (Internasionalisasi, Liberalisasi, Westernisasi, Deteritorialisasi). \"Insaf-lah Liburan ke Barat Demi dunia tanpa batas!\"\n\nStudi Kasus: Remaja di pelosok Subang dapat memesan album K-Pop langsung dari luar negeri dan menonton konser streaming real-time. Batas wilayah seolah lenyap (fenomena deteritorialisasi yang nyata)."
      },
      {
        "id": "les_12_bab2_2",
        "course_id": "course_12_bab2",
        "chapter_number": 2,
        "chapter_title": "Bab 2: Globalisasi",
        "title": "Pertemuan 2: Akar Sejarah & Teori Sistem Dunia (Wallerstein)",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Akar Sejarah Globalisasi:\n1. Perdagangan Jalur Sutra (1500 SM) antara Tiongkok & Eropa.\n2. Dominasi perdagangan saudagar Muslim abad Pertengahan (menyebarkan agama, aksara, tata kota).\n3. Kolonialisme Eropa pasca Revolusi Industri (lahirnya perusahaan multinasional kuno).\n4. Berakhirnya Perang Dingin & runtuhnya Komunisme abad 20 (Kapitalisme pasar bebas menang telak).\n\nTeori Sistem Dunia Modern (Immanuel Wallerstein):\nSemua negara terikat dalam kapitalisme global. Wallerstein membagi kasta negara menjadi:\n1. Negara Inti (Core): Maju, kaya, dominan teknologi, meraup untung terbesar (contoh: AS, Eropa Barat).\n2. Semiperiferi: Kelas menengah, semi-industri, masih tergantung pada modal asing (contoh: Brazil, India, Indonesia).\n3. Periferi (Pinggiran): Ekonomi terbelakang, kemiskinan tinggi, hanya dieksploitasi bahan mentah murahnya (mayoritas Afrika/Asia miskin). Kasta ini bersifat dinamis, negara bisa naik/turun kelas.\n\nCara Mudah Membaca: Ingat teori Wallerstein dengan \"KOPER-SEMI\" (Kore/Inti, Periferi, Semiperiferi). Bawa Koper Semi-mahal untuk keliling struktur dunia!\n\nStudi Kasus: Bijih nikel digali murah dari negara Periferi, dirakit jadi baterai di pabrik mobil Semiperiferi, lalu dijual paten harganya mahal oleh korporasi raksasa negara Core."
      },
      {
        "id": "les_12_bab2_3",
        "course_id": "course_12_bab2",
        "chapter_number": 2,
        "chapter_title": "Bab 2: Globalisasi",
        "title": "Pertemuan 3: Teori Globalisasi Kontemporer & Glokalisasi",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Tiga Kubu Sosiologis: Globalis (globalisasi melenyapkan budaya lokal), Tradisionalis (mitos, cuma pengulangan sejarah lama), Transformalis (merubah, tapi pola lokal masih hidup).\n\nTeori-Teori Kontemporer:\n- Neoliberalisme (Thomas Friedman): Menawarkan \"Golden Straightjacket\" (Jaket Ikat Emas) = Aturan pasar bebas (privatisasi, anti-monopoli negara) yg membatasi kedaulatan negara demi dapat uang makmur dari pasar global.\n- Budaya Dunia (Roland Robertson): Globalisasi tidak homogen 100%, tapi melahirkan \"Glokalisasi\" (perpaduan pengaruh global dengan kearifan lokal melahirkan hibridisasi budaya).\n- Pemerintahan Dunia (Thomas Meyer): Fenomena \"Isomorphism\", negara berkembang meniru kebijakan/pendidikan ala Barat agar terlihat modern dan seragam.\n- Kelas Baru (William Robinson): Hadirnya Transnational Capitalist Class (TCC), kaum borjuis baru yang tak punya negara asal, mencari profit melampaui batas batas teritorial.\n\nCara Mudah Membaca: \"JAKET EMAS\" (Jaminan Kemakmuran via Ekonomi Terbuka Eliminasi Monopoli). Friedman menuntut negara kurangi kontrol jika mau investasi siber.\n\nStudi Kasus: Menu \"Burger Rendang\" di McDonald's. Ada bentuk Global (Burger) dipadukan isi Lokal (Rendang). Ini adalah wujud Glokalisasi."
      },
      {
        "id": "les_12_bab2_4",
        "course_id": "course_12_bab2",
        "chapter_number": 2,
        "chapter_title": "Bab 2: Globalisasi",
        "title": "Pertemuan 4: Dampak Multidimensional Globalisasi",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Globalisasi berdampak ke banyak bidang:\n- Ekonomi (Tanri Abeng 5 bentuk): Globalisasi Produksi, Pembiayaan, Tenaga Kerja, Jaringan Informasi, dan Perdagangan.\n- Sosial: Urbanisasi tak terkendali karena daya tarik investasi modal asing.\n- Budaya: Gaya hidup konsumtif, Individualisme, Hedonisme, Sekularisme (mengabaikan agama).\n- Kejahatan: Transnasional crime (dagang manusia), Cybercrime.\n- Lingkungan (Sosiolog Eitzen, 5 Polusi Kapitalisme): Udara, Air (limbah), Kimiawi (pestisida), Padat (sampah komersial), Panas (pemanasan global bumi).\n\nCara Mudah Membaca: Ingat 5 globalisasi ekonomi dengan \"PRO-BIA-NA-FOR-DAG\" (Produksi, Biaya/Finansial, teNAga kerja, inFORmasi, perDAGangan).\n\nStudi Kasus: Pabrik manufaktur luar negeri dibangun di pinggiran Indonesia karena upah buruh sangat murah, dibiayai bank di Inggris, dan hasil sepatunya dijual ke pasar Amerika secara online (Globalisasi Ekonomi Paripurna)."
      },
      {
        "id": "les_12_bab2_5",
        "course_id": "course_12_bab2",
        "chapter_number": 2,
        "chapter_title": "Bab 2: Globalisasi",
        "title": "Pertemuan 5 & 6: Masyarakat Jaringan, Era Disrupsi & Hukum Siber",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Inovasi siber melahirkan Disruptive Era (era yang meruntuhkan sistem konvensional lama). Jan van Dijk (dan Stein Braten via konsep Nettsamfunn) menyebut terbentuknya Masyarakat Jaringan (Network Society), di mana interaksi sosial diatur via layar gawai.\n\nPilar Revolusi Industri 4.0:\n1. Artificial Intelligence (AI) - Kecerdasan buatan.\n2. Big Data - Pengolahan rekam jejak digital raksasa.\n3. Internet of Things (IoT) - Menanamkan sensor internet di alat fisik.\nSaat ini bergerak menuju Society 5.0 (mengembalikan manusia human-centric sebagai pusat kendali).\n\nAncaman siber (Hoaks, Cybercrime) dan \"Digital Divide\" (kesenjangan penguasaan internet antara kaya-miskin/kota-desa) ditangani pemerintah melalui Arsitektur Hukum Positif: UU ITE (No. 11/2008, No. 19/2016, revisi terbaru No. 1 Tahun 2024), serta harmonisasi siber pada KUHP Baru (UU No. 1/2023). Tujuannya mencegah korban, memberi kepastian hukum, dan edukasi jera pelaku.\n\nCara Mudah Membaca: \"AL-BI-OT\" (AI, Big Data, IoT). Urutan Hukum ITE \"08-16-24\" (Lahir 2008, Revisi Satu 2016, Revisi Dua 2024).\n\nStudi Kasus: Polisi Siber menangkap penyebar hoaks provokatif agama menggunakan jerat UU ITE No. 1 Tahun 2024, sebagai langkah menertibkan ruang masyarakat jaringan dari perpecahan horizontal."
      },
      {
        "id": "les_12_bab2_6",
        "course_id": "course_12_bab2",
        "chapter_number": 2,
        "chapter_title": "Bab 2: Globalisasi",
        "title": "Pertemuan 7 & 8: Polarisasi Perspektif & Model Pemberdayaan (AGIL)",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "3 Perspektif Masyarakat (David Held):\n1. Kelompok Skeptis (Antiglobalisasi): Globalisasi menguntungkan kapitalis kaya dan menyiksa alam.\n2. Kelompok Hiperglobalis (Proglobalisasi): Mendukung gejala denasionalisasi (pasar siber mengalahkan batas negara).\n3. Kelompok Transformasionalis (Moderat): Negara harus lincah beradaptasi tapi pola adat lama tetap hidup berdampingan.\n\nUlrich Beck menilai era siber membelah dunia antara \"Globalisasi kaum kaya vs Lokalitas kaum miskin yang terisolasi\".\n\nSikap menahan gempuran: (Selo Soemardjan) Kritis, ilmiah, taat hukum.\nPertahanan Struktur (Talcott Parsons AGIL): Adaptation (lincah menyesuaikan), Goal Attainment (mencapai target kemakmuran), Integration (merawat kohesi solid), Latency (memelihara budaya moral sakral leluhur).\n\nAksi Praksis: Pemberdayaan Masyarakat (Jim Ife). Memberdayakan warga miskin dengan 3 strategi taktis: Pendidikan penyadaran, Kebijakan struktur, dan Aksi politik. Hal ini mengatasi ketimpangan (Disadvantaged) menjadi berdaya guna (Power).\n\nCara Mudah Membaca: Ingat respons dengan \"SKEP-HIP-TRANS\" (Skeptis, Hiperglobalis, Transformasionalis).\n\nStudi Kasus: Ibu-ibu perajin tenun daerah diajari literasi digital e-commerce agar mandiri (Pemberdayaan Jim Ife), sambil tetap menjaga ritual suci pengerjaan kain tersebut warisan nenek moyang (Fungsi Latency/L dalam kerangka AGIL Parsons)."
      }
    ]
  },
  {
    "id": "course_12_bab3",
    "title": "Sosiologi Kelas 12 Bab 3: Masalah Sosial Akibat Globalisasi & Digital",
    "description": "Mengkaji masalah sosial seperti neokolonialisme, cultural lag, kejahatan siber, serta solusi menjaga kesehatan mental dan sosial.",
    "grade_level": 12,
    "category": "Dinamika Makro Sosial",
    "thumbnail": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
    "totalLessons": 6,
    "completedLessons": 0,
    "lessons": [
      {
        "id": "les_12_bab3_1",
        "course_id": "course_12_bab3",
        "chapter_number": 3,
        "chapter_title": "Bab 3: Masalah Sosial Era Global",
        "title": "Pertemuan 1 & 2: Transformasi Sosial, Dominasi & Krisis Identitas",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Masalah sosial adalah ketidaksesuaian unsur-unsur masyarakat yang membahayakan kelompok sosial. \nTransformasi Sosial berarti perubahan rupa/sifat masyarakat yang menyeluruh, berdampak pada melemahnya kontrol sosial yang sebelumnya kuat (pada masa desa agraris) karena kepentingan di era pascaindustrial makin kompleks. Lemahnya kontrol sosial memicu pelanggaran norma.\n\nDominasi dalam globalisasi adalah hegemoni (kontrol) negara maju dan perusahaan multinasional atas negara berkembang, difasilitasi oleh WTO, IMF, World Bank. Ini mencetak tata ekonomi kapitalistik.\nTiga imbas lanjutannya:\n- Ketidakmampuan Adaptasi kelompok rentan (lansia, wilayah terpencil).\n- Krisis Identitas Sosial akibat dominasi nilai asing yang membuat warga bingung dengan jati diri aslinya.\n\nCara Mudah Membaca: Ingat akar masalah sosial lanjutan dengan D-A-K-I:\nDominasi (Asing), Adaptasi (Terhambat pada lansia), Krisis Identitas (Bingung nilai).\n\nStudi Kasus: Ojek pangkalan bertransformasi jadi Ojek Daring (Transformasi Sosial). Banyak lansia gagal adaptasi memakai aplikasi mobile banking (Ketidakmampuan adaptasi), menyebabkan mereka tersisih secara digital."
      },
      {
        "id": "les_12_bab3_2",
        "course_id": "course_12_bab3",
        "chapter_number": 3,
        "chapter_title": "Bab 3: Masalah Sosial Era Global",
        "title": "Pertemuan 3: Neokolonialisme & Ketertinggalan Budaya",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Neokolonialisme (Penjajahan Gaya Baru): Dominasi negara kuat ke negara lemah TANPA militer, melainkan lewat korporasi, utang ekonomi, dan impor teknologi. Negara maju \"menghisap\" komoditas primer negara berkembang.\n\nDampak Guncangan Budaya:\n- Culture Shock (Gegar Budaya): Kegugupan dan kebingungan psikologis menerima budaya asing baru. (Melewati 4 Fase: Bulan madu -> Krisis -> Penyesuaian -> Adaptasi mantap).\n- Cultural Lag (Ketertinggalan Budaya): Tidak imbangnya laju elemen budaya. Umumnya budaya material (teknologi hp) berlari cepat, tapi budaya non-material (moral etika internet) mandek.\n\nCara Mudah Membaca: Ingat bedanya dengan NEO-CUTI.\nNEO (Neokolonialisme via uang, bukan senjata).\nCulture shock (Gegar kaget jiwa).\nUnsur TertInggal / Cultural lag (Fisik maju, moral usang).\n\nStudi Kasus: Remaja pakai smartphone Rp15 juta (Budaya Material Tinggi), tapi memaki teman secara kasar tanpa etika di kolom komentar (Budaya Non-Material Rendah). Ini wujud konkret Cultural Lag."
      },
      {
        "id": "les_12_bab3_3",
        "course_id": "course_12_bab3",
        "chapter_number": 3,
        "chapter_title": "Bab 3: Masalah Sosial Era Global",
        "title": "Pertemuan 4: Konsumerisme dan Hedonisme",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Di era siber, lifestyle (gaya hidup) diiklankan masif lewat media sosial.\n- Hedonisme: Pandangan bahwa kesenangan & kenikmatan materiil duniawi adalah tujuan hidup tertinggi. Dipicu faktor internal (hasrat) dan eksternal (peer pressure teman).\n- Konsumerisme: Sifat belanja berlebihan. Konsumtif mementingkan Wants (keinginan gila hormat) dibanding Needs (kebutuhan dasar pokok).\n\nDampak psikologis: Jika dompet kosong tapi tuntutan gaya tinggi, memunculkan Insecurity (rasa tak aman) dan kecemasan finansial (Anxiety).\n\nCara Mudah Membaca: Rumus gaya hidup K-A-S-H.\nKeinginan > Kebutuhan. Anxiety finansial. Status sosial palsu. Hedonisme meraja.\n\nStudi Kasus: Remaja terjebak hutang Paylater berbunga tinggi hanya demi membeli barang branded agar diakui kawan tongkrongan. Kesenangan instan menukar ketenangan jangka panjang."
      },
      {
        "id": "les_12_bab3_4",
        "course_id": "course_12_bab3",
        "chapter_number": 3,
        "chapter_title": "Bab 3: Masalah Sosial Era Global",
        "title": "Pertemuan 5 & 6: Kerusakan Alam, Kejahatan Siber & Cyberbullying",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Perusahaan multinasional (MNC) mengeruk alam negara berkembang, mengorbankan ekosistem demi efisiensi kapital.\nKejahatan Siber (Cybercrime) yang marak:\n1. Phishing: Penipuan memancing data pribadi/kode OTP perbankan via web palsu.\n2. Malware: Software jahat penyusup (berkedok file APK Undangan) yang merusak hp.\n3. DoS (Denial of Service): Hacker mengirim jutaan klik ke server bank/website hingga jebol/down.\n4. Cyberbullying (Perundungan Siber): Intimidasi publik di sosmed, jejak digital abadi merusak mental korban.\n\nSolusi Dasar Siber: Memperteguh jiwa Nasionalisme dan pendidikan etika karakter bangsa sebagai benteng penangkal infiltrasi tren merusak (dark jokes berujung rasisme).\n\nCara Mudah Membaca: Bahaya siber dirangkum P-A-M-A-N (Phishing pancing data, Alam dieksploitasi, Malware perusak, Anonimitas cyberbullying, Negara dilintasi).\n\nStudi Kasus: Menerima APK via WhatsApp bertulis \"Resi Paket JNT\". Jika di-klik, Malware masuk menyedot OTP, lalu saldo terkuras habis (Phishing digital)."
      },
      {
        "id": "les_12_bab3_5",
        "course_id": "course_12_bab3",
        "chapter_number": 3,
        "chapter_title": "Bab 3: Masalah Sosial Era Global",
        "title": "Pertemuan 7: Kecakapan Sosial & Penyelamatan Kearifan Lokal",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Menghadapi era disrupsi tidak cukup IQ tinggi. Diperlukan Kecakapan Sosial (EQ): Mampu empati, kerja tim lintas budaya, dan toleransi. \nKearifan lokal bisa jadi tameng. Konsep \"Self-sustaining growth\" berarti pengetahuan adat lokal dipakai untuk mengembangkan diri mereka mandiri tanpa bergantung penuh pada asing.\nPembangunan tidak boleh merusak alam, melainkan sistematis dan berkelanjutan demi anak cucu.\n\nCara Mudah Membaca: S-O-K-A-L (Sosial cakap, Kearifan lokal mandiri, Alam Lestarikan berkelanjutan).\n\nStudi Kasus: Sistem Subak di Bali. Meski digempur hotel asing, pengairan irigasi Subak yg berlandaskan ritual Tri Hita Karana tetap berjalan, malah jadi ekowisata mandiri."
      },
      {
        "id": "les_12_bab3_6",
        "course_id": "course_12_bab3",
        "chapter_number": 3,
        "chapter_title": "Bab 3: Masalah Sosial Era Global",
        "title": "Pertemuan 8: Kewirausahaan Sosial & Digital Fatigue",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Social Entrepreneurship (Kewirausahaan Sosial) adalah bisnis yg untungnya dipakai untuk atasi masalah masyarakat. Syaratnya: Punya Social Value (misi sosial), memobilisasi Civil Society, Inovasi, dan untung Ekonomi mandiri.\n\nDigital Fatigue: Kelelahan mental & fisik parah akibat mata menatap layar gawai / paparan notifikasi online nonstop. Bisa memicu depresi, stres, dan asocial.\nSolusinya: Screen time control (batasi layar), aktivitas luring olahraga, dan puasa sosmed (Digital Detox).\n\nCara Mudah Membaca: S-E-H-A-T (Social entrepreneurship bisnis peduli warga, Hentikan gawai berlebihan, Aktivitas riil dipertahankan, Tidur mental sehat).\n\nStudi Kasus: Bisnis jualan tas anyaman rotan online, tapi keuntungannya dipakai untuk perbaikan gizi ibu hamil di pedesaan (Wirausaha sosial mandiri yg sempurna)."
      }
    ]
  },
  {
    "id": "course_12_bab4",
    "title": "Sosiologi Kelas 12 Bab 4: Pemberdayaan Komunitas & Kearifan Lokal",
    "description": "Mempelajari komunitas lokal, nilai kearifan leluhur, serta prinsip pemberdayaan masyarakat agar berdaya mandiri.",
    "grade_level": 12,
    "category": "Dinamika Makro Sosial",
    "thumbnail": "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=600",
    "totalLessons": 4,
    "completedLessons": 0,
    "lessons": [
      {
        "id": "les_12_bab4_1",
        "course_id": "course_12_bab4",
        "chapter_number": 4,
        "chapter_title": "Bab 4: Pemberdayaan & Kearifan Lokal",
        "title": "Pertemuan 1: Hakikat Komunitas Lokal",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Komunitas lokal berasal dari kata communitas (kesamaan) dan lokal (setempat). \nRobert MacIver memandang komunitas (community) sebagai persekutuan hidup yang ditandai oleh pertalian kelompok sosial satu sama lain, didasari interaksi intens.\n\nSyarat Komunitas:\n1. Lokalitas: Kesatuan tempat tinggal yang membangun solidaritas kuat.\n2. Perasaan Komunitas (Community Sentiment): Perasaan bahwa warga saling memerlukan di tanah yang sama.\n\nUnsur Community Sentiment (MacIver & Cooley):\n- Seperasaan (identifikasi nasib kepentingan sama).\n- Sepenanggungan (sadar tanggung jawab atas kelompoknya).\n- Saling Memerlukan (ketergantungan fisik & psikologis).\n\nCara Mudah Membaca: Ingat unsur komunitas dengan \"SUPERMAN\" (Seperasaan, Untuk sePENanggungan, MAka saliNg memerlukan).\n\nStudi Kasus: Ronda Malam Desa\nBapak-bapak pos ronda keliling kampung saat musim paceklik, berjaga malam (sepenanggungan) dan saling bagi makanan (saling memerlukan) karena sadar mereka menempati tanah nasib yang sama (seperasaan)."
      },
      {
        "id": "les_12_bab4_2",
        "course_id": "course_12_bab4",
        "chapter_number": 4,
        "chapter_title": "Bab 4: Pemberdayaan & Kearifan Lokal",
        "title": "Pertemuan 2: Hakikat Kearifan Lokal",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Kearifan lokal (Local Genius / Local Wisdom) adalah hasil adaptasi turun-temurun antargenerasi masyarakat lokal terhadap kondisi geografis dan alamnya.\nPertama kali diperkenalkan oleh H.G. Quaritch Wales (1951).\n\nTokoh kearifan lokal:\n- S. Swarsi: Kebijaksanaan manusia berlandaskan filosofi etika yang melembaga tradisional.\n- Phongphit: Pengetahuan pengalaman turun temurun yg jadi pedoman hubungan masyarakat dengan alam.\n- I Ketut Gobyah: Kebenaran yang mentradisi, produk masa lalu tapi memiliki nilai luhur universal.\n- Haryati Soebadio: Local genius = cultural identity (identitas bangsa) yang memampukan bangsa mengolah/menyerap budaya asing sesuai watak asli.\n\nIntinya, kearifan lokal menjaga keseimbangan tatanan sosial dengan lingkungan alam tanpa eksploitasi merusak.\n\nCara Mudah Membaca: Akronim \"KITA TAHU\" (Kebijaksanaan Ilmu Tradisi Asli, Turun Antargenerasi, Harmonis Untuk alam).\n\nStudi Kasus: Tradisi Sasi (Maluku)\nWarga dilarang mengambil ikan/panen laut sebelum waktu yang ditentukan (tutup sasi). Ini bukan hukum buatan negara, tapi local genius kuno yang secara saintifik sangat jenius menyelamatkan laut dari kepunahan ekosistem."
      },
      {
        "id": "les_12_bab4_3",
        "course_id": "course_12_bab4",
        "chapter_number": 4,
        "chapter_title": "Bab 4: Pemberdayaan & Kearifan Lokal",
        "title": "Pertemuan 3: Ciri, Bentuk & Fungsi Kearifan Lokal",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Ciri Kearifan Lokal (Saragih): Mampu bertahan, Akomodasi unsur luar, Mengintegrasikan unsur luar ke budaya asli, Mampu mengendalikan, dan Memberi arah perkembangan budaya.\n\nBentuk Kearifan Lokal:\n1. Tangible (Berwujud nyata): Candi, keris, arsitektur rumah adat.\n2. Intangible (Tidak berwujud): Lagu daerah, petuah, cerita rakyat, pantangan mitos.\n\nFungsi Kearifan Lokal (Nyoman Sirtha):\n- Konservasi pelestarian SDA.\n- Pengembangan SDM (upacara daur hidup).\n- Petuah, kepercayaan, sastra.\n- Makna etika/moral (Ngaben penyucian roh).\n- Makna sosial dan politik (Patron client).\n\nCara Mudah Membaca: Ciri Saragih diingat dengan \"BAMIA\" (Bertahan, Akomodasi, Mengendalikan, Integrasi, Arah budaya).\n\nStudi Kasus: Sistem Subak di Bali\nIrigasi terasering tidak pakai mesin modern tapi pembagian air sangat adil karena diikat ritual Pura (fungsi konservasi alam + makna sosial). Bukti keseimbangan ekologis yang holistik."
      },
      {
        "id": "les_12_bab4_4",
        "course_id": "course_12_bab4",
        "chapter_number": 4,
        "chapter_title": "Bab 4: Pemberdayaan & Kearifan Lokal",
        "title": "Pertemuan 4: Konsep Pemberdayaan Komunitas",
        "content_type": "text",
        "duration": "15 Min",
        "xp_reward": 50,
        "completed": false,
        "bookmarked": false,
        "key_takeaways": [],
        "text_body": "Pemberdayaan (dari kata daya = kekuatan) adalah proses memberi power/kemampuan (to give power/ability) kepada masyarakat marginal/lemah (powerless) agar menjadi mandiri bertindak dan berpikir. \nBerbeda dengan sekadar amal (charity) yang membuat ketergantungan.\n\nTri Winarni menyebut 3 inti: Enabling (pengembangan suasana), Empowering (memperkuat potensi daya), dan Mandiri.\n\nPrinsip Pemberdayaan (Herbert Rubin): \n1. Ada sistem balik modal (break-even) agar untung diputar lagi untuk program desa.\n2. Wajib partisipasi masyarakat.\n3. Pelatihan adalah jantungnya (tak terpisah dari bangunan fisik).\n4. Jembatan makro (pemerintah) dan mikro (rakyat bawah).\n\nPenghambat suksesnya program pemberdayaan (Sumaryadi) adalah mental ketergantungan birokrasi, kurang dorongan tokoh, dan memaksa kecepatan perubahan instan.\n\nCara Mudah Membaca: Inti Tri Winarni \"EEM\" (Enabling, Empowering, Mandiri). \"Jangan beri ikannya, tapi berikan kail dan pelatihannya!\"\n\nStudi Kasus: Ibu-ibu PKK Diberi Pelatihan Tenun\nPemerintah tak sekadar membagi BLT (bantuan tunai), tapi membangun sentra tenun (Fisik) sekaligus memberi instruktur ahli (Pelatihan). Laba tenun diputar beli benang (Break-even). Ibu-ibu jadi mandiri meraup pendapatan."
      }
    ]
  },
  ...TKA_COURSES_EXTRA,
  ...TKA_COURSES_EXTRA_2
];

export const INITIAL_SUBMISSIONS: any[] = [];

export const INITIAL_COMMENTS: any[] = [];

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

export const INITIAL_COMPETENCY_ANALYSIS: any[] = [];

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

export const EXAMS_DATA: Exam[] = [...TKA_EXAMS_MISSING, ...TKA_EXAMS_EXTRA, ...TKA_EXAMS_EXTRA_2, ...TKA_EXAMS_EXTRA_3];




export const INITIAL_TASKS: any[] = [];

export const EXAM_HISTORY_DATA: import('../types').ExamSession[] = [];
