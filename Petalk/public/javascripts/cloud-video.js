/**
 * Created by dingding on 2017/11/27.
 */
window.addEventListener('load', function () {

    // 在窗体载入完毕后再绑定
    var CM = new CommentManager($('#danmaku-box'));
    CM.init();
    // 先启用弹幕播放（之后可以停止）
    CM.start();
    // 开放 CM 对象到全局这样就可以在 console 终端里操控
    window.CM = CM;

    var socket = io();
    socket.emit('watchVideo',{username:$('#username').val(), videoid:$('#videoid').val()});

    var video = document.getElementById('video-box');
    socket.on('danmaku show', function (msg) {
        // console.log(msg);
        var data = JSON.parse(msg);
        $('#message-box').append($('<li>').text("[" + data.username + "]: " + data.danmaku.text));
        $('#message-box').scrollTop($('#message-box').prop('scrollHeight'));
        var danmaku = data.danmaku;
        CM.send(danmaku);
    });

    socket.on('joinResult', function(msg){
        $('#roomnum').text('有' + msg.usernum +'人正在观看');
    });

    socket.on('leaveResult', function(msg){
        $('#roomnum').text('有' + msg.usernum +'人正在观看');
    });

    $('#danmakuSubmmit').on('click', function(e){
        e.preventDefault();
        var content = $('#danmakuContent').val();
        if(content != "请输入弹幕……" && content.length > 0){
            var danmaku = {
                "mode": parseInt($('#mode-select').val()),
                "text": content,
                "stime":video.currentTime,
                "size": parseInt($('#size-select').val()),
                "color":$('#color-select').val(),
                "dur":10000
            };
            CM.send(danmaku);
            socket.emit('danmaku send',JSON.stringify(danmaku));
            $('#message-box').append($('<li class="myli">').text("[我]: " +  content));
            $('#message-box').scrollTop($('#message-box').prop('scrollHeight'));
            $('#danmakuContent').val("");
        } else{
            alert("弹幕内容不能为空哦！");
        }
    });
});


