const express = require('express');
const socket = require('socket.io');

//App setup
const app = express ();
//static files
app.use(express.static(__dirname + '/public'));
const server = app.listen(4000, function(){console.log('listening on port 4000');

});



//socket setup
const io = socket(server);

io.on('connection', function (socket) {
    // console.log('made socket connection, id: ' + socket.id);
    socket.on('chat', function (data) {
        io.sockets.emit('chat', data);
    });
    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    })
    
});