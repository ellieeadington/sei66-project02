// Require Models
const {Event} = require('../models/Event');
const { modelName } = require('../models/User');
let categories = [];
let locationFilter = "";
let artistFilter = "";
let monthFilter = "";
let genreFilter = "";

// to do - get month filtering working
// get genre filtering working

// HTTP GET -------------------------------------------------------------

exports.index_get = (req, res) => {

    Event.find().distinct("city").then(
        cities => {
            locationFilter = cities;
        }
    ).catch();

    Event.find().distinct("artist").then(
        artists => {
            artistFilter = artists;
        }
    ).catch();

    Event.find().distinct("month").then(
        months => {
            monthFilter = months;
        }
    ).catch();

    Event.find().distinct("genreTags").then(
        genres => {
            genreFilter = genres;
        }
    ).catch();


    if(categories.length == 0) {
        Event.find()
        .then(event => {
            res.render('home/index', {event,locationFilter,artistFilter,monthFilter,genreFilter,categories});
            })
            .catch(err => {
                console.log(err);
            })
    
        } else {

    Event.find({$and: [{city: {$in: categories}}, {artist: {$in: categories}}, {month: {$in: categories}}, {genreTags: {$in: categories}}]})
    .then(event => {
        res.render('home/index', {event,locationFilter,artistFilter,monthFilter,genreFilter,categories});
        })
        .catch(err => {
            console.log(err);
        })
    
    }
}
// HTTP GET -------------------------------------------------------------
exports.index_location_post = (req, res) => {
    categories = req.body.loc;
    res.redirect('/');
}





