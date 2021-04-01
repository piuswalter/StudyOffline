import {
  Express, NextFunction, Request, Response,
} from 'express';
import bodyParser from 'body-parser';
import { HttpError, NotFoundError } from '../errors';
import config from '../config';
import logger from '../utils/logger';
import routes, { docRoutes } from '../routes';

export default (app: Express) => {
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

  const { docs, prefix } = config.system.api;
  app.use(docs, docRoutes());
  app.use(prefix, routes());

  // catch 404 error and forward to handler
  app.use(({ path }: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError(`${path} not found`));
  });

  // return and log error message
  app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err);
    }
    const { status, message } = err;
    logger.error(`${status} - ${message}`);
    return res.status(status || 500)
      .send({ error: { status, message } })
      .end();
  });
};
