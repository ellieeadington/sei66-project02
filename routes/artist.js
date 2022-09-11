const express =  require('express')


const router = express.Router();

router.use(express.urlencoded({extended: true}))

const artistCtrl = require("../controllers/artist")
const upload = require("../helpers/fileupload")

router.get("/artist/add", artistCtrl.artist_create_get)
router.post("/artist/add", upload.single('image') , artistCtrl.artist_create_post)
router.get("/artist/index", artistCtrl.artist_index_get)




module.exports=router 