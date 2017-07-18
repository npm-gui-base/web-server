import express from 'express';
import globalModulesController from './globalPackages.controller.js';

const globalModulesRouter = express.Router(); // eslint-disable-line


globalModulesRouter.get('/', globalModulesController.whenGet);
globalModulesRouter.put('/', globalModulesController.whenPut);
globalModulesRouter.delete('/:name', globalModulesController.whenDelete);
// others
globalModulesRouter.get('/versions', globalModulesController.whenGetVersions);
globalModulesRouter.get('/nsp', globalModulesController.whenGetNSP);

export default globalModulesRouter;
