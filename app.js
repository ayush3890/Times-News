var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    passport		= require('passport'),
    localStrategy	= require('passport-local'),
    User            = require('./models/user'),
    updateDb        = require('./updateDatabase');

mongoose.Promise    = global.Promise;
mongoose.connect('mongodb://ayush3890:ayush3890@ds261088.mlab.com:61088/times_news');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('express-session')({
    secret 				: 'asdaskjhdk dksajdklas jdjkl sjdl df',
    resave 				: false,
    saveUninitialized 	: false
}));

//passport connections
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new localStrategy(User.authenticate()));

app.use(function(req, res, next) {
    res.locals.currentUser  = req.user;
    next();
});

app.use(express.static(__dirname + '/public'));

//Calling of routes
var indexRoutes = require('./routes/index.js');
var authRoutes = require('./routes/auth.js');
var otherServicesRoutes = require('./routes/otherServices');

//Useing of routes
app.use(indexRoutes);
app.use(authRoutes);
app.use(otherServicesRoutes);

//Starting the server
app.listen(process.env.PORT || "3000", function() {
    console.log("News App Server has Started");
});