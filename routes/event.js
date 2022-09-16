const express =  require('express')

const router = express.Router();

router.use(express.urlencoded({extended: true}))

const eventCtrl = require("../controllers/events")

const upload = require("../helpers/fileupload")

router.get("/event/add",eventCtrl.event_create_get)
router.post("/event/add",upload.single('eventPhoto'), eventCtrl.event_create_post)
router.get("/event/detail", eventCtrl.event_detail_get)
router.get("/event/delete", eventCtrl.event_delete_get)
router.get("/event/edit", eventCtrl.event_edit_get)
router.post("/event/update", upload.single('eventPhoto'), eventCtrl.event_update_post)
module.exports = router;