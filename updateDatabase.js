const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('8a32519a7cf2421ea1b7f170e9797377');
var mongoose        = require('mongoose');
mongoose.Promise    = global.Promise;
var news = require('./models/news');

var categories = [];
var place = [];
var source = ['the-hindu','mtv-news','espn','the-times-of-india', 'cnn', 'google-news-in','national-geographic','cnbc','bbc-news','financial-times'];
// u();

function u() {
    for(var i = 0; i < source.length; i++) {
        updateS(source[i]);
    }
}


function updateS(source) {
    newsapi.v2.topHeadlines({
        sources: source,
        language: 'en',
        sortBy: 'relevancy',
        page: 1
    }).then(function(response) {
        var a = response.articles;
        console.log(a.length);
        for(var i = 0; i < a.length; i++) {
            var newsArticle = a[i];
            newsArticle.category = [source];
            news.create(newsArticle,function(err, createdNews) {
                if(err) {
                    console.log(err);
                } else {
                    createdNews.save();
                }
            })
        }
    });
}

function updateC(category) {
    newsapi.v2.topHeadlines({
        category: category,
        language: 'en',
        sortBy: 'relevancy',
        page: 1
    }).then(function(response) {
        var a = response.articles;
        for(var i = 0; i < a.length; i++) {
            var newsArticle = a[i];
            newsArticle.category = [category];
            news.create(newsArticle,function(err, createdNews) {
                if(err) {
                    console.log(err);
                } else {
                    createdNews.save();
                }
            })
        }
    });
}

function updateP(place) {
    newsapi.v2.topHeadlines({
        language: 'en',
        sortBy: 'relevancy',
        country:place,
        page: 1
    }).then(function(response) {
        var a = response.articles;
        for(var i = 0; i < a.length; i++) {
            var newsArticle = a[i];
            newsArticle.category = [place];
            news.create(newsArticle,function(err, createdNews) {
                if(err) {
                    console.log(err);
                } else {
                    createdNews.save();
                }
            })
        }
    });
}