const express = require('express');

const router = express.Router();

router.use(express.urlencoded({extended: true}))

const indexCtrl = require('../controllers/index');

router.get('/', indexCtrl.index_get);
router.post('/', indexCtrl.index_filter_post);
router.post('/auth/bookmarks', indexCtrl.index_bookmark_post);
router.post('/auth/bookmarks-delete', indexCtrl.index_unbookmark_post);


module.exports = router;