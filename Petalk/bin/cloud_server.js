/**
 * Created by lenovo on 2017/11/27.
 */
var socketio = require('socket.io');
var io;
var rooms = {};


exports.listen = function(server) {
    io = socketio(server);
    io.sockets.on('connection', function (socket) {

        socket.on('disconnect', function(){
            console.log('user disconnected');
        });

        socket.on('danmaku send', function(msg){
            console.log('message: ' + msg);
            io.emit('danmaku show', msg);
        });
    });
};

