import { Express } from 'express'
import routes from '@/main/routes/cutomer.routes'

export default (app: Express): void => {
  app.use('/', routes)
}
