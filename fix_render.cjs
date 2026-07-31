const fs = require('fs');

let fileContent = fs.readFileSync('src/components/LearningModules.tsx', 'utf8');

// We want to fix LearningModules to better handle when the whole content is on the first line.

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
            ));
`;

// I need to use sed or AST, but let's just use Node string replacement
// Let's look for:
//             const renderLines = (linesArr: string[]) => linesArr.map((l, lIdx) => (
//                <p key={lIdx}>{highlightKeyTerms(l)}</p>
//             ));

const targetSearch = `            const renderLines = (linesArr: string[]) => linesArr.map((l, lIdx) => (
               <p key={lIdx}>{highlightKeyTerms(l)}</p>
            ));`;

if (fileContent.includes(targetSearch)) {
  fileContent = fileContent.replace(targetSearch, replacement);
  fs.writeFileSync('src/components/LearningModules.tsx', fileContent, 'utf8');
  console.log("Replaced successfully!");
}

