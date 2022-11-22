import { Router } from 'express'
import { 
    pqrcById,
    pqrc,
    createPqrc,
    editPqrc,
    deletePqrc
 } from '../controllers/pqrCategory.controller.js'

export const pqrcRouter = Router()


pqrcRouter.get('/', pqrc)
pqrcRouter.get('/:type_pqr_id', pqrcById)
pqrcRouter.post('/', createPqrc)
pqrcRouter.put('/:id', editPqrc)
pqrcRouter.delete('/:id', deletePqrc)
