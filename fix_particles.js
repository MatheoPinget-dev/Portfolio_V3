const fs = require('fs');
const content = fs.readFileSync('src/components/ui/Particles.tsx', 'utf-8');

const lines = content.split('\n');

const useEfs = lines.slice(88, 119);
const before = lines.slice(0, 88);
const after = lines.slice(119, 268);
const final = lines.slice(268);

const newContent = [...before, ...after, ...useEfs, ...final].join('\n');
fs.writeFileSync('src/components/ui/Particles.tsx', newContent);
