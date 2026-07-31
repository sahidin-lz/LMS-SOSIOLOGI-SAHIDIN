const fs = require('fs');

let fileContent = fs.readFileSync('src/data/sociologyData.ts', 'utf8');

const replacements = {
  'les_10_bab1_5': '\\n\\nKonsep Penting: Paradigma Ganda Sosiologi\\nSosiologi tidak memiliki paradigma tunggal. Ritzer membaginya menjadi tiga: Fakta Sosial, Definisi Sosial, dan Perilaku Sosial.',
  'les_10_bab1_6': '\\n\\nCara Mudah Membaca: Peran Sosiolog\\nIngat 4 peran: Riset, Konsultan, Praktisi, dan Pendidik (RKPP).',
  'les_10_bab2_2': '\\n\\nKonsep Penting: Skala Gejala Sosial\\nMikro (individu), Meso (organisasi), Makro (global/negara).',
  'les_10_bab2_4': '\\n\\nCara Mudah Membaca: Stratifikasi dan Diferensiasi\\nStratifikasi ada 3 jenis: Terbuka, Tertutup, Campuran. Diferensiasi contohnya Ras, Suku, Klan, Agama.',
  'les_10_bab2_6': '\\n\\nDefinisi: Multikulturalisme\\nIdeologi yang mengakui dan mengagungkan kesederajatan semua kelompok sosial.',
  'les_10_bab3_1': '\\n\\nTimeline: Pembentukan Identitas\\nBayi (Identitas Primer dari keluarga/etnis) -> Dewasa (Identitas Sekunder dari profesi/status).',
  'les_10_bab3_2': '\\n\\nStudi Kasus: Konflik Peran\\nSeorang polisi (peran aparat penegak hukum) harus menilang anaknya sendiri (peran ayah) yang melanggar lampu merah. Ini adalah konflik peran klasik.',
  'les_10_bab3_3': '\\n\\nStudi Kasus: Tindakan Sosial\\nMemilih sekolah berdasarkan prospek kerja yang cerah adalah Tindakan Rasional Instrumental, sedangkan memberi sedekah tanpa mengharapkan balasan adalah Rasional Berorientasi Nilai.',
  'les_10_bab3_6': '\\n\\nKonsep Penting: Asosiatif vs Disosiatif\\nAsosiatif: Kerja sama, Akomodasi, Asimilasi, Akulturasi (menyatukan).\\nDisosiatif: Persaingan, Kontravensi, Konflik (memisahkan).',
  'les_10_bab4_3': '\\n\\nDefinisi: Institusionalisasi\\nProses panjang dari sekadar kebiasaan (norma) hingga mengeras menjadi lembaga sosial yang diakui dan ditaati.',
  'les_10_bab4_4': '\\n\\nCara Mudah Membaca: Fungsi Lembaga\\nManifes = Nyata/Disadari. Laten = Tersembunyi/Tidak Disadari.',
  'les_10_bab4_5': '\\n\\nStudi Kasus: Lembaga Agama\\nRumah ibadah sering kali menjadi pusat pemberdayaan ekonomi masyarakat, ini merupakan bukti fungsi tambahan (subsidiary) lembaga agama.'
};

for (const [id, addition] of Object.entries(replacements)) {
  const targetId = `"id": "${id}"`;
  const startIndex = fileContent.indexOf(targetId);
  if (startIndex !== -1) {
    const textBodyStart = fileContent.indexOf('"text_body": "', startIndex);
    if (textBodyStart !== -1) {
      // Find the end of the text_body string (which is followed by '",')
      const textBodyEnd = fileContent.indexOf('",', textBodyStart + 14);
      if (textBodyEnd !== -1) {
        const oldTextBody = fileContent.substring(textBodyStart + 14, textBodyEnd);
        const newTextBody = oldTextBody + addition;
        fileContent = fileContent.substring(0, textBodyStart + 14) + newTextBody + fileContent.substring(textBodyEnd);
        console.log(`Successfully modified ${id}`);
      }
    }
  }
}

fs.writeFileSync('src/data/sociologyData.ts', fileContent, 'utf8');

