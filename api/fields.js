const express = require('express');
const router = express.Router();
const configCouch = require('../config/couchdb');
const API = require('../lib/api');
const cradle = require('cradle');
const async = require('async');

const c = new(cradle.Connection)(configCouch.host, configCouch.port);
const db = c.database(configCouch.database);

/* GET fields listing. */
router.get('/', function(req, res, next) {
	db.view('fields/all', {}, function (err, doc) {
		if (err) {
			API.errorResponse(res, err);
		}
		else {
			res.status(200).send(doc);
		}
	});
});

/* GET field details. */
router.get('/:idField', function(req, res, next) {
	db.view('fields/all', {_id: req.params.idField}, function (err, doc) {
		if (err) {
			API.errorResponse(res, err);
		}
		else {
			res.status(200).send(doc);
		}
	});
});

/* POST field data */
router.post('/', function(req, res) {
	if (`undefined` !== typeof req.body) {
		if (`undefined` !== typeof req.body.fieldName) {
			if (`string` === typeof req.body.fieldName) {
				db.save({
					fieldName: req.body.fieldName.toUpperCase()
				}, (err, res) => {
					if (err) {
						API.errorResponse(res, err);
					}
					else {
						res.status(201).send('Saved');
					}
				});
			}
			else if (`undefined` !== typeof req.body.fieldNames) {
				async.each(req.body.fieldNames, (fieldName, next) => {
					db.save({
						fieldName: fieldName
					}, (err) => {
						if (err) {
							next();
						}
						else {
							next(err);
						}
					});
				}, (err) => {
					if (err) {
						API.errorResponse(res, err)
					}
				})
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
	}
	else {
		API.errorResponse(res, {
			status: 500,
			message: `No good parameters here`
		})
	}
});

module.exports = router;
