import express from 'express';
// import dependenciesController from './dependencies.controller.js';
import {
  getRegularDependencies,
  getDevDependencies,
} from '../../actions/dependencies/getProjectDependencies';
import {
  addRegularDependencies,
  addDevDependencies,
} from '../../actions/dependencies/addProjectDependencies';

const regularDependenciesRouter = express.Router({ mergeParams: true }); // eslint-disable-line

regularDependenciesRouter.get('/', getRegularDependencies);
regularDependenciesRouter.post('/:repoName/', addRegularDependencies);
// regularDependenciesRouter.delete('/:repoName/:packageName', dependenciesController.whenDelete);
// // install
// // regularDependenciesRouter.get('/install', dependenciesController.whenGetReinstallAll);
// // others
// regularDependenciesRouter.post('/updateAll', dependenciesController.whenPostUpdateAll);
// regularDependenciesRouter.get('/reinstallAll', dependenciesController.whenGetReinstallAll);
// regularDependenciesRouter.get('/nsp', dependenciesController.whenGetNSP);
// regularDependenciesRouter.get('/prune', dependenciesController.whenGetPrune);
// regularDependenciesRouter.get('/dedupe', dependenciesController.whenGetDedupe);


const devDependenciesRouter = express.Router({ mergeParams: true }); // eslint-disable-line

devDependenciesRouter.get('/', getDevDependencies);
devDependenciesRouter.post('/:repoName/', addDevDependencies);
// devDependenciesRouter.delete('/:repoName/:packageName', dependenciesController.whenDelete);
// // install
// // devDependenciesRouter.get('/install', dependenciesController.whenGetReinstallAll);
// // others
// devDependenciesRouter.post('/updateAll', dependenciesController.whenPostUpdateAll);
// devDependenciesRouter.get('/reinstallAll', dependenciesController.whenGetReinstallAll);
// devDependenciesRouter.get('/nsp', dependenciesController.whenGetNSP);
// devDependenciesRouter.get('/prune', dependenciesController.whenGetPrune);
// devDependenciesRouter.get('/dedupe', dependenciesController.whenGetDedupe);

export { devDependenciesRouter, regularDependenciesRouter };
