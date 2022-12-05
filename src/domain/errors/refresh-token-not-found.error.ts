import { HttpExceptions } from './http-exceptions';

export class RefreshTokenNotFoundError extends HttpExceptions {
  constructor() {
    super(403, 'Token is missing or is invalid!')
  }
}