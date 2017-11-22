/**
 * Created by dingding on 2017/11/18.
 */
var Plate = function(socket) {
    this.socket = socket;
};

Plate.prototype.sendTurnPlate = function(gameName, row, col) {
    var message = {
        gameName: gameName,
        row: row,
        col:col
    };
    this.socket.emit('turnPlate', message);
};

Plate.prototype.joinGame = function(gameName) {
    this.socket.emit('joinGame', {
        gameName:gameName
    });
};

Plate.prototype.winGame = function(gameName) {
    this.socket.emit('winGame', {
        gameName:gameName
    });
};