const express = require('express');
const imdb = require("../Model/ImdbAPI");
const router = express.Router();

const Imdb = new imdb;
module.exports = router;

router.post("/", (req, res) =>
{
    let _searchTitle = req.body.SearchInput;
    if (_searchTitle.length <= 40)
    {
        Imdb.getMovie(_searchTitle).then(response =>
        {
            let _movieResults = JSON.parse(response.body);
            //console.log(_movieResults);
            res.render('Search/SearchResults', {_movieResults});

        }).catch(err => console.error(err));
    }
    else
    {
        console.log("Too long of a search")

    }
})

router.post('/SelectedMovie&t=[a-z]*', (req,res) =>
{
    let url = req.url;
    let Title = /(?<=&t=)(.*)/i.exec(url);
    if (Title != null)
    {
        Imdb.searchByTitle(Title[1])
            .then(response =>
            {
                const _selResults = JSON.parse(response.body);
                console.log(_selResults.Title);
                res.render('Search/SelectedMovie', {_selResults});
            })
            .catch(err => console.error(err));
    }
    else
    {
        res.render('404');
    }
});