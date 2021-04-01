import { Express } from 'express';
import logger from '../utils/logger';
import expressLoader from './express';

export default (app: Express) => {
  try {
    expressLoader(app);
    logger.info('[SERVER] Express loaded');
  } catch (error) {
    logger.error('[SERVER] Error during startup: ', error);
    process.exit();
  }
};
