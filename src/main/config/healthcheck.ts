import { Router, Express, Request, Response } from 'express'

const route = Router()
route.get('/healthcheck', (req: Request, res: Response) => {
  res.status(200).json({
    ok: true
  })
})
export default (app: Express): void => {
  app.use('/', route)
}
