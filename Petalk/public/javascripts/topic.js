/**
 * Created by lenovo on 2017/11/23.
 */
//提交用户回答
$('#submitanswer').on('click', function(){
    var answer = $('#myanswercontent').val();
    if(answer && answer.length > 1){
        $('#myanswer').submit();
    }
});

var coms = $('.commentlabel');
for(var i = 0; i < coms.length; i++) {
    coms[i].onclick = function () {
        var comdiv =  $(this).parents('.answer').find('#comment');
        if(comdiv.css('display') == 'none'){
            comdiv.css('display', 'block');
            var data = new Object();
            data.ansid = $(this).parent('.afteranswer').find('.answerid').text();
            // console.log(data);
            $.ajax({
                type: "post",
                url: "/listCommentByAns",
                contentType: "application/json",
                dataType: "json",
                data:JSON.stringify(data),
                xhrFields: {
                    withCredentials: true
                },
                success: function (result) {
                    for(var j = 0; result && result.comments && j < result.comments.length; j++){
                        comdiv.find('#comment-div').append(appendCom(result.comments[j]))
                    }
                }
            });
        } else {
            comdiv.css('display', 'none');
        }
    }
}


function appendCom(com){
    var ret="<div class='commenttip'>";
    ret+="<a><img src='"+com.user.usericon+"'></a>";
    ret+="<a class='commentname'>"+com.user.username+"</a><br>" ;
    ret+="<div class='commetcontent'>"+com.comcontent+"</div>";
    ret+="<span class='commenttime'>"+com.comtime+"</span>";
    ret+="<hr></div>";
    return ret;
}


//提交用户评论
var subcoms = $('.submitcomment');
for(var k = 0; k < subcoms.length; k++){
    subcoms[k].onclick = function(){
        var content = $(this).parent('.mycomment').find('#mycommentcontent').val();
        var commentDiv = $(this).parents('#comment').find('#comment-div');
        if(content && content.length > 1){
            var data = new Object();
            data.comcontent = content;
            data.ansid = $(this).parent('.mycomment').find('#ansid').val();
            // console.log(data);
            $.ajax({
                type: "post",
                url: "/addComment",
                contentType: "application/json",
                dataType: "json",
                data:JSON.stringify(data),
                xhrFields: {
                    withCredentials: true
                },
                success: function (result) {
                    // console.log(result);
                    if(result){
                        console.log(result);
                        commentDiv.append(appendCom(result));
                    }
                }
            });
        }
    }
}










