import { Patient, Prisma } from '@prisma/client'

export interface FindPatientRepository {
  findPatient(input: FindPatientRepository.Input): Promise<FindPatientRepository.Output>
}

export namespace FindPatientRepository {
  export type Input = {
    fullname?: string
    document?: string
  }
  export type Output = Patient | null
}

export interface CreatePatientRepository {
  create(input: Prisma.PatientCreateInput): Promise<Patient>
}
