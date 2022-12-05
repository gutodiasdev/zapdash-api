import { RefreshToken } from '@/domain/modules/user/interfaces';
import { Request, Response } from 'express';
import { RefreshTokenService } from '../../services/refresh-token.service';
import { UserRepository } from '../repositories';

export class UpdateRefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshToken) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const result = await this.refreshTokenService.execute(request.body)
    return response.status(200).json(result)
  }
}

const userRepository = new UserRepository()
const refreshTokenService = new RefreshTokenService(userRepository)
const updateRefreshTokenController = new UpdateRefreshTokenController(refreshTokenService)

export { updateRefreshTokenController }