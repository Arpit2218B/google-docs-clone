const http = require('http');
const fs = require('fs');

const server = http.createServer();

server.on('request', (req, res) => {
    const readStream = fs.createReadStream('./index.html');
    readStream.pipe(res);
});

server.listen(8080, () => {
    console.log('Front-end server running');
});