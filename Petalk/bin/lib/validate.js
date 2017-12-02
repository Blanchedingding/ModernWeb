/**
 * Created by lenovo on 2017/11/25.
 */
module.exports.checkName = function(field){
    var regName = /^.{2,16}$/;
    return function(req, res, next){
        if (regName.test(req.body[field])) {
           next();
        } else {
            res.error('用户名必须为2-16位！', 'registerError');
            res.redirect('back');
        }
    }
};

module.exports.checkEmail = function(field){
    var regEmail =/^[A-Za-z0-9]+@([_a-z0-9]+\.)+com|cn/;
    return function(req, res, next){
        if (regEmail.test(req.body[field])) {
            next();
        } else {
            res.error('邮箱格式不正确！', 'registerError');
            res.redirect('back');
        }
    }
};

module.exports.checkPw = function(f1, f2){
    var regPw =/[a-zA-Z0-9]{6,16}$/;
    return function(req, res, next){
        if (regPw.test(req.body[f1])) {
            if(req.body[f1] === req.body[f2]){
                next();
            } else {
                res.error('两次密码必须输入相同！', 'registerError');
                res.redirect('back');
            }
        } else {
            res.error('密码必须为6-16位数字或字母！', 'registerError');
            res.redirect('back');
        }
    }
};



