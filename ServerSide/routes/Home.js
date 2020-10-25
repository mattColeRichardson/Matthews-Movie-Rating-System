const express = require('express');
const router = express.Router();
const Reviews = require('../Model/Reviews');

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
router.get("/MyMovies", async (req, res) => {
    let reviewLookup = await Reviews.find({id: req.user.googleID});
    let passThrough = {User: req.user, review: reviewLookup}

    if(reviewLookup)
    {
        res.render("Search/MyMovies", passThrough);
    }
    else
    {
        res.render("Search/NoMovies");
    }
})

module.exports = router;