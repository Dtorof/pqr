import { Router } from 'express'
import multer  from 'multer'
const upload = multer()
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
pqrtRouter.post('/',upload.none(), createPqrt)
pqrtRouter.put('/:id', editPqrt)
pqrtRouter.delete('/:id', deletePqrt)