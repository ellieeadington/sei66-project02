const express =  require('express')

const router = express.Router();

router.use(express.urlencoded({extended: true}))

const artistCtrl = require("../controllers/artist")

router.get("/artist/add", artistCtrl.artist_create_get)
router.post("/artist/add", artistCtrl.artist_create_post)



module.exports=router