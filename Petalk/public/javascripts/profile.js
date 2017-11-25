


/*选项卡*/
$(function partA() {
    var $div_li=$("div.profileleft>ul li");
    $div_li.click(function(){
        $(this).addClass("check active")
               .siblings().removeClass("check active");

        var index=$div_li.index(this);
        $("div.profilecontent div")
               .eq(index).show()
               .siblings().hide();
    });
});

/*点击用户头像展开简介*/
var myicon=document.getElementById("myicon");
var warning=document.getElementById("warning");
var aboutme=document.getElementById("aboutme");
myicon.onmouseover=function(){
  if(aboutme.style.display!="block"){
  	 warning.style.visibility="visible";
  }
};

myicon.onmouseout=function(){
   warning.style.visibility="hidden";
};

myicon.onclick=function(){
	aboutme.style.display="block";
};

var closeicon=document.getElementById("closeicon");
closeicon.onclick=function(){
	if(aboutme.style.display != "none"){
		   aboutme.style.display = "none";
	}  
};

/*上传头像*/

$('#change-icon').on('click', function(){
    $('#photo').click();
});

$('#photo').on('change', function(){
    var fileValue = $('#photo').val();
    if(fileValue.length > 1 && fileValue != ''){
        var lodt = fileValue.lastIndexOf(".");
        var type = fileValue.substring(lodt+1);
        if(type != "png" && type != "gif" && type != "jpg"){
            alert("上传图片必须为jpg或gif或png格式！");
            return false;
        }else{
            $('#photo-form').submit();
            $("#photo").empty();
            return true;
        }
    }else{
        $("#photo").empty();
        return false;
    }
});

/*修改简介*/
$('#change-intro').on('click', function(){
    $('#intro-text').css('display', 'block');

});

$('#intro-text').on('focus', function(){
    $('#intro-text').css('background-color', 'white');
});

$('#intro-text').on('blur', function(){
    $('#intro-text').css('background-color', '#EBD3E8');
});