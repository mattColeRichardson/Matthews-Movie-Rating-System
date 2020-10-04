export class ImdbAPI
{
    apikey = "68d4832c" //open api key

    async getMovie(userSearch)
    {
        return await $.get("http://www.omdbapi.com/?s=" + userSearch + "&apikey=" + this.apikey);
    }
    async searchByTitle()
    {
        let url = window.location;
        let Title = /Search&t=(.*)/.exec(url);
        let data = await $.get("http://www.omdbapi.com/?t=" + Title + "&apikey=" + this.apikey);
        console.log(data);
        return data;
    }
}

