const mongoose = require('mongoose');

// schema
const eventSchema = mongoose.Schema({
    name: String,
    venue: String,
    addressLine1: String,
    city: String,
    postcode: String,
    date: Date,
    month: String,
    monthYear: String,
    description: String,
    artist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }],

     user: [{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
     }],
    eventPhoto: String

},{timestamps: true})


 
// I want to be able to, for each event, show the artists who are playing and their associated genres, 
// meaning I need to reference the artist id's in the events collection, with the object ids in the 
// artists collection. I also want to be able to filter the events that are displayed by the artists & their genres, 
// referenced in the events collection. In order to do this, do I need to join the two collections using 
// $lookup and $aggregate the data, which I will use to write the apis in my index.js controller? If so, do you have any
// documentation on how I should go about this?
   
    

// model

const Event = mongoose.model('Event', eventSchema);

// exporting to other files
module.exports = {Event};