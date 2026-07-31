const fs = require('fs');
const path = require('path');

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile() && filePath.endsWith('.tsx')) {
            callback(filePath);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

const replacements = [
    [/bg-stone-950\/80/g, 'bg-slate-800\/60'], // Modals backdrop
    [/bg-stone-950\/60/g, 'bg-slate-100'],
    [/bg-stone-950\/50/g, 'bg-slate-50'],
    [/bg-stone-900\/90/g, 'bg-white\/90'],
    [/bg-stone-900\/80/g, 'bg-white\/80'],
    [/bg-stone-950/g, 'bg-slate-50'],
    [/bg-stone-900/g, 'bg-white'],
    [/bg-stone-800\/60/g, 'bg-slate-100'],
    [/bg-stone-800\/50/g, 'bg-slate-100'],
    [/bg-stone-800/g, 'bg-slate-100'],
    [/bg-stone-700/g, 'bg-slate-200'],
    [/border-stone-800/g, 'border-slate-200'],
    [/border-stone-700/g, 'border-slate-300'],
    [/border-stone-600/g, 'border-slate-300'],
    [/text-stone-100/g, 'text-slate-800'],
    [/text-stone-200/g, 'text-slate-700'],
    [/text-stone-300/g, 'text-slate-600'],
    [/text-stone-400/g, 'text-slate-500'],
    [/text-stone-500/g, 'text-slate-400'],
    [/text-amber-400/g, 'text-orange-600'],
    [/text-amber-300/g, 'text-orange-500'],
    [/text-amber-200/g, 'text-orange-700'],
    [/bg-amber-950\/40/g, 'bg-orange-50'],
    [/bg-amber-950/g, 'bg-orange-50'],
    [/border-amber-900\/40/g, 'border-orange-200'],
    [/border-amber-900/g, 'border-orange-200'],
    [/border-amber-800/g, 'border-orange-300'],
    [/bg-emerald-950/g, 'bg-blue-50'],
    [/bg-emerald-900/g, 'bg-blue-100'],
    [/bg-emerald-800/g, 'bg-blue-100'],
    [/border-emerald-900/g, 'border-blue-200'],
    [/border-emerald-800/g, 'border-blue-300'],
    [/border-emerald-600\/50/g, 'border-blue-200'],
    [/border-emerald-400\/40/g, 'border-blue-200'],
    [/text-emerald-400/g, 'text-blue-600'],
    [/text-emerald-300/g, 'text-blue-500'],
    [/text-emerald-200/g, 'text-blue-700'],
    [/(from|to|via)-emerald-600/g, '$1-blue-600'],
    [/(from|to|via)-emerald-700/g, '$1-blue-700'],
    [/(from|to|via)-emerald-500/g, '$1-blue-500'],
    [/bg-emerald-600/g, 'bg-blue-600'],
    [/bg-emerald-500/g, 'bg-blue-500'],
    [/hover:bg-emerald-500/g, 'hover:bg-blue-500'],
    [/hover:bg-emerald-600/g, 'hover:bg-blue-600'],
    [/text-emerald-500/g, 'text-blue-600'],
    [/border-emerald-500/g, 'border-blue-400'],
    [/border-emerald-400/g, 'border-blue-300'],
    [/bg-amber-500 text-stone-950/g, 'bg-orange-500 text-white'],
    [/bg-amber-500 text-slate-50/g, 'bg-orange-500 text-white'], // Wait, bg-stone-950 became bg-slate-50 above, so bg-amber-500 text-slate-50 means it was text-stone-950
    [/bg-amber-500/g, 'bg-orange-500'],
    [/hover:from-amber-400/g, 'hover:from-orange-400'],
    [/hover:to-amber-500/g, 'hover:to-orange-500'],
    [/(from|to|via)-amber-500/g, '$1-orange-500'],
    [/(from|to|via)-amber-600/g, '$1-orange-600'],
    [/(from|to|via)-amber-400/g, '$1-orange-400'],
    [/hover:text-white/g, 'hover:text-slate-900'],
    [/hover:text-stone-200/g, 'hover:text-slate-900'],
    [/hover:bg-stone-800/g, 'hover:bg-slate-50'],
    [/hover:border-stone-800/g, 'hover:border-slate-200'],
    [/hover:bg-stone-700/g, 'hover:bg-slate-100'],
    [/shadow-inner/g, 'shadow-sm'], // soften shadows for light mode
    [/shadow-md/g, 'shadow-sm border border-slate-200'], // card shadows
    [/border-stone-800/g, 'border-slate-200'], // Fallback if missed
];

walkSync('src', function(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    for (let [regex, replacement] of replacements) {
        content = content.replace(regex, replacement);
    }
    
    // Manual adjustments for specific bad contrast patterns after replacement
    content = content.replace(/text-white group-hover:text-blue-500/g, 'text-slate-800 group-hover:text-blue-600');
    content = content.replace(/bg-orange-500 text-slate-50/g, 'bg-orange-500 text-white');
    content = content.replace(/bg-orange-500 text-slate-800/g, 'bg-orange-500 text-white');
    content = content.replace(/text-slate-800 font-black text-xs/g, 'text-white font-black text-xs');
    
    // Fix text-white in navbar options
    content = content.replace(/text-white shadow-sm/g, 'text-white shadow-sm');
    
    // Let's fix text-stone-950 which got converted to text-slate-50
    content = content.replace(/text-slate-50/g, 'text-white');
    content = content.replace(/bg-slate-50 text-white/g, 'bg-orange-500 text-white'); // some weird overlaps
    content = content.replace(/text-slate-800 font-extrabold px-5/g, 'text-white font-extrabold px-5'); // button text
    
    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated: ' + filePath);
    }
});
