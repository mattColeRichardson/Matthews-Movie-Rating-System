const EventEmitter = require('events');
const got = require('got');

class movieAPI extends EventEmitter
{
    constructor() {
        super();
    }
    getMovie (userSearch)
        {
            return got("http://www.omdbapi.com/?s=" + userSearch + "&apikey=" + process.env.IMDBKEY);
        }
    searchByTitle(Title)
    {
        return got("http://www.omdbapi.com/?t=" + Title + "&apikey=" + process.env.IMDBKEY);
    }
    getMovieImgByTitle(Title)
    {
        return got("http://www.img.omdbapi.com/?t=" + Title + "&apikey=" + process.env.IMDBKEY);
    }
    getNTYPicksBy(Year)
    {
        return got(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?critics-pick=y&publication-date=${Year}&api-key=${process.env.NYT_KEY}`);
    }
}
module.exports = movieAPI;


