let $ = require('jquery');
let methods = {
    apikey: "68d4832c"
};

methods.getMovie = async function (userSearch)
{
    return await $.get("http://www.omdbapi.com/?s=" + userSearch + "&apikey=" + this.apikey);
}
methods.searchByTitle = async function (Title)
{
    let data = await $.get("http://www.omdbapi.com/?t=" + Title + "&apikey=" + this.apikey);
    console.log(data);
    return data;
}
exports.data = methods;


