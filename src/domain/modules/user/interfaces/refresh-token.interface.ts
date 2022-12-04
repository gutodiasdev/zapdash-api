export interface RefreshToken {
  execute(input: RefreshToken.Input): Promise<RefreshToken.Output>
}

export namespace RefreshToken {
  export type Input = {
    refreshToken: string
  }

  export type Output = string
}