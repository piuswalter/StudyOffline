import { Origin } from './origin.enum';

export interface IAnswer {
  text: string;
  isCorrect: boolean;
}

interface FlashcardIndices {
  id?: number;
  subjectId: number;
}

export abstract class Flashcard {
  id?: number;
  subjectId: number;

  constructor(ind: FlashcardIndices) {
    this.id = ind.id;
    this.subjectId = ind.subjectId;
  }

  abstract readonly origin: Origin;
  abstract question: string;
  abstract answers: IAnswer[];
  abstract hints: string[];
  abstract solution: string;
  abstract tags: number[];

  get withoutId(): Flashcard {
    delete this.id;
    return this;
  }
}
