import { Router } from 'express'
import { CreateUserController } from '@/data/controllers/user'
import { UserRepository } from '@/data/repositories'
import { CreateUserService } from '@/domain/modules/user/services'

const userRouter = Router()
const userRepository = new UserRepository()
const createUserService = new CreateUserService(userRepository)
const createUserController = new CreateUserController(createUserService)

userRouter.post('/register', async (request, response) => await createUserController.handle(request, response))

export { userRouter }