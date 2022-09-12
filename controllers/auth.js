//  required User model  

const User = require("../models/User")
const Artist= require("../models/Artist");

//  will need to require passport configuration 

//  Require bcrypt


exports.auth_signup_get = (req, res) => {
    res.render("auth/signup");
}

const { default: mongoose } = require("mongoose");
exports.auth_signup_post =(req,res) =>{

    let user = new User(req.body)
     user.save()
    .catch()
    .then(() => {
     User.findById(user)
     .then( (user) =>{ 
        let artist = new Artist(req.body)
       artist.user.push(user)
       artist.save()
       .catch()
        })
        res.redirect("/")
    })
     .catch((err)=> {
         console.log(err);
         res.send("Please try again later.")
    })
}