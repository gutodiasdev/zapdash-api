import { CreateUserRepository } from '@/data/interfaces';
import { CreateUserError } from '@/domain/errors';
import { prisma } from '@/main/config/prisma';

export class UserRepository implements CreateUserRepository {
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

}