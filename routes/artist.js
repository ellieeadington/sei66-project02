// required express 

const express =  require('express')


const router = express.Router();

router.use(express.urlencoded({extended: true}))

const artistCtrl = require("../controllers/artist")


const upload = require("../helpers/fileupload")

router.get("/artist/index", artistCtrl.artist_index_get)
router.get("/artist/detail", artistCtrl.artist_detail_get)
router.get("/artist/delete", artistCtrl.artist_delete_get)
router.get("/artist/edit", artistCtrl.artist_edit_get)





module.exports=router 