import { CreatePatient } from '@/domain/modules/patient/interfaces';
import { CreatePatientService } from '@/domain/modules/patient/services';
import { Request, Response } from 'express';
import { PatientRepository } from '@/data/repositories';

export class CreatePatientController {
  constructor(private readonly createPatientService: CreatePatient) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const result = await this.createPatientService.execute(request.body)
    return response.status(201).json(result)
  }
}

const patientRepository = new PatientRepository()
const createPatientService = new CreatePatientService(patientRepository)
export const createPatientController = new CreatePatientController(createPatientService)