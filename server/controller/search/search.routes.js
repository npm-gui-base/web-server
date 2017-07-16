const express = require('express');
const searchController = require('./search.controller.js');

const searchRouter = express.Router();// eslint-disable-line

searchRouter.post('/:repo', searchController.whenPost);

module.exports = searchRouter;
