const express = require('express');
const ImdbApi = require('./Model/ImdbAPI.js')
const app = express();

app.listen(3000, () => console.log('listening at 3000'));

app.use(express.static('Public/View'));
app.use(express.static('Public/Controller'));

app.get('/Search&t=[a-z]*', function (req,res)
{
    let url = req.url;
    let Title = /(?<=Search&t=)(.*)/i.exec(url);
    console.log(ImdbApi.data.searchByTitle(Title));
    res();
})