
const Artist = require("../models/Artist")

exports.artist_create_get=(req,res)=>{

  res.render("artist/add")

}


exports.artist_create_post=(req, res) => {
    let artist= new Artist(req.body);
    console.log(artist)
  artist.save()

    .then(() => {
        res.redirect("/");
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later!!!");
    })
}



