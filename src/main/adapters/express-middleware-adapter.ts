import { Request, Response, NextFunction } from 'express'
import { HttpRequest, Middleware } from '@/presentation/protocols'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request: HttpRequest = {
      url: req.url,
      method: req.method,
      headers: req.headers,
      params: req.params,
      query: req.query,
      body: req.body
    }
    const httpResponse = await middleware.handle(request)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body
      })
    }
  }
}
