const fs = require('fs');
let content = fs.readFileSync('src/components/AnimatedLogo.tsx', 'utf8');

content = content.replace(/strokeWidth="8"/g, 'strokeWidth="35"');
content = content.replace(/stroke="hsl\(155 100% 12%\)"/g, 'stroke="hsl(155 100% 25%)"');

const newVariants = `const pathVariants = {
    hidden: { 
      pathLength: 0,
      fillOpacity: 0,
      opacity: 0,
    },
    visible: (i: number) => ({
      pathLength: 1,
      fillOpacity: 1,
      opacity: 1,
      transition: {
        opacity: { duration: 0.1 },
        pathLength: { delay: i * 0.1, duration: 3.5, ease: "easeInOut" },
        fillOpacity: { delay: (i * 0.1) + 2.5, duration: 1.5, ease: "easeOut" }
      }
    })
  };`;

content = content.replace(/const pathVariants = \{[\s\S]*?\n  \};/, newVariants);

fs.writeFileSync('src/components/AnimatedLogo.tsx', content);
console.log('Updated AnimatedLogo for true motion graphics');
