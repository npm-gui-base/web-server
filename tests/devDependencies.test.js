const api = require('supertest');
const { app } = require('../dist/server/main.js');

describe('Dev Packages', () => {
  it('should return dev packages', (done) => {
    api(app)
      .get('/api/project/test-project/dependencies/dev')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  }).timeout(60000);
});
