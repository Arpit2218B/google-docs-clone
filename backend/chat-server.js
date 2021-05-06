const http = require('http');
const { Server } = require('socket.io')

const server = http.createServer();
const io = new Server(server, {
    cors: {
      origin: "*",
    }
});

let initialData = '';

io.on('connection', (socket) => {
    console.log(socket.handshake.query.username);
    console.log('New connection established');
    io.emit('newConnection', socket.nsp.sockets.size);
    socket.emit('initialData', initialData);
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
        io.emit('discon', socket.nsp.sockets.size);
    });

    socket.on('edit', (data) => {
        initialData = data;
        socket.broadcast.emit('textChanged', data);
    });
});

server.listen(3000, () => {
    console.log('Server listening on PORT 3000');
});