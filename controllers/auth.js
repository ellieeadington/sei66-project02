//  required User model  

const { default: mongoose } = require("mongoose");
const {User} = require("../models/User")
const {Artist} = require("../models/Artist");


//  will need to require passport configuration 
const passport = require('passport');

//  Require bcrypt

const bcrypt = require ('bcrypt')
const salt = 10 


exports.auth_signup_get = (req, res) => {
    res.render("auth/signup");
}

exports.auth_signup_post =(req,res) =>{

    let user = new User(req.body)
    console.log(req.file)
    user.image=req.file.filename

    let hash = bcrypt.hashSync(req.body.password, salt);
    console.log(hash);

    user.password = hash;
     user.save()
    .catch((err)=> {
        console.log(err);
        res.send("Please try again later.")
   })
 
    .then(() => {
     User.findById(user)
     .then( (user) =>{ 
        let artist = new Artist(req.body)
       artist.user.push(user)
       console.log(artist.user[0]._id)
       artist.save()
       .catch((err)=> {
        console.log(err);
        res.send("Please try again later.")
   })
        })
        res.redirect("/")
    })
     .catch((err)=> {
        console.log(err);
        res.send("Please try again later.")
   })
}


exports.auth_signin_get = (req, res) => {
    res.render('auth/signin');
}

