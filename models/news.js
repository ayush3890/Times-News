var mongoose = require('mongoose');

var newsSchema = new mongoose.Schema({
    author : String,
    description : String,
    data : String,
    title : String,
    url : String,
    urlToImage : String,
    source : {
            id : String,
            name : String
    },
    publishedAt:String,
    category :[]
});

var news = mongoose.model('News', newsSchema);
module.exports = news;