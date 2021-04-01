import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import docs from './docs.controller';

// eslint-disable-next-line import/prefer-default-export
export function docRoutes() {
  const docsRouter = Router();

  docsRouter.use('/', swaggerUi.serve, docs);

  return docsRouter;
}
