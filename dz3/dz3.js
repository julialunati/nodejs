const fs = require('fs');
const readline = require('readline');

const ACCESS_LOG = './access.log';
const API_LOG_FIRST = './89.123.1.41_api.log';
const API_LOG_SECOND = './34.48.240.111_api.log';

const readStream = fs.createReadStream(ACCESS_LOG, 'utf8');
const writeStream1 = fs.createWriteStream(API_LOG_FIRST);
const writeStream2 = fs.createWriteStream(API_LOG_SECOND);

let strNumber = 0;

const readingLine = readline.createInterface({
    input: readStream,
    terminal: true
});

readingLine.on('line', (line) => {
    if (line.includes("89.123.1.41")) {
        writeStream1.write(line + '\n');
    }

    if (line.includes("34.48.240.111")) {
        writeStream2.write(line + '\n');
    }

    console.log(++strNumber);
})
