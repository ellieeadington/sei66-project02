const mongoose = require('mongoose');

// schema
const eventSchema = mongoose.Schema({
    name: String,
    venue: String,
    addressLine1: String,
    city: String,
    postcode: String,
    date: Date,
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
 
    
   
    

// model

const Event = mongoose.model('Event', eventSchema);

// exporting to other files
module.exports = {Event};