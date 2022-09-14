//  required User model  

const {User} = require("../models/User")
const {Artist} = require("../models/Artist");

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
    failureRedirect: "/auth/signin"
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

// HTP GET - user profile
exports.auth_profile_get = (req, res) => {
    let user = req.user;
    console.log(user);

    res.render('auth/profile', {user});
}
