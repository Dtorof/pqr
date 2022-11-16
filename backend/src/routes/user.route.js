import { Router } from 'express'
import { 
    userById,
    user,
    createUser,
    editUser,
    deleteUSer
 } from '../controllers/user.controller.js'

export const userRouter = Router()


userRouter.get('/', user)
userRouter.get('/:id', userById)
userRouter.post('/', createUser)
userRouter.put('/:id', editUser)
userRouter.delete('/:id', deleteUSer)