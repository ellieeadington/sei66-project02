const express = require("express");

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
const isLoggedIn = require("../helpers/isLoggedIn");
const indexCtrl = require("../controllers/index");

router.get("/", indexCtrl.index_get);
router.post("/", indexCtrl.index_filter_post);
router.post("/auth/bookmarks",isLoggedIn, indexCtrl.index_bookmark_post);
router.post("/auth/bookmarks-delete", isLoggedIn,indexCtrl.index_unbookmark_post);
router.post("/search", indexCtrl.search);
module.exports = router;
