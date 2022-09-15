//  required User model  

const {User} = require("../models/User")
const {Artist} = require("../models/Artist");
const {Event} = require('../models/Event');

//  will need to require passport configuration 
let passport = require('../helpers/ppConfig');

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

// HTTP Get - signin route

exports.auth_signin_get = (req, res) => {
    res.render('auth/signin');
   
}

// HTTP POST Signin Route
exports.auth_signin_post = passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/"
})


// HTTP GET - Logout Route - to logout the user
exports.auth_logout_get = (req, res) => {
    // Invalidates the session
    req.logout(function(err) {
        if(err) { 
            req.flash('error', 'You have not logged out successfully');
            return next(err);
        }
        req.flash('success', 'You are logged out successfully');
        res.redirect('/auth/signin')
    })
}

// HTTP GET - user profile
exports.auth_profile_get = (req, res) => {
   let user = req.user;

    Event.find({"user": {$in: [user._id]}})
    .populate('artist')
    .then(event => {
        
        res.render('auth/profile', {user, event});
    }).catch(err => {
        console.log(err);
    })

}

// HTTP UPDATE - user profile#

exports.auth_profile_update = (req, res) => {
res.render('auth/update');
}

exports.auth_update_post = (req, res) => {
    

}




exports.auth_updatepassword_get = (req, res) => {
    res.render('auth/updatepassword')
}

exports.auth_updatepassword_post = async (req, res) => {

}
  

exports.auth_profile_delete = (req, res) => {
    let user = req.user;
    if(user){
    if(user.profileType == "fan"){
        User.findByIdAndDelete(user._id).then(() => {
        res.redirect('/');
        }).catch(err => {
            console.log(err);
        })
    }

    else if(user.profileType == "artist"){
        let user_id = req.user.id;
        User.findByIdAndDelete(user._id).then(() => {
        Artist.findByIdAndDelete(user_id);
        res.redirect('/');
        }).catch(err => {
                console.log(err);
        })

    }
}}





