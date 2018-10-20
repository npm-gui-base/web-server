const api = require('supertest');
const { app } = require('../dist/server/main.js');

describe('GLobal Packages', () => {
  it('should return global packages', (done) => {
    api(app)
      .get('/api/project/test-project/dependencies/global')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  }).timeout(60000);
});
