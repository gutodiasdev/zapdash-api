import { Router } from 'express'
import { CreateUserController } from '@/domain/modules/user/data/controllers'
import { UserRepository } from '@/domain/modules/user/data/repositories'
import { CreateUserService } from '@/domain/modules/user/services'
import { CreateSessionService } from '../services/create-session.service'
import { CreateSessionController } from '../data/controllers/create-session.controller'

const userRouter = Router()
const userRepository = new UserRepository()
const createUserService = new CreateUserService(userRepository)
const createUserController = new CreateUserController(createUserService)
const createSessionService = new CreateSessionService(userRepository)
const createSessionController = new CreateSessionController(createSessionService)

userRouter.post('/register', async (request, response) => await createUserController.handle(request, response))
userRouter.post('/session', async (request, response) => await createSessionController.handle(request, response))

export { userRouter }