import {
  NextFunction, Request, Response, Router,
} from 'express';
import { LoginError } from '../errors';
import loginRoutes from './login/login.router';
import userRoutes from './users/users.router';

export * from './docs/docs.router';

function checkToken(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;

  if (auth && auth.split(' ').length === 2) {
    const token = auth.split(' ')[1];
    // eslint-disable-next-line dot-notation
    req['token'] = token;
    return next();
  }

  throw new LoginError('No token specified');
}

export default () => {
  const router = Router();

  loginRoutes(router);
  router.use(checkToken);
  userRoutes(router);

  return router;
};
