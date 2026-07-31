const fs = require('fs');
let code = fs.readFileSync('src/data/sociologyData.ts', 'utf8');

const target = `    ]
  }
];

export const INITIAL_SUBMISSIONS`;

const replace = `    ]
  },
  ...TKA_COURSES_EXTRA,
  ...TKA_COURSES_EXTRA_2
];

export const INITIAL_SUBMISSIONS`;

code = code.replace(target, replace);
fs.writeFileSync('src/data/sociologyData.ts', code);
