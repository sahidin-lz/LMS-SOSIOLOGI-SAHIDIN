const fs = require('fs');

let fileContent = fs.readFileSync('src/data/sociologyData.ts', 'utf8');

const tkaUpdates = {
  'les_tka_1_a': '\n\nKonsep Penting: Bapak Sosiologi\nAuguste Comte adalah tokoh yang pertama kali memperkenalkan sosiologi pada tahun 1842 melalui bukunya "Positive-Philosophy".\n\nCara Mudah Membaca: Asal Sosiologi\nSosiologi lahir di Eropa karena guncangan revolusi industri dan revolusi Prancis.',
  'les_tka_1_b': '\n\nKonsep Penting: Karakteristik Sosiologi\nSosiologi memiliki 4 ciri utama: Empiris, Teoritis, Kumulatif, dan Non-etis.\n\nCara Mudah Membaca: Ciri Sosiologi\nIngat ETKN! Empiris (fakta), Teoritis (abstraksi), Kumulatif (diperbaiki), Non-etis (tidak menilai baik/buruk).\n\nStudi Kasus: Sikap Non-etis\nSeorang sosiolog meneliti fenomena geng motor. Sosiolog tersebut tidak menilai apakah perbuatan geng motor itu baik atau buruk, melainkan mencari tahu MENGAPA fenomena itu terjadi.',
  'les_tka_1_c': '\n\nKonsep Penting: Ilmu Murni vs Terapan\nSosiologi sebagai ilmu murni (Pure Science) bertujuan mengembangkan ilmu pengetahuan, sedangkan sebagai ilmu terapan (Applied Science) bertujuan memecahkan masalah praktis masyarakat.',
  'les_tka_1_d': '\n\nCara Mudah Membaca: Kuantitatif vs Kualitatif\nKuantitatif berhubungan dengan angka dan statistik. Kualitatif berhubungan dengan makna, deskripsi, dan pemahaman mendalam.\n\nStudi Kasus: Pemilihan Metode\nJika meneliti "Angka kemiskinan di desa X", gunakan Kuantitatif. Jika meneliti "Makna kemiskinan bagi warga desa X", gunakan Kualitatif.',
  'les_tka_1_e': '\n\nKonsep Penting: Perspektif Sosiologi\nAda tiga perspektif utama: Struktural Fungsional, Konflik, dan Interaksionisme Simbolik.\n\nCara Mudah Membaca: Perbedaan Perspektif\nFungsional (Harmoni/Sistem), Konflik (Persaingan/Kekuasaan), Interaksionisme Simbolik (Makna/Individu).',
  'les_tka_1_f': '\n\nKonsep Penting: Tokoh Sosiologi\nEmile Durkheim (Fakta Sosial), Karl Marx (Konflik Kelas), Max Weber (Tindakan Sosial).\n\nCara Mudah Membaca: Tokoh Klasik\nDurkheim fokus pada tatanan (struktur). Marx fokus pada ketimpangan (ekonomi). Weber fokus pada makna individu (tindakan).',
  'les_tka_1_g': '\n\nKonsep Penting: Fungsi Sosiologi\nFungsi sosiologi meliputi Perencanaan sosial, Penelitian, Pembangunan, dan Pemecahan masalah sosial.\n\nStudi Kasus: Fungsi Pembangunan\nSosiolog memberikan data kebiasaan warga lokal kepada pemerintah sebelum membangun bendungan, agar pembangunan tidak ditolak warga.',
  'les_tka_1_h': '\n\nCara Mudah Membaca: Peran Sosiolog\n1. Ahli Riset (mencari data)\n2. Konsultan Kebijakan (memberi masukan ke pemerintah)\n3. Teknisi (terlibat langsung dalam program)\n4. Pendidik (mengajar dan menyebarkan ilmu).'
};

for (const [id, addition] of Object.entries(tkaUpdates)) {
  const targetId = `"id": "${id}"`; // It might be id: 'les_tka_1_a' in sociologyData.ts
  const targetId2 = `id: '${id}'`; 
  
  let startIndex = fileContent.indexOf(targetId);
  if(startIndex === -1) startIndex = fileContent.indexOf(targetId2);
  
  if (startIndex !== -1) {
    let textBodyStart = fileContent.indexOf("text_body: `", startIndex);
    if (textBodyStart !== -1) {
      let textBodyEnd = fileContent.indexOf("`", textBodyStart + 12);
      if (textBodyEnd !== -1) {
        let oldTextBody = fileContent.substring(textBodyStart + 12, textBodyEnd);
        let newTextBody = oldTextBody + addition;
        fileContent = fileContent.substring(0, textBodyStart + 12) + newTextBody + fileContent.substring(textBodyEnd);
        console.log(`Successfully modified ${id}`);
      }
    }
  }
}

fs.writeFileSync('src/data/sociologyData.ts', fileContent, 'utf8');

