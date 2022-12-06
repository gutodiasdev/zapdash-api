import { CreatePatientRepository, FindPatientRepository } from '@/data/interfaces';
import { prisma } from '@/main/config';
import { Prisma, Patient } from '@prisma/client';

export class PatientRepository implements CreatePatientRepository, FindPatientRepository {
  async create(input: Prisma.PatientCreateInput): Promise<Patient> {
    const patient = await prisma.patient.create({ data: input })
    return patient
  }

  async findPatient(input: FindPatientRepository.Input): Promise<Patient | null> {
    const patient = await prisma.patient.findFirst({
      where: {
        OR: [
          {
            fullname: {
              contains: input.fullname,
              mode: 'insensitive'
            }
          },
          {
            document: input.document
          }
        ]
      }
    })
    if (!patient) return null;
    return patient
  }
}