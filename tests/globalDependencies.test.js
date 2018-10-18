const request = require('supertest');
const { app } = require('../dist/server/main.js');


request(app)
  .get('/api/project/dependencies/global')
  .expect('Content-Type', /json/)
  .expect(200, e => console.log(e));
