import express from 'express';
import dependenciesController from './dependencies.controller.js';

const dependenciesRouter = express.Router(); // eslint-disable-line

dependenciesRouter.get('/', dependenciesController.whenGet);
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
