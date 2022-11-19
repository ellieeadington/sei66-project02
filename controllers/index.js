const { Event } = require("../models/Event");
const { Artist } = require("../models/Artist");
const { User } = require("../models/User");

let categories = [];
let location = [];
let month = [];
let artist = [];
let genre = [];

let locationFilter = [];
let artistFilter = [];
let monthFilter = [];
let genreFilter = [];

exports.index_get = (req, res) => {
  Event.find()
    .distinct("city")
    .then((cities) => {
      locationFilter = cities;
    })
    .catch();

  Artist.find()
    .distinct("genres")
    .then((genres) => {
      genreFilter = genres;
    })
    .catch();

  Event.find()
    .distinct("month")
    .then((months) => {
      monthFilter = months;
    })
    .catch();

  Artist.find()
    .distinct("bandName")
    .then((artists) => {
      artistFilter = artists;
    })
    .catch();

  Event.find()
    .populate("artist")
    .then((event) => {
      res.render("home/index", {
        event,
        locationFilter,
        monthFilter,
        genreFilter,
        artistFilter,
        categories,
        location,
        month,
        genre,
        artist,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.index_filter_post = (req, res) => {
  location = req.body.loc;
  month = req.body.month;
  artist = req.body.art;
  genre = req.body.gen;
  res.redirect("/");
};

exports.index_bookmark_post = (req, res) => {
  let user = req.user;

  if(user.profileType === "artist"){
    console.log("functionality not available yet")
    res.redirect("/")
  } 
  else {
 
  Event.find(
    { $and: [{ _id: req.body.id }, { user: { $in: user._id } }] },

    function (err, result) {
      if (result.length < 1) {
        User.findOneAndUpdate(
          { _id: user._id },
          { $push: { event: req.body.id } },
          {"new": true},
          function (err, result) {
            if (err) {
              console.log(err);
            } else {
              result.save(function (err) {
                if(err) {
                    console.error(err);
                }
            });
            }
          }
        );

        Event.findOneAndUpdate(
          { _id: req.body.id },
          { $push: { user: user._id } },
          {"new": true},
          function (err, result) {
            if (err) {
              console.log(err);
            } else {
              result.save(function (err) {
                if(err) {
                    console.error(err);
                }
            });
            }
          }
        );
      } else if (err) {
        console.log(err);
      } else {
        console.log("bookmarked event successfully");
      }
    }
  )
    .clone()
    .then(
      Event.find({ user: { $in: [user._id] } })
        .populate("artist")
        .exec(function(err, event) {
          res.redirect("/auth/profile");
        }))
    .catch((err) => {
      console.log(err);
    });
  }
};

exports.index_unbookmark_post = (req, res) => {
  let user = req.user;
  console.log(req.body.id);
  Event.find(
    { $and: [{ _id: req.body.id }, { user: { $in: user._id } }] },

    function (err, result) {
      if (result.length >= 1) {
        console.log("favourited");
        User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { event: req.body.id } },
          {"new": true},
          function (err, result) {
            if (err) {
              console.log(err);
            } else {
              result.save(function (err) {
                if(err) {
                    console.error(err);
                }
            });
            }
          }
        );

        Event.findOneAndUpdate(
          { _id: req.body.id },
          { $pull: { user: user._id } },
          {"new": true},
          function (err, result) {
            if (err) {
              console.log(err);
            } else {
              result.save(function (err) {
                if(err) {
                    console.error(err);
                }
            });
            }
          }
        );
      } else if (err) {
        console.log(err);
      } else {
        console.log("unbookmarked event successfully");
      }
    }
  )
    .clone()
    .then(
      Event.find({ user: { $in: [user._id] } })
        .populate("artist")
        .exec(function(err, event) {
          res.redirect("/auth/profile");
        }))
    .catch((err) => {
      console.log(err);
    });
};


exports.search = async (req, res) => { 
  console.log(req.body.regex)
  let regex =  req.body.regex.toLowerCase().split(" ");
  console.log(regex)
  
  await regex.map((term) => {
   Event.find({$or: [
      { name: {$regex: new RegExp(term, "i") }},
      { venue: {$regex: new RegExp(term, "i")  } },
      { city: {$regex: new RegExp(term, "i")  } },
      { description: {$regex: new RegExp(term, "i")   }},
  ]}).then((event) => {
        res.render("home/index", {
          event,
          locationFilter,
          monthFilter,
          genreFilter,
          artistFilter,
          categories,
          location,
          month,
          genre,
          artist,
        })
      });
   }) 
  }
