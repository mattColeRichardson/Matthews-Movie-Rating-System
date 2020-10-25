const express = require('express');
const imdb = require("../Model/ImdbAPI");
const router = express.Router();
const bodyParser = require("body-parser");
const urlParser = bodyParser.urlencoded({extended: false})
const Rating = require('../Model/Reviews');

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

router.post('/RatingMovie/:Title', urlParser, async (req, res) =>
{
    let rating = parseInt(req.body.amount, 10);
    if (rating >=6 && rating <=1 || rating == undefined) return;
    if(req.user != undefined)
    {
        let review = {
            id : req.user.googleID,
            title : req.params.Title,
            description : req.body.description,
            rating: rating,
            poster : req.body.picture
        };
        try{
            let reviewLookup = await Rating.find({id: req.user.googleID, title: req.params.Title});
            console.log(reviewLookup);
            if(reviewLookup[0] != undefined || reviewLookup[0] != null)
            {
                res.render('Search/FailedDatabase')
            }
            else
            {
                await Rating.create(review);
                res.redirect("/");
            }
        }catch (err)
        {
            console.error(err);
        }
        //I need to log in database and send to my movies page
        //console.log(review);
    }
    else
        //possibly create a login to submit ratings page.
        res.redirect("/login");
});