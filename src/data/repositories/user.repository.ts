import { CreateUserRepository, FindUserByEmailRepository } from '@/data/interfaces';
import { CreateUserError, FindUserByEmailError } from '@/domain/errors';
import { prisma } from '@/main/config/prisma';

export class UserRepository implements CreateUserRepository, FindUserByEmailRepository {
  async create(input: CreateUserRepository.Input): Promise<CreateUserRepository.Output> {
    try {
      await prisma.user.create({
        data: {
          email: input.email,
          password: input.password,
          image: input.image,
          role: input.role,
        }
      })
    } catch {
      throw new CreateUserError()
    }
  }

  async findEmail(input: FindUserByEmailRepository.Input): Promise<FindUserByEmailRepository.Output> {
    const user = await prisma.user.findUnique({ where: { email: input.email } })
    if (!user) return false
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    }
  }

}