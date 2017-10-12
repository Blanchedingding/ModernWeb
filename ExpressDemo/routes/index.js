var express = require('express');
var router = express.Router();

// global.jQuery = require('jquery');
// require('bootstrap');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
