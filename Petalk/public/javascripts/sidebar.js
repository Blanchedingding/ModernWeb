/**
 * Created by lenovo on 2017/11/26.
 */
window.onload = function(){
    $.ajax({
        type: "get",
        url: "/getSideLists",
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        success: function (result) {
            console.log(result);
            var qs = result.questions;
            var us = result.users;
            $('.hotquestion-div').html("");
            $('.hotuser-div').html("");
            qs.forEach(function(q){
                $('.hotquestion-div').append("<li style='margin-bottom: 5px'><a href='/topic?id="+q._id+"'>"+q.quescontent+"</a></li>");
            })
            us.forEach(function(u){

                $('.hotuser-div').append(" <div class='userbrief'> <img src='"+u.usericon+"'> <a class='hotname'>"+u.username+"</a><br> <div class='introduction'>"+u.briefintro+"</div> </div>");
            })

        }
    });
};