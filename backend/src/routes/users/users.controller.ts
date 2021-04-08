import { NextFunction, Request, Response } from 'express';
import cheerio from 'cheerio-htmlparser2';
import imageDataURI from 'image-data-uri';
import { Flashcard, FlashcardAnswer } from '../../models';
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

async function encodeAnswer(answer: FlashcardAnswer) {
  return {
    ...answer,
    text: await encodeHtmlImages(answer.text),
  };
}

async function encodeFlashcard(flashcard: Flashcard): Promise<void> {
  [
    flashcard.flashcardinfo.question_html,
    flashcard.flashcardinfo.answer_html,
    flashcard.flashcardinfo.hint_html,
    flashcard.flashcardinfo.solution_html,
  ] = await Promise.all([
    Promise.all(flashcard.flashcardinfo.question_html.map((answr) => encodeAnswer(answr))),
    Promise.all(flashcard.flashcardinfo.answer_html.map((answr) => encodeAnswer(answr))),
    Promise.all(flashcard.flashcardinfo.hint_html.map((answr) => encodeAnswer(answr))),
    encodeHtmlImages(flashcard.flashcardinfo.solution_html),
  ]);

  // // eslint-disable-next-line no-restricted-syntax
  // for (const question of flashcard.flashcardinfo.question_html) {
  //   // eslint-disable-next-line no-await-in-loop
  //   question.text = await encodeHtmlImages(question.text);
  // }

  // // eslint-disable-next-line no-restricted-syntax
  // for (const answer of flashcard.flashcardinfo.answer_html) {
  //   // eslint-disable-next-line no-await-in-loop
  //   answer.text = await encodeHtmlImages(answer.text);
  // }

  // // eslint-disable-next-line no-restricted-syntax
  // for (const hint of flashcard.flashcardinfo.hint_html) {
  //   // eslint-disable-next-line no-await-in-loop
  //   hint.text = await encodeHtmlImages(hint.text);
  // }

  // // eslint-disable-next-line no-await-in-loop
  // // eslint-disable-next-line no-param-reassign
  // flashcard.flashcardinfo.solution_html = await encodeHtmlImages(
  //   flashcard.flashcardinfo.solution_html,
  // );
}

async function encodeFlashcardImages(flashcards: Flashcard[]): Promise<void> {
  await Promise.all(flashcards.map((card) => encodeFlashcard(card)));
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
