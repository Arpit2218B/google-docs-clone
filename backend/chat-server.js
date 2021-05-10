const http = require('http');
const { Server } = require('socket.io')

const server = http.createServer();
const io = new Server(server, {
    cors: {
      origin: "*",
    }
});

let initialData = '';
let usersList = {};

io.on('connection', (socket) => {
    usersList[socket.id] = socket.handshake.query.username;
    console.log('New connection established');
    io.emit('newConnection', usersList);
    socket.emit('initialData', initialData);
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
        delete usersList[socket.id]
        io.emit('discon', usersList);
    });

    socket.on('edit', (data) => {
        initialData = data;
        socket.broadcast.emit('textChanged', data);
    });
});

server.listen(3000, () => {
    console.log('Server listening on PORT 3000');
});