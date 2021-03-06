/**
 * Created by dingding on 2017/11/18.
 */

function divEscapedContentElement(message) {
    return $('<div></div>').text(message);
}

function divSystemContentElement(message) {
    return $('<div></div>').html('<i>' + message + '</i>');
}

var socket = io.connect();
var plateGame = new Plate(socket);

var gameName = "";
var color = "";

var colorString = {
    "rgb(255, 0, 0)":"red",
    "rgb(0, 0, 255)":"blue"
};

$(document).ready(function() {

    socket.on('nameResult', function(result) {
        var message;
        if (result.success) {
            message = 'You are now known as ' + result.name + '.';
        } else {
            message = result.message;
        }
        $('#messages').append(divSystemContentElement(message));
    });


    socket.on('joinResult', function(result) {
        // alert(JSON.stringify(result));
        if(result.success){
            $('#game').text(result.game);
            gameName = result.game;
            color = result.color;
            $('#messages').append(divSystemContentElement("Join the game " + gameName +" successfully!"));
        } else {
            $('#messages').append(divSystemContentElement(result.message));
        }
    });

    socket.on('message',function(message){
        var newElement = $('<div></div>').text(message.text);
        $('#messages').append(newElement);
    })

    socket.on('turnPlate', function (message) {
        var row = message.row;
        var col = message.col;
        var color = message.color;
        // alert("receive trunPlate:" +JSON.stringify(message));
        $('#plate-table .'+ row + ' .' + col + ' div').css("background",colorString[color]);
    });

    socket.on('games', function(games) {
        $('#game-list').empty();
        for(var i = 0; i < games.length; i++) {
            var game = games[i];
            if (game != '') {
                $('#game-list').append(divEscapedContentElement(game));
            }
        }
        $('#game-list div').click(function() {
            plateGame.joinGame($(this).text());
        });
    });

    socket.on('gameOver', function(message) {
        alert(message.winner +" is the winner!");
        for(var i = 0; i < 5; i++){
            for(var j = 0; j < 5; j++){
                $('.i .j').unbind("click", function(e){
                    console.log(e);
                });
            }
        }
    });

    setInterval(function() {
        socket.emit('games');
    }, 2000);

});



function clickPlate(plate){
    if("" == color || "" == gameName){
        alert("Please join one game first!");
    } else {
        if(window.getComputedStyle(plate).backgroundColor != color){
            plate.style.background = colorString[color];
            plateGame.sendTurnPlate(gameName,plate.parentNode.parentNode.className, plate.parentNode.className);
            var hasWin = 1;

            $('.plate').each(function(index){
                if($(this).css("background-color") != color){
                    // console.log($(this).css("background-color"));
                    // console.log("color=" + color);
                    hasWin = 0;
                }
            });
            if(hasWin == 1){
                // alert("has Win!");
                $('#messages').append(divSystemContentElement("You are the winner!"));
                plateGame.winGame(gameName);
            }
        }
    }
}

function createNewGame(){
    var gameName = $('#new-game-input').val();
    if(null != gameName && "" != gameName && "Please input a new game name" != gameName){
        plateGame.joinGame(gameName);
    } else {
        alert("Please input the game name!");
    }

}