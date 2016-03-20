var express = require('express');
var router = express.Router();
const cradle = require('cradle');
const API = require('../lib/api');
const configCouch = require('../config/couchdb');
const async = require('async');

const c = new(cradle.Connection)(configCouch.host, configCouch.port);
const db = c.database(configCouch.database);


/* GET ideas listing. */
router.get('/', function(req, res) {
  db.view('ideas/all', {}, function (err, doc) {
    if (err) {
      API.errorResponse(res, err);
    }
    else {
      res.status(200).send(doc);
    }
  });
});

/* GET ideas list. */
router.get('/:idIdea', function(req, res) {
  db.view('ideas/all', {_id: req.params.idIdea}, function (err, doc) {
    if (err) {
      API.errorResponse(res, err);
    }
    else {
      res.status(200).send(doc);
    }
  });
});

router.post('/', function(req, res) {
  if (`string` === typeof req.body.name && `string` === typeof req.body.pitch180) {
    const doc = {};
    doc.name = req.body.name;
    doc.pitch180 = req.body.pitch180;
    if (`string` === typeof req.body.url) {
      doc.url = req.body.url;
    }
    if (`string` === typeof req.body.image) {
      doc.image = req.body.image;
    }
    if (`string` === typeof req.body.more) {
      doc.more = req.body.more;
    }
    db.save(doc, (err) => {
      if (err) {
        API.errorResponse(res, err);
      }
      else {
        res.status(201).send('Saved');
      }
    });
  }
  else {
    API.errorResponse(res, {
      status: 500,
      message: `No good parameters here`
    });
  }
});

router.put('/:idIdea/skills/:idSkill', () => {
  API.notImplemented(res);
});

router.put('/:idIdea/skills', (req, res) => {
  if (`Array` === typeof req.body) {
    async.each(req.body, (skill) => {

    }, (err) => {

    })
  }
  else {
    API.errorResponse(res);
  }
});

module.exports = router;
