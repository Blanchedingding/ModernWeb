var express = require('express');
var router = express.Router();
var userCtrl = require('../bin/controller/user');
var topicCtrl = require('../bin/controller/topic');
var validate = require('../bin/lib/validate');
var path = require('path');

router.get('/', function(req, res, next) {
  res.render('login');
});
router.post('/login', userCtrl.login, topicCtrl.listQuestionsByUser);
router.get('/logout', userCtrl.logout);
router.post('/changeIntro', userCtrl.changeIntro,topicCtrl.listQuestionsByUser);
router.get('/profile', topicCtrl.listQuestionsByUser);
router.post(
    '/register',
    validate.checkName('username'),
    validate.checkEmail('email'),
    validate.checkPw('password','confirmpw'),
    userCtrl.register
);
router.post('/saveQuestion',topicCtrl.addQuestion, topicCtrl.listQuestionsByUser);
router.get('/topic',topicCtrl.listQuestionById);
router.post('/addAnswer',topicCtrl.addAnswer,topicCtrl.listQuestionById);
router.post('/addComment',topicCtrl.addComment);
router.post('/listCommentByAns',topicCtrl.listCommentsByAnswerId);

module.exports = router;
