const fs = require('fs');
let fileContent = fs.readFileSync('src/components/LearningModules.tsx', 'utf8');

const replacement = `
            let headerText = firstLine;
            let bodyText = lines.slice(1);

            if (isTips || isCaseStudy || isTimeline || isExercise || isConcept) {
              const colonIndex = firstLine.indexOf(':');
              if (colonIndex !== -1 && colonIndex < 40 && lines.length === 1) {
                 headerText = firstLine.substring(0, colonIndex + 1);
                 bodyText = [firstLine.substring(colonIndex + 1).trim()];
              } else if (colonIndex !== -1 && colonIndex < 40 && lines.length > 1) {
                 const partAfterColon = firstLine.substring(colonIndex + 1).trim();
                 headerText = firstLine.substring(0, colonIndex + 1);
                 if (partAfterColon) {
                    bodyText = [partAfterColon, ...lines.slice(1)];
                 } else {
                    bodyText = lines.slice(1);
                 }
              }
            }

            const renderLines = (linesArr: string[]) => linesArr.map((l, lIdx) => (
               <p key={lIdx}>{highlightKeyTerms(l)}</p>
            ));`;

const targetRegex = /let headerText = firstLine;[\s\S]*?const renderLines = \(linesArr: string\[\]\) => linesArr\.map\(\(l, lIdx\) => \(\s*<p key=\{lIdx\}>\{highlightKeyTerms\(l\)\}<\/p>\s*\)\);/;
fileContent = fileContent.replace(targetRegex, replacement.trim());

fs.writeFileSync('src/components/LearningModules.tsx', fileContent, 'utf8');
console.log("Fixed bodyText issue!");
