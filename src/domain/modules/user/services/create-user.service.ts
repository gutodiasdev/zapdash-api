import { hash } from 'bcryptjs'
import { CheckIfRegisteredRepository, CreateUserRepository } from '@/data/interfaces';
import { UserAlreadyExistsError } from '@/domain/errors';
import { CreateUser } from '@/domain/modules/user/interfaces';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@/main/config';

export class CreateUserService implements CreateUser {
  constructor(private readonly userRepository: CreateUserRepository & CheckIfRegisteredRepository) {}

  async execute(input: CreateUser.Input): Promise<CreateUser.Output> {
    const { password: unhashedPassword } = input

    const userAlreadyExists = await this.userRepository.checkIfRegistered({ email: input.email })

    if (userAlreadyExists) throw new UserAlreadyExistsError()

    const passwordHash = await hash(unhashedPassword, 10)

    const { id, role, refreshToken } = await this.userRepository.create({ ...input, password: passwordHash })

    const token = sign({
      id,
      role
    }, JWT_SECRET, {
      subject: id
    })

    return {
      token,
      refreshToken
    }
  }
}