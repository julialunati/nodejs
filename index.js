//  console.log(process.argv);
//const [ name ] = process.argv.slice(2);
const arg = process.argv.slice(2);
console.log(arg);
console.log(`hello, ${arg[1]}`);

const colors = require('colors');
console.log(colors.america(`hello, ${arg[1]}`));