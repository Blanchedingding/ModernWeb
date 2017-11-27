/**
 * Created by dingding on 2017/11/27.
 */
/*上传视频*/
$('#upload-video').on('click', function(){
    $('#video').click();
});

$('#video').on('change', function(){
    var fileValue = $('#video').val();
    if(fileValue && fileValue.length > 1 ){
        var lodt = fileValue.lastIndexOf(".");
        var type = fileValue.substring(lodt+1);
        // alert(type);
        if(type != "mp4" && type != "flv" ){
            alert("上传视频必须为mp4或flv格式！");
            return false;
        }else{
            $('#video-form').submit();
            $("#video").empty();
            return true;
        }
    }else{
        $("#video").empty();
        return false;
    }
});
//--获取视频缩略图--
function vload(obj) {
    $(obj).removeAttr("poster");
    var vimg = $("<img/>",{width:"100%"})[0];
    captureImage(obj, vimg);
    $(obj).after(vimg);
    obj.remove();
    minigrid('#photo-box', '.photo');
};
var scale = 0.8; //缩放
function captureImage(video, output) { //截图
    try {
        var videocanvas = $("<canvas/>")[0];
        videocanvas.width = video.videoWidth * scale;
        videocanvas.height = video.videoHeight * scale;
        videocanvas.getContext('2d').drawImage(video, 0, 0, videocanvas.width, videocanvas.height);
        output.src = videocanvas.toDataURL("image/png");
        delete videocanvas;
    } catch(e) {
        output.src = "/static/img/status.gif"; //--status.gif为加载动画
    }
};


/*瀑布流*/
minigrid('#photo-box', '.photo', 20, null,
    function() {
        //更新后回调
    });//瀑布流插件初始化

window.addEventListener('resize', function() {//窗口大小改变自动排版
    minigrid('#photo-box', '.photo');
});



