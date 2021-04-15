import { Flashcard } from '../flashcard.class';
import { Subject } from '../subject.class';

/* eslint-disable camelcase */
export interface IStudySmarterSubject {
  id: number;
  name: string;
  /* eslint-disable @typescript-eslint/naming-convention */
  user_count: number;
  last_used: Date;
  /* eslint-enable @typescript-eslint/naming-convention */
  flashcards: number;
  archived: boolean;
}

export class StudySmarterSubject extends Subject {
  private studySmarter: IStudySmarterSubject;

  constructor(subject: IStudySmarterSubject, id?: number) {
    super(id);
    this.studySmarter = subject;
  }

  get name(): string {
    return this.studySmarter.name;
  }

  get archived(): boolean {
    return this.studySmarter.archived;
  }

  get flashcards(): Flashcard[] {
    return [];
  }
}
