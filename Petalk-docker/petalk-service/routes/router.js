var express = require('express');
var router = express.Router();
var userCtrl = require('../bin/controller/user');
var topicCtrl = require('../bin/controller/topic');
var cloudCtrl = require('../bin/controller/cloud');
var validate = require('../bin/lib/validate');
var path = require('path');

router.get('/', function(req, res, next) {
  res.render('login');
});
router.post('/login', userCtrl.login, topicCtrl.listQuestionsByHot);
router.get('/logout', userCtrl.logout);
router.post('/changeIntro', userCtrl.changeIntro);
router.get('/profile', topicCtrl.listQuestionsByUser);
router.post(
    '/register',
    validate.checkName('username'),
    validate.checkEmail('email'),
    validate.checkPw('password','confirmpw'),
    userCtrl.register
);

router.get('/hotTopics', topicCtrl.listQuestionsByHot);
router.get('/getSideLists', topicCtrl.getSideLists);
router.post('/saveTopic',topicCtrl.addQuestion);
router.get('/topic', topicCtrl.listQuestionById);
router.post('/addAnswer',topicCtrl.addAnswer,topicCtrl.listQuestionById );
router.post('/addComment', topicCtrl.addComment);
router.post('/listCommentByAns', topicCtrl.listCommentsByAnswerId);

router.get('/cloud', cloudCtrl.listVideos);
router.get('/watchVideo', cloudCtrl.getVideo);

module.exports = router;
