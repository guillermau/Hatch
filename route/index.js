var express = require('express');
const API = require('../lib/api')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function (req, res) {
  API.notImplemented(res);
});

module.exports = router;
