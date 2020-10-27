const path = require('path');
const express = require('express');
const passport = require('passport');
const startPassport = require('./Model/passport');
startPassport(passport);

const session = require('express-session');

const app = express();
//database
const connectDB = require("./Model/db");
connectDB();
//Route variables
const loginRouter = require('./routes/Login');
const searchRouter = require('./routes/Search');
const MyMoviesRouter = require('./routes/MyMovies');
const HomeRouter = require('./routes/Home');
const BrowseRouter = require('./routes/Browse');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './Public/views'));

app.listen(process.env.PORT || 3000, () => console.log('listening at 3000'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended : false}));

//Routes
app.use(HomeRouter);
app.use("/Login", loginRouter);
app.use("/Search", searchRouter);
app.use("/MyMovies", MyMoviesRouter);
app.use("/Browse", BrowseRouter);


app.use(express.static('./ServerSide/Public/'));

app.get('*', function(req, res){
    res.render("404");
});
