#!/Users/artemshashkov/.nvm/versions/node/v14.18.3/bin/node
const fs = require('fs');
// const fs = require('fs/promises');
const path = require('path');
// const yargs = require('yargs');
// const readline = require('readline');
const inquirer = require('inquirer');
// console.log(process.argv);
// const [filePath] = process.argv.slice(2);

// const options = yargs
//     .usage('Usage: -p <path to the file>')
//     .option('p', {
//         alias: 'path',
//         describe: 'Path to the file',
//         type: 'string',
//         demandOption: true,
//     }).argv;
//
// console.log(options);
// fs.readFile(options.path, 'utf-8', (err, data) => {
//     if (err) console.log(err);
//     else console.log(data);
// });

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// rl.question('Введите путь до файла: ', (filePath) => {
//     console.log(filePath);
//     rl.question('Введите кодировку файла: ', (encode) => {
//         fs.readFile(filePath, encode, (err, data) => {
//             if (err) console.log(err);
//             else console.log(data);
//         });
//         rl.close();
//     });
// });

// const question = async (query) => new Promise(resolve => rl.question(query, resolve));
// (async () => {
//     const filePath = await question('Введите путь до файла: ');
//     const encode = await question('Введите кодировку файла: ');
//     // const fullPath = path.join(__dirname, filePath);
//     const fullPath = path.resolve(__dirname, filePath);
//     const data = await fs.readFile(fullPath, encode);
//
//     console.log(fullPath);
//     console.log(data);
//
//     rl.close();
// })();
const executionDir = process.cwd();
const isFile = (fileName) => fs.lstatSync(fileName).isFile();
const fileList = fs.readdirSync('./').filter(isFile);

inquirer.prompt([
    {
        name: 'fileName',
        type: 'list', // input, number, confirm, list, checkbox, password
        message: 'Выберите файл для чтения',
        choices: fileList,
    }
]).then(({ fileName }) => {
    // console.log(fileName);
    // const fullPath = path.join(__dirname, fileName);
    const fullPath = path.join(executionDir, fileName);
    const data = fs.readFileSync(fullPath, 'utf-8');

    console.log(data);
});
