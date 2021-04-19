import { Flashcard, IAnswer } from '../flashcard.class';
import { Origin } from '../origin.enum';

export interface IInternalFlashcard {
  id: number;
  question: string;
  answers: IAnswer[];
  hints: string[];
  solution: string;
  tags: number[];
}

export class InternalFlashcard extends Flashcard {
  readonly origin = Origin.internal;
  question: string;
  answers: IAnswer[];
  hints: string[];
  solution: string;
  tags: number[];

  constructor(flashcard: IInternalFlashcard, subjectId: number) {
    super({ subjectId });
    this.question = flashcard.question;
    this.answers = flashcard.answers;
    this.hints = flashcard.hints;
    this.solution = flashcard.solution;
    this.tags = flashcard.tags;
  }
}
