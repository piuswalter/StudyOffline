import { IStudySmarterTag } from '.';
import { Tag } from '../tag.class';

export class StudySmarterTag extends Tag {
  studySmarter: IStudySmarterTag;

  constructor(tag: IStudySmarterTag, subjectId: number) {
    super(subjectId);
    this.studySmarter = tag;
  }

  get name(): string {
    return this.studySmarter.name;
  }

  get studySmarterId(): number {
    return this.studySmarter.id;
  }
}
