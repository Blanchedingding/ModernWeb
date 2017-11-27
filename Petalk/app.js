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
// app.use(logger('dev'));
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

// var page_count = 20;//分页条数
// app.get('/cloud', function (req, res) {
//     reGetFileInfos(app.get('vedio'));
//     var ret = [];//返回的分页json初始化
//     if (req.query.page) {//判断是否有get参数page
//         if (parseInt(req.query.page) >= 0) {//
//             for (var i = 0; i < page_count; i++) {//遍历获取
//                 ret[ret.length] = vdo_info_ls[parseInt(req.query.page) * page_count + i];
//             }
//         }
//     }
//     res.json(ret);//返回json
// });
//
// function reGetFileInfos(path) {//这里是为了大家以后写后台进行文件刷新时使用
//     vdo_info_ls = [];//初始化集合
//     getFileInfo(path); //遍历文件夹
//     vdo_info_ls.sort(function (a, b) {//时间排序
//         return Date.parse(b.ctime) - Date.parse(a.ctime);//时间正序(不过这个方法好像只能对月日起效 对年好像不起作用)
//     });
// }
//
// function getFileInfo(path) {//遍历文件夹
//     try {
//         var files = rd.readSync(path);//获取目录下所有文件和文件夹
//         for (var i in files) {//循环遍历
//             if (!fs.lstatSync(files[i]).isDirectory()) {//判断是否为文件
//                 if (files[i].toLowerCase().split(".mp4").reverse()[0].length== 0) {//判断是否为MP4格式文件(这里默认以MP4为例 其他格式大家自行过滤)
//                     vdo_info_ls[vdo_info_ls.length]={
//                         name: files[i].split("\\").reverse()[0].replace(".mp4", "").replace(".MP4", ""),//获取文件名
//                         url: (vdo_path.replace(__dirname, "")+ files[i].replace(vdo_path, "")).replace(/\\/g, '/'), //获取文件的web路径
//                         mtime: fs.statSync(files[i]).mtime//修改时间作为发布时间
//                     }//添加信息到文件信息集
//                 }
//             }
//         }
//     }
//     catch (e) {
//         console.log(e)
//     }
// }

//////////////////////////////////////////////////////////////////////////
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
