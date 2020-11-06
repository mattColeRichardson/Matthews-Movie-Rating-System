const express = require('express');
const router = express.Router();

const imdb = require("../Model/ImdbAPI");
const Imdb = new imdb;

const passport = require('passport');

router.get("/", async (req, res) =>
{
    let NYTPicks = await Imdb.getNTYPicksBy("2020");
    NYTPicks = await JSON.parse(NYTPicks.body);
    let MovieInfo = {};
    for (let i = 0; i < NYTPicks.results.length; i++) {
        MovieInfo[`Movie ${i}`] = await Imdb.searchByTitle(NYTPicks.results[i].display_title);
        MovieInfo[`Movie ${i}`] = await JSON.parse(MovieInfo[`Movie ${i}`].body );
    }
    console.log(MovieInfo[`Movie 18`]);
    res.render("Browse/Browse", {User: req.user, NYT: NYTPicks, Movie: MovieInfo});
})

module.exports = router;