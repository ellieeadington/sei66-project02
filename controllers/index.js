// Require Models
const {Event} = require('../models/Event');
const { modelName } = require('../models/User');
let categories = [];
let locationFilter = "";
let artistFilter = "";
let dateTime = "";

// HTTP GET -------------------------------------------------------------

exports.index_get = (req, res) => {
    let artist = [];
    let city = [];
    let dates = [];

    Event.find().distinct("city").then(
        cities => {
            locationFilter = cities;
        }
    ).catch();

    Event.find().distinct("artist").then(
        artists => {
            artistFilter =artists;
        }
    ).catch();

    Event.find().distinct("date").then(
        date => {
            dateTime = date;
        }
    ).catch();


    // console.log(locations);

    for( let i=0; i < categories.length; i++) {
    city.push({city: categories[i]});
    artist.push({artist: categories[i]});
    } 

    if(city.length == 0 && artist.length == 0) {
        Event.find()
        .then(event => {
            res.render('home/index', {event,locationFilter,artistFilter,dateTime,categories});
            })
            .catch(err => {
                console.log(err);
            })
    
        } else {

    Event.find({$and: [{ $or: city}, {$or: artist}]})
    .then(event => {
        res.render('home/index', {event,locationFilter,artistFilter,dateTime, categories});
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





