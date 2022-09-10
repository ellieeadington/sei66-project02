const mongoose = require('mongoose');

// schema
const eventSchema = mongoose.Schema({
    name: String,
    artist: String,
    venue: String,
    addressLine1: String,
    city: String,
    postcode: String,
    date: Date,
    description: String,
    genreTags: Array
},


{timestamps: true}
);
// model

const Event = mongoose.model('Event', eventSchema);

// exporting to other files
module.exports = {Event};