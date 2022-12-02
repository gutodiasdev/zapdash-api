import { HttpExceptions } from '@/domain/errors';
import { Response, Request, NextFunction } from 'express';

function errorMiddleware(error: HttpExceptions, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500
  const message = error.message || 'Algo deu errado'
  response.status(status).send({
    status: status,
    message: message
  })
}

export { errorMiddleware }