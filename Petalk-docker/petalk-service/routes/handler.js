/**
 * Created by dingding on 2017/11/25.
 */
module.exports.notfound = function(req, res){
    res.status(404).format({
        html: function(){
            res.render('404');
        },
        json: function(){
            res.send({ message: 'Resource not found' });
        },
        xml: function() {
            res.write('<error>\n');
            res.write(' <message>Resource not found</message>\n');
            res.end('</error>\n');
        },
        text: function(){
            res.send('Resource not found\n');
        }
    });
};
