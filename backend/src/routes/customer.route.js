import { Router } from 'express'
import { 
    customerById,
    customer,
    createCustomer,
    editCustomer,
    deleteCustomer
 } from '../controllers/customer.controller.js'

export const customerRouter = Router()


customerRouter.get('/', customer)
customerRouter.get('/:id', customerById)
customerRouter.post('/', createCustomer)
customerRouter.put('/:id', editCustomer)
customerRouter.delete('/:id', deleteCustomer)