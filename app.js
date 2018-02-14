var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    news            = require('./models/news'),
    passport		= require('passport'),
    localStrategy	= require('passport-local'),
    User            = require('./models/user');

mongoose.Promise    = global.Promise;
mongoose.connect('mongodb://ayush:harshit9290@ds235778.mlab.com:35778/times_news');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('8a32519a7cf2421ea1b7f170e9797377');
var news = require('./models/news');
// setInterval(update,20000);
// update();
function update() {
    newsapi.v2.everything({
        sources: 'bbc-news,the-verge',
        domains: 'bbc.co.uk, techcrunch.com',
        language: 'en',
        sortBy: 'relevancy',
        page: 1
    }).then(function(response) {
        var a = response.articles;
        console.log(a.length);
        for(var i = 0; i < a.length; i++) {
            var newsArticle = a[i];
            news.create(newsArticle,function(err, createdNews) {
                if(err) {
                    console.log(err);
                } else {
                    createdNews.save();
                }
            })
        }
    });
};

app.use(require('express-session')({
    secret 				: 'asdaskjhdk dksajdklas jdjkl sjdl df',
    resave 				: false,
    saveUninitialized 	: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new localStrategy(User.authenticate()));

app.use(function(req, res, next) {
    res.locals.currentUser  = req.user;
    next();
});

var initial = 0;
var final = 9;
var newsArray = [];

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res) {
    news.find({}, function(err, comingNewsArray) {
        if(err) {
            console.log(err);
        } else {
            newsArray = comingNewsArray;
            res.render('landing.ejs');
        }
    });
});

app.post('/', function(req, res) {
    initial = req.body.initial;
    final   = req.body.final;
    console.log(initial + " , " + final);
});

app.get('/abc', function(req,res) {
    var temp = [];
    var k = 0;
    for(var i = initial; i < final; i++) {
        temp[k] = newsArray[i];
        k++;
    }
    res.send(temp);
});

app.get('/news/:id', function (req, res) {
    var idReceived = req.params.id;
    news.findById(idReceived, function(err, foundNews) {
        if (err) {
            console.log(err);
        } else {
            res.render('news.ejs', {News : foundNews});
        }
    });
});

app.get('/weather', function(req, res) {
    res.render('weather.ejs');
});

// user add get req
app.get('/register', function (req, res) {
    res.render('signUp.ejs');
});

// user add post req
app.post('/register', function (req, res) {
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function (err, newUserMade) {
        if(err) {
            console.log(err);
        } else {
            passport.authenticate('local')(req,res,function() {
                res.redirect('/');
            });
        }
    });
});

// user login get req
app.get('/login', function (req, res) {
    res.render('login.ejs');
});

// user login post req
app.post('/login', passport.authenticate('local', {
        successRedirect : '/',
        failureRedirect : '/register'
    }),function(req, res) {

});

app.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/');
});

app.get('/profile/:id', function (req, res) {
    res.send(req.params.id);
});

app.get('/secret',isLoggedIn ,function (req, res) {
    res.render('secret.ejs');
});

app.listen(process.env.PORT || "3000", function() {
    console.log("News App Server has Started");
});

function isLoggedIn(req, res, next) {
    "use strict";
    if(req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}