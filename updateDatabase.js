const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('8a32519a7cf2421ea1b7f170e9797377');
var mongoose        = require('mongoose');
mongoose.Promise    = global.Promise;
mongoose.connect('mongodb://ayush:harshit9290@ds235778.mlab.com:35778/times_news');

var news = require('./models/news');

// setInterval(update,20000);

function update() {
    console.log('a');
    newsapi.v2.everything({
        q: 'bitcoin',
        sources: 'bbc-news,the-verge',
        domains: 'bbc.co.uk, techcrunch.com',
        from: '2017-12-01',
        to: '2017-12-12',
        language: 'en',
        sortBy: 'relevancy',
        page: 1
    }).then(function(response) {
        var a = response.articles;
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