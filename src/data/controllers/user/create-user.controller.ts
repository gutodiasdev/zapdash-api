import { Request, Response } from 'express';
import { CreateUserService } from '@/domain/modules/user/services';

export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}
  async handle(request: Request, response: Response): Promise<Response> {
    await this.createUserService.execute(request.body)
    return response.status(200).send()
  }
}