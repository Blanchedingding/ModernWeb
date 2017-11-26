var mongoose =  require('./db.js');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username:String,
    email:String,
    password:String,
    salt:String,
    usericon:String,
    briefintro:String,
    fan:Number,
    likes:Number
});

var User = mongoose.model('User', UserSchema);
module.exports.User = User;

var QuestionSchema = new Schema({
    user:{
        _id:String,
        username:String,
        email:String,
        password:String,
        salt:String,
        usericon:String,
        briefintro:String,
        fan:Number,
        likes:Number
    },
    quescontent:String,
    quesdesc:String,
    ansnum:Number,
    questime:String
});

var Question = mongoose.model('Question', QuestionSchema);
module.exports.Question = Question;

var AnswerSchema = new Schema({
    user:{
        _id:String,
        username:String,
        email:String,
        password:String,
        salt:String,
        usericon:String,
        briefintro:String,
        fan:Number,
        likes:Number
    },
    quesid:String,
    anscontent:String,
    comnum:Number,
    anstime:String
});
var Answer = mongoose.model('Answer', AnswerSchema);
module.exports.Answer = Answer;

var CommentSchema = new Schema({
    user:{
        _id:String,
        username:String,
        email:String,
        password:String,
        salt:String,
        usericon:String,
        briefintro:String,
        fan:Number,
        likes:Number
    },
    ansid:String,
    comcontent:String,
    comtime:String
});
var Comment = mongoose.model('Comment', CommentSchema);
module.exports.Comment = Comment;



