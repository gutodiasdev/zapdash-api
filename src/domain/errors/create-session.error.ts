import { HttpExceptions } from './http-exceptions';

export class CreateSessionError extends HttpExceptions {
  constructor() {
    super(401, 'Email ou senha estão incorretos. Tente novamente.')
  }
}