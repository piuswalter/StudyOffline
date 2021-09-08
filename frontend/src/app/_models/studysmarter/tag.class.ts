import { IStudySmarterTag } from '.';
import { Tag } from '../tag.class';

export class StudySmarterTag extends Tag {
  studySmarter: IStudySmarterTag;

  constructor(tag: IStudySmarterTag, id?: number) {
    super(id);
    this.studySmarter = tag;
  }

  get name(): string {
    return this.studySmarter.name;
  }
}
