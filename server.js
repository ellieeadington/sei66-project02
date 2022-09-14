// Require Express
const express = require('express');

// Require Mongoose
const mongoose = require('mongoose');


require('dotenv').config();

// require connect flash 

const flash = require('connect-flash')

// Port Config
const PORT = process.env.PORT

// require dotenv
require('dotenv').config();

// Initialise Express
const app = express();


app.use(flash())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

