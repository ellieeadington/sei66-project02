// Require Models
const {Event} = require('../models/Event');
const {Artist} = require('../models/Artist');
const {User} = require("../models/User");

let categories = [];
let location = [];
let month = [];
let artist = [];
let genre = [];

let locationFilter = [];
let artistFilter = [];
let monthFilter = [];
let genreFilter = [];

// to do - get month filtering working
// get genre filtering working

// HTTP GET -------------------------------------------------------------

exports.index_get = (req, res) => {
    
    Event.find().distinct("city").then(
        cities => {
            locationFilter = cities;
        }
    ).catch();

    Artist.find().distinct("genres").then(
        genres => {
           genreFilter = genres;
      }
    ).catch();
    

    Event.find().distinct("month").then(
        months => {
            monthFilter = months;
        }
    ).catch();

    Artist.find().distinct("bandName").then(
        artists => {
           artistFilter = artists;
      }
    ).catch();
    

    Event.find()
    .populate('artist')
    .then(event => {
        res.render('home/index', {event,locationFilter,monthFilter,genreFilter,artistFilter,categories, location, month, genre, artist});
        })
        .catch(err => {
            console.log(err);
        })
    
    }

// HTTP GET -------------------------------------------------------------
exports.index_location_post = (req, res) => {
    location = req.body.loc;
    month = req.body.month;
    artist = req.body.art;
    genre = req.body.gen;
    res.redirect('/');
}

// ASK FOR SAADs HELP !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
exports.index_bookmark_post = (req,res) => {
    

    let user = req.user;
    Event.find({$and: [{_id : req.body.id}, {user:  {$in: user._id}} ]},
        
    function (err, result) {
        if(err) {

        Event.update(
            {_id: req.body.id },
            { $push: {user: user._id}})

        User.update(
            {_id: user._id },
            { $push: {event: req.body.id}})
        .then(() => {
            res.redirect("/")
        })
        .catch(err => {
        console.log(err)
        })
        } 

        else{
            console.log("already favourited")
        }
       }
    )
}




