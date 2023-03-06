const express = require('express');
const router = express.Router();
const countController = require('../controllers/count')




router.get("/count",countController.newDownload);


module.exports = router;