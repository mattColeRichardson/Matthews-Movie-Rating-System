const express = require('express');
const ImdbApi = require('./Model/ImdbAPI');
const imdb = new ImdbApi();
const app = express();

app.listen(process.env.PORT || 3000, () => console.log('listening at 3000'));

//app.use(express.static('./View/*'));
app.use(express.static('./ServerSide/Public/View/'));
app.use(express.static('./ServerSide/Public/Controller/'));

app.get('/', function (req, res) {
    res.render('./ServerSide/Public/View/index', {});
});

app.get('/Search&t=[a-z]*', (req,res) =>
{
    let url = req.url;
    let Title = /(?<=Search&t=)(.*)/i.exec(url);
    let movie = imdb.searchByTitle(Title[1]);
    movie.then((value => {
        //send the data back to the client somehow. possibly change their header first.
        console.log(value.body);
    }))
})