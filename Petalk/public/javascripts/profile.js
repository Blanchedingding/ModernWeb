
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