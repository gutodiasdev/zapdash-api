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
  export type Output = {
    id: string,
    role: string,
    refreshToken: string,
  }
}

export interface FindUserByEmailRepository {
  findEmail(input: FindUserByEmailRepository.Input): Promise<FindUserByEmailRepository.Output>
}

export namespace FindUserByEmailRepository {
  export type Input = {
    email: string
  }

  export type Output = {
    id: string,
    email: string,
    password: string,
    role: string,
  }
}