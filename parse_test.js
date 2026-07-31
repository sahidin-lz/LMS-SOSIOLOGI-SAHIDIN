const testString = `
1. HAKIKAT GEJALA SOSIAL
Gejala sosial adalah fenomena bla bla.

Cara Mudah Membaca: Perhatikan kata kunci.

Studi Kasus: Tawuran antar pelajar.
Analisis Kasus: Mereka tawuran karena...
`;
const paras = testString.split('\n\n');
paras.forEach(p => console.log(p.trim()));
