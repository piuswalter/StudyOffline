import { Router } from 'express';
import { getSubjects, getFlashcards } from './users.controller';

export default (router: Router) => {
  const userRouter = Router();

  /**
   * @swagger
   * /users/{userId}/subjects:
   *   get:
   *     tags:
   *       - Subjects
   *     summary: get subjects from specific user
   *     security:
   *       - token: []
   *     parameters:
   *       - in: path
   *         name: userId
   *         description: ID of the user
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       "200":
   *         description: list of subjects
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                     description: subject id
   *                   name:
   *                     type: string
   *                     description: name of the subject
   *                   user_count:
   *                     type: integer
   *                     description: count of the users subscribed to the subject
   *                   flashcards:
   *                     type: integer
   *                     description: count of the flashcards within the subject
   */
  userRouter.get('/:userId/subjects', getSubjects);

  /**
   * @swagger
   * /users/{userId}/subjects/{subjectId}/flashcards:
   *   get:
   *     tags:
   *       - Flashcards
   *     summary: get flashcards from specific subject and user
   *     security:
   *       - token: []
   *     parameters:
   *       - in: path
   *         name: userId
   *         description: ID of the user
   *         required: true
   *         schema:
   *           type: string
   *       - in: path
   *         name: subjectId
   *         description: ID of the subject
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       "200":
   *         description: list of flashcards
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                     description: flashcard id
   *                   flashcardinfo:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: integer
   *                         description: some other flashcard id :)
   *                       creator:
   *                         type: integer
   *                         description: id of the user that created the flashcard
   *                       question_html:
   *                         type: array
   *                         items:
   *                           type: object
   *                           properties:
   *                             text:
   *                               type: string
   *                               description: html formatted question
   *                             is_correct:
   *                               type: boolean
   *                               description: actually useless? :)
   *                       answer_html:
   *                         type: array
   *                         items:
   *                           type: object
   *                           properties:
   *                             text:
   *                               type: string
   *                               description: html formatted answer
   *                             is_correct:
   *                               type: boolean
   *                               description: also actually useless? :)
   *                       hint_html:
   *                         type: array
   *                         items:
   *                           type: object
   *                       solution_html:
   *                         type: string
   *                       tags:
   *                         type: array
   *                         items:
   *                           type: object
   */
  userRouter.get('/:userId/subjects/:subjectId/flashcards', getFlashcards);

  router.use('/users', userRouter);
};
