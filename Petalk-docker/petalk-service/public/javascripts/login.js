window.onload = function(){
	var errorType = $('#errorType').text();
	if(errorType == 'registerError'){
		$('#loginform').css('display','none');
        $('#registerform').css('display','block');
	}
};

/*登录表单*/
var login_name=document.getElementById("login_name");
login_name.onfocus=function(){
    if(this.value=="用户名"){
        this.value='';
        this.style.color="#000";
    }
};

login_name.onmouseover=function(){
    this.style.backgroundColor="#FFFFFF";;
};

login_name.onmouseout=function(){
    this.style.backgroundColor="#EBD3E8";
};

login_name.onblur=function(){
    if(this.value==""){
        this.value="用户名";
        this.style.color="#999";
    }
};

var login_pw=document.getElementById("login_pw");
login_pw.onfocus=function(){
    if(this.value=="密码"){
        this.value='';
        this.style.color="#000";
        this.type = 'password';
    }
};

login_pw.onmouseover=function(){
    this.style.backgroundColor="#FFFFFF";
};

login_pw.onmouseout=function(){
    this.style.backgroundColor="#EBD3E8";
};

login_pw.onblur=function(){
    if(this.value==""){
        this.value="密码";
        this.style.color="#999";
        this.type = 'text';
    }
};

/*注册表单*/
var username=document.getElementById("username");
username.onfocus=function(){
	if(this.value=="用户名"){
		this.value='';
		this.style.color="#000";
	}
};

username.onmouseover=function(){
	this.style.backgroundColor="#fff";;
};

username.onmouseout=function(){
    this.style.backgroundColor="#EBD3E8";
};
	
username.onblur=function(){
	if(this.value==""){
		this.value="用户名";
		this.style.color="#999";
	}
};

var email=document.getElementById("email");
email.onfocus=function(){
	if(this.value=="邮箱"){
		this.value='';
		this.style.color="#000";
	}
};

email.onmouseover=function(){
	this.style.backgroundColor="#FFFFFF";;
};

email.onmouseout=function(){
    this.style.backgroundColor="#EBD3E8";
};
	
email.onblur=function(){
	if(this.value==""){
		this.value="邮箱";
		this.style.color="#999";
	}
};

var password=document.getElementById("password");
password.onfocus=function(){
	if(this.value=="密码"){
		this.value='';
		this.style.color="#000";
		this.type="password";
	}
};

password.onmouseover=function(){
	this.style.backgroundColor="#fff";
};

password.onmouseout=function(){
    this.style.backgroundColor="#EBD3E8";
};

password.onblur=function(){
	if(this.value==""){
		this.value="密码";
		this.style.color="#999";
		this.type="text";
	}
};

var confirmpw=document.getElementById("confirmpw");
confirmpw.onfocus=function(){
	if(this.value=="确认密码"){
		this.value='';
		this.style.color="#000";
		this.type="password";
	}
};

confirmpw.onmouseover=function(){
	this.style.backgroundColor="#fff";
};

confirmpw.onmouseout=function(){
    this.style.backgroundColor="#EBD3E8";
};
	
confirmpw.onblur=function(){
	if(this.value==""){
		this.value="确认密码";
		this.style.color="#999";
		this.type="text";
	}
};

var tologin=document.getElementById("tologin");
var toregister=document.getElementById("toregister");

/*点击登录跳转至登录表单*/
tologin.onclick=function(){
	$('#loginform').css('display', 'block');
    $('#registerform').css('display', 'none');
    $('#errorType').text("");
    $('#login-message-div').html("");
	// username.style.display="none";
	// confirmpw.style.display="none";
	// registerbutton.style.display="none";
	// tologin.style.display="none";
	// error.style.display="none";
    // loginbutton.style.display="block";
    // toregister.style.display="block";

    // pw.value="密码";
	// pw.style.color="#999";
    // pw.type="text";
    // email.value="邮箱";
	// email.style.color="#999";
	// username.value="用户名";
	// username.style.color="#999";
};

/*点击注册跳转至注册表单*/
toregister.onclick=function(){
    $('#loginform').css('display', 'none');
    $('#registerform').css('display', 'block');
    $('#errorType').text("");
    $('#login-message-div').html("");
    // tologin.style.display="block";
    // username.style.display="block";
    // confirmpw.style.display="block";
    // registerbutton.style.display="block";
    // loginbutton.style.display="none";
    // toregister.style.display="none";
    // error.style.display="none";
    // pw.value="密码";
    // pw.style.color="#999";
    // pw.type="text";
    // email.value="邮箱";
    // email.style.color="#999";
    // username.value="用户名";
    // username.style.color="#999";
    // confirmpw.value="确认密码";
    // confirmpw.style.color="#999";
    // confirmpw.type="text";
};



