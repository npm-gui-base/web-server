import express from 'express';
import CrawlerController from './crawler.controller';

const crawlerRouter = express.Router(); // eslint-disable-line
crawlerRouter.get('/:path', CrawlerController.whenGet);

export default crawlerRouter;
