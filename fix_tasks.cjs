const fs = require('fs');
let fileContent = fs.readFileSync('src/data/sociologyData.ts', 'utf8');

if (!fileContent.includes('export const INITIAL_TASKS')) {
  fileContent = fileContent + `\nexport const INITIAL_TASKS: any[] = [];\n`;
  fs.writeFileSync('src/data/sociologyData.ts', fileContent, 'utf8');
  console.log("Added INITIAL_TASKS");
}
