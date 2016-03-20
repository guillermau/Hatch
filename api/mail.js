const express = require('express');
const router = express.Router();
const configCouch = require('../config/couchdb');
const API = require('../lib/api');
const cradle = require('cradle');

const c = new(cradle.Connection)(configCouch.host, configCouch.port);
const db = c.database(configCouch.database);

router.post('/', function(req, res) {
	if (`undefined` !== typeof req.body) {
		if (`string` === typeof req.body.mail) {
			db.save({
				fieldName: req.body.mail.toUpperCase()
			}, (err, res) => {
				if (err) {
					API.errorResponse(res, err);
				}
				else {
					res.status(201).send('Saved');
				}
			});
		}
		else {
			API.errorResponse(res, err)
		}
	}
});



module.exports = router;
