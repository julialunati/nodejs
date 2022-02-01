const socket = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);

    readStream.pipe(res);
});

const io = socket(server);

io.on('connection', (client) => {
    // console.log('connected: ', client);
    client.on('client-msg', (data) => {
        console.log(data);

        const serverData = {
            message: data.message.split('').reverse().join(''),
        } ;

        client.broadcast.emit('server-msg', serverData);
        client.emit('server-msg', serverData);
    });
});

server.listen(5555);