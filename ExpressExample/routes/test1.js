/**
 * Created by dingding on 2017/10/11.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('test1');
});

module.exports = router;