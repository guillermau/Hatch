const express = require('express');
const router = express.Router();
const API = require('../lib/api');
const cradle = require('cradle');
const configCouch = require('../config/couchdb');

const c = new(cradle.Connection)(configCouch.host, configCouch.port);
const db = c.database(configCouch.database);

/* GET skills listing. */
router.get('/', function(req, res, next) {
	db.view('skills/all', {}, function (err, doc) {
		if (err) {
			API.errorResponse(res, err);
		}
		else {
			res.status(200).send(doc);
		}
	});
});

/* GET skill list. */
router.get('/:idskill', function(req, res, next) {
	db.view('skills/all', {_id: req.params.idskill}, function (err, doc) {
		if (err) {
			API.errorResponse(res, err);
		}
		else {
			res.status(200).send(doc);
		}
	});
});

router.post('/', function(req, res, next) {
	if (`undefined` !== typeof req.body) {
		if (`undefined` !== typeof req.body.skillName) {
			db.save({
				skillName: req.body.skillName.toUpperCase()
			}, (err, res) => {
				if (err) {
					res.status(201).send('Saved');
				}
				else {
					API.errorResponse(res, err);
				}
			});
		}
		else {
			API.errorResponse(res, {
				status: 500,
				message: `No good parameters here`
			})
		}
	}
	else {
		API.errorResponse(res, {
			status: 500,
			message: `No good parameters here`
		})
	}
});

module.exports = router;
