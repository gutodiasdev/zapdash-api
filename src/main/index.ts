import '../main/config/module-alias'
import 'express-async-errors'
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { PORT } from './config'
import { userRouter } from '@/domain/modules/user/routes/user.routes'
import { errorMiddleware } from '@/main/middlewares'
import { patientRouter } from '@/domain/modules/patient/routes/patient.routes'

const app = express()
app.use(express.json())
app.use('/users', userRouter)
app.use('/patients', patientRouter)
app.use(errorMiddleware)
app.listen(PORT, () => console.log('Running on port: ' + PORT))