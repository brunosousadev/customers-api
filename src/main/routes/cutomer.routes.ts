import express from 'express'
import { adaptRoute } from '../adapters'
import { makeAddCustomerController, makeGetCustomerByIdController, makeUpdateCustomerController } from '@/main/factories/controllers'

const routes = express.Router()

routes.post('/customers', adaptRoute(makeAddCustomerController()))
routes.get('/customers/:id', adaptRoute(makeGetCustomerByIdController()))
routes.put('/customers/:id', adaptRoute(makeUpdateCustomerController()))

export default routes
