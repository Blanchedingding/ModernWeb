/**
 * Created by dingding on 2017/10/11.
 */
var express = require('express');
var querystring = require('querystring');
var router = express.Router();

router.post('/', function(req, res, next) {
    var body = "";
    req.on('data', function (chunk) {
        body += chunk;
    });
    body = querystring.parse(body);
    res.render('test2', {testName: body.testName});
});

module.exports = router;