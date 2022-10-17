import { CheckPermission } from '@/data/protocols'
import { HttpRequest, HttpResponse, Middleware } from '@/presentation/protocols'
import { ok, serverError, unauthorized } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { checkHeaderToken } from './header-helper'

export class PermissionMiddleware implements Middleware {
  constructor (
    private readonly checkPermission: CheckPermission,
    private readonly permission: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const token = checkHeaderToken(httpRequest)
      if (!token) return unauthorized(new AccessDeniedError())

      const isValid = this.checkPermission.checkPermission(token, this.permission)
      if (!isValid) {
        return unauthorized(new AccessDeniedError())
      }
      return ok()
    } catch (error: any) {
      return serverError(error)
    }
  }
}
