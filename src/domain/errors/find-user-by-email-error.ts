import { HttpExceptions } from '@/domain/errors';

export class FindUserByEmailError extends HttpExceptions {
  constructor() {
    super(404, 'Usuário não encontrado')
  }
}