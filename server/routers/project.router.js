import express from 'express';
import {
  regularDependenciesRouter,
  devDependenciesRouter,
} from './dependencies.router';
import { globalDependenciesRouter } from './globalDependencies.router';

const projectRouter = express.Router(); // eslint-disable-line

projectRouter.use('/:projectPath/dependencies/global', globalDependenciesRouter);
projectRouter.use('/:projectPath/dependencies/regular', regularDependenciesRouter);
projectRouter.use('/:projectPath/dependencies/dev', devDependenciesRouter);

export { projectRouter };
