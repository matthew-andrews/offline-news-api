require('array.prototype.find');
var superagent = require('superagent');
var FeedParser = require('feedparser');
var THREE_MINUTES = 180000;

module.exports = function(options) {
  return new Source(options);
};

function Source(options) {
  this._url = options.url;
  this._stories = [];
  this._updater = setInterval(Source.prototype.update.bind(this), THREE_MINUTES);
  this.update();
}

Source.prototype.update = function() {
  var set = this.set.bind(this);
  var stories = [];
  superagent
    .get(this._url)
    .pipe(new FeedParser())
    .on('readable', function() {
      var item, story;
      while ((item = this.read())) {
        stories.push({
          guid: item.guid,
          author: item['dc:creator']['#'],
          title: item.title,
          date: item.pubDate,
          body: item.description
        });
      }
    })
    .on('end', function() {
       set(stories);
    });
};

Source.prototype.set = function(stories) {
  this._stories = stories;
};

Source.prototype.get = function(guid) {
  if (guid) return this._stories.find(function(story) {
    return story.guid === guid;
  });
  return this._stories;
};

Source.prototype.destroy = function() {
  clearInterval(this._updater);
  this._updater = this._stories = undefined;
};
