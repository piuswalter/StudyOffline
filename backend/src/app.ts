import express from 'express';
import config from './config';
import loaders from './loaders';
import logger from './utils/logger';

function start() {
  const app = express();
  const { port } = config.system;

  loaders(app);

  app.listen(port, () => {
    logger.info(`[SERVER] Server started on http://localhost:${port}/`);
  });
}

start();
