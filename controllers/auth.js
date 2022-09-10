//  required User model  

const User = require("../models/User")

//  will need to require passport configuration 

//  Require bcrypt


exports.auth_signup_get = (req, res) => {
    res.render("auth/signup");
}


exports.auth_signup_post =(req,res) =>{

    let user = new User(req.body)
    console.log(user)

    user.save()

    .then(() =>{
 if(user.profileType === 'artist'){
        res.redirect("/artist/add");
 }
else{
    res.redirect("/")
}
    })
    
    .catch((err)=> {
        console.log(err);
        res.send("Please try again later.")
    })

}