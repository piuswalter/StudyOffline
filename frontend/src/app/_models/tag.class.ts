export abstract class Tag {
  id?: number;

  constructor(id?: number) {
    this.id = id;
  }

  abstract name: string;
}
