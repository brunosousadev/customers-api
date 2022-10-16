import express, { Express } from 'express'

import routes from '../routes/cutomer.routes'
import setupMiddlewares from './middlewares'
import setupSwagger from './swagger'
import setupHealthcheck from './healthcheck'
import { permission, auth } from '../middlewares'

export const setupApp = (): Express => {
  const app = express()
  setupSwagger(app)
  setupHealthcheck(app)
  setupMiddlewares(app)
  app.use('/', auth, permission('customers:user'), routes)
  return app
}
