const express = require('express');
const router = express.Router();

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


module.exports = router;