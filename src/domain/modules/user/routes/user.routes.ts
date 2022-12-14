import { Router } from 'express'
import { CreateUserController } from '@/data/controllers'
import { UserRepository } from '@/data/repositories'
import { CreateUserService } from '@/domain/modules/user/services'
import { CreateSessionService } from '../services/create-session.service'
import { CreateSessionController } from '../../../../data/controllers/create-session.controller'
import { updateRefreshTokenController } from '../../../../data/controllers/update-refresh-token.controller'

const userRouter = Router()
const userRepository = new UserRepository()
const createUserService = new CreateUserService(userRepository)
const createUserController = new CreateUserController(createUserService)
const createSessionService = new CreateSessionService(userRepository)
const createSessionController = new CreateSessionController(createSessionService)

userRouter.post('/register', async (request, response) => await createUserController.handle(request, response))
userRouter.post('/session', async (request, response) => await createSessionController.handle(request, response))
userRouter.put('/refresh', async (request, response) => await updateRefreshTokenController.handle(request, response))

export { userRouter }