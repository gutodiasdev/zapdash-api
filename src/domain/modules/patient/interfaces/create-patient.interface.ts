import { Patient } from '@prisma/client'

export interface CreatePatient {
  execute(input: CreatePatient.Input): Promise<CreatePatient.Output>
}

export namespace CreatePatient {
  export type Input = {
    fullname: string
    document: string
    phone?: string
    wheigth?: string
    age: number
    birthdate: string
  }
  export type Output = Patient
}