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
}
module.exports = movieAPI;


