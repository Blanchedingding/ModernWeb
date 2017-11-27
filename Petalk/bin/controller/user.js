var User = require('../models').User;
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

var fs = require('fs');
var join = require('path').join;


module.exports.register = function(req, res, next){
    User.find({username:req.body.username}, function(err, user){
        if(err){
            return next(err);
        } else  if(user && user.length > 0){
            res.error("用户名已存在！", 'registerError');
            res.redirect('back');
        } else {
            User.find({email:req.body.email}, function(err, user){
                if(err){
                    return next(err);
                } else if(user && user.length > 0){
                    res.error("该邮箱已注册！", 'registerError');
                    res.redirect('back');
                } else{
                    var user = new User();
                    user.username = req.body.username;
                    user.email = req.body.email;
                    user.password = bcrypt.hashSync(req.body.password, salt);
                    user.fan = 0;
                    user.likes = 0;
                    user.usericon = 'img/user/user1.gif';
                    user.briefintro = "人家还没有来得及写简介啦！";
                    user.save(function(err) {
                        if (err) throw err;
                        console.log('User saved.');
                        res.info('注册成功，请登录~');
                        res.redirect('/');
                    });
                }
            });
        }
    });
};

module.exports.login = function(req, res, next){
    User.findOne({username:req.body.username}, function(err, user){
        if(!user){
            res.error("用户名不正确！", 'loginError');
            res.redirect('back');
        } else if (err) {
            return next(err);
        } else {
            if(bcrypt.compareSync(req.body.password, user.password)){
                user.password = '';
                req.session.user = user;
                // res.render('homepage');
                // res.redirect('/profile');
                next();
            } else {
                res.error("密码不正确！", 'loginError');
                res.redirect('back');
            }
        }
    });
};

module.exports.logout = function(req, res){
    req.session.destroy(function(err) {
        if (err) throw err;
        res.redirect('/');
    });
};

module.exports.changeIcon = function (dir) {
    return function(req, res, next){
        // console.log(req.files);
        var img = req.files.photo;
        var imgType= img.name.substr(img.name.lastIndexOf("."));
        var newName = req.session.user._id + imgType;
        var path = join(dir, newName);

        var readStream=fs.createReadStream(img.path);
        var writeStream=fs.createWriteStream(path);
        readStream.pipe(writeStream);
        readStream.on('end',function(){
            fs.unlinkSync(img.path);
            User.update({_id:req.session.user._id},{usericon:'photos/'+ newName},function(err, user){
                if (err) return next(err);
                req.session.user.usericon = 'photos/'+ newName;
                res.redirect('/profile');
                // next();
            });
        });
    };
};

module.exports.changeIntro = function(req, res, next){
    User.findOne({_id:req.session.user._id}, function(err, user){
        console.log(req.body);
        if(!user){
            res.redirect('back');
        } else if (err) {
            return next(err);
        } else {
            User.update({_id:req.session.user._id},{briefintro:req.body.introText},function(err, user){
                if (err) return next(err);
                req.session.user.briefintro = req.body.introText;
                res.redirect('/profile');
                // next();
            });
        }
    });
};

