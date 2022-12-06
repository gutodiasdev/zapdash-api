import { CreatePatientRepository, FindPatientRepository } from '@/data/interfaces';
import { CreatePatient } from '@/domain/modules/patient/interfaces';
import { Patient, Prisma } from '@prisma/client';

export class CreatePatientService implements CreatePatient {
  constructor(private readonly patientRepository: FindPatientRepository & CreatePatientRepository) {}
  async execute(input: CreatePatient.Input): Promise<CreatePatient.Output> {
    const patientAlreadyExists = await this.patientRepository.findPatient({
      fullname: input.fullname,
      document: input.document,
    })
    if (patientAlreadyExists) return patientAlreadyExists
    const createdUser = await this.patientRepository.create(input)
    return createdUser
  }
}