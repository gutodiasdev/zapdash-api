import { hash } from 'bcryptjs'
import { CreateUserRepository, FindUserByEmailRepository } from '@/data/interfaces';
import { UserAlreadyExistsError } from '@/domain/errors';
export class CreateUserService {
  constructor(private readonly userRepository: CreateUserRepository & FindUserByEmailRepository) {}

  async execute(input: CreateUserRepository.Input): Promise<CreateUserRepository.Output> {
    const { password: unhashedPassword } = input
    const userAlreadyExists = await this.userRepository.findEmail({ email: input.email })
    if (userAlreadyExists) throw new UserAlreadyExistsError()
    const passwordHash = await hash(unhashedPassword, 10)
    await this.userRepository.create({ ...input, password: passwordHash })
  }
}