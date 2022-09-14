// required artist and events schema 

const { default: mongoose } = require("mongoose");
const {Artist} = require("../models/Artist");
const {User} = require("../models/User");
const {Event}= require("../models/Event")

      
exports.artist_index_get=(req,res) => {
    Artist.find(req.query.id).populate('user')
    .then((artist) =>{
        res.render("artist/index", {artist:artist})
    })
}

exports.artist_detail_get=(req,res) => {
    Artist.findById(req.query.id).populate('user').populate('event')
     
    .then((artist) =>{
        console.log(artist)
        res.render("artist/detail", {artist:artist})
    })
}


