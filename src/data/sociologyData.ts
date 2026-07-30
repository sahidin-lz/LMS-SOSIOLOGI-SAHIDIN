import { Course, Exam, LeaderboardUser, TryoutAnalytics, User } from '../types';

export const INITIAL_USER: User = {
  id: 'usr_siswa_01',
  name: 'Arya Pratama',
  email: 'arya.pratama@sosiologi.edu',
  role: 'siswa',
  total_xp: 1450,
  levelTitle: 'Analis Sosial Muda',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  grade: 12,
  streakDays: 7,
  schoolName: 'SMA Negeri 8 Jakarta',
};

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    id: 'lb_1',
    rank: 1,
    name: 'Siti Rahmawati',
    school: 'SMA Negeri 3 Yogyakarta',
    grade: 12,
    xp: 3820,
    badgeTitle: 'Socio Master Grandeur',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    change: 'same',
  },
  {
    id: 'lb_2',
    rank: 2,
    name: 'Bintang Ramadhan',
    school: 'SMA Labschool Kebayoran',
    grade: 12,
    xp: 3450,
    badgeTitle: 'Pakar Teori Kritis',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    change: 'up',
  },
  {
    id: 'usr_siswa_01',
    rank: 3,
    name: 'Arya Pratama (Kamu)',
    school: 'SMA Negeri 8 Jakarta',
    grade: 12,
    xp: 1450,
    badgeTitle: 'Analis Sosial Muda',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    change: 'up',
  },
  {
    id: 'lb_4',
    rank: 4,
    name: 'Dewi Lestari',
    school: 'SMA Negeri 1 Surakarta',
    grade: 11,
    xp: 1280,
    badgeTitle: 'Pengamat Dinamika',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    change: 'down',
  },
  {
    id: 'lb_5',
    rank: 5,
    name: 'Fikri Haikal',
    school: 'SMA Negeri 5 Surabaya',
    grade: 10,
    xp: 1150,
    badgeTitle: 'Peneliti Sosial Pemula',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    change: 'same',
  },
];

export const TRYOUT_ANALYTICS_DATA: TryoutAnalytics[] = [
  { exam_title: 'Tryout 1', score: 120, date: '10 Jun', target_score: 150 },
  { exam_title: 'Tryout 2', score: 135, date: '24 Jun', target_score: 150 },
  { exam_title: 'Tryout 3', score: 130, date: '08 Jul', target_score: 150 },
  { exam_title: 'Tryout 4', score: 150, date: '22 Jul', target_score: 150 },
  { exam_title: 'Tryout 5 (Terbaru)', score: 165, date: '28 Jul', target_score: 150 },
];

export const COURSES_DATA: Course[] = [
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
  }
];

export const EXAMS_DATA: Exam[] = [
  {
    id: 'exam_tka_01',
    title: 'Tryout TKA Sosiologi Paket 1 - Fondasi & Teori Klasik',
    grade_level: 0,
    category: 'Tryout TKA',
    duration_minutes: 20,
    total_questions: 10,
    description: 'Tryout Tes Kemampuan Akademik (TKA) Sosiologi standar nasional. Dilengkapi timer otomatis, grid navigasi indikator ragu-ragu, dan analisis peta kemampuan.',
    xp_reward: 200,
    passing_score: 70,
    questions: [
      {
        id: 'q_1',
        exam_id: 'exam_tka_01',
        number: 1,
        text: 'Seorang peneliti sosiologi melakukan pengamatan terhadap fenomena berjamurnya gaya hidup konsumtif di kalangan remaja perkotaan yang gemar membeli barang bermerek impor demi gengsi di media sosial. Peneliti tersebut memaparkan fenomena secara analitis berdasarkan fakta di lapangan tanpa memberikan pandangan moral apakah perilaku remaja tersebut baik atau buruk. Karakteristik Sosiologi yang ditunjukkan oleh peneliti tersebut adalah...',
        option_a: 'Kumulatif',
        option_b: 'Non-etis',
        option_c: 'Teoritis',
        option_d: 'Empiris',
        option_e: 'Spekulatif',
        correct_answer: 'B',
        topic: 'Hakikat & Ciri Sosiologi',
        explanation: 'Sosiologi bersifat Non-Etis artinya sosiologi tidak bertugas menilai baik atau buruknya suatu fakta sosial di masyarakat, melainkan bertujuan menjelaskan fakta tersebut secara analitis dan objektif berdasarkan data lapangan.'
      },
      {
        id: 'q_2',
        exam_id: 'exam_tka_01',
        number: 2,
        text: 'Emile Durkheim menyatakan bahwa objek kajian utama sosiologi adalah "Fakta Sosial" (Social Facts). Manakah contoh berikut yang paling tepat menggambarkan Fakta Sosial menurut pemikiran Durkheim?',
        option_a: 'Rasa cemas yang dialami seorang siswa saat menghadapai ujian nasional',
        option_b: 'Kebutuhan biologis individu untuk makan dan minum setiap hari',
        option_c: 'Aturan lalu lintas di jalan raya yang memaksa pengendara mematuhi rambu dan bersanksi tilang jika dilanggar',
        option_d: 'Niat pribadi seseorang untuk mendonasikan uangnya ke panti asuhan',
        option_e: 'Impian dan cita-cita pribadi seseorang untuk menjadi seorang pengusaha sukses',
        correct_answer: 'C',
        topic: 'Fakta Sosial Emile Durkheim',
        explanation: 'Fakta sosial menurut Emile Durkheim memiliki dua ciri utama: berada di luar individu (eksternal) dan memiliki daya paksa (coercive) yang memengaruhi atau mengendalikan perilaku individu. Aturan lalu lintas adalah produk kolektif di luar individu dan bersanksi memaksa.'
      },
      {
        id: 'q_3',
        exam_id: 'exam_tka_01',
        number: 3,
        text: 'Di sebuah desa di Jawa Tengah, warganya secara rutin bergotong royong memperbaiki jembatan desa tanpa mengharapkan imbalan materi. Hubungan antawarga didasari oleh kekeluargaan yang erat dan ikatan batin yang mendalam. Menurut Ferdinand Tönnies, bentuk kehidupan bersama masyarakat tersebut dinamakan...',
        option_a: 'Gesellschaft (Patembayan)',
        option_b: 'Gemeinschaft by Blood',
        option_c: 'Gemeinschaft of Place',
        option_d: 'Gemeinschaft of Mind',
        option_e: 'In-Group Association',
        correct_answer: 'C',
        topic: 'Kelompok Sosial Ferdinand Tönnies',
        explanation: 'Masyarakat yang diikat oleh kesamaan tempat tinggal dengan ikatan kekeluargaan yang erat dinamakan Gemeinschaft of Place (Paguyuban karena tempat). Sedangkan Gemeinschaft by blood berdasarkan pertalian darah, dan Gemeinschaft of mind berdasarkan kesamaan ideologi.'
      },
      {
        id: 'q_4',
        exam_id: 'exam_tka_01',
        number: 4,
        text: 'Seorang lulusan sarjana teknik yang tinggal di daerah terpencil memilih bekerja sebagai petani organik inovatif demi memberdayakan pemuda desa setempat agar memiliki lapangan kerja, meskipun ia bisa saja bekerja di perusahaan multinasional dengan gaji tinggi. Berdasarkan teori tipe tindakan sosial Max Weber, tindakan sarjana tersebut tergolong...',
        option_a: 'Tindakan Rasional Instrumental',
        option_b: 'Tindakan Rasional Bernilai',
        option_c: 'Tindakan Afektif',
        option_d: 'Tindakan Tradisional',
        option_e: 'Tindakan Non-Rasional',
        correct_answer: 'B',
        topic: 'Tipe Tindakan Sosial Max Weber',
        explanation: 'Tindakan Rasional Bernilai (Wertrational) adalah tindakan yang dilakukan berdasarkan pertimbangan nilai-nilai moral, etika, atau kepedulian sosial yang dijunjung tinggi, tanpa terlalu mengutamakan keuntungan materiil pribadi atau efisiensi matematis.'
      },
      {
        id: 'q_5',
        exam_id: 'exam_tka_01',
        number: 5,
        text: 'Masyarakat kota A mengalami diferensiasi sosial berdasarkan latar belakang etnis (Jawa, Sunda, Batak, Minang) yang hidup berdampingan. Meskipun memiliki latar belakang suku yang berbeda, anggota antar-etnis tersebut bergabung dalam klub olahraga sepak bola yang sama. Fenomena persilangan keanggotaan kelompok sosial tersebut dalam sosiologi disebut...',
        option_a: 'Konsolidasi Sosial',
        option_b: 'Interseksi Sosial',
        option_c: 'Asimilasi Sosial',
        option_d: 'Amalgamasi Sosial',
        option_e: 'Akulturasi Sosial',
        correct_answer: 'B',
        topic: 'Struktur Sosial Interseksi & Konsolidasi',
        explanation: 'Interseksi Sosial adalah persilangan keanggotaan individu dalam dua atau lebih kelompok sosial yang berbeda latar belakang (misal: beda etnis tapi bersatu dalam kriteria pekerjaan atau hobi yang sama). Hal ini memperkuat integrasi sosial.'
      },
      {
        id: 'q_6',
        exam_id: 'exam_tka_01',
        number: 6,
        text: 'Suatu perusahaan manufaktur otomotif mengganti sebagian besar pekerja buruh pabrik dengan robot dan sistem otomatisasi AI. Dampaknya, terjadi pemutusan hubungan kerja (PHK) massal yang memicu gelombang demonstrasi dari buruh. Menurut Karl Marx, ketegangan ini terjadi akibat pertentangan kelas antara...',
        option_a: 'Penguasa dan Rakyat',
        option_b: 'Kelas Borjuis (Pemilik Modal) dan Kelas Proletar (Buruh)',
        option_c: 'Masyarakat Tradisional dan Masyarakat Modern',
        option_d: 'Kelompok In-Group dan Out-Group',
        option_e: 'Golongan Kiri dan Golongan Kanan',
        correct_answer: 'B',
        topic: 'Teori Konflik Karl Marx',
        explanation: 'Teori konflik Karl Marx berpusat pada konflik kelas antara pemilik alat produksi/modal (Bourgeoisie) dan buruh yang menjual tenaga kerjanya (Proletariat). Konflik ini dipicu oleh eksploitasi dan ketimpangan struktur ekonomi kapitalis.'
      },
      {
        id: 'q_7',
        exam_id: 'exam_tka_01',
        number: 7,
        text: 'Masyarakat perkotaan cepat mengadopsi teknologi pembayaran digital QRIS untuk transaksi harian. Namun, sebagian pedagang lansia di pasar tradisional belum memiliki pengetahuan teknis dan perangkat smartphone yang memadai sehingga merasa tertinggal. Ketidakseimbangan antara kecepatan perkembangan teknologi materiil dan kesiapan mental/pengetahuan manusia ini disebut oleh William F. Ogburn sebagai...',
        option_a: 'Culture Shock (Guncangan Budaya)',
        option_b: 'Culture Lag (Ketimpangan Budaya)',
        option_c: 'Anomi (Keadaan Tanpa Norma)',
        option_d: 'Disintegrasi Sosial',
        option_e: 'Kesenjangan Generasi',
        correct_answer: 'B',
        topic: 'Perubahan Sosial William F. Ogburn',
        explanation: 'Culture Lag (Ketimpangan Budaya) adalah kondisi di mana pertumbuhan unsur budaya materiil (seperti teknologi, alat-alat digital) berjalan lebih cepat daripada perkembangan budaya non-materiil (seperti norma, keterampilan, kebiasaan, dan kesiapan pola pikir masyarakat).'
      },
      {
        id: 'q_8',
        exam_id: 'exam_tka_01',
        number: 8,
        text: 'Seorang siswa SMA dari keluarga kurang mampu secara ekonomi berhasil memenangkan beasiswa penuh ke perguruan tinggi ternama dan kelak menjadi seorang direktur BUMN ternama. Bentuk mobilitas sosial yang dialami oleh individu tersebut adalah...',
        option_a: 'Mobilitas Sosial Horisontal',
        option_b: 'Mobilitas Sosial Vertikal Naik Intergenerasi',
        option_c: 'Mobilitas Sosial Vertikal Naik Intragenerasi',
        option_d: 'Mobilitas Geografis',
        option_e: 'Mobilitas Sosial Vertikal Turun',
        correct_answer: 'B',
        topic: 'Mobilitas Sosial',
        explanation: 'Mobilitas Sosial Vertikal Naik Intergenerasi terjadi ketika terjadi peningkatan status sosial ekonomi seseorang jika dibandingkan dengan status sosial generasi orang tuanya sebelumnya (dari keluarga kurang mampu menjadi direktur BUMN).'
      },
      {
        id: 'q_9',
        exam_id: 'exam_tka_01',
        number: 9,
        text: 'Masyarakat adat Baduy Dalam tetap memegang teguh larangan penggunaan alat elektronik dan kendaraan bermotor di wilayahnya untuk menjaga keseimbangan alam dan kelestarian adat leluhur. Faktor utama yang menahan atau membatasi perubahan sosial pada masyarakat tersebut adalah...',
        option_a: 'Kurangnya hubungan dengan masyarakat luar',
        option_b: 'Prasangka buruk terhadap budaya asing',
        option_c: 'Vested interest (kepentingan yang tertanam kuat)',
        option_d: 'Nilai adat dan tradisi yang mendarah daging (internalized)',
        option_e: 'Hambatan ideologis dan keagamaan',
        correct_answer: 'D',
        topic: 'Faktor Penghambat Perubahan Sosial',
        explanation: 'Sikap masyarakat yang sangat mengagungkan tradisi lokal serta memiliki nilai-nilai adat yang mendarah daging merupakan pendorong kuat untuk mempertahankan keaslian sistem sosial dan menghambat perubahan sosial.'
      },
      {
        id: 'q_10',
        exam_id: 'exam_tka_01',
        number: 10,
        text: 'Seorang mahasiswa sosiologi ingin meneliti fenomena perundungan (bullying) di kalangan remaja sekolah. Ia memilih melakukan wawancara mendalam dan observasi berpartisipasi langsung terhadap para korban dan pelaku untuk memahami latar belakang psikososial mereka secara mendalam. Pendekatan penelitian sosial yang digunakan mahasiswa tersebut adalah...',
        option_a: 'Kuantitatif Eksperimen',
        option_b: 'Kualitatif Deskriptif',
        option_c: 'Survei Evaluatif',
        option_d: 'Korelasional Statis',
        option_e: 'Komparatif Kuantitatif',
        correct_answer: 'B',
        topic: 'Metode Penelitian Sosial',
        explanation: 'Pendekatan Kualitatif bertujuan untuk memahami makna mendalam, fenomena sosial, serta persepsi subjek penelitian melalui teknik wawancara mendalam dan observasi partisipatif, menghasilkan data berupa kata-kata naratif deskriptif.'
      }
    ]
  },
  {
    id: 'exam_tka_02',
    title: 'Tryout TKA Sosiologi Paket 2 - Penalaran HOTS & Perubahan Global',
    grade_level: 0,
    category: 'Tryout TKA',
    duration_minutes: 25,
    total_questions: 5,
    description: 'Paket latihan TKA tingkat tinggi (HOTS) berfokus pada analisis konflik, globalisasi, kearifan lokal, dan transformasi digital.',
    xp_reward: 250,
    passing_score: 75,
    questions: [
      {
        id: 'q_tka2_1',
        exam_id: 'exam_tka_02',
        number: 1,
        text: 'Fenomena maraknya fenomena flexing (memamerkan kekayaan) di media sosial dipandang oleh sosiolog Thorstein Veblen sebagai bentuk Conspicuous Consumption. Tujuan utama dari tindakan sosial ini secara sosiologis adalah...',
        option_a: 'Memenuhi kebutuhan pokok harian',
        option_b: 'Memperoleh pengakuan simbolis atas status sosial tinggi',
        option_c: 'Mencapai efisiensi finansial ekonomi',
        option_d: 'Melestarikan adat tradisi nenek moyang',
        option_e: 'Mendorong daya beli masyarakat bawah',
        correct_answer: 'B',
        topic: 'Konsumerisme & Gaya Hidup Modern',
        explanation: 'Conspicuous consumption (konsumsi mencolok) bertujuan untuk menunjukkan simbol status sosial dan prestise ekonomi kepada kelompok lain.'
      },
      {
        id: 'q_tka2_2',
        exam_id: 'exam_tka_02',
        number: 2,
        text: 'Proses peleburan dua budaya yang berbeda menjadi satu kebudayaan baru tanpa meninggalkan kebudayaan aslinya dinamakan akulturasi. Manakah contoh akulturasi budaya di Indonesia?',
        option_a: 'Pernikahan antar-etnis Jawa dan Batak',
        option_b: 'Bangunan Masjid Kudus yang memadukan arsitektur Hindu dan Islam',
        option_c: 'Hilangnya bahasa daerah digantikan bahasa asing secara total',
        option_d: 'Sistem kerja rodi pada zaman penjajahan',
        option_e: 'Penggunaan pakaian barat dalam upacara adat tradisional',
        correct_answer: 'B',
        topic: 'Interaksi & Perubahan Kebudayaan',
        explanation: 'Masjid Menara Kudus menerapkan arsitektur Candi Hindu dengan fungsi tempat ibadah Islam tanpa menghilangkan ciri keindahan candi Hindu.'
      },
      {
        id: 'q_tka2_3',
        exam_id: 'exam_tka_02',
        number: 3,
        text: 'Konflik sosial di daerah tambang dapat diatasi secara damai melalui bantuan pihak ketiga yang netral dan keputusannya bersifat mengikat kedua belah pihak. Bentuk akomodasi konflik ini dinamakan...',
        option_a: 'Konsiliasi',
        option_b: 'Arbitrase',
        option_c: 'Mediasi',
        option_d: 'Adjudikasi',
        option_e: 'Stalemate',
        correct_answer: 'B',
        topic: 'Akomodasi & Konflik Sosial',
        explanation: 'Arbitrase menggunakan pihak ketiga yang diberi wewenang untuk mengambil keputusan mengikat yang wajib dipatuhi pihak berkonflik.'
      },
      {
        id: 'q_tka2_4',
        exam_id: 'exam_tka_02',
        number: 4,
        text: 'Penelitian sosiologi yang menguji hubungan kausal antara tingkat penggunaan media sosial (variabel X) dengan tingkat kecemasan akademik siswa (variabel Y) menggunakan angket kuisioner berstruktur adalah...',
        option_a: 'Penelitian Kualitatif Etnografi',
        option_b: 'Penelitian Kuantitatif Eksplanatif',
        option_c: 'Penelitian Naratif Biografis',
        option_d: 'Penelitian Studi Kasus Kualitatif',
        option_e: 'Penelitian Fenomenologi',
        correct_answer: 'B',
        topic: 'Metode Penelitian Kuantitatif',
        explanation: 'Penelitian kuantitatif eksplanatif menguji pengaruh atau hubungan sebab-akibat antar-variabel menggunakan instrumen kuesioner dan analisis statistik.'
      },
      {
        id: 'q_tka2_5',
        exam_id: 'exam_tka_02',
        number: 5,
        text: 'Suatu program pemberdayaan masyarakat pesisir melibatkan seluruh nelayan dalam perencanaan hingga evaluasi pembuatan tempat pelelangan ikan mandiri. Prinsip utama yang diterapkan adalah...',
        option_a: 'Top-down Management',
        option_b: 'Partisipatif & Kesetaraan',
        option_c: 'Paternalistik Birokrasi',
        option_d: 'Ketergantungan Modal',
        option_e: 'Sentralisasi Kebijakan',
        correct_answer: 'B',
        topic: 'Pemberdayaan Komunitas',
        explanation: 'Pemberdayaan partisipatif menempatkan masyarakat lokal sebagai subjek aktif dalam setiap tahapan pembangunan.'
      }
    ]
  },
  {
    id: 'exam_tka_03',
    title: 'Tryout TKA Sosiologi Paket 3 - Pemetaan Riset & Analisis Kritis',
    grade_level: 0,
    category: 'Tryout TKA',
    duration_minutes: 20,
    total_questions: 5,
    description: 'Tryout TKA simulasi cepat untuk menguji kecepatan bernalar, kearifan lokal, dan mobilitas sosial.',
    xp_reward: 220,
    passing_score: 75,
    questions: [
      {
        id: 'q_tka3_1',
        exam_id: 'exam_tka_03',
        number: 1,
        text: 'Stratifikasi sosial bersifat terbuka memungkinkan seseorang untuk berpindah kelas sosial melalui saluran tertentu. Saluran mobilitas sosial yang paling umum di era modern adalah...',
        option_a: 'Pernikahan politik dan kasta',
        option_b: 'Pendidikan formal dan prestasi kerja',
        option_c: 'Sistem warisan kebangsawanan',
        option_d: 'Kelahiran dalam keluarga kaya',
        option_e: 'Gelar kehormatan adat',
        correct_answer: 'B',
        topic: 'Mobilitas Sosial & Pendidikan',
        explanation: 'Pendidikan sering disebut social elevator utama dalam masyarakat terbuka untuk menaikkan status sosial seseorang.'
      },
      {
        id: 'q_tka3_2',
        exam_id: 'exam_tka_03',
        number: 2,
        text: 'Kelompok sosial yang anggotanya memiliki ikatan emosional kuat, tatap muka langsung, dan bersifat personal dinamakan...',
        option_a: 'Kelompok Sekunder',
        option_b: 'Kelompok Primer (Primary Group)',
        option_c: 'Membership Group Formal',
        option_d: 'Out-group',
        option_e: 'Reference Group Sekunder',
        correct_answer: 'B',
        topic: 'Kelompok Sosial Charles H. Cooley',
        explanation: 'Kelompok primer ditandai dengan pergaulan dan kerja sama tatap muka yang intim, seperti keluarga dan sahabat dekat.'
      },
      {
        id: 'q_tka3_3',
        exam_id: 'exam_tka_03',
        number: 3,
        text: 'Lembaga sosial yang berfungsi mengatur tata cara dan norma produksi, distribusi, serta konsumsi barang dan jasa dalam masyarakat adalah...',
        option_a: 'Lembaga Agama',
        option_b: 'Lembaga Ekonomi',
        option_c: 'Lembaga Politik',
        option_d: 'Lembaga Keluarga',
        option_e: 'Lembaga Hukum',
        correct_answer: 'B',
        topic: 'Lembaga Sosial',
        explanation: 'Lembaga ekonomi mengatur kegiatan pemenuhan kebutuhan material masyarakat.'
      },
      {
        id: 'q_tka3_4',
        exam_id: 'exam_tka_03',
        number: 4,
        text: 'Penyimpangan sosial sekunder (secondary deviance) terjadi ketika individu...',
        option_a: 'Melakukan pelanggaran kecil sekali saja dan dapat dimaafkan',
        option_b: 'Melakukan pelanggaran berulang kali dan sudah dicap (labeled) sebagai penyimpang oleh masyarakat',
        option_c: 'Mematuhi norma dengan sukarela',
        option_d: 'Menjadi korban penyimpangan orang lain',
        option_e: 'Melakukan kebaikan tanpa pamrih',
        correct_answer: 'B',
        topic: 'Penyimpangan Sosial Lemert',
        explanation: 'Penyimpangan sekunder terjadi secara berulang dan telah mendapatkan reaksi keras berupa stempel/labelling negatif dari masyarakat.'
      },
      {
        id: 'q_tka3_5',
        exam_id: 'exam_tka_03',
        number: 5,
        text: 'Sikap etnosentrisme yang berlebihan dalam masyarakat multikultural dapat berpotensi memicu...',
        option_a: 'Integrasi sosial yang semakin solid',
        option_b: 'Disintegrasi sosial dan konflik antar-suku',
        option_c: 'Asimilasi budaya yang harmonis',
        option_d: 'Kerjasama ekonomi antar-daerah',
        option_e: 'Penurunan angka kriminalitas',
        correct_answer: 'B',
        topic: 'Masyarakat Multikultural',
        explanation: 'Etnosentrisme berlebihan menganggap sukunya paling unggul dan merendahkan suku lain, berisiko tinggi memicu konflik.'
      }
    ]
  },
  {
    id: 'exam_pas_10',
    title: 'Penilaian Akhir Semester (PAS) Sosiologi Kelas 10',
    grade_level: 10,
    category: 'Penilaian Harian',
    duration_minutes: 15,
    total_questions: 5,
    description: 'Ujian pemahaman konsep dasar Sosiologi Kelas 10 semester 1 & 2.',
    xp_reward: 120,
    passing_score: 75,
    questions: [
      {
        id: 'q_pas10_1',
        exam_id: 'exam_pas_10',
        number: 1,
        text: 'Istilah "Sosiologi" pertama kali diperkenalkan oleh Auguste Comte dalam bukunya...',
        option_a: 'The Division of Labour in Society',
        option_b: 'Cours de Philosophie Positive',
        option_c: 'Das Kapital',
        option_d: 'The Protestant Ethic and the Spirit of Capitalism',
        option_e: 'Social System',
        correct_answer: 'B',
        topic: 'Sejarah Sosiologi',
        explanation: 'Auguste Comte memperkenalkan istilah Sosiologi dalam bukunya Cours de Philosophie Positive yang terbit pada pertengahan abad ke-19.'
      },
      {
        id: 'q_pas10_2',
        exam_id: 'exam_pas_10',
        number: 2,
        text: 'Manakah yang merupakan syarat mutlak terjadinya interaksi sosial?',
        option_a: 'Kontak Sosial dan Komunikasi',
        option_b: 'Simpati dan Empati',
        option_c: 'Imitasi dan Sugesti',
        option_d: 'Konflik dan Akomodasi',
        option_e: 'Persaingan dan Kerjasama',
        correct_answer: 'A',
        topic: 'Interaksi Sosial',
        explanation: 'Interaksi sosial tidak akan terjadi tanpa adanya dua syarat utama: Kontak Sosial dan Komunikasi.'
      },
      {
        id: 'q_pas10_3',
        exam_id: 'exam_pas_10',
        number: 3,
        text: 'Proses belajar seorang anak mengenali nilai dan norma sosial yang berlaku di dalam keluarga pertama kali dinamakan...',
        option_a: 'Sosialisasi Sekunder',
        option_b: 'Sosialisasi Primer',
        option_c: 'Enkulturasi Lanjutan',
        option_d: 'Internalisasi Sekunder',
        option_e: 'Resosialisasi',
        correct_answer: 'B',
        topic: 'Sosialisasi & Kepribadian',
        explanation: 'Sosialisasi Primer adalah tahap sosialisasi pertama yang dialami individu di lingkungan keluarga tempat ia membentuk pondasi kepribadian dasar.'
      },
      {
        id: 'q_pas10_4',
        exam_id: 'exam_pas_10',
        number: 4,
        text: 'Pelanggaran norma sosial yang sanksinya berupa celaan atau teguran ringan tergolong dalam tingkat norma...',
        option_a: 'Custom (Adat)',
        option_b: 'Mores (Tata Kelakuan)',
        option_c: 'Folkways (Kebiasaan)',
        option_d: 'Usage (Cara)',
        option_e: 'Laws (Hukum)',
        correct_answer: 'D',
        topic: 'Tingkatan Norma',
        explanation: 'Usage (Cara) adalah norma bersanksi paling lemah yang mengatur cara individu bertindak dalam kehidupan sehari-hari (contoh: menyendawa saat makan).'
      },
      {
        id: 'q_pas10_5',
        exam_id: 'exam_pas_10',
        number: 5,
        text: 'Sifat sosiologi yang selalu berusaha menyusun abstraksi dan kesimpulan dari hasil-hasil observasi empiris disebut...',
        option_a: 'Kumulatif',
        option_b: 'Teoritis',
        option_c: 'Non-etis',
        option_d: 'Spekulatif',
        option_e: 'Normatif',
        correct_answer: 'B',
        topic: 'Ciri-ciri Sosiologi',
        explanation: 'Teoritis berarti sosiologi berusaha menyusun korelasi, abstraksi, dan teori logis berdasarkan hasil observasi nyata di lapangan.'
      }
    ]
  }
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
    submitted_by: 'Arya Pratama',
    submitted_at: '28 Juli 2026, 14:30 WIB',
    answer_text: 'Berdasarkan observasi pada fenomena cyberbullying, budaya netizen terbentuk sebagai Fakta Sosial karena norma perilakunya berada di luar individu dan memiliki kekuatan coercive (memaksa). Remaja cenderung takut mengalami ostrasisme atau celaan sosial apabila tidak mengikuti tren atau opini mayoritas grup.',
    file_name: 'Laporan_Analisis_Cyberbullying_Arya.pdf',
    grade: 92,
    teacher_feedback: 'Analisis yang sangat tajam, Arya! Kaitan antara daya paksa eksternal Durkheim dan fenomena media sosial dijelaskan secara runtut.',
    status: 'Sudah Dinilai',
  },
  {
    id: 'sub_02',
    task_id: 'task_02',
    task_title: 'Tugas Kelompok: Pemetaan Konflik & Integrasi Sosial',
    type: 'GROUP',
    group_name: 'Kelompok 2 - Socio Thinkers',
    group_members: ['Arya Pratama', 'Bintang Ramadhan', 'Siti Rahmawati', 'Dewi Lestari'],
    submitted_by: 'Siti Rahmawati (Perwakilan Kelompok)',
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
    user_name: 'Bintang Ramadhan',
    user_role: 'siswa',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    text: 'Sangat jelas penjelasan tentang Hukum Tiga Tahap Auguste Comte! Apakah tahap Positivis di Indonesia sudah sepenuhnya diterapkan dalam pembuatan kebijakan sosial?',
    created_at: '2 jam yang lalu',
    likes: 5,
    replies: [
      {
        id: 'cmt_1_1',
        lesson_id: 'les_10_1',
        user_name: 'Dra. Endang Sulastri, M.Pd.',
        user_role: 'guru',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
        text: 'Pertanyaan kritis yang bagus Bintang! Di Indonesia, kebijakan sosial berbasis data empiris (evidence-based policy) merupakan wujud pemikiran positivis yang terus ditingkatkan.',
        created_at: '1 jam yang lalu',
        likes: 8,
      }
    ]
  },
  {
    id: 'cmt_2',
    lesson_id: 'les_10_1',
    user_name: 'Siti Rahmawati',
    user_role: 'siswa',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    text: 'Ciri non-etis dalam sosiologi membuat sosiologi berbeda dengan filsafat moral ya. Sosiologi menjelaskan mengapa sesuatu terjadi, bukan menghakimi.',
    created_at: '30 menit yang lalu',
    likes: 3,
  }
];

export const INITIAL_CLASSROOMS: any[] = [
  {
    id: 'class_10_ips_1',
    name: '10-IPS-1',
    grade_level: 10,
    academic_year: '2026/2027',
    teacher_name: 'Dra. Endang Sulastri, M.Pd.',
    total_students: 32,
    description: 'Kelas Sepuluh IPS 1 - Konsentrasi Fondasi Sosiologi & Riset Sosial Dasar',
    students: [
      { id: 'st_1', nisn: '0051234001', name: 'Arya Pratama', email: 'arya.pratama@sosiologi.edu', password: 'Socio2026!Arya', classroom_name: '10-IPS-1', total_xp: 1450, mission_completed_count: 5, avg_cbt_score: 85, status: 'Aktif' },
      { id: 'st_2', nisn: '0051234002', name: 'Bintang Ramadhan', email: 'bintang.ramadhan@sosiologi.edu', password: 'Socio2026!Bintang', classroom_name: '10-IPS-1', total_xp: 3450, mission_completed_count: 8, avg_cbt_score: 90, status: 'Aktif' },
      { id: 'st_3', nisn: '0051234003', name: 'Siti Rahmawati', email: 'siti.rahmawati@sosiologi.edu', password: 'Socio2026!Siti', classroom_name: '10-IPS-1', total_xp: 3820, mission_completed_count: 9, avg_cbt_score: 95, status: 'Aktif' },
      { id: 'st_4', nisn: '0051234004', name: 'Dewi Lestari', email: 'dewi.lestari@sosiologi.edu', password: 'Socio2026!Dewi', classroom_name: '10-IPS-1', total_xp: 1280, mission_completed_count: 4, avg_cbt_score: 78, status: 'Aktif' },
      { id: 'st_5', nisn: '0051234005', name: 'Fikri Haikal', email: 'fikri.haikal@sosiologi.edu', password: 'Socio2026!Fikri', classroom_name: '10-IPS-1', total_xp: 1150, mission_completed_count: 4, avg_cbt_score: 75, status: 'Aktif' },
    ]
  },
  {
    id: 'class_11_ips_2',
    name: '11-IPS-2',
    grade_level: 11,
    academic_year: '2026/2027',
    teacher_name: 'Dra. Endang Sulastri, M.Pd.',
    total_students: 30,
    description: 'Kelas Sebelas IPS 2 - Konsentrasi Konflik Sosial, Diferensiasi & Struktur Masyarakat',
    students: [
      { id: 'st_6', nisn: '0041234006', name: 'Andi Wijaya', email: 'andi.w@sosiologi.edu', password: 'Socio2026!Andi', classroom_name: '11-IPS-2', total_xp: 2100, mission_completed_count: 6, avg_cbt_score: 82, status: 'Aktif' },
      { id: 'st_7', nisn: '0041234007', name: 'Citra Kirana', email: 'citra.k@sosiologi.edu', password: 'Socio2026!Citra', classroom_name: '11-IPS-2', total_xp: 1950, mission_completed_count: 6, avg_cbt_score: 80, status: 'Aktif' },
      { id: 'st_8', nisn: '0041234008', name: 'Doni Pratama', email: 'doni.p@sosiologi.edu', password: 'Socio2026!Doni', classroom_name: '11-IPS-2', total_xp: 1600, mission_completed_count: 4, avg_cbt_score: 74, status: 'Aktif' },
    ]
  },
  {
    id: 'class_12_ips_1',
    name: '12-IPS-1',
    grade_level: 12,
    academic_year: '2026/2027',
    teacher_name: 'Drs. Bambang Hariyanto, M.Si.',
    total_students: 34,
    description: 'Kelas Dua Belas IPS 1 - Persiapan Intensif TKA Sosiologi & Perubahan Sosial',
    students: [
      { id: 'st_9', nisn: '0031234009', name: 'Eka Kurnia', email: 'eka.k@sosiologi.edu', password: 'Socio2026!Eka', classroom_name: '12-IPS-1', total_xp: 2900, mission_completed_count: 8, avg_cbt_score: 88, status: 'Aktif' },
      { id: 'st_10', nisn: '0031234010', name: 'Farah Nabila', email: 'farah.n@sosiologi.edu', password: 'Socio2026!Farah', classroom_name: '12-IPS-1', total_xp: 3100, mission_completed_count: 9, avg_cbt_score: 92, status: 'Aktif' },
    ]
  }
];

export const INITIAL_SYLLABUS: any[] = [
  {
    id: 'syl_10_1',
    grade_level: 10,
    semester: 1,
    chapter_code: 'BAB-01',
    topic_name: 'Sosiologi Sebagai Ilmu Tentang Masyarakat',
    basic_competency: 'Memahami sosiologi sebagai ilmu yang mengkaji fakta sosial dan hubungan antarmanusia.',
    learning_objective: 'Siswa dapat menjelaskan ciri-ciri sosiologi, objek kajian, serta peran sosiolog dalam masyarakat.',
    meeting_count: 4,
    has_daily_test: true,
    file_source: 'Silabus_Kemenag_Kurikulum_Merdeka_10.xlsx'
  },
  {
    id: 'syl_10_2',
    grade_level: 10,
    semester: 1,
    chapter_code: 'BAB-02',
    topic_name: 'Interaksi Sosial, Nilai, dan Norma Sosial',
    basic_competency: 'Mengenali dan mengidentifikasi bentuk-bentuk interaksi sosial serta pembentukan norma.',
    learning_objective: 'Siswa mampu menganalisis syarat interaksi sosial dan dampaknya terhadap keteraturan sosial.',
    meeting_count: 5,
    has_daily_test: true,
    file_source: 'Silabus_Kemenag_Kurikulum_Merdeka_10.xlsx'
  },
  {
    id: 'syl_11_1',
    grade_level: 11,
    semester: 1,
    chapter_code: 'BAB-01',
    topic_name: 'Kelompok Sosial & Partikularisme',
    basic_competency: 'Memahami pembentukan kelompok sosial dan dampaknya terhadap disintegrasi.',
    learning_objective: 'Siswa mampu mengidentifikasi kelompok primary, secondary, in-group, dan out-group.',
    meeting_count: 6,
    has_daily_test: true,
    file_source: 'Silabus_Kemenag_Kurikulum_Merdeka_11.xlsx'
  },
  {
    id: 'syl_12_1',
    grade_level: 12,
    semester: 1,
    chapter_code: 'BAB-01',
    topic_name: 'Perubahan Sosial & Pemetaan TKA',
    basic_competency: 'Menganalisis faktor pendorong/penghambat perubahan sosial dan penalaran TKA Sosiologi.',
    learning_objective: 'Siswa siap menghadapi Tes Kemampuan Akademik (TKA) dengan penalaran kualitatif dan kuantitatif sosial.',
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
    author: 'Tim Kurikulum Admin LMS',
    content: 'Simulasi Tryout CBT TKA Sosiologi dengan sistem penilaian IRT (Maksimal 200) & Skor Normal akan diselenggarakan serentak. Silakan berlatih menggunakan Paket Tryout 1 dan 2.',
  },
  {
    id: 'ann_2',
    title: 'Pembaruan Modul Pembelajaran Kelas 12: Teori Perubahan Sosial Modern',
    category: 'Pembaruan Materi',
    date: '28 Juli 2026',
    author: 'Drs. Supriyadi, M.Pd.',
    content: 'Materi video dan rangkuman baru tentang Globalisasi, Modernisasi, dan Pemetaan Kearifan Lokal telah ditambahkan ke Modul Kelas 12.',
  },
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif_1',
    title: 'Misi CBT TKA Baru Dibuka!',
    message: 'Guru Sosiologi menugaskan Tryout TKA Paket 1 (Penilaian IRT Maksimal 200 & Skor Normal). Kerjakan sebelum 2 Agustus 2026.',
    type: 'cbt' as const,
    date: 'Hari ini, 08:30',
    isRead: false,
    linkTab: 'cbt' as const,
  },
  {
    id: 'notif_2',
    title: 'Tugas Studi Kasus Kelompok',
    message: 'Guru menambahkan Tugas Penelitian Sosial Kelompok untuk Rombel 12-IPS 1.',
    type: 'task' as const,
    date: 'Kemarin, 14:15',
    isRead: false,
    linkTab: 'tasks' as const,
  },
  {
    id: 'notif_3',
    title: 'Tanggapan Guru di Forum Diskusi',
    message: 'Dra. Endang Sulastri merespons pertanyaan Anda tentang Teori Anomie Merton.',
    type: 'discussion' as const,
    date: '27 Juli 2026',
    isRead: true,
    linkTab: 'modules' as const,
  }
];


