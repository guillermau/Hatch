var express = require('express');
const API = require('../lib/api');
var router = express.Router();

router.get('/about', function (req, res) {
	API.notImplemented(res);
});

router.get('/careers', function (req, res) {
	API.notImplemented(res);
});

router.get('/press', function (req, res) {
	API.notImplemented(res);
});

router.get('/blog', function (req, res) {
	API.notImplemented(res);
});

router.get('/help', function (req, res) {
	API.notImplemented(res);
});

router.get('/policies', function (req, res) {
	API.notImplemented(res);
});

router.get('/sitemap', function (req, res) {
	API.notImplemented(res);
});

module.exports = router;