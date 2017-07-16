const express = require('express');

const globalModulesRouter = express.Router();// eslint-disable-line

const globalModulesController = require('./globalPackages.controller.js');

globalModulesRouter.get('/', globalModulesController.whenGet);
globalModulesRouter.put('/:repo', globalModulesController.whenPut);
globalModulesRouter.delete('/:repo/:name', globalModulesController.whenDelete);
// others
globalModulesRouter.get('/versions', globalModulesController.whenGetVersions);
globalModulesRouter.get('/nsp', globalModulesController.whenGetNSP);

module.exports = globalModulesRouter;
