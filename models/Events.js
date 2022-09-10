const mongoose = require('mongoose')

const eventsSchema = mongoose.Schema({

    eventName: String,
    location :{
        venueName: String,
        address: String,
        city: String,
        postCode: String,
    },
    date: String,
    Time: String, 

    artist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }],

    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    eventPhoto: String,

})

const  Event = mongoose.model("Event", eventsSchema)

module.exports= Event;