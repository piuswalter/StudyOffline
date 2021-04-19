import { IStudySmarterSubject } from '.';
import { Flashcard } from '../flashcard.class';
import { Subject } from '../subject.class';

export class StudySmarterSubject extends Subject {
  studySmarter: IStudySmarterSubject;

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
