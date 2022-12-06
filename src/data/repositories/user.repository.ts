import {
  CheckIfRegisteredRepository,
  CreateUserRepository,
  FindRefreshTokenRepository,
  FindRefreshTokenRespository,
  FindUserByEmailRepository,
  UpdateRefreshTokenRepository
} from '@/data/interfaces';
import {
  CreateUserError,
  FindUserByEmailError,
  RefreshTokenNotFoundError
} from '@/domain/errors';
import { prisma } from '@/main/config/prisma';
import { DateProvider } from '@/main/helpers';
import { User } from '@prisma/client';
import { v4 } from 'uuid';

export class UserRepository implements
  CreateUserRepository,
  FindUserByEmailRepository,
  UpdateRefreshTokenRepository,
  FindRefreshTokenRespository,
  UpdateRefreshTokenRepository,
  CheckIfRegisteredRepository {

  async checkIfRegistered(input: CheckIfRegisteredRepository.Input): Promise<CheckIfRegisteredRepository.Output> {
    const user = await prisma.user.findFirst({ where: { email: input.email } })
    return user
  }
  async findRefreshToken(input: FindRefreshTokenRepository.Input): Promise<FindRefreshTokenRepository.Output> {
    const refreshToken = await prisma.refeshToken.findFirst({
      where: {
        token: input.refreshToken
      }
    })
    if (!refreshToken) throw new RefreshTokenNotFoundError()
    return refreshToken
  }

  async updateRefreshToken(input: UpdateRefreshTokenRepository.Input): Promise<UpdateRefreshTokenRepository.Output> {
    await prisma.refeshToken.update({
      where: {
        userId: input.userId,
      }, data: {
        token: input.refreshToken,
        expiresIn: input.expiresIn,
      }
    })
  }

  async create(input: CreateUserRepository.Input): Promise<CreateUserRepository.Output> {
    try {
      const token = v4()
      const expiresIn = new DateProvider().addDays(30)

      const user = await prisma.user.create({
        data: {
          email: input.email,
          password: input.password,
          image: input.image,
          role: input.role,
          refreshToken: {
            create: {
              expiresIn,
              token
            }
          }
        }, include: {
          refreshToken: true
        }
      })

      return {
        id: user.id,
        role: user.role,
        refreshToken: user.refreshToken!.token
      }
    } catch {
      throw new CreateUserError()
    }
  }

  async findEmail(input: FindUserByEmailRepository.Input): Promise<FindUserByEmailRepository.Output> {
    const user = await prisma.user.findUnique({ where: { email: input.email } })
    if (!user) throw new FindUserByEmailError()
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      password: user.password
    }
  }

}