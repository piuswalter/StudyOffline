import { HttpError } from './http.error';

// eslint-disable-next-line import/prefer-default-export
export class LoginError extends HttpError {
  constructor(message?: string) {
    super(401, message || 'Login failed');
  }
}
