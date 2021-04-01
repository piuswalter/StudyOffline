// eslint-disable-next-line import/prefer-default-export
export class HttpError extends Error {
  private statusCode: number;

  constructor(status: number, message: string) {
    super(message);
    this.statusCode = status;
  }

  get status() {
    return this.statusCode;
  }
}
