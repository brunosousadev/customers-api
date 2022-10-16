import { HttpResponse } from '@/presentation/protocols'
import { ServerError } from '../errors'

export const ok = <T>(data?: T): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const notFound = (body?: any): HttpResponse => ({
  statusCode: 404,
  body: body ?? { message: 'Not found' }
})

export const created = <T>(body?: T): HttpResponse => ({
  statusCode: 201,
  body: body || 'success'
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message
})

export const badGateway = (body?: any): HttpResponse => ({
  statusCode: 502,
  body: body ?? { message: 'Bad Gateway' }
})

export const unauthorized = (error?: Error): HttpResponse => ({
  statusCode: 401,
  body: error?.message ?? { message: 'Authorization Required' }
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
