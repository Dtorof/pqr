import { Router } from 'express'
import { 
    pqrtById,
    pqrt,
    createPqrt,
    editPqrt,
    deletePqrt
 } from '../controllers/pqrType.controller.js'

export const pqrtRouter = Router()


pqrtRouter.get('/api/v1/pqrt', pqrt)
pqrtRouter.get('/api/v1/pqrt/:id', pqrtById)
pqrtRouter.post('/api/v1/pqrt', createPqrt)
pqrtRouter.put('/api/v1/pqrt/:id', editPqrt)
pqrtRouter.delete('/api/v1/pqrt/:id', deletePqrt)