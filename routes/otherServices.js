var express          = require('express'),
    router           = express.Router();

router.get('/weather', function(req, res) {
    res.render('weather.ejs');
});

router.get('/currency', function(req, res) {
    res.render('currency.ejs');
});

router.get('/randomQuotes', function(req, res) {
    res.render('randQuotes.ejs');
});

router.get('/bitcoin', function (req, res) {
    res.render('bitcoin.ejs');
});

module.exports = router;