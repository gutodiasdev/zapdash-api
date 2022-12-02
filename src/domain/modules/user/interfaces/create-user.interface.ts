import { CreateUserError } from '@/domain/errors'

export interface CreateUser {
  execute(input: CreateUser.Input): Promise<CreateUser.Output>
}

export namespace CreateUser {
  type Role = 'MANAGER' | 'EMPLOYEE' | 'ADMINISTRATOR'
  export type Input = {
    email: string,
    password: string,
    image?: string,
    role?: Role
  }
  export type Output = CreateUserError | {
    token: string,
    refreshToken: string,
  }
}