const mongoose = require('mongoose')


const artistSchema = mongoose.Schema({

    bandName: String,
    bandMembers: Array,
    genres: Array,
    bio: String,
    image: String,
    
    event: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],

    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: true
})



const  Artist = mongoose.model("Artist", artistSchema)

module.exports = Artist;