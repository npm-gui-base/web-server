import express from 'express';
import dependenciesController from './dependencies.controller.js';
import { getRegularDependencies } from '../../actions/dependencies/getRegularDependencies';

const dependenciesRouter = express.Router({ mergeParams: true }); // eslint-disable-line

dependenciesRouter.get('/', getRegularDependencies);
dependenciesRouter.put('/:repo/', dependenciesController.whenPut);
dependenciesRouter.delete('/:repo/:name', dependenciesController.whenDelete);
// install
// dependenciesRouter.get('/install', dependenciesController.whenGetReinstallAll);
// others
dependenciesRouter.post('/updateAll', dependenciesController.whenPostUpdateAll);
dependenciesRouter.get('/reinstallAll', dependenciesController.whenGetReinstallAll);
dependenciesRouter.get('/nsp', dependenciesController.whenGetNSP);
dependenciesRouter.get('/prune', dependenciesController.whenGetPrune);
dependenciesRouter.get('/dedupe', dependenciesController.whenGetDedupe);

export default dependenciesRouter;
