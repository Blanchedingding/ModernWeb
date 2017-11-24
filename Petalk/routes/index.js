var express = require('express');
var router = express.Router();
var userCtrl = require('../bin/controller/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/register', userCtrl.register);

module.exports = router;
