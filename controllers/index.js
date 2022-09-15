// Require Models
const {Event} = require('../models/Event');
const {Artist} = require('../models/Artist');
const {User} = require("../models/User");


let categories = [];
let location = [];
let month = [];
let artist = [];
let genre = [];

let locationFilter = [];
let artistFilter = [];
let monthFilter = [];
let genreFilter = [];

// HTTP GET - load index page with filters and event info
exports.index_get = (req, res) => {
    
    Event.find().distinct("city").then(
        cities => {
            locationFilter = cities;
        }
    ).catch();

    Artist.find().distinct("genres").then(
        genres => {
           genreFilter = genres;
      }
    ).catch();
    

    Event.find().distinct("month").then(
        months => {
            monthFilter = months;
        }
    ).catch();

    Artist.find().distinct("bandName").then(
        artists => {
           artistFilter = artists;
      }
    ).catch();
    

    Event.find()
    .populate('artist')
    .then(event => {
        res.render('home/index', {event,locationFilter,monthFilter,genreFilter,artistFilter,categories, location, month, genre, artist});
    })
    .catch(err => {
            console.log(err);
    })
}

// HTTP POST - update filter selection values
exports.index_filter_post = (req, res) => {
    location = req.body.loc;
    month = req.body.month;
    artist = req.body.art;
    genre = req.body.gen;
    res.redirect('/');
}

// HTTP POST - add bookmarked events to user info and users to bookmarked events
exports.index_bookmark_post = (req,res) => {
    let user = req.user;
    console.log(req.body.id)
    Event.find({$and: [{_id : req.body.id}, {user:  {$in: user._id}}]},
        
        function (err, result) {

            if(result.length < 1 ){
                   console.log("not yet favourited");
                    User.update(
                        {_id: user._id },
                        { $push: {event: req.body.id}}, function (err, result) {
                            if (err){
                                console.log(err)
                            }else{
                                console.log("Result :", result) 
                            }
                        });

                    Event.update(
                        {_id: req.body.id },
                        { $push: {user: user._id}}, function (err, result) {
                            if (err){
                                console.log(err)
                            }else{
                                console.log("Result :", result) 
                            }
                        });

                } else if(err) {
                    console.log("error")
                }
    
                else {console.log("result:   " + result)};
            })
            .clone()
            .then(  Event.find({"user": {$in: [user._id]}})
            .populate('artist')
            .then(event => {
                
                res.render('auth/profile', {user, event});
            }).catch(err => {
                console.log(err);
            })
             
            )
            .catch(err => {
                console.log(err);
        });
}

// HTTP POST - remove bookmarked events from user info and users from bookmarked events
exports.index_unbookmark_post = (req,res) => {
    let user = req.user;
    console.log(req.body.id)
    Event.find({$and: [{_id : req.body.id}, {user:  {$in: user._id}}]},
        
        function (err, result) {

            if(result.length >= 1 ){
                   console.log("favourited");
                    User.update(
                        {_id: user._id },
                        { $pull: {event: req.body.id}}, function (err, result) {
                            if (err){
                                console.log(err)
                            }else{
                                console.log("Result :", result) 
                            }
                        });

                    Event.update(
                        {_id: req.body.id },
                        { $pull: {user: user._id}}, function (err, result) {
                            if (err){
                                console.log(err)
                            }else{
                                console.log("Result :", result) 
                            }
                        });

                } else if(err) {
                    console.log("error")
                }          
                
                else {console.log("result:   " + result)};
            })
            .clone()
            .then(  Event.find({"user": {$in: [user._id]}})
            .populate('artist')
            .then(event => {
                
                res.render('auth/profile', {user, event});
            }).catch(err => {
                console.log(err);
            })
            
            )
            .catch(err => {
                console.log(err);
        });
}






