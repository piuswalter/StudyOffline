import Axios from 'axios';
import cheerio from 'cheerio-htmlparser2';
import { Readable } from 'stream';
import { Flashcard, FlashcardAnswer } from '../models';
import logger from './logger';

export default class FlashcardEncoder extends Readable {
  private index = 0;

  private flashcards: Flashcard[] = [];

  constructor(flashcards: Flashcard[]) {
    super();
    this.flashcards = flashcards;
  }

  /* eslint-disable no-underscore-dangle */
  async _read() {
    if (this.index < this.flashcards.length) {
      const prefix = this.index ? ',' : '[';
      this.push(prefix + JSON.stringify(await this.encodeFlashcard(this.flashcards[this.index])));
      this.index += 1;
    } else {
      this.push(']');
      this.push(null); // end stream if all flashcards have been encoded
    }
  }

  async encodeFlashcard(flashcard: Flashcard): Promise<Flashcard> {
    const encCard = { ...flashcard };
    [
      encCard.flashcardinfo.question_html,
      encCard.flashcardinfo.answer_html,
      encCard.flashcardinfo.hint_html,
      encCard.flashcardinfo.solution_html,
    ] = await Promise.all([
      Promise.all(flashcard.flashcardinfo.question_html.map((answr) => this.encodeAnswer(answr))),
      Promise.all(flashcard.flashcardinfo.answer_html.map((answr) => this.encodeAnswer(answr))),
      Promise.all(flashcard.flashcardinfo.hint_html.map((answr) => this.encodeHtmlImages(answr))),
      this.encodeHtmlImages(flashcard.flashcardinfo.solution_html),
    ]);
    return encCard;
  }

  async encodeAnswer(answer: FlashcardAnswer) {
    return {
      ...answer,
      text: await this.encodeHtmlImages(answer.text),
    };
  }

  async encodeHtmlImages(text: string) {
    const raw = cheerio.load(text || '');
    // eslint-disable-next-line no-restricted-syntax
    for (const img of raw('img').get()) {
      try {
        // eslint-disable-next-line no-await-in-loop
        img.attribs.src = await this.encodeFromURL(img.attribs.src);
      } catch (err) {
        logger.error(err);
      }
    }
    return raw.html();
  }

  // eslint-disable-next-line class-methods-use-this
  async encodeFromURL(imageURL: string): Promise<string> {
    const { data, headers } = await Axios.get(imageURL, { responseType: 'arraybuffer' });
    const prefix = `data:${headers['content-type']};base64, `;
    return prefix + Buffer.from(data, 'binary').toString('base64');
  }
}
