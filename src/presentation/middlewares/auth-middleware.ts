/* eslint-disable @typescript-eslint/dot-notation */
import { HttpRequest, HttpResponse, Middleware } from '@/presentation/protocols'
import { ok, unauthorized, serverError, badGateway } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { VerifyToken } from '@/data/protocols'

export class AuthMiddleware implements Middleware {
  constructor (private readonly verifyToken: VerifyToken) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const token = httpRequest.headers?.['authorization']
      if (!token) return unauthorized(new AccessDeniedError('No authorization header'))

      const [type, credentials] = token.split(' ')
      if (type !== 'Bearer') return unauthorized(new AccessDeniedError('Wrong auth type'))

      await this.verifyToken.verifyToken(credentials)

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
