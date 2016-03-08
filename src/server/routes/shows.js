var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');

function Shows() {
    return knex('shows');
}

router.get('/shows', function(req, res, next) {
  Shows().then(function(data) {
    res.status(200).json(data);
  });
});

router.get('/show/:id', function(req, res, next) {
  Shows().where('id', req.params.id).then(function(data) {
    res.status(200).json(data);
  });
});

router.post('/shows', function(req, res, next) {
  Shows().insert({
    name: req.body.name,
    channel: req.body.channel,
    genre: req.body.genre,
    rating: req.body.rating,
    explicit: req.body.explicit
  }, 'id').then(function(data) {
    res.status(200).json(data[0]);
  });
});

router.put('/show/:id', function(req, res, next) {
  Shows().where('id', req.params.id).update({
    name: req.body.name,
    channel: req.body.channel,
    genre: req.body.genre,
    rating: req.body.rating,
    explicit: req.body.explicit
  }, '*').then(function(data) {
    res.status(200).json(data);
  });
});

router.delete('/show/:id', function(req, res, next) {
  Shows().where('id', req.params.id).del().then(function(data) {
    res.status(200).json(data);
  });
});

module.exports = router;
