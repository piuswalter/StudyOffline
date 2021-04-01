import { NextFunction, Request, Response } from 'express';
import * as studysmarterService from '../../utils/studysmarter.service';

export default async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const json = await studysmarterService.login(req.body);
    res.send(json.data);
  } catch (error) {
    next(error);
  }
}
