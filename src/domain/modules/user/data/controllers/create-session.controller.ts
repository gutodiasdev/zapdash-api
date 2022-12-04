import { CreateSession } from '@/domain/modules/user/interfaces';
import { Request, Response } from 'express';

export class CreateSessionController {
  constructor(private readonly createSession: CreateSession) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const result = await this.createSession.execute(request.body)
    return response.status(200).json(result)
  }
}