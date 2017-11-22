/**
 * Created by dingding on 2017/11/18.
 */
var socketio = require('socket.io');
var io;
var colors = ["rgb(255, 0, 0)","rgb(0, 0, 255)"];
var namesUsed = [];
var players = {};
var games = {};
var currentGame = {};
var gameUsed = [];
var playerNumber = 1;//比实际人数多1

exports.listen = function(server) {
    io = socketio(server);
    // io.set('log level', 1);
    io.sockets.on('connection', function (socket) {
        playerNumber = assignPlayerName(socket);
        handleGameJoining(socket);
        handleTurnPlateBroadcasting(socket);
        handleClientDisconnection(socket);
        handleWinGame(socket);
        socket.on('games', function() {
            socket.emit('games', gameUsed);
        });
    });
};

function assignPlayerName(socket) {
    var name = 'Player' + playerNumber;
    players[socket.id]={};
    players[socket.id]['name'] = name;
    socket.emit('nameResult', {
        success: true,
        name: name
    });
    namesUsed.push(name);
    return playerNumber + 1;
}

function handleGameJoining(socket){
    socket.on('joinGame', function(message) {
        if(currentGame[socket.id]){
            socket.leave(currentGame[socket.id]);
        }
        joinGame(socket,message.gameName)
    });
}

function joinGame(socket,gameName) {
    //人数满了
    if(games[gameName] && games[gameName]['playerNum'] >= colors.length ){
        socket.emit('joinResult', {success:false, message:"The game cannot add more players!"});
        return ;
    }

    socket.join(gameName);//先加入这个局再说
    currentGame[socket.id] = gameName;

    //游戏名不存在，新开一局
    if(gameUsed.indexOf(gameName) < 0){
        gameUsed.push(gameName);
        games[gameName] = {};
        games[gameName]['playerNum'] = 1;
        games[gameName]['colors'] = [colors[0]];
        players[socket.id]['color'] = colors[0];
    } else{ //游戏名存在，人数加一，找一个没用过的颜色赋值
        games[gameName]['playerNum'] ++;
        for(var i = 0; i < colors.length; i++){
            var color = colors[i];
            if(games[gameName]['colors'].indexOf(color) >= 0){
                continue;
            } else {
                players[socket.id]['color'] = color;
                games[gameName]['colors'].push(color);
                break;
            }
        }
    }

    socket.emit('joinResult', {success:true, color:players[socket.id]['color'], game:gameName});
    socket.broadcast.to(gameName).emit('message', {
        text: players[socket.id]['name'] + ' has joined ' + gameName + '.'
    });

    var playerInGame = io.sockets.adapter.rooms[gameName];
    if (playerInGame.length > 1) {
        var playerInGameSummary = 'Users currently in ' + gameName + ': ';
        for (var id in playerInGame.sockets) {
            // var userSocketId = playerInGame[index].id;
            if (id != socket.id) {
                playerInGameSummary += " " + players[id]['name'];
            }
        }
        playerInGameSummary += '.';
        // console.log("playerInGameSummary: " + playerInGameSummary);
        socket.emit('message', {text: playerInGameSummary});
    }
}

function handleTurnPlateBroadcasting(socket) {
    socket.on('turnPlate', function (message) {
        socket.to(message.gameName).emit('turnPlate', {
            color: players[socket.id]['color'],
            row:message.row,
            col:message.col
        });
    });
}

function handleClientDisconnection(socket) {
    socket.on('disconnect', function() {
        if(currentGame[socket.id]){
            var colorIndex = games[currentGame[socket.id]]['colors'].indexOf(players[socket.id]['color']);
            delete games[currentGame[socket.id]]['colors'][colorIndex];
            games[currentGame[socket.id]]['playerNum'] --;
            if(games[currentGame[socket.id]]['playerNum'] == 0){
                delete games[currentGame[socket.id]];
                var gameNameIndex = gameUsed.indexOf(currentGame[socket.id]);
                delete gameUsed[gameNameIndex];
            }
        }
        var nameIndex = namesUsed.indexOf(players[socket.id]['name']);
        delete namesUsed[nameIndex];
        delete players[socket.id];
    });
}

function handleWinGame(socket){
    socket.on('winGame', function (message) {
        socket.to(message.gameName).emit('gameOver', {
            winner:players[socket.id]['name']
        });
    });
}



