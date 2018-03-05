var express         = require('express'),
    router          = express.Router(),
    passport		= require('passport'),
    news            = require('../models/news');

var initial = 0;
var final = 9;
var newsArray = [];

router.get('/',function(req,res) {
    news.find({}, function(err, comingNewsArray) {
        if(err) {
            console.log(err);
        } else {
            initial = 0;
            final = 9;
            newsArray = comingNewsArray;
            res.render('landing.ejs');
        }
    });
});

router.post('/', function(req, res) {
    // console.log(req.body.initial + " " + req.body.final);
    // initial = req.body.initial;
    // final   = req.body.final;

    initial= final;
    final += 9;

    var temp = [];
    var k = 0;
    // console.log(initial + " " + final);
    for(var i = initial; i < final; i++) {
        temp[k] = newsArray[i];
        k++;
    }
    res.send(temp);
});

//No more needed
// router.get('/abc', function(req,res) {
//     var temp = [];
//     var k = 0;
//     console.log(initial + " " + final);
//     for(var i = initial; i < final; i++) {
//         temp[k] = newsArray[i];
//         k++;
//     }
//     res.send(temp);
// });

router.get('/news/:id', function (req, res) {
    var idReceived = req.params.id;
    news.findById(idReceived, function(err, foundNews) {
        if (err) {
            console.log(err);
        } else {
            res.render('news.ejs', {News : foundNews});
        }
    });
});

router.get('/services', function(req, res) {
    res.render('services.ejs');
});

module.exports = router;