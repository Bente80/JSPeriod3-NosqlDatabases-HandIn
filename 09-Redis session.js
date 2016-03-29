/**
 * Created by Bente on 23-03-2016.

09.	Explain, using a relevant example, how redis (or a similar) can increase scalability (drastic) for a server using server side sessions.
    The advantages of using Redis over other session stores, is that Redis offers persistence.
    While maintaining a cache is not typically mission critical with regards to consistency, most users wouldn't exactly enjoy if all their cart sessions went away.

    Example from the link http://blog.arisetyo.com/?p=492:
 */

    var express = require('express'),
        redis = require('redis'),
        cookieParser = require('cookie-parser'),
        session = require('express-session'),
        redisStore = require('connect-redis')(session),
        logger = require('morgan'),
        bodyParser = require('body-parser');

var client = redis.createClient(),//CREATE REDIS CLIENT
    app = express();

app.use(cookieParser('yoursecretcode'));
app.use(session(
    {
        secret: 'yourothersecretcode',
        store: new redisStore({ host: 'localhost', port: 6379, client: client }),
        saveUninitialized: false, // don't create session until something stored,
        resave: false // don't save session if unmodified
    }
));

app.use(logger("tiny"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var router = express.Router();

router.get('/session/set/:value', function(req, res) {
    req.session.redSession = req.params.value;
    res.send('session written in Redis successfully');
});

app.get('/session/get/', function(req, res) {
    if(req.session.redSession)
        res.send('the session value stored in Redis is: ' + req.session.redSession);
    else
        res.send("no session value stored in Redis ");
});

app.use('/', router);
var server = app.listen(8097, function() {
    console.log('REDIS SESSION server is listening on port %d', server.address().port);
});

/**
 For another example look at this link:     https://codeforgeek.com/2015/07/using-redis-to-handle-session-in-node-js/

 For my own example look at the project: 	JSPeriod3RedisSession
 Here is the link to the code:	            https://github.com/Bente80/JSPeriod3RedisSession
 */