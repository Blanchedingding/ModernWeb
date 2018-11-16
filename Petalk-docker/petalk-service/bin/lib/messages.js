var express = require('express');
var res = express.response;

res.message = function(msg, type){
    type = type || 'info';
    var sess = this.req.session;
    sess.messages = sess.messages || [];
    sess.messages.push({ type: type, string: msg });
};

res.error = function(msg, errorType){
    return this.message(msg, errorType);
};

res.info = function(msg){
    return this.message(msg, 'info');
};

module.exports = function(req, res, next){
    res.locals.session = req.session || {};
    res.locals.messages = req.session.messages || [];
    res.locals.removeMessages = function(){
        req.session.messages = [];
    };
    next();
};
