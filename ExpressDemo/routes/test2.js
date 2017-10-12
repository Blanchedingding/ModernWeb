/**
 * Created by dingding on 2017/10/11.
 */
var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    res.render('test2', {testName: req.body.testName});
});

module.exports = router;