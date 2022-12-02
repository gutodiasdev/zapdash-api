import { HttpExceptions } from '@/domain/errors';

export class FindUserByIdError extends HttpExceptions {
  constructor() {
    super(404, 'Usuário não encontrado')
  }
}