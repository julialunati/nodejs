const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const cluster = require('cluster');
const os = require('os');

// const fullPath = path.join(__dirname, './index.html');
// const readStream = fs.createReadStream(fullPath);
//
// const server = http.createServer((req, res) => {
//     // res.write('Hello from Node.js');
//     // console.log('url:', req.url);
//     // console.log('method:', req.method);
//     // console.log('headers:', req.headers);
//     // res.end('Hello from Node.js');
//     // res.setHeader('my-header', 'testing-headers');
//     // res.setHeader('my-header2', 'testing-headers2');
//     // res.writeHead(200, 'OK', {
//     //     'my-header': 'testing-headers',
//     // });
//     // res.end();
//
//     // url
//     // if (req.url === '/user') {
//     //     res.end('User found');
//     // } else {
//     //     res.writeHead(404, 'User not found', {
//     //         'my-header': 'testing-headers',
//     //     });
//     //     res.end('User not found');
//     // }
//
//     // method
//     // if (req.method === 'GET') {
//     //     res.end('Method Allowed');
//     // } else {
//     //     res.writeHead(405, 'Method not Allowed', {
//     //         'my-header': 'testing-headers',
//     //     });
//     //     res.end('Method not Allowed');
//     // }
//
//     // const { query }= url.parse(req.url, true);
//     // // console.log(query);
//     // res.end(JSON.stringify(query));
//
//     // if (req.method === 'POST') {
//     //     let data = '';
//     //     req.on('data', (chunk => data += chunk));
//     //     req.on('end', () => {
//     //         const parsedData = JSON.parse(data);
//     //         console.log(data);
//     //         console.log(parsedData);
//     //
//     //         res.writeHead(200, 'OK', {
//     //             'Content-Type': 'application/json'
//     //         });
//     //         res.end(data);
//     //     });
//     // } else {
//     //     res.end();
//     // }
//
//     res.writeHead(200, {
//         'Content-Type': 'text/html',
//     });
//     readStream.pipe(res);
// });
//
// server.listen(5555);

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running...`);
    for (let i = 0; i < os.cpus().length * 2; i++) {
        console.log(`Forking process number ${i}`);
        cluster.fork();
    }
} else {
    console.log(`Worker ${process.pid} is running...`);
    const fullPath = path.join(__dirname, './index.html');
    const readStream = fs.createReadStream(fullPath);

    const server = http.createServer((req, res) => {
        setInterval(() => {
            console.log(`Worker ${process.pid} handling request`);
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            readStream.pipe(res);
        }, 5000);
    });

    server.listen(5555);
}
