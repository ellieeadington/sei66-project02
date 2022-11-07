// required artist and events schema
const { Artist } = require("../models/Artist");

exports.artist_index_get = (req, res) => {
  Artist.find(req.query.id)
    .populate("user")
    .then((artist) => {
      res.render("artist/index", { artist: artist });
    });
};

exports.artist_detail_get = (req, res) => {
  Artist.findById(req.query.id)
    .populate("user")
    .populate("event")
    .then((artist) => {
      res.render("artist/detail", { artist: artist });
    });
};

exports.artist_profile_get = (req, res) => {
  Artist.find()
    .populate("user")
    .populate("event")
    .then((artist) => {
      res.render("artist/profile", { artist: artist });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.artist_delete_get = (req, res) =>{
  console.log(`Delete ${req.query.id}`)
  Artist.findByIdAndDelete(req.query.id)
  .then(()=>{
      res.redirect("/artist/profile")
  })
  .catch(err => {
      console.log(err)
  })
}