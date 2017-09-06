var express = require('express');
var router = express.Router();
var apiController = require('../controllers/api')();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/getCoinList',apiController.getCoinList);
router.get('/getPrice',apiController.getPrice);
router.get('/getPriceHistorical',apiController.getPriceHistorical);
router.get('/getCoinSnapsShot',apiController.getCoinSnapsShot);
router.get('/getCoinSnapshotFullById',apiController.getCoinSnapshotFullById);


module.exports = router;
