/**
 * Created by lenovo on 2017/11/23.
 */
window.onload = function(){

    //设置文件上传的按钮
    $('#pict').on('click', function() {
        $('#file').trigger('click');
    });
};


/*点击评论展开*/
var splay=0;
function displaycomment(ansId){
    var comment=document.getElementById("comment"+ansId);
    if(comment!=null){
        if(splay==0){
            comment.style.display="block";
            splay=1;
            var xmlhttp;
            if (window.XMLHttpRequest){
                xmlhttp=new XMLHttpRequest();
            } else {
                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }

            xmlhttp.open("POST","getComment",true);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send("ansId="+ansId);
            //alert("ansid="+ansId);
            xmlhttp.onreadystatechange=function(){
                if(xmlhttp.readyState==4 && xmlhttp.status==200){
                    var coms=xmlhttp.responseText;
                    if(coms=="nocom"){

                    }
                    else {
                        var comlist=JSON.parse(coms);
                        listCom(comlist,ansId);
                    }
                } else if(xmlhttp.readyState==4 && xmlhttp.status!=200){
                    alert('连接出错，请检查网络！');
                }
            }
        }
        else{
            comment.style.display="none";
            splay=0;
        }
    }
}

//一个个列出评论内容
function listCom(comlist,ansId){
    var displaycomment=document.getElementById("displaycomment"+ansId);
    displaycomment.innerHTML="";
    var id,userId,usericon,username,comcontent,year,month,day,hour,minute,second;
    for (var i=0;i<comlist.length;i++){
        var o=comlist[i];
        id=o.id;
        userId=o.userId;
        usericon=o.usericon;
        username=o.username;
        comcontent=o.comcontent;
        year=o.year;
        month=o.month;
        day=o.day;
        hour=o.hour;
        minute=o.minute;
        second=o.second;
        appendCom(userId,usericon,username,comcontent,year,month,day,hour,minute,second,ansId);
    }
}

//添加到jsp上
function appendCom(userId,usericon,username,comcontent,year,month,day,hour,minute,second,ansId){
    var ret="<div class='commenttip'>";
    ret+="<a><img src='upload/icon/"+usericon+"'></a>";
    ret+="<a class='commentname'>"+username+"</a><br>" ;
    ret+="<div class='commetcontent'>"+comcontent+"</div>";
    ret+="<a class='commenttime'>"+year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second+"</a>";
    ret+="<hr></div>";
    var displaycomment=document.getElementById("displaycomment"+ansId);
    displaycomment.innerHTML+=ret;
    return ;
}

//提交用户评论
function addComment(ansId,userId){
    var mycomment=document.getElementById("mycommentcontent"+ansId);
    var content=mycomment.value;
    var c=content.replace(/(^\s*)|(\s*$)/g,"");
    if(content.length>0 && c!=""){
        var xmlhttp;
        if (window.XMLHttpRequest){
            xmlhttp=new XMLHttpRequest();
        } else {
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.open("POST","addComment",true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send("comcontent="+content+"&ansId="+ansId+"&userId="+userId);
        xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState==4 && xmlhttp.status==200){
                var coms=xmlhttp.responseText;

                var o=JSON.parse(coms);
                var userId,usericon,username,comcontent,year,month,day,hour,minute,second;
                userId=o.userId;
                usericon=o.usericon;
                username=o.username;
                comcontent=o.comcontent;
                year=o.year;
                month=o.month;
                day=o.day;
                hour=o.hour;
                minute=o.minute;
                second=o.second;
                var comnum=document.getElementById("comnum"+ansId).innerHTML;
                console.log("comnum++="+comnum++);
                // comnum++;
                document.getElementById("comnum"+ansId).innerHTML=comnum++;
                mycomment.value="";
                appendCom(userId,usericon,username,comcontent,year,month,day,hour,minute,second,ansId);

            } else if(xmlhttp.readyState==4 && xmlhttp.status!=200){
                alert('连接出错，请检查网络！');
            }
        }
    }
}


var answerform=document.getElementById("myanswer");
//上传图片
function uploadimg(file){
    var uri="";
    var xmlhttp;
    if (window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    } else {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    var formdata = new FormData();
    formdata.append("file", file);
    xmlhttp.open("POST","saveImg",true);
    xmlhttp.send(formdata);
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4 && xmlhttp.status==200){
            var imguri=xmlhttp.responseText;
            // console.log("imguri="+imguri);
            // var text = document.getElementById("myanswercontent");
            // var content = text.value;
            if(imguri!=""){
                var img=document.getElementById("imguri");
                img.value=imguri;
                answerform.submit();
            }
            text.value = "";
            fileEle.value="";
        } else if(xmlhttp.readyState==4 && xmlhttp.status!=200){
            alert('连接出错，请检查网络！');
        }
    }
}

var fileEle = document.getElementById('file');
//提交用户答案
document.getElementById("submitanswer").onclick = function(){

    var text = document.getElementById("myanswercontent");
    var content = text.value;
    var file=fileEle.files[0];
    var isimg=0;
    var imguri="";
    if (file ){
        if(file.type.substr(0, 5) != "image"){
            alert("图片上传类型不对，不给你发言！！");
            fileEle.value="";
            return ;
        }
        isimg=1;
        uploadimg(file);
    }

    if(isimg==0){ //如果没图片
        var c=content.replace(/(^\s*)|(\s*$)/g,"");
        if(content.length > 0  && c!=""){
            answerform.submit();
        }
        text.value = "";
    }
    fileEle.value="";
};

var page=document.getElementById("page");
var more=document.getElementById("more");
//获得更多答案
function moreanswer(queid){
    var n=page.value;

    var xmlhttp;
    if (window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    } else {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("POST","getMoreAnswer",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("queid="+queid+"&page="+n);
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4 && xmlhttp.status==200){
            var aa=xmlhttp.responseText;
            if(aa=="nomore"){
                more.value="没有更多回答";
            }
            else {
                var anlist=JSON.parse(aa);
                listAns(anlist);
            }
        } else if(xmlhttp.readyState==4 && xmlhttp.status!=200){
            alert('连接出错，请检查网络！');
        }
    }
    n++;
    page.value=n;
}

//获取三条答案一个个列出
function listAns(anlist,ansid){
    var id,userId,usericon,username,comcontent,year,month,day,hour,minute,second;
    for (var i=0;i<anlist.length;i++){
        var o=anlist[i];
        id=o.id;
        userId=o.userId;
        usericon=o.usericon;
        username=o.username;
        briefintro=o.briefintro;
        queId=o.queId;
        anscontent=o.anscontent;
        comnum=o.comnum;
        imgname=o.imgname;
        year=o.year;
        month=o.month;
        day=o.day;
        hour=o.hour;
        minute=o.minute;
        second=o.second;
        appendanswer(id,userId,usericon,username,briefintro,queId,anscontent,comnum,imgname,year,month,day,hour,minute,second);
    }
}

var displayanswer=document.getElementById("displayanswer");
//添加答案到jsp
function appendanswer(id,userId,usericon,username,briefintro,queId,anscontent,comnum,imgname,year,month,day,hour,minute,second){
    var ret="<div class='answer'><a><img src='upload/icon/"+usericon+"'></a>";
    ret+="<div class='answerperson'><a class='answername' >"+username+"</a>";
    ret+="<a class='answerintroduction'> &nbsp&nbsp&nbsp"+briefintro+"</a> </div>";
    ret+="<div class='answercontent'>"+anscontent;
    if(imgname!=""){
        ret+="<br><img src='upload/pic/"+imgname+"'>";
    }

    ret+="</div><div class='afteranswer'><div class='candt'><div id='commentlabel' onclick='displaycomment("+id+")' >评论(<a id='comnum"+id+"'>"+comnum+"</a>)</div>";
    ret+="<a class='time'>"+year+"-"+month+"-"+day+"&nbsp"+hour+":"+minute+":"+second+"</a></div>";
    ret+="<div id='comment"+id+"' class='comment "+id+"'><div id='displaycomment"+id+"'></div>";
    ret+="<div class='mycomment'><input type='text' id='mycommentcontent"+id+"' class='mycommentcontent "+id+"'>";
    ret+="<input type='button' class='mybutton' id='submitcomment' onclick='addComment("+id+","+userId+")' value='发表评论'>";
    ret+="</div> </div><!--comment end--></div><!--afteranswer end--><hr class='comhr'></div>";

    displayanswer.innerHTML+=ret;
    return ;
}



