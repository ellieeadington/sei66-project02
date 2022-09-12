const express = require('express');

const router = express.Router();

const indexCtrl = require('../controllers/index');

router.get('/', indexCtrl.index_get);
router.post('/', indexCtrl.index_location_post);

module.exports = router;