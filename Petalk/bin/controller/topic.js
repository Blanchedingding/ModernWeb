/**
 * Created by lenovo on 2017/11/26.
 */
var Question = require('../models').Question;
var Answer = require('../models').Answer;
var Comment = require('../models').Comment;
var User = require('../models').User;

module.exports.addQuestion = function(req, res, next){
    var q = new Question();
    q.user = req.session.user;
    q.quescontent = req.body.questiontitle;
    q.quesdesc = req.body.questiondesc;
    q.ansnum = 0;
    q.questime = (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString();
    q.save(function(err) {
        if (err) throw err;
        res.redirect('/profile');
    });
};

module.exports.addAnswer = function(req, res, next){
    var a = new Answer();
    a.user = req.session.user;
    a.quesid = req.body.quesid;
    a.anscontent = req.body.myanswercontent;
    a.comnum = 0;
    a.anstime = (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString();
    a.save(function(err) {
        if (err) throw err;
        Question.update({_id:a.quesid},{$inc:{'ansnum':1}},function(err2, doc){
            if(err2) return next(err2);
            // res.info('回答成功！');
            next();
        });
    });

};

module.exports.addComment = function(req, res, next){
    var c = new Comment();
    c.user = req.session.user;
    c.ansid = req.body.ansid;
    c.comcontent = req.body.comcontent;
    c.comtime = (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString();
    c.save(function(err) {
        if (err) throw err;
        // console.log('Comment saved.');
        Answer.update({_id:c.ansid},{$inc:{'comnum':1}}, function(err2, doc){
            if (err2) next(err2);
            return res.json(c);
        });
    });
};

module.exports.listQuestionsByUser = function(req, res, next){
   Question.find({'user._id':req.session.user._id}).sort({'questime':'desc'}).exec(function(err, qs){
       if (err) throw next(err);
       return res.render('profile',{questions:qs});
   });
};

module.exports.listQuestionsByHot = function(req, res, next){
    Question.find({}).sort({'ansnum':'desc'}).exec(function(err, qs){
        if (err) throw next(err);
        return res.render('homepage',{questions:qs});
    });
};

module.exports.listCommentsByAnswerId = function(req, res, next){
    Comment.find({ansid:req.body.ansid}, function(err, cs){
        if (err) throw next(err);
        return res.json({comments:cs});
    });
};

module.exports.listQuestionById = function(req, res, next){
    var queid = req.query.id || req.body.quesid;
    Question.findOne({_id:queid}).exec(function(err, qs){
        if (err) throw next(err);
        if(qs){
            // console.log(qs);
            Answer.find({quesid:queid}).sort({'anstime':'desc'}).exec(function(err2, ansList){
                if (err2) throw next(err2);
                return res.render('topic',{question:qs, answers:ansList});
            })
        } else {
            res.error("问题未找到！", 'topicError');
            res.redirect('back');
        }
    });
};

module.exports.getSideLists = function(req, res, next){
    Question.find({}).sort({'ansnum':'desc'}).limit(5).exec(function(err, qs){
        if (err) throw next(err);
        var ids = [];
        qs.forEach(function(q){
            ids.push(q.user._id);
        });
        User.find({'_id':{$in:ids}}, function(err2, us){
            if (err2) throw next(err2);
            return res.json({questions:qs, users:us});
        })
    });
};
