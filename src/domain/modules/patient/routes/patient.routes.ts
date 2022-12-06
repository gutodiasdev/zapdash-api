import { Router } from 'express'
import { createPatientController } from '@/data/controllers'

const patientRouter = Router()

patientRouter.post('/create', async (req, res) => await createPatientController.handle(req, res))

export { patientRouter }