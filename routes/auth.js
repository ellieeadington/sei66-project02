// required express 

const express =  require('express')

const router = express.Router();

router.use(express.urlencoded({extended: true}))

const authCtrl = require("../controllers/auth")

router.get("/auth/signup", authCtrl.auth_signup_get)
router.post("/auth/signup", authCtrl.auth_signup_post)




module.exports=router;