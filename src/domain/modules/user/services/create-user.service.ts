import { hash } from 'bcryptjs'
import { CreateUserRepository } from '@/data/interfaces';
export class CreateUserService {
  constructor(private readonly userRepository: CreateUserRepository) {}

  async execute(input: CreateUserRepository.Input): Promise<CreateUserRepository.Output> {
    const { password: unhashedPassword } = input
    const passwordHash = await hash(unhashedPassword, 10)
    await this.userRepository.create({ ...input, password: passwordHash })
  }
}