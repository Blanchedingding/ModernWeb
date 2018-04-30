/**
 * Created by dingding on 2017/11/27.
 */
var socketio = require('socket.io');
var io;
var roomIds = [];//目前有人观看的视频id列表
var currentRooms = {};//每个视频对应的观看用户列表
var users = {};//每个socket.id对应的真实用户名map和正在观看的视频id


exports.listen = function(server) {
    io = socketio(server);
    io.sockets.on('connection', function (socket) {
        handleWatchVideo(socket);
        handleClientDisconnection(socket);
        handleDanmaku(socket);

    });
};

function handleDanmaku(socket){
    socket.on('danmaku send', function(msg){
        // io.sockets.in(users[socket.id].room).emit('danmaku show', msg);
        if(users[socket.id]){
            var data = new Object();
            data.danmaku = JSON.parse(msg);
            data.username = users[socket.id].username;
            // console.log(data);
            socket.broadcast.to(users[socket.id].room).emit('danmaku show', JSON.stringify(data));
        }
    });
}

function handleClientDisconnection(socket) {
    socket.on('disconnect', function() {
        if(users[socket.id]){
            var roomid = users[socket.id].room;
            var userIndex = currentRooms[roomid].users.indexOf(socket.io);
            delete currentRooms[roomid].users[userIndex];
            currentRooms[roomid].usernum --;
            if(currentRooms[roomid].usernum > 0){
                io.sockets.in(roomid).emit('leaveResult', {
                    usernum: currentRooms[roomid].usernum
                });
            } else {
                var roomidIndex = roomIds[roomid];
                delete roomIds[roomidIndex];
            }
            delete users[socket.id];
        }
    });
}


function handleWatchVideo(socket){
    socket.on('watchVideo', function(message){
        socket.join(message.videoid);//先加入这个局再说
        //存储一个socket连接对应的用户名和观看的视频id
        users[socket.id] ={};
        users[socket.id].username = message.username;
        users[socket.id].room = message.videoid;
        if(roomIds.indexOf(message.videoid) < 0){//第一个看这个视频的用户
            roomIds.push(message.videoid);
            currentRooms[message.videoid] = {};
            currentRooms[message.videoid].usernum = 1;
            currentRooms[message.videoid].users = [];
            currentRooms[message.videoid].users.push(socket.id);
        } else{ //这个视频已经有人在看了
            currentRooms[message.videoid].usernum ++;
            currentRooms[message.videoid].users.push(socket.id);
        }
        // socket.emit('joinResult', {usernum: currentUsers[message.videoid].usernum});
        io.sockets.in(message.videoid).emit('joinResult', {
            usernum: currentRooms[message.videoid].usernum
        });
    })
}

