export abstract class Tag {
  subjectId: number;

  constructor(subjectId: number) {
    this.subjectId = subjectId;
  }

  abstract name: string;
  abstract studySmarterId: number | undefined;
}
