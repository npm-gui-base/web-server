import express from 'express';

import { getGlobalDependencies } from '../actions/dependencies/getGlobalDependencies';
import { addGlobalDependencies } from '../actions/dependencies/addGlobalDependencies';
import { deleteGlobalDependencies } from '../actions/dependencies/deleteGlobalDependencies';

const globalDependenciesRouter = express.Router(); // eslint-disable-line

globalDependenciesRouter.get('/', getGlobalDependencies);
globalDependenciesRouter.post('/:repoName', addGlobalDependencies);
// globalModulesRouter.put('/', globalModulesController.whenPut);
globalDependenciesRouter.delete('/:repoName/:name', deleteGlobalDependencies);
// // others
// globalModulesRouter.get('/versions', globalModulesController.whenGetVersions);
// globalModulesRouter.get('/nsp', globalModulesController.whenGetNSP);

export { globalDependenciesRouter };
