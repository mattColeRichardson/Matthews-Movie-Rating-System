const express = require('express');
const router = express.Router();
const Reviews = require('../Model/Reviews');
const bodyParser = require("body-parser");
const urlParser = bodyParser.urlencoded({extended: false});

router.get("/", async (req, res) =>
{
    let reviewLookup = await Reviews.find({id: req.user.googleID});
    let passThrough = {User: req.user, review: reviewLookup}

    if(reviewLookup)
    {
        res.render("MyMovies/MyMovies", passThrough);
    }
    else
    {
        res.render("MyMovies/NoMovies");
    }
})
router.post("/UpdatePage", async (req, res) =>
{
    let movieEdit = await Reviews.find({id: req.user.googleID, title: req.body.title});
    res.render("MyMovies/Update", {movie:movieEdit});
});
router.get("/Delete/:title", async (req, res) =>
{
    let reviewLookup = await Reviews.find({id: req.user.googleID, title: req.params.title});
    if(reviewLookup != undefined)
    {
        await Reviews.deleteOne({id: req.user.googleID, title: req.params.title});
        res.redirect("/");
    }
});

router.post("/Update/:title", urlParser, async (req, res) =>
{
    let rating = parseInt(req.body.amount, 10);
    if (rating >=6 && rating <=1 || rating == undefined) return;
    if(req.user != undefined)
    {
        let review = {
            id : req.user.googleID,
            title : req.params.title,
            description : req.body.Description,
            rating: rating,
            poster : req.body.picture
        };
        try{
            let reviewLookup = await Reviews.find({id: req.user.googleID, title: req.params.title});
            if(reviewLookup[0] == undefined || reviewLookup[0] == null)
            {
                res.render('Search/FailedDatabase')
            }
            else
            {
                await Reviews.updateOne(Reviews.find({id: req.user.googleID, title: req.params.title}), review);
                res.redirect("/");
            }
        }catch (err)
        {
            console.error(err);
        }
    }
    else
        res.redirect("/login");
});
module.exports = router;