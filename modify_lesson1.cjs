const fs = require('fs');

let fileContent = fs.readFileSync('src/data/sociologyData.ts', 'utf8');

const targetId = '"id": "les_10_bab1_1"';
const startIndex = fileContent.indexOf(targetId);

if (startIndex !== -1) {
    const textBodyStart = fileContent.indexOf('"text_body": "', startIndex);
    const textBodyEnd = fileContent.indexOf('",', textBodyStart + 14);

    const oldTextBody = fileContent.substring(textBodyStart + 14, textBodyEnd);

    const newAdditions = `\\n\\nCara Mudah Membaca: Sosiologi lahir karena adanya ancaman terhadap tatanan sosial yang stabil (threats to the taken-for-granted world). Ingat dua pemicu utama: Revolusi Industri (ekonomi) dan Revolusi Prancis (politik)!\\n\\nKonsep Penting: Fakta Sosial dan Bebas Nilai\\nMenurut Emile Durkheim, sosiologi memiliki objek kajian yang jelas, yaitu *fakta sosial*. Fakta sosial adalah cara bertindak, berpikir, dan merasa yang berada di luar individu dan memiliki daya paksa. Durkheim juga mengemukakan konsep bebas nilai (value free).\\n\\nStudi Kasus: Mengapa Sosiologi Muncul di Eropa, Bukan di Asia?\\nCoba bayangkan Anda hidup di Eropa pada abad ke-18. Mesin uap ditemukan, memicu Revolusi Industri. Ratusan ribu petani bermigrasi ke kota mencari kerja, namun berujung pada kota yang kumuh, polusi, dan kemiskinan baru. Di saat yang sama, Revolusi Prancis meruntuhkan kekuasaan raja. Tatanan masyarakat yang ratusan tahun tenang, tiba-tiba runtuh seketika. Di tengah kekacauan (chaos) inilah, para pemikir seperti Auguste Comte menyadari perlunya sebuah ilmu khusus untuk mendiagnosis \"penyakit\" masyarakat dan mengembalikan keteraturan, yang kemudian dinamakan Sosiologi.\\n\\nTimeline: Urutan Tokoh Sosiologi Klasik\\n- Auguste Comte (1798-1857): Bapak Sosiologi yang memberi nama ilmu ini.\\n- Herbert Spencer (1820-1903): Mempopulerkan sosiologi lewat analogi evolusi biologi.\\n- Emile Durkheim (1858-1917): Mengukuhkan sosiologi sebagai ilmu empiris dengan metode yang ketat.\\n- Max Weber (1864-1920): Mengkaji pentingnya ide, nilai, dan tindakan sosial manusia dalam perubahan.`;

    const newTextBody = oldTextBody + newAdditions;

    const newContent = fileContent.substring(0, textBodyStart + 14) + newTextBody + fileContent.substring(textBodyEnd);

    fs.writeFileSync('src/data/sociologyData.ts', newContent, 'utf8');
    console.log("Successfully modified les_10_bab1_1");
} else {
    console.log("Could not find lesson");
}
