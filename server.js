// Require Express
const express = require('express');


// require dotenv
require('dotenv').config();

// require connect flash 

const flash = require('connect-flash')

// Require Mongoose
const mongoose = require('mongoose');

// Port Config
const PORT = process.env.PORT
// Initialise Express
const app = express();

app.use(flash());

// Look for all static files in public folder
// (CSS, JS, Images, Videos, Audio files)
app.use(express.static("public"));
// Require express-ejs-layouts
const expressLayouts = require('express-ejs-layouts');

// Import Routes
const indexRouter = require('./routes/index');
const authRouter  = require ('./routes/auth');
const artistRouter = require ('./routes/artist');
const eventRouter = require ('./routes/event');

// Look into views folder for the file named as layout.ejs
app.use(expressLayouts);

// Express session and passport
let session = require('express-session');
let passport = require('./helpers/ppConfig');

app.use(session({
    secret: process.env.SECRET,
    saveUninitialized:true,
    resave: false,
    cookie: {maxAge: 36000000}
}))

// Initialise passport and passport session
app.use(passport.initialize());
app.use(passport.session());

// Sharing the user information with all pages
app.use(function(req, res, next){
    res.locals.currentUser = req.user
    res.locals.alerts = req.flash();
    next();
})


// Mount Routes
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', artistRouter)
app.use('/', eventRouter)
// NodeJS will look in a folder called views for all ejs related files
app.set('view engine', 'ejs');


// Database Connection
mongoose.connect(process.env.MongoDBURL,
    { useNewURLParser: true, useUnifiedTopology: true},
    () => {
        console.log('MongoDB connected!')
    }
);

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})

