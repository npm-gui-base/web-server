const express = require('express');
// const path = require('path');

const staticRouter = express.Router();// eslint-disable-line

module.exports = (staticPath) => {
  staticRouter.use(express.static(
    `${staticPath}`,
    {
      index: ['index.html', 'index.htm'],
    }));

  staticRouter.use('/node_modules', express.static('node_modules'));

  return staticRouter;
};
