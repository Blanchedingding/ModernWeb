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

    var video = document.getElementById('video-box');

    var socket = io();
    socket.on('danmaku show', function (msg) {
        console.log(msg);
        // $('#danmaku-box').append($('<li>').text(msg));
        var danmaku = JSON.parse(msg);
        console.log(video.currentTime)
        CM.send(danmaku);
    });

    $('#danmakuSubmmit').on('click', function(e){
        e.preventDefault();
        var content = $('#danmakuContent').val();
        if(content != "请输入弹幕……" && content.length > 0){
            var danmaku = {
                "mode": 1,
                "text": content,
                "stime":0,
                "size": 25,
                "color":0xff00ff,
                "dur":10000
            };
            var msg=JSON.stringify(danmaku);
            console.log(msg);
            socket.emit('danmaku send',msg);
            $('#danmakuContent').val("");
        } else{
            alert("弹幕内容不能为空哦！");
        }
    });
});


