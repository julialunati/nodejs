const fs = require('fs');
// const fsPromises = require('fs/promises');
const { Transform } = require('stream');
const ACCESS_LOG = './access.log';

// const data = fs.readFileSync(ACCESS_LOG, {encoding: 'utf-8'});
// const data = fs.readFileSync(ACCESS_LOG, 'utf-8');
// const data = fs.readFileSync(ACCESS_LOG);

// console.log(data);
// console.log(data.toString());

// fs.readFile(ACCESS_LOG, 'utf-8', (err, data) => {
//     if (err) console.log(err);
//     else console.log(data);
// });

// fsPromises.readFile(ACCESS_LOG, 'utf-8').then((data) => {
//     console.log(data);
// }).catch((err) => {
//     console.log(err);
// });

const requests = [
    `127.0.0.1 - - [25/May/2021:00:07:17 +0000] "GET /foo HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
    `127.0.0.1 - - [25/May/2021:00:07:24 +0000] "POST /baz HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
];

// fs.writeFile(
//     ACCESS_LOG,
//     requests[0] + '\n',
//     {
//         encoding: 'utf-8',
//         flag: 'a',
//     },
//     console.log
// );

// fs.appendFile(
//     ACCESS_LOG,
//     requests[0] + '\n',
//     {
//         encoding: 'utf-8',
//     },
//     console.log
// );

// fs.ReadStream() // class
// fs.createReadStream();

// const readStream = fs.createReadStream(ACCESS_LOG, {
//     // flags: '',
//     // autoClose
//     // start
//     // end
//     // highWaterMark: 64,
//     // fs
//     // fd
// });
// readStream.pipe(writeStream)
//
// readStream.on('data', (chunk) => {
//     console.log('chunk:', chunk);
// });

// const writeStream = fs.createWriteStream(ACCESS_LOG, {
//     encoding: 'utf-8',
//     flags: 'a',
// });
//
// requests.forEach((logString) => {
//     writeStream.write(`${logString}\n`);
// });
//
// writeStream.end(() => {
//     console.log('end');
// });

const payedAccount = true;
const readStream = fs.createReadStream(ACCESS_LOG);
const tStream = new Transform({
    transform(chunk, encoding, callback) {
        if (!payedAccount) {
            const transformedData = chunk
                .toString()
                .replace(/\d+\.\d+\.\d+\.\d+/g, '[IP был скрыт]');
            this.push(transformedData);
        } else {
            this.push(chunk);
        }
        callback();
    }
});

readStream.pipe(tStream).pipe(process.stdout);
