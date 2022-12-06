import { RefeshToken, User } from '@prisma/client'

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

export interface FindRefreshTokenRespository {
  findRefreshToken(input: FindRefreshTokenRepository.Input): Promise<FindRefreshTokenRepository.Output>
}

export namespace FindRefreshTokenRepository {
  export type Input = {
    refreshToken: string
  }

  export type Output = RefeshToken
}

export interface UpdateRefreshTokenRepository {
  updateRefreshToken(input: UpdateRefreshTokenRepository.Input): Promise<UpdateRefreshTokenRepository.Output>
}

export namespace UpdateRefreshTokenRepository {
  export type Input = {
    userId: string,
    refreshToken: string,
    expiresIn: Date
  }

  export type Output = void
}

export interface CheckIfRegisteredRepository {
  checkIfRegistered(input: CheckIfRegisteredRepository.Input): Promise<CheckIfRegisteredRepository.Output>
}

export namespace CheckIfRegisteredRepository {
  export type Input = {
    email: string
  }

  export type Output = User | null
}