// Require Models
const {Event} = require('../models/Event');
const {location} = require('../public/js/app');


// API for root route

exports.index_get = (req, res) => {
    Event.find()
    .then(event => {
    res.render('home/index', {event, location});
    })
    .catch(err => {
        console.log(err);
    })
}    

