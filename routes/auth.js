// required express 

const express =  require('express')

const router = express.Router();

router.use(express.urlencoded({extended: true}))

const upload = require("../helpers/fileupload")

const authCtrl = require("../controllers/auth")

router.get("/auth/signup", authCtrl.auth_signup_get)
router.post("/auth/signup",upload.single('image'), authCtrl.auth_signup_post)
router.get("/signin", authCtrl.auth_signin_get);


module.exports=router;