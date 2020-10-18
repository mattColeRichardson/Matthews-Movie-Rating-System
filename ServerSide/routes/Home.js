const express = require('express');
const router = express.Router();

const googleClient = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

router.get("/", (req, res) =>
{
    res.render("Home/index.ejs");
})
router.get("/api/google", (req, res) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClient}&redirect_uri=http://localhost:3000&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`
    res.redirect(url)
});
router.get("/api/google/callback", (req, res) => {

});
module.exports = router;