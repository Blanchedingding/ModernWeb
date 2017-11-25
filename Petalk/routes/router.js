var express = require('express');
var router = express.Router();
var userCtrl = require('../bin/controller/user');
var validate = require('../bin/lib/validate');
var path = require('path');

router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/login', userCtrl.login);

router.get('/logout', userCtrl.logout);

router.get('/profile', function(req, res, next) {
    res.render('profile');
});

router.post(
    '/register',
    validate.checkName('username'),
    validate.checkEmail('email'),
    validate.checkPw('password','confirmpw'),
    userCtrl.register
);

router.post('/profile',function(req, res, next) {
    res.render('profile');
});






module.exports = router;
