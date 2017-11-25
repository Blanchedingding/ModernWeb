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