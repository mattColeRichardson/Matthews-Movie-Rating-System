const EventEmitter = require('events');
const got = require('got');

class movieAPI extends EventEmitter
{
    constructor() {
        super();
    }
    apikey =  Env.PATH;
    async getMovie (userSearch)
        {
            return got("http://www.omdbapi.com/?s=" + userSearch + "&apikey=" + this.apikey);
        }
    async searchByTitle(Title)
        {
            return got("http://www.omdbapi.com/?t=" + Title + "&apikey=" + this.apikey);
        }
}
module.exports = movieAPI;


