import { NextFunction, Request, Response } from 'express';
import * as studysmarterService from '../../utils/studysmarter.service';

export async function getSubjects(req: Request, res: Response, next: NextFunction) {
  try {
    const { token, params: { userId } } = req as any;
    const json = await studysmarterService.getSubjects(userId, token);
    res.send(json.data);
  } catch (error) {
    next(error);
  }
}

export async function getFlashcards(req: Request, res: Response, next: NextFunction) {
  try {
    const { token, params: { userId, subjectId } } = req as any;
    const json = await studysmarterService.getFlashcards(userId, subjectId, token);
    res.send(json.data);
  } catch (error) {
    next(error);
  }
}
