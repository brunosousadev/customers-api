/* eslint-disable @typescript-eslint/dot-notation */
import { HttpRequest, HttpResponse, Middleware } from '@/presentation/protocols'
import { ok, unauthorized, serverError, badGateway } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { VerifyToken } from '@/data/protocols'
import { checkHeaderToken } from './header-helper'

export class AuthMiddleware implements Middleware {
  constructor(private readonly verifyToken: VerifyToken) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const token = checkHeaderToken(httpRequest)
      if (!token) return unauthorized(new AccessDeniedError())

      await this.verifyToken.verifyToken(token)

      return ok()
    } catch (error: any) {
      if ([401, 403].includes(error.status)) {
        return unauthorized(new AccessDeniedError())
      }
      if (error.status === 502) {
        return badGateway()
      }
      return serverError(error)
    }
  }
}
