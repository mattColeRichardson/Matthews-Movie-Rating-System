const path = require('path');
const express = require('express');
//database

//const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/Ratings', {useNewUrlParser : true, useUnifiedTopology: true})

//routes
const loginRouter = require('./routes/Login');
const searchRouter = require('./routes/Search');
const homeRouter = require('./routes/Home');
//models
const ImdbApi = require('./Model/ImdbAPI');
const imdb = new ImdbApi();
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './Public/views'))

app.listen(process.env.PORT || 3000, () => console.log('listening at 3000'));

app.use(express.urlencoded({extended : false}));
app.use(homeRouter);
app.use("/Login", loginRouter);
app.use("/Search", searchRouter);

app.use(express.static('./ServerSide/Public/'));





app.get('*', function(req, res){
    res.render("404");
});
//app.use(express.static(path.join(__dirname, '../Public/Controller')));
//app.use(express.static(__dirname + '/Public/views/'));
//app.use(express.static(__dirname + '/Public/Controller/'));


