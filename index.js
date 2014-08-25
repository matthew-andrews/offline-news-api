var express = require('express');
var cors = require('cors');
var stories = require('./lib/stories');
var rssSource = require('./lib/rss-source');
var port = Number(process.env.PORT || 3000);
var feedUrl = process.argv.indexOf('--local') !== -1
  ? 'http://localhost:8080/sample-rss.xml'
  : 'http://feeds2.feedburner.com/ft/tech-blog';

express()
  .use(cors())
  .get('/', function(req, res) {
    res.redirect(302, 'https://github.com/matthew-andrews/offline-news-api');
  })
  .use('/stories', stories(rssSource({ url: feedUrl })))
  .listen(port);
console.log('listening on '+port);
