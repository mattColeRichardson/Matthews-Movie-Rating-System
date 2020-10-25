const express = require('express');
const router = express.Router();
const Reviews = require('../Model/Reviews');
const bodyParser = require("body-parser");
const urlParser = bodyParser.urlencoded({extended: false});

const passport = require('passport');


router.get("/", (req, res) =>
{
    res.render("Home/index.ejs", {User: req.user});
})

router.get("/api/google", passport.authenticate('google', { scope: ['profile']}));

router.get("/api/google/callback", passport.authenticate('google', {failureRedirect: '/Login'}),
        function (req, res)
        {
            res.redirect('/');
        }
);
router.get("/logout",(req, res) =>
{
    req.logout();
    res.redirect('/Login');
})
router.get("/MyMovies", async (req, res) =>
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
router.post("/MyMovies/UpdatePage", async (req, res) =>
{
    let movieEdit = await Reviews.find({id: req.user.googleID, title: req.body.title});
    res.render("MyMovies/Update", {movie:movieEdit});
});
router.post("/MyMovies/Delete/:title", async (req, res) =>
{
console.log(req.params.title)
});

router.post("/MyMovies/Update/:title", urlParser, async (req, res) =>
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
            let reviewLookup = await Reviews.find({id: req.user.googleID, title: req.params.Title});
            console.log(reviewLookup);
            if(reviewLookup[0] == undefined || reviewLookup[0] == null)
            {
                res.render('Search/FailedDatabase')
            }
            else
            {
                await Reviews.update(Reviews.find({id: req.user.googleID, title: req.params.Title}), review);
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