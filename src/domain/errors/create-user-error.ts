import { HttpExceptions } from './http-exceptions';

export class CreateUserError extends HttpExceptions {
  constructor() {
    super(500, 'Houve uma falha ao tentar criar o usuário')
  }
}