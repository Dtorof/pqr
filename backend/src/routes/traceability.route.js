import { Router } from 'express'
import {
    getTraceability,
    traceabilityById,
    createTraceability,
    deleteTraceability,
    editTraceability


} from '../controllers/traceability.controller.js'

export const traceabilityRouter = Router()

traceabilityRouter.get('/', getTraceability)
traceabilityRouter.get('/:id', traceabilityById)
traceabilityRouter.post('/', createTraceability)
traceabilityRouter.delete('/:id', deleteTraceability)
traceabilityRouter.put('/:id', editTraceability)