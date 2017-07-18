import express from 'express';
import projectController from './project.controller';

const projectRouter = express.Router(); // eslint-disable-line

projectRouter.get('/', projectController.whenGet);
projectRouter.put('/path/:path', projectController.whenPut);

export default projectRouter;
