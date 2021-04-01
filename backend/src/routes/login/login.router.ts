import { Router } from 'express';
import login from './login.controller';

export default (router: Router) => {
  const loginRouter = Router({ mergeParams: true });

  /**
   * @swagger
   * /login:
   *   post:
   *     tags:
   *       - Authentication
   *     summary: retrieve api token
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 format: email
   *                 description: user email
   *               password:
   *                 type: string
   *                 description: user password
   *     responses:
   *       "200":
   *         description: login successfull
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                   description: api token
   *                 id:
   *                   type: integer
   *                   description: user id
   *                 language:
   *                   type: string
   *                   description: language
   */
  loginRouter.post('/', login);

  router.use('/login', loginRouter);
};
