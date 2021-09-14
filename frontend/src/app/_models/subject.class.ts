export abstract class Subject {
  id?: number;

  constructor(id?: number) {
    this.id = id;
  }

  abstract name: string;
  abstract archived: boolean;
}
