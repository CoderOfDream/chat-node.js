const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));



app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

connections = [];

io.sockets.on('connection', function (socket) {
    console.log('connected');
    connections.push(socket);
    socket.on('disconnect', function () {
        connections.splice(connections.indexOf(socket), 1);
        console.log('disconnected');
    });

    socket.on('send mess', function (data) {
        // if(!data.name) {
            // io.sockets.emit('add mess', {msg: data.msg });
        // } else {
            io.sockets.emit('add mess', { name: data.name, msg: data.msg });
            io.sockets.emit('saveMessages');
        // }
        
    })

    socket.on('online status', function() {
        io.sockets.emit('add online status', {val: connections.length});
    })
});

// server.listen(3000, '25.69.184.249');
server.listen(3000);
console.log('server was started on port 3000');