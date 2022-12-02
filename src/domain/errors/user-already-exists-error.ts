import { HttpExceptions } from '@/domain/errors';

export class UserAlreadyExistsError extends HttpExceptions {
  constructor() {
    super(406, 'Usuário já existe')
  }
}