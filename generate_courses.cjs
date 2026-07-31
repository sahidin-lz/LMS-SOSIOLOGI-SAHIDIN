const fs = require('fs');

const courses = [
  {
    id: 'course_10_bab1',
    title: 'Sosiologi Kelas 10 Bab 1: Pengantar Sosiologi',
    description: 'Menyelami akar Sosiologi sebagai ilmu sosial, dari guncangan sosial di Eropa hingga perkembangannya di Indonesia. Mempelajari Sosiologi sebagai ilmu dengan paradigma ganda.',
    grade_level: 10,
    category: 'Konsep Dasar Sosiologi',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600',
    totalLessons: 6,
    completedLessons: 0,
    lessons: [
      {
        id: 'les_10_bab1_1',
        course_id: 'course_10_bab1',
        chapter_number: 1,
        chapter_title: 'Bab 1: Pengantar Sosiologi',
        title: 'Pertemuan 1: Sejarah Perkembangan Sosiologi di Eropa dan Amerika',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Sosiologi lahir karena ancaman tatanan sosial (Revolusi Industri dan Prancis).',
          'Auguste Comte (Bapak Sosiologi) memberi nama sosiologi.',
          'Herbert Spencer mempopulerkan teori evolusi organik masyarakat.',
          'Emile Durkheim (Fakta Sosial) & Max Weber (Tindakan Sosial).',
          'Talcott Parsons dengan teori sistem sosial di Amerika Serikat.'
        ],
        text_body: `Sosiologi pada awalnya merupakan bagian dari filsafat sosial yang membahas masyarakat. Menurut Brigette Berger dan Peter L. Berger (dalam Sunarto, 2004), sosiologi berkembang menjadi ilmu yang berdiri sendiri karena adanya ancaman terhadap tatanan sosial yang selama ini dianggap seharusnya diterima saja (threats to the taken-for-granted world).

L. Laeyendecker mengidentifikasi ancaman tersebut meliputi Revolusi Industri dan Revolusi Prancis, kapitalisme pada akhir abad ke-15, dan perubahan akibat gerakan reformasi. Auguste Comte (1798-1857), seorang filsuf Prancis, melihat perubahan-perubahan yang terjadi pada masyarakat Eropa saat itu berdampak negatif dan positif. Comte menyarankan agar semua penelitian tentang masyarakat ditingkatkan menjadi suatu ilmu yang berdiri sendiri. Ia memberi nama ilmu itu sosiologi. Oleh karena itu, ia disebut Bapak Sosiologi.

Herbert Spencer mempopulerkan istilah ini dan mengembangkan teori evolusi sosial. Sosiologi berkembang lebih ilmiah melalui Emile Durkheim (fakta sosial dan bebas nilai) serta Max Weber (tindakan sosial, ide dan nilai). Di Amerika, Talcott Parsons mengembangkan analisis fungsional sistem sosial.`
      },
      {
        id: 'les_10_bab1_2',
        course_id: 'course_10_bab1',
        chapter_number: 1,
        chapter_title: 'Bab 1: Pengantar Sosiologi',
        title: 'Pertemuan 2: Sejarah Perkembangan Sosiologi di Indonesia',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Berkembang pesat setelah Proklamasi Kemerdekaan 1945.',
          'Soenario Kolopaking memberi kuliah Sosiologi pertama (1948).',
          'Djody Gondokusumo menulis buku Sosiologi Indonesia pertama (1946).',
          'Selo Soemardjan dikenal sebagai Bapak Sosiologi Indonesia dengan bukunya "Social Changes in Yogyakarta" (1962).'
        ],
        text_body: `Sosiologi di Indonesia mengalami perkembangan yang cukup signifikan setelah Proklamasi Kemerdekaan tanggal 17 Agustus 1945. Soenario Kolopaking adalah orang yang pertama kali memberikan kuliah sosiologi dalam bahasa Indonesia pada tahun 1948 di Akademi Ilmu Politik Yogyakarta (sekarang menjadi Fakultas Ilmu Sosial dan Politik UGM).

Buku sosiologi dalam bahasa Indonesia pertama kali ditulis oleh Djody Gondokusumo dengan judul Sosiologi Indonesia (1946). Sekitar tahun 1950, muncul buku Sosiologi yang diterbitkan oleh Bardosono.

Tokoh yang juga sangat berperan dalam perkembangan sosiologi di Indonesia adalah Selo Soemardjan. Selain banyak menulis buku sosiologi, Soemardjan juga mengajar sosiologi di Universitas Indonesia (UI) dan mendirikan Fakultas Ilmu Pengetahuan Kemasyarakatan. Perannya yang besar membuat Selo Soemardjan dikenal sebagai Bapak Sosiologi Indonesia.`
      },
      {
        id: 'les_10_bab1_3',
        course_id: 'course_10_bab1',
        chapter_number: 1,
        chapter_title: 'Bab 1: Pengantar Sosiologi',
        title: 'Pertemuan 3: Pengertian dan Objek Kajian Sosiologi',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Secara etimologis, Sosiologi berasal dari socius (kawan) dan logos (berbicara/ilmu).',
          'Objek kajian utama Sosiologi adalah masyarakat.',
          'Selo Soemardjan: masyarakat adalah orang-orang yang hidup bersama dan menghasilkan kebudayaan.',
          'Max Weber: pokok kajian sosiologi adalah tindakan sosial (Tradisional, Afektif, Rasional Instrumental, Rasional Berorientasi Nilai).',
          'C. Wright Mills: Imajinasi Sosiologi.'
        ],
        text_body: `Istilah sosiologi berasal dari kata socius (kawan) dan logos (berbicara). Sosiologi adalah ilmu yang mempelajari masyarakat secara keseluruhan dan hubungan-hubungan antara orang-orang dalam masyarakat.

Objek kajian sosiologi adalah masyarakat. Selo Soemardjan mengatakan bahwa masyarakat adalah orang-orang yang hidup bersama dan menghasilkan kebudayaan. Fokus studi sosiologi meliputi hubungan timbal balik antarmanusia, individu dengan kelompok, antarkelompok, dan proses yang timbul dari hubungan tersebut.

Max Weber mengelompokkan tindakan sosial menjadi empat: tradisional, afektif, rasional instrumental, dan rasionalitas berorientasi nilai. C. Wright Mills menekankan pada imajinasi sosiologi, sementara Peter L. Berger pada pengungkapan realitas sosial.`
      },
      {
        id: 'les_10_bab1_4',
        course_id: 'course_10_bab1',
        chapter_number: 1,
        chapter_title: 'Bab 1: Pengantar Sosiologi',
        title: 'Pertemuan 4: Sosiologi sebagai Ilmu Pengetahuan',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Empiris: Didasarkan pada observasi lapangan, tidak spekulatif.',
          'Teoretis: Menyusun abstraksi dari hasil observasi untuk menjelaskan sebab-akibat.',
          'Kumulatif: Teori dibentuk berdasarkan teori yang sudah ada (diperluas, diperbaiki).',
          'Nonetis: Sosiologi tidak mencari baik/buruk suatu fakta, melainkan menjelaskan fakta secara analitis.'
        ],
        text_body: `Sosiologi merupakan ilmu pengetahuan yang berdiri sendiri karena telah memenuhi segenap unsur-unsur ilmu pengetahuan. Ciri-ciri sosiologi sebagai ilmu pengetahuan adalah:

1. Empiris: Sosiologi tidak spekulatif dan hanya menggunakan akal sehat. Kajian dilakukan berdasarkan hasil observasi nyata.
2. Teoretis: Berusaha menyusun abstraksi dari hasil observasi untuk menjelaskan hubungan sebab akibat.
3. Kumulatif: Teori-teori sosiologi dibentuk berdasarkan teori-teori yang telah ada sebelumnya, dalam arti memperbaiki, memperluas, dan memperhalus teori-teori lama.
4. Nonetis: Sosiologi tidak mencari baik atau buruk suatu fakta, tetapi menjelaskan fakta-fakta tersebut secara analitis.`
      },
      {
        id: 'les_10_bab1_5',
        course_id: 'course_10_bab1',
        chapter_number: 1,
        chapter_title: 'Bab 1: Pengantar Sosiologi',
        title: 'Pertemuan 5: Sosiologi sebagai Ilmu dengan Paradigma Ganda',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Sosiologi memiliki paradigma ganda (multiple-paradigm science).',
          'Paradigma Fakta Sosial (Durkheim): Mengkaji struktur dan institusi yang memaksa individu.',
          'Paradigma Definisi Sosial (Weber): Berfokus pada makna subjektif dan tindakan sosial.',
          'Paradigma Perilaku Sosial (Skinner): Fokus pada reward & punishment yang membentuk perilaku.'
        ],
        text_body: `George Ritzer dan Wendy W. Murphy menyatakan bahwa sosiologi tidak memiliki sebuah paradigma dominan atau tunggal, melainkan paradigma ganda (multiple-paradigm science).

1. Paradigma Fakta Sosial (Emile Durkheim): Kajian sosiologi adalah fakta sosial yang berbenda atau nyata maupun tidak nyata. Teori yang termasuk: fungsionalisme struktural, konflik, dan teori sistem.
2. Paradigma Definisi Sosial (Max Weber): Weber tertarik pada makna subyektif yang diberikan individu terhadap tindakannya. Pokok persoalannya adalah hal mikro seperti proses pendefinisian sosial.
3. Paradigma Perilaku Sosial (B.F. Skinner): Subjek dari paradigma ini adalah perilaku individu yang menimbulkan akibat atau perubahan, khususnya melalui sistem penghargaan (reward) dan hukuman (punishment).`
      },
      {
        id: 'les_10_bab1_6',
        course_id: 'course_10_bab1',
        chapter_number: 1,
        chapter_title: 'Bab 1: Pengantar Sosiologi',
        title: 'Pertemuan 6: Fungsi, Peran Sosiologi, dan Hubungannya dengan Ilmu Lain',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Fungsi sosiologi: Untuk pembangunan, penelitian, dan advokasi kebijakan.',
          'Peran sosiolog: Ahli riset, konsultan kebijakan, praktisi, dan guru/pendidik.',
          'Sosiologi adalah ilmu murni sekaligus terapan.'
        ],
        text_body: `Sosiologi merupakan ilmu pengetahuan murni sekaligus ilmu pengetahuan terapan. Fungsi sosiologi bagi masyarakat meliputi:
1. Pembangunan: Memberikan data sosial pada tahap perencanaan, pelaksanaan, maupun penilaian.
2. Penelitian: Menghasilkan data untuk menyusun rencana penyelesaian masalah sosial.
3. Advokasi Kebijakan: Menjadi basis data untuk advokasi kebijakan publik (misal: pemberdayaan masyarakat marginal).

Peran Sosiolog:
1. Sebagai ahli riset: Mengumpulkan dan mengolah data kehidupan sosial menjadi karya ilmiah.
2. Sebagai konsultan kebijakan: Membantu memperkirakan pengaruh kebijakan sosial.
3. Sebagai praktisi: Terlibat dalam perencanaan dan pelaksanaan kegiatan masyarakat.
4. Sebagai guru/pendidik: Mengajarkan sosiologi sebagai ilmu di berbagai institusi pendidikan.`
      }
    ]
  },
  {
    id: 'course_10_bab2',
    title: 'Sosiologi Kelas 10 Bab 2: Gejala Sosial dalam Masyarakat Multikultural',
    description: 'Mengidentifikasi gejala-gejala sosial, menganalisisnya dalam masyarakat multikultural, dan memahami konsep multikulturalisme secara mendalam.',
    grade_level: 10,
    category: 'Masyarakat Multikultural',
    thumbnail: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=600',
    totalLessons: 6,
    completedLessons: 0,
    lessons: [
      {
        id: 'les_10_bab2_1',
        course_id: 'course_10_bab2',
        chapter_number: 2,
        chapter_title: 'Bab 2: Gejala Sosial dalam Masyarakat Multikultural',
        title: 'Pertemuan 1: Hakikat dan Karakteristik Gejala Sosial',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Gejala sosial adalah peristiwa yang terjadi antar manusia (baik individu maupun kelompok).',
          'Durkheim menyebut gejala sosial sebagai fakta objektif di luar individu.',
          'Berbeda dengan gejala alam, gejala sosial muncul akibat dinamika masyarakat.',
          'Karakteristiknya: Kompleks, dinamis, beraneka ragam, tidak universal, kualitatif, sulit diprediksi.'
        ],
        text_body: `Gejala sosial adalah peristiwa-peristiwa yang terjadi di antara dan oleh manusia, baik secara individu maupun kelompok. Émile Durkheim memahaminya sebagai fakta objektif yang berada di luar subjek. 

Gejala sosial berbeda dengan gejala alam yang terjadi karena peristiwa alam (seperti gempa bumi). Gejala sosial murni muncul akibat aktivitas masyarakat. Setiap gejala sosial bisa menjadi dampak sekaligus penyebab gejala sosial lain.

Karakteristik Gejala Sosial meliputi: Kompleks (rumit dan saling terkait), Dinamis (terus berubah), Beraneka ragam wujudnya, Tidak universal (berlaku di wilayah/masyarakat tertentu saja), Bersifat kualitatif, Sulit diprediksi, dan kadang Irrasional (tidak mudah dimengerti).`
      },
      {
        id: 'les_10_bab2_2',
        course_id: 'course_10_bab2',
        chapter_number: 2,
        chapter_title: 'Bab 2: Gejala Sosial dalam Masyarakat Multikultural',
        title: 'Pertemuan 2: Bentuk, Jenis, dan Tingkatan Gejala Sosial',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Guglielmo Carchedi membagi gejala sosial menjadi penentu (determinant) dan ditentukan (determined).',
          'Pitirim Sorokin membagi jenis gejala sosial: religius, ekonomi, politik, dan hukum.',
          'Norman Blaikie membagi tingkatannya: Mikro (individu/kecil), Meso (organisasi/lembaga), Makro (negara/global).'
        ],
        text_body: `Menurut Guglielmo Carchedi, gejala sosial dapat dikelompokkan ke dalam dua bentuk struktural utama:
1. Bentuk yang menentukan (determinant): Kondisi akar yang memunculkan gejala lain (contoh: krisis ekonomi).
2. Bentuk yang ditentukan (determined): Efek atau kondisi reproduksi dari gejala penentu (contoh: pengangguran karena krisis).

Menurut Pitirim A. Sorokin, jenis gejala sosial meliputi:
1. Religius (terkait sistem keagamaan)
2. Ekonomi (pemenuhan kebutuhan hidup)
3. Politik (kekuasaan dan pemerintahan)
4. Hukum (kepatuhan pada aturan tertulis)

Menurut Norman Blaikie, tingkatannya terbagi menjadi:
1. Mikro: Skala individu dan kelompok kecil.
2. Meso: Skala organisasi atau lembaga menengah.
3. Makro: Skala besar seperti kota, negara, atau badan multinasional.`
      },
      {
        id: 'les_10_bab2_3',
        course_id: 'course_10_bab2',
        chapter_number: 2,
        chapter_title: 'Bab 2: Gejala Sosial dalam Masyarakat Multikultural',
        title: 'Pertemuan 3: Perbedaan dan Struktur Sosial dalam Masyarakat',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Struktur sosial adalah jalinan antara status dan peran.',
          'Secara horizontal: Diferensiasi Sosial (perbedaan sejajar seperti ras, suku, agama).',
          'Secara vertikal: Stratifikasi Sosial (tingkatan kelas berdasarkan kekayaan, kekuasaan, dll).'
        ],
        text_body: `Struktur Sosial adalah tatanan sosial yang menyusun dan mengokohkan jalinan antarindividu, peran, dan lembaga di masyarakat. Status (posisi) dan Peran (harapan atas tindakan posisi tersebut) adalah roda penggerak utamanya.

Menurut J. Nasikun, struktur masyarakat Indonesia dapat dilihat dari dua sudut pandang:
1. Secara Horizontal (Diferensiasi Sosial): Ditandai dengan perbedaan yang sejajar, seperti suku bangsa, ras, agama, dan adat.
2. Secara Vertikal (Stratifikasi Sosial): Ditandai dengan tingkatan lapisan masyarakat, seperti kelas atas, menengah, dan bawah yang didasarkan pada kekayaan, kekuasaan, atau pendidikan.`
      },
      {
        id: 'les_10_bab2_4',
        course_id: 'course_10_bab2',
        chapter_number: 2,
        chapter_title: 'Bab 2: Gejala Sosial dalam Masyarakat Multikultural',
        title: 'Pertemuan 4: Pendalaman Stratifikasi dan Diferensiasi Sosial',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Stratifikasi sosial (hierarki) terbagi 3: Terbuka, Tertutup, dan Campuran.',
          'Diferensiasi sosial (kesetaraan) mencakup Ras (Mongoloid, Kaukasoid, Negroid), Suku Bangsa, Klan (Patrilineal/Matrilineal), dan Agama.'
        ],
        text_body: `Stratifikasi Sosial adalah pembedaan masyarakat ke dalam kelas yang bertingkat (hierarki). Soerjono Soekanto membaginya menjadi tiga bentuk:
1. Pelapisan Terbuka (Open Stratification): Memiliki kesempatan naik kelas karena prestasi.
2. Pelapisan Tertutup (Closed Stratification): Kelas ditentukan oleh keturunan sejak lahir (kasta).
3. Pelapisan Campuran: Perpaduan terbuka dan tertutup.

Diferensiasi Sosial adalah pengelompokan yang sejajar/mendatar berdasarkan atribut tertentu:
1. Ras: Menurut Ralph Linton ada Ras Mongoloid, Kaukasoid, dan Negroid.
2. Suku Bangsa (Etnis): Pengelompokan budaya dan kesukuan.
3. Klan: Berdasarkan keturunan garis ayah (Patrilineal) atau ibu (Matrilineal).
4. Agama: Kesetaraan antar berbagai penganut agama di mata hukum.`
      },
      {
        id: 'les_10_bab2_5',
        course_id: 'course_10_bab2',
        chapter_number: 2,
        chapter_title: 'Bab 2: Gejala Sosial dalam Masyarakat Multikultural',
        title: 'Pertemuan 5: Heterogenitas, Prasangka, dan Stereotipe',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Heterogenitas: Keanekaragaman kompleks dalam masyarakat modern (profesi, gender).',
          'Prasangka (Prejudice): Sikap bermusuhan/emosi negatif tak berdasar (afektif).',
          'Stereotipe: Citra kaku/asumsi penyederhanaan yang melabeli kelompok tertentu (kognitif).'
        ],
        text_body: `Kombinasi stratifikasi dan diferensiasi menghasilkan Heterogenitas (keanekaragaman) dalam masyarakat. Masyarakat modern sangat heterogen dari segi profesi dan peran gender.

Namun, heterogenitas juga melahirkan tantangan berupa Prasangka (Prejudice) dan Stereotipe:
1. Prasangka: Sikap bermusuhan (antipati) atau mencurigai kelompok tertentu atas dasar firasat tanpa bukti empiris. Ini bersumber pada emosi (afektif) dan kecurigaan irrasional.
2. Stereotipe: Pelabelan (labeling) yang kaku dan menyederhanakan (over-simplified) terhadap kelompok sosial. Stereotipe berada pada level pandangan (kognitif). Bisa negatif, bisa pula positif yang kaku. Stereotipe menutup mata dari kebenaran objektif individual.`
      },
      {
        id: 'les_10_bab2_6',
        course_id: 'course_10_bab2',
        chapter_number: 2,
        chapter_title: 'Bab 2: Gejala Sosial dalam Masyarakat Multikultural',
        title: 'Pertemuan 6: Mewujudkan Masyarakat Multikultural',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Multikulturalisme: Paham ideologi yang mengakui dan menjamin kesederajatan semua kelompok sosial.',
          'Beda dengan masyarakat majemuk: majemuk sekadar hidup berdampingan, multikulturalisme menekankan kesederajatan hak.',
          'Nilai Kunci: Demokratis, Pluralisme, Humanisme (H.A.R Tilaar).',
          'Musuh multikulturalisme: Etnosentrisme (budaya sendiri paling benar) dan Primordialisme.'
        ],
        text_body: `Masyarakat multikultural adalah ideologi yang mengakui dan menjamin kesederajatan (kesetaraan hak, kewajiban, dan martabat) bagi semua kelompok sosial yang berbeda, tanpa membedakan mayoritas dan minoritas. Esensinya adalah "Kesederajatan di dalam Perbedaan". Hal ini berbeda dengan masyarakat majemuk (plural society) yang hanya sekadar beragam secara etnis namun bisa jadi masih ada yang mendominasi.

Untuk mencegah perpecahan, kita harus menumbuhkan nilai: Demokratis, Pluralisme, dan Humanisme (Menurut H.A.R Tilaar, didorong oleh faktor HAM, Globalisme, dan Demokratisasi).

Untuk menjaga multikulturalisme, bangsa Indonesia harus melawan patologi sosial berupa etnosentrisme (menganggap budaya sendiri paling benar) dan primordialisme sempit (fanatik buta pada adat sejak lahir).`
      }
    ]
  },
  {
    id: 'course_10_bab3',
    title: 'Sosiologi Kelas 10 Bab 3: Identitas Diri, Tindakan Sosial, dan Hubungan Sosial',
    description: 'Mengupas eksistensi kita di tengah masyarakat melalui identitas diri, tindakan sosial (Max Weber), dan hubungan sosial serta proses asosiatif & disosiatif.',
    grade_level: 10,
    category: 'Tindakan & Hubungan Sosial',
    thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953eb1b5ce?auto=format&fit=crop&q=80&w=600',
    totalLessons: 6,
    completedLessons: 0,
    lessons: [
      {
        id: 'les_10_bab3_1',
        course_id: 'course_10_bab3',
        chapter_number: 3,
        chapter_title: 'Bab 3: Identitas Diri dan Hubungan Sosial',
        title: 'Pertemuan 1: Hakikat Manusia dan Identitas Diri',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Manusia adalah makhluk individu (otonom) dan makhluk sosial (zoon politikon - Aristoteles).',
          'Identitas (menurut Richard Jenkins) adalah pemahaman kita atas siapa diri kita yang dikonstruksi secara sosial.',
          'Identitas Primer: terbentuk awal kehidupan (gender, ras, etnis).',
          'Identitas Sekunder: berkaitan dengan peran dan status (dapat berubah).'
        ],
        text_body: `Manusia hidup sebagai makhluk individu (unik, otonom) sekaligus makhluk sosial. Aristoteles menyebut manusia sebagai zoon politikon (makhluk sosial) yang butuh bermasyarakat untuk menjadi sempurna. 

Identitas adalah ciri khusus yang menandai eksistensi seseorang. Richard Jenkins menyebutkan bahwa identitas adalah pemahaman atas siapa kita yang dikonstruksikan melalui interaksi.

Anthony Giddens membedakan dua jenis identitas:
1. Identitas Primer: Terbentuk pada awal kehidupan (gender, ras, etnis).
2. Identitas Sekunder: Terkait dengan peran dan status sosial di masyarakat yang dapat berubah seiring perjalanan hidup.`
      },
      {
        id: 'les_10_bab3_2',
        course_id: 'course_10_bab3',
        chapter_number: 3,
        chapter_title: 'Bab 3: Identitas Diri dan Hubungan Sosial',
        title: 'Pertemuan 2: Multidimensi Identitas, Status, dan Peran Sosial',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Multidimensi Identitas: seseorang dilihat dari berbagai sudut pandang karena memiliki berbagai status sekaligus.',
          'Status (Kedudukan): posisi umum seseorang dalam masyarakat (sifat struktural/statis).',
          'Peran (Role): perilaku yang diharapkan dari suatu status (sifat fungsional/dinamis).',
          'Konflik Peran terjadi ketika status-status tersebut menuntut perilaku yang bertabrakan.'
        ],
        text_body: `Identitas seseorang di masyarakat dilihat dari berbagai sudut pandang, yang disebut dengan multidimensi identitas. Seseorang bisa menyandang beberapa status sekaligus secara simultan.

Status adalah posisi seseorang dalam struktur masyarakat dalam hubungannya dengan orang lain (misal: guru, ibu, siswa).
Peran adalah perilaku yang diharapkan masyarakat dari seseorang yang memegang status tersebut. Status bersifat struktural-statis, peran bersifat fungsional-dinamis.

Konflik peran dapat terjadi ketika seseorang memiliki multidimensi status yang menuntut ekspektasi perilaku yang saling berbenturan.`
      },
      {
        id: 'les_10_bab3_3',
        course_id: 'course_10_bab3',
        chapter_number: 3,
        chapter_title: 'Bab 3: Identitas Diri dan Hubungan Sosial',
        title: 'Pertemuan 3: Hakikat dan Jenis-Jenis Tindakan Sosial',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Tindakan Sosial (Max Weber): tindakan sadar yang memiliki makna subjektif dan diarahkan pada orang lain.',
          'Tindakan Tradisional: hasil adat istiadat/kebiasaan turun-temurun.',
          'Tindakan Afektif: dikuasai emosi/perasaan spontan.',
          'Rasional Berorientasi Nilai: berpegang pada nilai moral/agama.',
          'Rasional Instrumental: hitungan logis antara cara dan tujuan akhir (untung/rugi).'
        ],
        text_body: `Menurut Max Weber, tindakan sosial adalah tindakan individu yang mempunyai arti subjektif bagi dirinya dan diarahkan kepada orang lain. Tindakan harus dilakukan secara sadar.

Max Weber mengelompokkan tindakan sosial menjadi empat tipe:
1. Tindakan Tradisional: Berdasarkan tradisi dan warisan masa lalu.
2. Tindakan Afektif: Dikuasai oleh sentimen atau emosi spontan.
3. Rasionalitas Berorientasi Nilai: Berkaitan dengan prinsip moral, etika, dan agama tanpa mempersoalkan hasil akhir (contoh ibadah).
4. Rasional Instrumental: Tindakan berdasarkan pertimbangan akal sehat yang matang mengenai cara untuk mencapai tujuan (hitung untung-rugi).`
      },
      {
        id: 'les_10_bab3_4',
        course_id: 'course_10_bab3',
        chapter_number: 3,
        chapter_title: 'Bab 3: Identitas Diri dan Hubungan Sosial',
        title: 'Pertemuan 4: Hubungan Sosial dan Syarat Interaksi Sosial',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Hubungan sosial adalah timbal balik antarindividu yang saling memengaruhi.',
          'Syarat mutlak interaksi sosial (Soerjono Soekanto): Kontak Sosial dan Komunikasi.',
          'Komunikasi memerlukan penafsiran lambang/perilaku (decoding).',
          'Ciri interaksi (Loomis): Pelaku >1 orang, pakai simbol, ada dimensi waktu, punya tujuan.'
        ],
        text_body: `Hubungan sosial adalah hubungan timbal balik saling memengaruhi atas dasar kesadaran. Unsur utamanya adalah interaksi sosial. Menurut Gillin, interaksi sosial adalah hubungan sosial yang dinamis (antarindividu, individu-kelompok, kelompok-kelompok).

Soerjono Soekanto menyatakan syarat mutlak interaksi sosial ada dua:
1. Kontak Sosial (bertemu fisik atau non-fisik).
2. Komunikasi (proses penyampaian dan penerimaan pesan/saling menafsirkan perilaku).

Charles P. Loomis menyebut 4 ciri interaksi: jumlah pelaku 2 atau lebih, menggunakan komunikasi simbolik, adanya dimensi waktu, dan memiliki tujuan yang hendak dicapai.`
      },
      {
        id: 'les_10_bab3_5',
        course_id: 'course_10_bab3',
        chapter_number: 3,
        chapter_title: 'Bab 3: Identitas Diri dan Hubungan Sosial',
        title: 'Pertemuan 5: Pendekatan Interaksi dan Faktor Psikologis',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Interaksionisme Simbolik (Herbert Blumer): Act, Thing, Meaning.',
          'Dramaturgi (Erving Goffman): Pengaturan kesan (impression management) antara front stage dan back stage.',
          'Faktor Psikologis: Imitasi (meniru), Sugesti (diterima tanpa kritis), Identifikasi (ingin sama persis), Simpati (tertarik emosional), Empati (bertindak nyata menolong).'
        ],
        text_body: `Perspektif interaksionisme simbolik menekankan pada penggunaan simbol bermakna. Herbert Blumer menyebutkan tiga pokok pikirannya: Act (tindakan), Thing (sesuatu), dan Meaning (arti). Erving Goffman mengemukakan teori Dramaturgi tentang "pengaturan kesan" (impression management).

Faktor psikologis pendorong interaksi:
1. Imitasi: Tindakan meniru gaya orang lain secara dangkal.
2. Sugesti: Menerima pandangan orang lain tanpa berpikir kritis.
3. Identifikasi: Kecenderungan mendalam untuk menjadi sama persis dengan pihak lain.
4. Simpati: Ketertarikan secara emosional.
5. Empati: Simpati mendalam yang berwujud tindakan fisik atau bantuan nyata.`
      },
      {
        id: 'les_10_bab3_6',
        course_id: 'course_10_bab3',
        chapter_number: 3,
        chapter_title: 'Bab 3: Identitas Diri dan Hubungan Sosial',
        title: 'Pertemuan 6: Bentuk Interaksi (Asosiatif & Disosiatif)',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Proses Asosiatif (menyatukan): Kerja sama, Akomodasi, Asimilasi, Akulturasi.',
          'Proses Disosiatif (merenggangkan): Persaingan (Kompetisi), Kontravensi (rahasia/kebencian), Pertentangan (Konflik).'
        ],
        text_body: `Menurut Gillin, interaksi sosial memiliki dua proses makro:

A. Proses Asosiatif (Pemaduan Sosial)
1. Kerja Sama: Wujudnya bisa berupa gotong royong, bargaining, kooptasi, koalisi, atau joint venture.
2. Akomodasi: Usaha meredakan pertentangan (mencari titik temu) tanpa menghancurkan lawan.
3. Asimilasi: Peleburan budaya yang menghasilkan satu kebudayaan baru secara utuh.
4. Akulturasi: Berpadunya dua budaya tanpa menghilangkan ciri khas masing-masing.

B. Proses Disosiatif (Oposisi)
1. Persaingan (Kompetisi): Perjuangan mencapai tujuan secara damai dan sportif (fair play).
2. Kontravensi: Berada di antara persaingan dan konflik, ditandai rasa tidak puas dan kebencian yang disembunyikan/rahasia.
3. Pertentangan (Konflik): Menantang pihak lawan secara terbuka dengan kekerasan/ancaman fisik.`
      }
    ]
  },
  {
    id: 'course_10_bab4',
    title: 'Sosiologi Kelas 10 Bab 4: Lembaga Sosial',
    description: 'Membedah rahasia keteraturan masyarakat melalui konsep Nilai, Norma, Pengendalian Sosial, hingga berbagai Tipe Lembaga Sosial (Keluarga, Pendidikan, Agama).',
    grade_level: 10,
    category: 'Lembaga & Keteraturan Sosial',
    thumbnail: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=600',
    totalLessons: 6,
    completedLessons: 0,
    lessons: [
      {
        id: 'les_10_bab4_1',
        course_id: 'course_10_bab4',
        chapter_number: 4,
        chapter_title: 'Bab 4: Lembaga Sosial',
        title: 'Pertemuan 1: Memahami Nilai Sosial',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Nilai Sosial adalah konsepsi abstrak tentang baik-buruk yang dianut masyarakat (Soerjono Soekanto).',
          'Notonegoro membagi nilai: Materiel (fisik), Vital (aktivitas), Rohanian (kebenaran, keindahan, kebaikan, religius).',
          'Nilai Dominan: dianggap paling penting (berdasarkan lamanya penganut, prestise).',
          'Nilai Mendarah Daging: dijalankan tanpa berpikir sadar (sudah mendarah daging, melanggar merasa bersalah).'
        ],
        text_body: `Nilai (value) sosial berhubungan dengan apa yang dianggap baik dan buruk dalam masyarakat. Nilai bukanlah bawaan lahir, melainkan konstruksi masyarakat yang terbentuk melalui sosialisasi.

Prof. Dr. Notonegoro membagi nilai menjadi tiga:
1. Nilai Materiel: Segala sesuatu yang berguna bagi fisik manusia (makanan, baju).
2. Nilai Vital: Berguna untuk aktivitas (buku bagi pelajar, motor bagi kurir).
3. Nilai Kerohanian: Berguna bagi batin manusia (Kebenaran, Estetika, Kebaikan/Moral, dan Religius).

Berdasarkan cirinya:
- Nilai Dominan: Dianggap sangat penting karena banyaknya penganut dan prestise.
- Nilai Mendarah Daging: Telah menjadi kepribadian sehingga jika tidak dilakukan akan merasa sangat bersalah/malu.`
      },
      {
        id: 'les_10_bab4_2',
        course_id: 'course_10_bab4',
        chapter_number: 4,
        chapter_title: 'Bab 4: Lembaga Sosial',
        title: 'Pertemuan 2: Mengkaji Norma Sosial',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Norma adalah aturan yang mengikat dan merupakan wujud konkret dari nilai yang disertai sanksi.',
          'Tingkatan Norma: Cara (Usage), Kebiasaan (Folkways), Tata Kelakuan (Mores), Adat Istiadat (Custom).'
        ],
        text_body: `Norma adalah aturan pengikat yang mengatur perilaku masyarakat agar terwujud keteraturan. Norma selalu disertai sanksi (hukuman/hadiah). Terdapat norma formal (tertulis dari negara) dan nonformal (adat).

Tingkatan Norma (Dari lemah ke kuat):
1. Cara (Usage): Sanksi paling lemah (sekadar cemooh). Contoh: bersendawa kencang.
2. Kebiasaan (Folkways): Perbuatan berulang. Contoh: salam kepada orang tua.
3. Tata Kelakuan (Mores): Dijadikan alat pengawas dengan sanksi tegas. Contoh: larangan mencuri, berjudi.
4. Adat Istiadat (Custom): Sanksi sangat berat (pengucilan dari suku).

Klasifikasi norma meliputi: norma agama, kesusilaan (hati nurani), kesopanan (relatif), kebiasaan, dan hukum (tegas/dipaksa negara).`
      },
      {
        id: 'les_10_bab4_3',
        course_id: 'course_10_bab4',
        chapter_number: 4,
        chapter_title: 'Bab 4: Lembaga Sosial',
        title: 'Pertemuan 3: Hakikat Lembaga Sosial',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Lembaga sosial (abstrak) adalah himpunan norma. Asosiasi (konkret) adalah wujud organisasinya.',
          'Proses pelembagaan (Institusionalisasi): Nilai -> Internalisasi -> Norma -> Lembaga Sosial.',
          'Karakteristik: Punya simbol, tata tertib, usia lebih lama, alat kelengkapan, ideologi, tingkat kekebalan.',
          'Fungsi Manifes (disadari) vs Fungsi Laten (tersembunyi/tidak disadari).'
        ],
        text_body: `Lembaga Sosial (Institution) adalah sistem norma yang mengatur hubungan agar tertib. Perwujudan nyata dari lembaga adalah Asosiasi (seperti sekolah, perbankan, kepolisian).

Proses Pelembagaan bermula dari Nilai yang di-internalisasi, menjadi Norma, lalu mengelompok dan mengeras menjadi Lembaga Sosial. Pertumbuhannya bisa Terencana (hukum/negara) atau Tidak Terencana (tumbuh dari adat masyarakat).

Karakteristik Lembaga Sosial: Memiliki simbol sendiri, tata tertib, usia yang lama lintas generasi, alat kelengkapan, ideologi, dan kekebalan (daya tahan dari kehancuran).

Fungsinya terbagi dua:
- Fungsi Manifes: Nyata, disadari, dan diharapkan (contoh: sekolah untuk belajar akademik).
- Fungsi Laten: Tidak disadari, efek samping (contoh: sekolah menjauhkan anak dari kontrol ketat orang tua, menunda pernikahan).`
      },
      {
        id: 'les_10_bab4_4',
        course_id: 'course_10_bab4',
        chapter_number: 4,
        chapter_title: 'Bab 4: Lembaga Sosial',
        title: 'Pertemuan 4: Tipe & Jenis Lembaga (Keluarga & Pendidikan)',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Tipe: Crescive (tak sengaja/adat) vs Enacted (sengaja/hukum), Basic (penting) vs Subsidiary (tambahan).',
          'Keluarga: Fungsi reproduksi, afeksi, sosialisasi, ekonomi, perlindungan.',
          'Pendidikan: Wadah sosialisasi formal, mempertahankan prestise.'
        ],
        text_body: `Menurut Gillin dan Gillin, tipe lembaga sosial dapat diklasifikasikan berdasarkan:
1. Perkembangan: Crescive (tak sengaja tumbuh dari adat) vs Enacted (sengaja dibentuk).
2. Sistem Nilai: Basic (sangat penting spt keluarga) vs Subsidiary (tambahan spt rekreasi).
3. Penerimaan: Approved (diterima) vs Unsanctioned (ditolak, misal sindikat kejahatan).

Jenis Lembaga:
- Lembaga Keluarga: Unit sosial terkecil. Fungsinya vital: Reproduksi, Afeksi (kasih sayang), Sosialisasi awal, Proteksi, Ekonomi, dan Pemberian Status.
- Lembaga Pendidikan: Melengkapi keluarga. Fungsi manifes: mempersiapkan mencari nafkah dan menanamkan keterampilan. Fungsi laten: memperpanjang masa remaja dan wadah pembangkangan kritis pemuda.`
      },
      {
        id: 'les_10_bab4_5',
        course_id: 'course_10_bab4',
        chapter_number: 4,
        chapter_title: 'Bab 4: Lembaga Sosial',
        title: 'Pertemuan 5: Lembaga Politik, Ekonomi, dan Agama',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Lembaga Politik: Memelihara ketertiban (internal) & keamanan luar (eksternal).',
          'Lembaga Ekonomi: Mengatur pemenuhan kebutuhan pokok (produksi, distribusi, konsumsi).',
          'Lembaga Agama (Durkheim): Sistem kepercayaan atas hal suci (sacred), fungsi pedoman hidup dan identitas sosial.'
        ],
        text_body: `Jenis-jenis lembaga sosial lainnya:
- Lembaga Politik: Berkaitan dengan kekuasaan. Fungsinya memelihara ketertiban internal (hukum), menjaga keamanan eksternal (diplomasi/perang), kesejahteraan umum, dan mengatur persaingan politik.
- Lembaga Ekonomi: Mengatur pemenuhan kebutuhan pokok untuk kelangsungan hidup. Strukturnya meliputi produksi pertanian, perbankan, dan perdagangan modern.
- Lembaga Agama: Menurut Durkheim, ini adalah sistem praktik dan kepercayaan terhadap hal-hal suci (sacred) yang terpisah dari yang duniawi (profan). Agama berfungsi sebagai pedoman moral, rekreasi rohani (ketenangan), dan identitas sosial.`
      },
      {
        id: 'les_10_bab4_6',
        course_id: 'course_10_bab4',
        chapter_number: 4,
        chapter_title: 'Bab 4: Lembaga Sosial',
        title: 'Pertemuan 6: Tertib Sosial, Penyimpangan, dan Pengendalian',
        content_type: 'text',
        duration: '15 Min',
        xp_reward: 50,
        completed: false,
        bookmarked: false,
        key_takeaways: [
          'Penyimpangan (Deviasi) dijelaskan lewat Teori Asosiasi (pergaulan), Labeling (dicap buruk), dan Anomi (tekanan struktur).',
          'Pengendalian Sosial: Preventif (mencegah) & Represif (menghukum/memulihkan).',
          'Tahapan keteraturan (T-O-K-P): Tertib Sosial -> Order -> Keajegan -> Pola.'
        ],
        text_body: `Jika lembaga gagal menyosialisasikan konformitas, terjadilah Penyimpangan Sosial (Deviasi). Teori penyebab penyimpangan:
1. Teori Asosiasi Diferensial (Sutherland): Belajar menyimpang dari pergaulan buruk.
2. Teori Labeling (Lemert): Menyimpang berkelanjutan (sekunder) karena masyarakat memberikan cap buruk padanya.
3. Teori Anomi (Merton): Akibat ketidakselarasan antara tujuan hidup dan fasilitas/struktur sosial.

Pengendalian Sosial dilakukan secara Preventif (mencegah sebelum terjadi) dan Represif (hukuman sesudah pelanggaran). 

Tahapan menuju Keteraturan Sosial (T-O-K-P):
1. Tertib Sosial: Kondisi aman, sadar hak dan kewajiban.
2. Order: Sistem norma mulai dipatuhi.
3. Keajegan: Kondisi tersebut berlangsung terus menerus.
4. Pola: Keteraturan ini menjadi corak mantap yang dijadikan model (tradisi) oleh generasi selanjutnya.`
      }
    ]
  }
];

const fileContent = fs.readFileSync('src/data/sociologyData.ts', 'utf8');

// The file exports COURSES_DATA as an array.
// I will find the export const COURSES_DATA: Course[] = [ ... ];
// We can use eval or regex to find and replace course_10.
// Since course_10 is an object in the COURSES_DATA array, it's safer to reconstruct COURSES_DATA.
// I will just use regex to find where course_10 starts and where it ends.

const course10Start = fileContent.indexOf("id: 'course_10'");
if (course10Start !== -1) {
    const previousBrace = fileContent.lastIndexOf('{', course10Start);
    // Find where the next course (course_11) starts
    const course11Start = fileContent.indexOf("id: 'course_11'");
    const nextCourseBrace = fileContent.lastIndexOf('{', course11Start);
    
    // Also we need to extract the part before previousBrace and after nextCourseBrace
    const part1 = fileContent.substring(0, previousBrace);
    const part2 = fileContent.substring(nextCourseBrace);

    // Prepare JSON for new courses
    let newCoursesJson = JSON.stringify(courses, null, 2);
    // Remove the enclosing brackets of the array to inject elements inside the existing array
    newCoursesJson = newCoursesJson.substring(1, newCoursesJson.length - 1).trim();

    const newFileContent = part1 + newCoursesJson + ',\n  ' + part2;
    fs.writeFileSync('src/data/sociologyData.ts', newFileContent, 'utf8');
    console.log("Successfully replaced course_10 with the new courses.");
} else {
    console.log("Could not find course_10.");
}
