const fs = require('fs');

let content = fs.readFileSync('src/components/TeacherDashboard.tsx', 'utf8');
content = content.replace(/SMA Negeri 8 Jakarta/g, 'SMAIT As-Syifa Boarding School Wanareja');
content = content.replace(/SMA Negeri 3 Yogyakarta/g, 'SMAIT As-Syifa Boarding School Wanareja');
content = content.replace(/SMA Labschool Kebayoran/g, 'SMAIT As-Syifa Boarding School Wanareja');
fs.writeFileSync('src/components/TeacherDashboard.tsx', content);
