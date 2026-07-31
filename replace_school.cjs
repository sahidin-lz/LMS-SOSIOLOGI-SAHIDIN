const fs = require('fs');
const path = require('path');

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile() && filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
            callback(filePath);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

const replacements = [
    [/SMA Negeri Sosiologi/g, 'SMAIT As-Syifa Boarding School Wanareja'],
    [/SMA Negeri 1 Membumi/g, 'SMAIT As-Syifa Boarding School Wanareja'],
    [/Portal Edukasi Sosiologi SMAN • TP 2026\/2027/g, 'Portal Edukasi Sosiologi SMAIT As-Syifa Boarding School Wanareja • TP 2026/2027'],
    [/Portal Edukasi Sosiologi SMAN \| TP 2026\/2027/g, 'Portal Edukasi Sosiologi SMAIT As-Syifa Boarding School Wanareja | TP 2026/2027'],
    [/SMA Negeri 8 Jakarta/g, 'SMAIT As-Syifa Boarding School Wanareja'],
    [/SMA Labschool Kebayoran/g, 'SMAIT As-Syifa Boarding School Wanareja'],
    [/SMA Negeri 3 Yogyakarta/g, 'SMAIT As-Syifa Boarding School Wanareja'],
    [/SMA Sosiologi Indonesia/g, 'SMAIT As-Syifa Boarding School Wanareja'],
    [/SMA NEGERI 1 SOSIOLOGI MEMBUMI/g, 'SMAIT AS-SYIFA BOARDING SCHOOL WANAREJA'],
];

walkSync('src', function(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    for (let [regex, replacement] of replacements) {
        content = content.replace(regex, replacement);
    }
    
    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated: ' + filePath);
    }
});
