import { IStudySmarterSubject } from '.';
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
}
