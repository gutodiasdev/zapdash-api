import { CreateUserRepository, FindUserByEmailRepository } from '@/domain/modules/user/data/interfaces';
import { CreateUserError, FindUserByEmailError } from '@/domain/errors';
import { prisma } from '@/main/config/prisma';
import { DateProvider } from '@/main/helpers';
import { v4 } from 'uuid';

export class UserRepository implements CreateUserRepository, FindUserByEmailRepository {
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