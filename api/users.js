const express = require('express');
const router = express.Router();
const cradle = require('cradle');
const API = require('../lib/api');
const configCouch = require('../config/couchdb');

const c = new(cradle.Connection)(configCouch.host, configCouch.port);
const db = c.database(configCouch.database);


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  if(`string` !== typeof req.body.mail && `string` !== typeof req.body.password) {
    API.errorResponse(res, {
      status: 500,
      message: `No good parameters here`
    })
  }
  else {
    const doc = {};
    doc.mail = req.body.mail;
    doc.password = req.body.password;
    if (`string` === typeof req.body.pseudo) {
      doc.pseudo = req.body.pseudo;
    }
    if (`string` === typeof req.body.lastName) {
      doc.lastName = req.body.lastName;
    }
    if (`string` === typeof req.body.firstName) {
      doc.firstName = req.body.firstName;
    }
    db.save(doc, (err, resDoc) => {
      if (err) {
        API.errorResponse(res, err);
      }
      else {
        res.status(201).send('Saved');
      }
    });
  }
});

router.put('/:idUser/following/:idIdea', (req, res) => {
  db.get(req.params.idUser, function (err, doc) {
    if (err) {
      API.errorResponse(res, err);
    }
    else {
      doc.following.push(req.params.idIdea);
      db.merge(req.params.idUser, {following: doc.following.toString()}, (err, upDoc) => {
        if (err) {
          API.errorResponse(res, err);
        }
        else {
          res.status(200).send(upDoc);
        }
      });
    }
  });
});

router.delete('/:idUser/following/:idIdea', (req, res) => {
  API.notImplemented(res);
});

router.put('/:idUser/experienced/:idSkill', (req, res) => {
  API.notImplemented(res);
});

router.delete('/:idUser/experienced/:idSkill', (req, res) => {
  API.notImplemented(res);
});

router.put('/:idUser/interest/:idField', (req, res) => {
  API.notImplemented(res);
});

router.delete('/:idUser/interest/:idField', (req, res) => {
  API.notImplemented(res);
});

router.put('/:idUser/like/:idIdea', (req, res) => {
  API.notImplemented(res);
});

router.delete('/:idUser/like/:idIdea', (req, res) => {
  API.notImplemented(res);
});

router.get('/:idUser/recommendations', (req, res) => {
  API.notImplemented(res);
}); // TODO : Top priority

module.exports = router;