import express from 'express';
import searchController from './search.controller.js';

const searchRouter = express.Router();// eslint-disable-line

searchRouter.post('/:repo', searchController.whenPost);

export default searchRouter;
