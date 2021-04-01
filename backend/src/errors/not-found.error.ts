import { HttpError } from './http.error';

// eslint-disable-next-line import/prefer-default-export
export class NotFoundError extends HttpError {
  constructor(message?: string) {
    super(404, message || 'Path not found');
  }
}
