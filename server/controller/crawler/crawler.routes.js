const express = require('express');
const crawlerController = require('./crawler.controller');

const crawlerRouter = express.Router();// eslint-disable-line
crawlerRouter.get('/:path', crawlerController.whenGet);

module.exports = crawlerRouter;
