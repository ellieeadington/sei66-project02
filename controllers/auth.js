//  required User model  

const User = require("../models/User")
const Artist= require("../models/Artist");

//  will need to require passport configuration 

//  Require bcrypt


exports.auth_signup_get = (req, res) => {
    res.render("auth/signup");
}

exports.auth_signup_post =(req,res) =>{

    let user = new User(req.body)
    console.log(req.file)
    user.image=req.file.filename
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