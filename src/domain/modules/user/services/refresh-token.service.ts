import { RefreshToken } from '@/domain/modules/user/interfaces'
import { FindRefreshTokenRespository, UpdateRefreshTokenRepository } from '@/data/interfaces';
import { DateProvider, TokenGenerator } from '@/main/helpers';

const dateProvider = new DateProvider()

export class RefreshTokenService implements RefreshToken {
  constructor(private readonly userRepository: FindRefreshTokenRespository & UpdateRefreshTokenRepository) {}

  async execute(input: RefreshToken.Input): Promise<RefreshToken.Output> {
    const currentRefreshToken = await this.userRepository.findRefreshToken(input)
    const isExpired = dateProvider.isExpired(currentRefreshToken.expiresIn)
    if (isExpired) {
      const newRefreshToken = TokenGenerator.generateRefreshToken()
      const newExpiresIn = dateProvider.addDays(30)
      await this.userRepository.updateRefreshToken({ userId: currentRefreshToken.userId, refreshToken: newRefreshToken, expiresIn: newExpiresIn })
      return {
        refreshToken: newRefreshToken
      }
    }
    return {
      refreshToken: currentRefreshToken.token
    }
  }

}