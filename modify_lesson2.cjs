const fs = require('fs');
let fileContent = fs.readFileSync('src/data/sociologyData.ts', 'utf8');
const targetId = '"id": "les_10_bab1_2"';
const startIndex = fileContent.indexOf(targetId);

if (startIndex !== -1) {
    const textBodyStart = fileContent.indexOf('"text_body": "', startIndex);
    const textBodyEnd = fileContent.indexOf('",', textBodyStart + 14);

    const oldTextBody = fileContent.substring(textBodyStart + 14, textBodyEnd);

    const newAdditions = `\\n\\nTugas: Menganalisis Sejarah Lokal\\nCarilah satu peristiwa sejarah di daerahmu (misal: perang kemerdekaan, pembentukan desa, atau masuknya agama tertentu). Analisislah bagaimana peristiwa tersebut mempengaruhi tatanan sosial masyarakat saat itu. Apakah ada perubahan kelas sosial atau nilai-nilai baru yang muncul?`;

    const newTextBody = oldTextBody + newAdditions;
    const newContent = fileContent.substring(0, textBodyStart + 14) + newTextBody + fileContent.substring(textBodyEnd);

    fs.writeFileSync('src/data/sociologyData.ts', newContent, 'utf8');
    console.log("Successfully modified les_10_bab1_2");
}
