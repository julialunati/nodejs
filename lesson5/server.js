const http = require('http');

const server = http.createServer((req, res) => {

    res.end('Hello from Node.js');

});

server.listen(5555);