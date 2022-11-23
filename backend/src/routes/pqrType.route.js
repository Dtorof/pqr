import { Router } from 'express'

import { 
    pqrtById,
    pqrt,
    createPqrt,
    editPqrt,
    deletePqrt
 } from '../controllers/pqrType.controller.js'

export const pqrtRouter = Router()

pqrtRouter.get('/', pqrt)
pqrtRouter.get('/:id', pqrtById)
pqrtRouter.post('/', createPqrt)
pqrtRouter.put('/:id', editPqrt)
pqrtRouter.delete('/:id', deletePqrt)