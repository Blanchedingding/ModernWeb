var mongoose =  require('./db.js');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username:String,
    email:String,
    password:String,
    usericon:String,
    briefintro:String,
    fan:Number,
    likes:Number
});

mongoose.model('User', UserSchema);

// function User( username, email, password, usericon, briefintro, fan, likes){
//     this.username = username;
//     this.email = email;
//     this.password = password;
//     this.usericon = usericon;
//     this.briefintro = briefintro;
//     this.fan = fan;
//     this.likes = likes;
// }
//
//
// var user = new User();
// user.username = 'dingding';
// user.email = '1@fudan.edu.cn';
// user.briefintro = '';
// user.password = '12345';
// user.fan = 0;
// user.likes = 0;
// user.usericon = 'user1.gif';
// user.save(function(err) {
//     if (err) throw err;
//     console.log('Task saved.');
// });

