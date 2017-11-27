/**
 * Created by dingding on 2017/11/27.
 */
var Video = require('../models').Video;
var Danmaku = require('../models').Danmaku;
var UUID = require('uuid');
var fs = require('fs');
var join = require('path').join;

module.exports.addVideo = function(dir){
    return function(req, res, next){
        // console.log(req.files);
        var video = req.files.video;
        var videoType= video.name.substr(video.name.lastIndexOf("."));
        var newName =  UUID.v1() + videoType;
        var path = join(dir, newName);
        var readStream=fs.createReadStream(video.path);
        var writeStream=fs.createWriteStream(path);
        readStream.pipe(writeStream);
        readStream.on('end',function(){
            fs.unlinkSync(video.path);
            var v = new Video();
            v.user = req.session.user;
            v.videopath = 'video/' + newName;
            v.videotitle = req.body.title;
            v.videodesc = req.body.desc;
            v.videotime = (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString();
            v.save(function(err, v){
                if (err) return next(err);
                // res.redirect('/profile');
                next();
            });
        });
    };
};

module.exports.listVideos = function(req, res, next){
    Video.find({}, function(err, vs){
        if (err) return next(err);
        // console.log(vs);
        res.render('cloud',{videos:vs});
    });
};

module.exports.getVideo = function(req, res, next){
    Video.findOne({_id:req.query.id}, function(err, v){
        if (err) return next(err);
        // console.log(v);
        res.render('cloud-video',{video:v});
    });
};


