// Test bits
var request = require('supertest');

// Component under test
var stories = require('../lib/stories');

// Scaffolding and mocking
var express = require('express');
var app = express();
app.use('/stories', stories());

describe('api returns the correct types', function() {
  it('GET /stories responds with a JSON array', function(done) {
    request(app)
      .get('/stories')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [], done);
  });

  it('GET /stories/:id responds with a JSON object', function(done) {
    request(app)
      .get('/stories/any-guid')
      .expect(200, {}, done);
  });
});
