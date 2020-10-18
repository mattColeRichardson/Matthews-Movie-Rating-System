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

router.post('/SelectedMovie/:Title', (req,res) =>
{
    let url = req.url;
    let Title = req.params.Title;
    if (Title != null)
    {
        Imdb.searchByTitle(Title)
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

router.post('/RatingMovie/:Title/:UserId', (req, res) =>
{
    let title = req.params.Title;
    let userID = req.params.UserId;
    let poster = req.params.Poster;

    console.log(`Title = ${title}, and the user is ${userID}`);
});