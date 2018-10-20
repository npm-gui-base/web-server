const api = require('supertest');
const { app } = require('../dist/server/main.js');

describe('Regular Packages', () => {
  it('should return regular packages', (done) => {
    api(app)
      .get('/api/project/test-project/dependencies/regular')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  }).timeout(60000);
});
