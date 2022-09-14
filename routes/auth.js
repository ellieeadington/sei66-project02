// required express 

const express =  require('express')

const router = express.Router();

router.use(express.urlencoded({extended: true}))

const upload = require("../helpers/fileupload")

const authCtrl = require("../controllers/auth")

router.get("/auth/signup", authCtrl.auth_signup_get)
router.post("/auth/signup",upload.single('image'), authCtrl.auth_signup_post)

router.get("/auth/signin", authCtrl.auth_signin_get);
router.post("/auth/signin", authCtrl.auth_signin_post);

router.get('/auth/logout', authCtrl.auth_logout_get);
router.get('/auth/profile', authCtrl.auth_profile_get);


module.exports = router;