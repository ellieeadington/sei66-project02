const express =  require('express')

const router = express.Router();

router.use(express.urlencoded({extended: true}))

const eventCtrl = require("../controllers/event")


module.exports = router;