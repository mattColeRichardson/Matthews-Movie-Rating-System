const express = require('express');
const router = express.Router();

router.get("/", (req, res) =>
{
    res.render("Home/index.ejs");
})
router.get("/api/google", (req, res) => {

});
router.get("/api/google/callback", (req, res) => {

});
module.exports = router;