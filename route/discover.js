var express = require('express');
const API = require('../lib/api')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	API.notImplemented(res);
});

/* GET concept page. */
router.get('/concept', function (req, res) {
	API.notImplemented(res);
});

/* GET concept page. */
router.get('/developers', function (req, res) {
	API.notImplemented(res);
});

/* GET concept page. */
router.get('/designer', function (req, res) {
	API.notImplemented(res);
});

/* GET concept page. */
router.get('/developers', function (req, res) {
	API.notImplemented(res);
});

/* GET concept page. */
router.get('/mobile', function (req, res) {
	API.notImplemented(res);
});

/* GET concept page. */
router.get('/sitemap', function (req, res) {
	API.notImplemented(res);
});

module.exports = router;