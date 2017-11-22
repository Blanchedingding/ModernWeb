window.onload = function(){
	var loginerror=document.getElementById("loginerror");
	if(loginerror!=null){
			//alert("chucuo");
			username.style.display="none";
			confirmpw.style.display="none";
			registerbutton.style.display="none";
			tologin.style.display="none";
			error.style.display="none";
		    loginbutton.style.display="block";
		    toregister.style.display="block";
		    if(reg!=null){
				   reg.style.display="none";
			   } 
		    pw.value="密码";
			pw.style.color="#999";
		    pw.type="text";
		    email.value="邮箱";
			email.style.color="#999";
		
	}
}

window.onresize = function(){
	
}

/*登录表单*/
var username=document.getElementById("username");
username.onfocus=function(){
	if(this.value=="用户名"){
		this.value='';
		this.style.color="#000";
	}
}

username.onmouseover=function(){
	this.style.backgroundColor="#fff";;
}

username.onmouseout=function(){
    this.style.backgroundColor="#EBD3E8";
}
	
username.onblur=function(){
	if(this.value==""){
		this.value="用户名";
		this.style.color="#999";
	}
}

var email=document.getElementById("email");
email.onfocus=function(){
	if(this.value=="邮箱"){
		this.value='';
		this.style.color="#000";
	}
}

email.onmouseover=function(){
	this.style.backgroundColor="#FFFFFF";;
}

email.onmouseout=function(){
    this.style.backgroundColor="#EBD3E8";
}
	
email.onblur=function(){
	if(this.value==""){
		this.value="邮箱";
		this.style.color="#999";
	}
}

var pw=document.getElementById("pw");
pw.onfocus=function(){
	if(this.value=="密码"){
		this.value='';
		this.style.color="#000";
		this.type="password";
	}
}

pw.onmouseover=function(){
	this.style.backgroundColor="#fff";
}

pw.onmouseout=function(){
    this.style.backgroundColor="#EBD3E8";
}
	
pw.onblur=function(){
	if(this.value==""){
		this.value="密码";
		this.style.color="#999";
		this.type="text";
	}
}

var confirmpw=document.getElementById("confirmpw");
confirmpw.onfocus=function(){
	if(this.value=="确认密码"){
		this.value='';
		this.style.color="#000";
		this.type="password";
	}
}

confirmpw.onmouseover=function(){
	this.style.backgroundColor="#fff";
}

confirmpw.onmouseout=function(){
    this.style.backgroundColor="#EBD3E8";
}
	
confirmpw.onblur=function(){
	if(this.value==""){
		this.value="确认密码";
		this.style.color="#999";
		this.type="text";
	}
}

var tologin=document.getElementById("tologin");
var loginbutton=document.getElementById("loginbutton");
var registerbutton=document.getElementById("registerbutton");
var toregister=document.getElementById("toregister");
var error=document.getElementById("error");
var lorr=document.getElementById("lorr");
var submitform=document.getElementById("submitform");

/*点击立即登录验证信息，跳转界面*/
/*点击立即注册验证信息，跳转至登录表单*/
var reg0 = /^[0-9]*$/;
var reg1 = /^.{2,16}$/;
var reg2 =/^[A-Za-z0-9]+@([_a-z0-9]+\.)+com|cn/;
var reg3 =/[a-zA-Z0-9]{6,16}$/;
var reg=document.getElementById("reg");
var log=document.getElementById("log");
function checkReg(){
	if(username.style.display=="none"){
		if(!reg2.test(email.value) || email.value=="" || email.value==null || email.value=="邮箱"){
		   error.innerHTML = "<p>邮箱格式不正确！</p>";
		   if(reg!=null){
			   reg.style.display="none";
		   } 
		   if(log!=null){
			   log.style.display="none";
		   } 
		   error.style.display="block";
		   return false;
	    }
	    else if(!reg3.test(pw.value) || reg0.test(pw.value) || pw.value=="" || pw.value==null || pw.value=="密码"){
           error.innerHTML = "<p>密码格式不正确！</p>";
           if(reg!=null){
			   reg.style.display="none";
		   } 
           if(log!=null){
			   log.style.display="none";
		   } 
           error.style.display="block";
           return false;
	    }
        else {
           lorr.value="login";
    	   submitform.submit();
       }
	}
	else {
		if(!reg1.test(username.value) || username.value=="" || username.value==null || username.value=="用户名"){
			error.innerHTML = "<p>用户名格式不正确！</p>";
			 if(reg!=null){
				   reg.style.display="none";
			   } 
			 if(log!=null){
				   log.style.display="none";
			   } 
			error.style.display="block";
			return false;
		} else if(! reg2.test(email.value) || email.value=="" || email.value==null || email.value=="邮箱"){
			error.innerHTML = "<p>邮箱格式不正确！</p>";
			 if(reg!=null){
				   reg.style.display="none";
			   } 
			 if(log!=null){
				   log.style.display="none";
			   } 
			error.style.display="block";
	        return false;
		} else if(!reg3.test(pw.value) || reg0.test(pw.value) || pw.value=="" || pw.value==null || pw.value=="密码"){
			error.innerHTML = "<p>密码格式不正确！</p>";
			 if(reg!=null){
				   reg.style.display="none";
			   } 
			 if(log!=null){
				   log.style.display="none";
			   } 
			error.style.display="block";
	        return false;
		} else if(pw.value!=confirmpw.value){
	           error.innerHTML = "<p>确认密码错误！</p>";
	           if(reg!=null){
				   reg.style.display="none";
			   } 
	           if(log!=null){
				   log.style.display="none";
			   } 
	           error.style.display="block";
	           return false;
	    } else{
			/*username.style.display="none";
			confirmpw.style.display="none";
		   registerbutton.style.display="none";
		   tologin.style.display="none";
	       loginbutton.style.display="block";
	       toregister.style.display="block";
	       error.innerHTML = "";
	       pw.value="密码";
		   pw.style.color="#999";
		   pw.type="text";*/
	    	lorr.value="register";
	    	submitform.submit();
		}	
	}
	
 return false;
    
}


/*点击登录跳转至登录表单*/
tologin.onclick=function(){
	username.style.display="none";
	confirmpw.style.display="none";
	registerbutton.style.display="none";
	tologin.style.display="none";
	error.style.display="none";
    loginbutton.style.display="block";
    toregister.style.display="block";
    if(reg!=null){
		   reg.style.display="none";
	   } 
    if(log!=null){
		   log.style.display="none";
	   } 
    pw.value="密码";
	pw.style.color="#999";
    pw.type="text";
    email.value="邮箱";
	email.style.color="#999";
	//username.value="用户名";
	//username.style.color="#999";
}
/*点击注册跳转至注册表单*/
toregister.onclick=function(){
	tologin.style.display="block";
	username.style.display="block";
	confirmpw.style.display="block";
	registerbutton.style.display="block";
    loginbutton.style.display="none";
    toregister.style.display="none";
    error.style.display="none";
    if(reg!=null){
		   reg.style.display="none";
	   } 
    if(log!=null){
		   log.style.display="none";
	   } 
    pw.value="密码";
    pw.style.color="#999";
    pw.type="text";
	email.value="邮箱";
	email.style.color="#999";
	username.value="用户名";
	username.style.color="#999";
	confirmpw.value="确认密码";
    confirmpw.style.color="#999";
    confirmpw.type="text";
}

/*热点话题*/
/*var num2= document.getElementById("num2");
num2.onmouseover=function(){
	num2.src="img/dog/02.jpg";
}

num2.onmouseout=function(){
	num2.src="img/number/2.png";
}

function show(id){
	var o = document.getElementById(id);
	o.style.display = "block";	
} 

function closeed(id){
	 var o = document.getElementById(id);
	if(o.style.display == "block"){
		   o.style.display = "none";
	}  
	num2.src="img/number/2.png";
}*/

