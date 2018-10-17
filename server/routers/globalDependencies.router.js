import express from 'express';

import { getGlobalDependencies } from '../actions/dependencies/getGlobalDependencies';

const globalDependenciesRouter = express.Router(); // eslint-disable-line

globalDependenciesRouter.get('/', getGlobalDependencies);
// globalModulesRouter.put('/', globalModulesController.whenPut);
// globalModulesRouter.delete('/:name', globalModulesController.whenDelete);
// // others
// globalModulesRouter.get('/versions', globalModulesController.whenGetVersions);
// globalModulesRouter.get('/nsp', globalModulesController.whenGetNSP);

export { globalDependenciesRouter };
