import { NextFunction, Request, Response } from 'express';
import cheerio from 'cheerio-htmlparser2';
import imageDataURI from 'image-data-uri';
import { Flashcard } from '../../models';
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

async function encodeHtmlImages(text: string) {
  const raw = cheerio.load(text);
  // eslint-disable-next-line no-restricted-syntax
  for (const img of raw('img').get()) {
    // eslint-disable-next-line no-await-in-loop
    const enc: string = await imageDataURI.encodeFromURL(img.attribs.src);
    img.attribs.src = enc;
  }
  return raw.html();
}

async function encodeFlashcardImages(flashcards: Flashcard[]) {
  // eslint-disable-next-line no-restricted-syntax
  for (const flashcard of flashcards) {
    // eslint-disable-next-line no-restricted-syntax
    for (const question of flashcard.flashcardinfo.question_html) {
      // eslint-disable-next-line no-await-in-loop
      question.text = await encodeHtmlImages(question.text);
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const answer of flashcard.flashcardinfo.answer_html) {
      // eslint-disable-next-line no-await-in-loop
      answer.text = await encodeHtmlImages(answer.text);
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const hint of flashcard.flashcardinfo.hint_html) {
      // eslint-disable-next-line no-await-in-loop
      hint.text = await encodeHtmlImages(hint.text);
    }

    // eslint-disable-next-line no-await-in-loop
    flashcard.flashcardinfo.solution_html = await encodeHtmlImages(
      flashcard.flashcardinfo.solution_html,
    );
  }
}

export async function getFlashcards(req: Request, res: Response, next: NextFunction) {
  try {
    const { token, params: { userId, subjectId } } = req as any;
    const json = await studysmarterService.getFlashcards(userId, subjectId, token);
    await encodeFlashcardImages(json.data.results);
    res.send(json.data);
  } catch (error) {
    next(error);
  }
}
