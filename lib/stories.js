var express = require('express');
var router = express.Router();
var app = express();

module.exports = stories;

function stories() {
  router.route('/')
    .get(function(req, res) {
      res.json([]);
    });

  router.route('/:id')
    .get(function(req, res) {
      res.json({});
    });

  app.use(router);
  return app;
}
