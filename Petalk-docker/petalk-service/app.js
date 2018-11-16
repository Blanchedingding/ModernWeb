var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var messages = require('./bin/lib/messages');
var router = require('./routes/router');
var handler = require('./routes/handler');
var userCtrl = require('./bin/controller/user');
var cloudCtrl = require('./bin/controller/cloud');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var fs = require('fs');
var rd = require('rd');
var vdo_info_ls = [];//获取到的视频文件信息集

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('photos', path.join(__dirname , '/public/photos'));
app.set('video', path.join(__dirname , '/public/video'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser( 'petalkSession'));
app.use(session({
    secret: 'petalkSession',//与cookieParser中的一致
    resave: true,
    saveUninitialized:true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(messages);
app.use('/', router);
app.post('/changeIcon',multipartMiddleware, userCtrl.changeIcon(app.get('photos')));
app.post('/uploadVideo',multipartMiddleware,cloudCtrl.addVideo(app.get('video')), cloudCtrl.listVideos);



app.use(handler.notfound);

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
