var express         = require('express'),
    router          = express.Router(),
    passport		= require('passport'),
    User            = require('../models/user');


// user add get req
router.get('/register', function (req, res) {
    res.render('signUp.ejs');
});

// user add post req
router.post('/register', function (req, res) {
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
router.get('/login', function (req, res) {
    res.render('login.ejs');
});

// user login post req
router.post('/login', passport.authenticate('local', {
    successRedirect : '/',
    failureRedirect : '/register'
}),function(req, res) {

});

//logouts the user
router.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/');
});

//to the user account page
router.get('/profile/:id', function (req, res) {
    res.send(req.params.id);
});


function isLoggedIn(req, res, next) {
    "use strict";
    if(req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}


module.exports = router;