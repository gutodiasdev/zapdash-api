import { CreateUserError, FindUserByIdError, HttpExceptions } from '@/domain/errors'
import { User } from '@prisma/client'

export interface CreateUserRepository {
  create(input: CreateUserRepository.Input): Promise<CreateUserRepository.Output>
}

export namespace CreateUserRepository {
  type Role = 'MANAGER' | 'EMPLOYEE' | 'ADMINISTRATOR'
  export type Input = {
    email: string,
    password: string,
    image?: string | undefined,
    role?: Role | undefined,
  }
  export type Output = void | CreateUserError
}

export interface FindUserByIdRepository {
  find(input: FindUserByIdRepository.Input): Promise<FindUserByIdRepository.Output>
}

export namespace FindUserByIdRepository {
  export type Input = {
    id: string
  }

  export type Output = FindUserByIdError | Partial<User>
}
