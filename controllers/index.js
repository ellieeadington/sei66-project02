// Require Models
const {Event} = require('../models/Event');
let categories = [];
let genres = [];

// API for root route

exports.index_get = (req, res) => {
    Event.find()
    .then(event => {
    res.render('home/index', {event, categories});
    })
    .catch(err => {
        console.log(err);
    })

}


exports.index_location_post = (req, res) => {
    categories = req.body.loc;
    console.log(categories);
    res.redirect('/');
    return categories;
}

