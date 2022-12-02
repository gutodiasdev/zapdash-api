export class CreateUserError extends Error {
  constructor() {
    super('Houve uma falha ao tentar criar o usuário')
    this.name = 'CreateUserError'
  }
}