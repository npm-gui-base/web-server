const express = require('express');
const projectController = require('./project.controller');

const projectRouter = express.Router(); // eslint-disable-line

projectRouter.get('/', projectController.whenGet);
projectRouter.put('/path/:path', projectController.whenPut);

module.exports = projectRouter;
