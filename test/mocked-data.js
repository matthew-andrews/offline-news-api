// Test bits
var request = require('supertest');

// Component under test
var stories = require('../lib/stories');

// Scaffolding and mocking
var mockStory1 = { title: 'Mock Story 1', guid: '248891' };
var mockStory2 = { title: 'Mock Story 2', guid: '248890' };
var mockSource = {
  get: function(guid) {
    if (guid) return mockStory1;
    return [mockStory1, mockStory2];
  }
};
var express = require('express');
var app = express();
app.use('/stories', stories(mockSource));

describe('api returns with mocked data', function() {
  it('GET /stories responds with correct JSON array', function(done) {
    request(app)
      .get('/stories')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [mockStory1, mockStory2], done);
  });

  it('GET /stories/:id responds with correct JSON object', function(done) {
    request(app)
      .get('/stories/tech-blog/?p=248891')
      .expect(200, mockStory1, done);
  });
});
