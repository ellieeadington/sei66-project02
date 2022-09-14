// Require Models
const {Event} = require('../models/Event');
const {Artist} = require('../models/Artist');
let categories = [0];
let location = [0];
let month = [0];
let artist = [0];
let genre = [0];

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

console.log(categories);
console.log(month);




// .populate()


