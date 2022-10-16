/* eslint-disable @typescript-eslint/dot-notation */
import { CheckPermission } from '@/data/protocols'
import { HttpRequest, HttpResponse, Middleware } from '@/presentation/protocols'
import { ok, serverError, unauthorized } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'

export class PermissionMiddleware implements Middleware {
  constructor (
    private readonly checkPermission: CheckPermission,
    private readonly permission: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const token = httpRequest.headers?.['authorization']
      const [, credentials] = token.split(' ')
      const isValid = this.checkPermission.checkPermission(credentials, this.permission)
      if (!isValid) {
        return unauthorized(new AccessDeniedError())
      }
      return ok()
    } catch (error: any) {
      return serverError(error)
    }
  }
}
