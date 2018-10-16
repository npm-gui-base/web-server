import express from 'express';
import globalModulesController from './globalPackages.controller.js';

import { getGlobalDependencies } from '../../actions/dependencies/getGlobalDependencies';

const globalModulesRouter = express.Router(); // eslint-disable-line

globalModulesRouter.get('/', getGlobalDependencies);
globalModulesRouter.put('/', globalModulesController.whenPut);
globalModulesRouter.delete('/:name', globalModulesController.whenDelete);
// others
globalModulesRouter.get('/versions', globalModulesController.whenGetVersions);
globalModulesRouter.get('/nsp', globalModulesController.whenGetNSP);

export default globalModulesRouter;
