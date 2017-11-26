/**
 * Created by lenovo on 2017/11/26.
 */
var searchinput=document.getElementById("searchinput");
searchinput.onfocus=function(){
    if(this.value=="搜索问题或用户"){
        this.value='';
        this.style.color="#000";
    }
};

searchinput.onblur=function(){
    this.value='搜索问题或用户';
    this.style.color="#999";
};

function saveque(){
    var title = $('#questiontitle').val();
    var content = $('#questiondesc').val();
    if(title && title.length > 1){
        $('#submitquestionform').submit();
    } else{
        alert("问题标题不能为空哦！");
    }
}