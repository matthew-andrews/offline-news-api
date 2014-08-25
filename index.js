var express = require('express');
var cors = require('cors');
var stories = require('./lib/stories');
var port = Number(process.env.PORT || 3000);

express()
  .use(cors())
  .get('/', function(req, res) {
    res.redirect(302, 'https://github.com/matthew-andrews/offline-news-api');
  })
  .use('/stories', stories())
  .listen(port);
console.log('listening on '+port);
