// var mongoose = require('mongoose'),
//     DB_URL = 'mongodb://localhost:27017/petalk';
var mongoose = require('mongoose'),
    DB_URL = 'mongodb://petalk-mongo/petalk';

mongoose.Promise = global.Promise;
var reconnectTimeout = 5000; // ms.

/**
 * 连接
 */
// mongoose.connect(DB_URL, { useMongoClient: true, autoReconnect: true});
function connect() {
    // Catch the warning, no further treatment is required
    // because the Connection events are already doing this
    // for us.
    mongoose.connect(DB_URL, { useMongoClient: true, autoReconnect: true }).catch(function(){

    });
}

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
    mongoose.disconnect();
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
    setTimeout(function(){
        connect();
    }, reconnectTimeout);
});

connect();
module.exports = mongoose;

