const fs = require('fs');

let fileContent = fs.readFileSync('src/data/sociologyData.ts', 'utf8');

const replacements = {
  'les_10_bab1_3': '\\n\\nKonsep Penting: Imajinasi Sosiologi\\nC. Wright Mills menekankan pada kemampuan melihat hubungan antara pengalaman personal dan kekuatan sosial yang lebih besar.\\n\\nCara Mudah Membaca: Ingat 4 jenis tindakan Weber dengan akronim TARA: Tradisional, Afektif, Rasional Instrumental, dan Rasional nilai.',
  'les_10_bab1_4': '\\n\\nKonsep Penting: Sifat Ilmu Sosiologi\\nEmpiris, Teoretis, Kumulatif, dan Nonetis.\\n\\nCara Mudah Membaca: Sosiologi itu ETKN (Empiris, Teoretis, Kumulatif, Nonetis).',
  'les_10_bab2_1': '\\n\\nDefinisi: Gejala Sosial\\nFakta objektif yang berada di luar subjek (Durkheim).\\n\\nStudi Kasus: Kemacetan Lalu Lintas\\nKemacetan bukan hanya masalah teknis, tapi gejala sosial yang melibatkan perilaku pengguna jalan, kebijakan, dan urbanisasi.',
  'les_10_bab2_3': '\\n\\nKonsep Penting: Horizontal vs Vertikal\\nHorizontal = Diferensiasi (Kesetaraan). Vertikal = Stratifikasi (Hierarki).\\n\\nCara Mudah Membaca: Diferensiasi itu menyamping (sama rata), Stratifikasi itu menanjak (berkelas).',
  'les_10_bab2_5': '\\n\\nDefinisi: Prasangka vs Stereotipe\\nPrasangka adalah sikap (emosi negatif), sedangkan stereotipe adalah pandangan (label kognitif).',
  'les_10_bab3_4': '\\n\\nKonsep Penting: Syarat Interaksi Sosial\\nMenurut Soerjono Soekanto, harus ada Kontak Sosial dan Komunikasi.\\n\\nCara Mudah Membaca: Tanpa kontak dan komunikasi, interaksi hanya angan-angan (K2).',
  'les_10_bab3_5': '\\n\\nDefinisi: Faktor Psikologis Interaksi\\nImitasi, Sugesti, Identifikasi, Simpati, dan Empati.\\n\\nStudi Kasus: Demam K-Pop\\nBanyak remaja mengidentifikasi diri mereka dengan idolanya, yang merupakan bentuk dari Identifikasi dan Imitasi.',
  'les_10_bab4_1': '\\n\\nKonsep Penting: Pembagian Nilai Notonegoro\\nMateriel, Vital, dan Kerohanian.\\n\\nCara Mudah Membaca: Ingat M-V-K. Materiel (fisik), Vital (aktivitas), Kerohanian (batin).',
  'les_10_bab4_2': '\\n\\nTimeline: Tingkatan Norma\\nCara (Usage) -> Kebiasaan (Folkways) -> Tata Kelakuan (Mores) -> Adat Istiadat (Custom).',
  'les_10_bab4_6': '\\n\\nStudi Kasus: Perilaku Menyimpang\\nSeorang anak yang bergaul dengan geng motor dan mulai ikut balap liar menunjukkan Teori Asosiasi Diferensial (Sutherland).'
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

