var express = require('express');
var router = express.Router();
var app = express();

module.exports = stories;

function stories(source) {
  router.route('/')
    .get(function(req, res) {
      res.json(source.get());
    });

  router.route(/^(.+)$/)
    .get(function(req, res) {
      var id = req.originalUrl.substring((req.baseUrl+'/').length);
      var story = source.get(id);
      if (story) res.json(story);
      else res.status(404).end();
    });

  app.use(router);
  return app;
}
