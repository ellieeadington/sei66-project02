//  required User model  
const {User} = require("../models/User")
const {Artist} = require("../models/Artist");
const {Event} = require('../models/Event');

//  will need to require passport configuration 
let passport = require('../helpers/ppConfig');

//  Require bcrypt
const bcrypt = require ('bcrypt')
const salt = 10 ;


exports.auth_signup_get = (req, res) => {
    res.render("auth/signup");
}

exports.auth_signup_post =(req,res) =>{

    let user = new User(req.body)
   
    user.image=req.file.filename
    console.log(user)
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
   .then((user) => {
    if(user.profileType == 'artist'){
        let artist = new Artist(req.body)
       artist.user.push(user)
       console.log(artist.user[0])
       artist.save()  

    } else{
        console.log("they have signed up as a user ")
    } 
     })

     .catch(err => {
        console.log(err)
        console.log("please try again later ")
        

    })  
   
     res.redirect("/")

}) }

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

// HTTP GET - user profile update page
exports.auth_profile_update = (req, res) => {
    res.render('auth/update');
}

// HTTP POST - update user info
exports.auth_update_post = (req, res) => {  
    let user = req.user;
    User.findByIdAndUpdate(user._id, req.body)
    .then(() => {
        res.redirect("/");
    })
    .catch(err => {
        console.log(err)
    })  
}


exports.auth_updatepassword_get = function  (req, res) {
    res.render('auth/updatepassword')
}

exports.auth_updatepassword_post =(req, res) => {
 let currentUser= req.user
 if(currentUser.emailAddress){
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let confirmPassword= req.body.confirmPassword
    User.findOne({"emailAddress": currentUser.emailAddress}, (err, user) =>{
     if( user != null){
        let hash = user.password;
        bcrypt.compare(oldPassword, hash, function(err,res){
       if (res){
        if(newPassword == confirmPassword){
            bcrypt.hash(newPassword, 3, function(err, hash){
             user.password = hash;
             user.save()
            })

        }
       }
        })

     }
    })
    res.redirect('/')
}}
  

// HTTP GET - delete profile info
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





