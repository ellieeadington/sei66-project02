const mongoose = require('mongoose')

const artistSchema = mongoose.Schema({

    bandName: String,
    bandMembers: Array,
    Genres: Array,
    Bio: String,
    profilePhoto: String,
    event: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

})

const  Artist = mongoose.model("Artist", artistSchema)

module.exports= Artist;