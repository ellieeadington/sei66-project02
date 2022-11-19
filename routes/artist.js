const express = require("express");

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
const artistCtrl = require("../controllers/artist");

router.get("/artist/index", artistCtrl.artist_index_get);
router.get("/artist/profile", artistCtrl.artist_profile_get);
router.get("/artist/detail", artistCtrl.artist_detail_get);
router.get("/artist/delete", artistCtrl.artist_delete_get);

module.exports = router;
