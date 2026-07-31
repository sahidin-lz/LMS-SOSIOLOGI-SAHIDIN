const fs = require('fs');

const c11b1 = require('./c11_b1.cjs');
const c11b2 = require('./c11_b2.cjs');
const c11b3 = require('./c11_b3.cjs');
const c11b4 = require('./c11_b4.cjs');

const c12b1 = require('./c12_b1.cjs');
const c12b2 = require('./c12_b2.cjs');
const c12b3 = require('./c12_b3.cjs');
const c12b4 = require('./c12_b4.cjs');

let fileContent = fs.readFileSync('src/data/sociologyData.ts', 'utf8');

const course11Start = fileContent.indexOf("id: 'course_11'");
const initialSubmissionsStart = fileContent.indexOf("export const INITIAL_SUBMISSIONS");

if (course11Start !== -1 && initialSubmissionsStart !== -1) {
  const previousBrace = fileContent.lastIndexOf('{', course11Start);
  let part1 = fileContent.substring(0, previousBrace);
  if (!part1.endsWith(',')) {
    if (!part1.endsWith(',\n') && !part1.endsWith(', \n') && !part1.endsWith(',  \n')) {
      const lastCloseBracket = fileContent.lastIndexOf(']', initialSubmissionsStart);
      // It's in an array, so part1 is elements before this.
      part1 = part1.trimEnd();
      if (!part1.endsWith(',')) {
        part1 += ', ';
      }
    }
  }

  const lastBracket = fileContent.lastIndexOf(']', initialSubmissionsStart);
  const part2 = fileContent.substring(lastBracket);
  
  const newCourses = [c11b1, c11b2, c11b3, c11b4, c12b1, c12b2, c12b3, c12b4];
  let newCoursesJson = JSON.stringify(newCourses, null, 2);
  newCoursesJson = newCoursesJson.substring(1, newCoursesJson.length - 1).trim();
  
  const newContent = part1 + "\n" + newCoursesJson + '\n' + part2;
  
  fs.writeFileSync('src/data/sociologyData.ts', newContent, 'utf8');
  console.log("Successfully replaced courses 11 and 12!");
} else {
  console.log("Could not find targets");
}

