const express =  require('express')

const router = express.Router();

router.use(express.urlencoded({extended: true}))

const eventCtrl = require("../controllers/hvbevents")

const upload = require("../helpers/fileupload")

router.get("/event/add",eventCtrl.event_create_get)
router.post("/event/add",upload.single('eventPhoto'), eventCtrl.event_create_post)

module.exports = router;