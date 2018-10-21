const api = require('supertest');
const { expect } = require('chai');
const { app } = require('../server');
const { npmGuiPackage } = require('./npmGuiPackage');

describe.only('Global Packages', () => {
  describe('installing', () => {
    it('should install new package globally', (done) => {
      api(app)
        .post('/api/project/test-project/dependencies/global/npm')
        .send({ packageName: 'npm-gui', version: '0.2.1' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({});
          done();
        });
    }).timeout(40000);

    it('should return all global packages (and new one)', (done) => {
      api(app)
        .get('/api/project/test-project/dependencies/global')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.include({ ...npmGuiPackage, required: '0.2.1' });
          done();
        });
    }).timeout(40000);
  });

  describe('uninstalling', () => {
    it('should remove previously installed package', (done) => {
      api(app)
        .delete('/api/project/test-project/dependencies/global/npm/npm-gui')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({});
          done();
        });
    }).timeout(40000);

    it('should return all global packages (without new one)', (done) => {
      api(app)
        .get('/api/project/test-project/dependencies/global')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.not.include({ ...npmGuiPackage, required: '0.2.1' });
          done();
        });
    }).timeout(40000);
  });
});
