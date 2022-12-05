import { CreateSession } from '@/domain/modules/user/interfaces';
import { FindUserByEmailRepository } from '@/domain/modules/user/data/interfaces';
import { CreateSessionError } from '@/domain/errors';
import { compare } from 'bcryptjs';
import { TokenGenerator } from '@/main/helpers';

export class CreateSessionService implements CreateSession {
  constructor(private readonly userRepository: FindUserByEmailRepository) {}

  async execute(input: CreateSession.Input): Promise<CreateSession.Output> {
    const user = await this.userRepository.findEmail({ email: input.email })

    const passwordMatch = await compare(input.password, user.password)

    if (!passwordMatch) throw new CreateSessionError()

    const token = TokenGenerator.sign({ id: user.id, email: user.email, role: user.role })

    return { token }
  }
}