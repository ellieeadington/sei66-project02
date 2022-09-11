// required artist and events schema 

const { default: mongoose } = require("mongoose");
const Artist= require("../models/Artist");
const User = require("../models/User");

exports.artist_create_get=(req,res)=>{
  
    User.find()
    .then((user) => {
        res.render("artist/add", {user:user})
    })
    .catch((err) => {
        console.log(err);
    })
}



exports.artist_create_post=(req, res) => {
    let artist= new Artist(req.body)
    artist.image=req.file.filename
    console.log(artist)
    artist.save()
    .then(() =>{
   res.redirect('/')

    })

   .catch((err) => {
    console.log(err);
    res.send("Please try again later!!!");
})
      }
      

      exports.artist_index_get=(req,res) => {
        Artist.find()
        .then(artist =>{
            res.render("artist/index", {artist:artist})
        })
    }
    
