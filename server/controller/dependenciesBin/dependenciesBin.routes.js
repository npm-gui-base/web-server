const express = require('express');
const modulesController = require('./dependenciesBin.controller.js');

const modulesRouter = express.Router(); // eslint-disable-line
modulesRouter.get('/', modulesController.whenGet);

module.exports = modulesRouter;
