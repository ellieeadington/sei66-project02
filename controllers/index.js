// Require Models
const {Event} = require('../models/Event');
const {Artist} = require('../models/Artist');
let categories = [];
let locationFilter = "";
let artistFilter = "";
let monthFilter = "";
let genreFilter = "";
let genreArr = [];

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
    


    if(categories.length == 0) {
        Event.find()
        .populate('artist')
        .then(event => {

            res.render('home/index', {event,locationFilter,monthFilter,genreFilter,artistFilter, categories});
            })
            .catch(err => {
                console.log(err);
            })

    
        } else {

    Event.find({$and: [{city: {$in: categories}}, {month: {$in: categories}}]})
    .populate('artist')
    .then(event => {
        res.render('home/index', {event,locationFilter,monthFilter,genreFilter,artistFilter,categories});
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



// .populate()


