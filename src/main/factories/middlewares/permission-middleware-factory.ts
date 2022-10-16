import { PermissionMiddleware } from '@/presentation/middlewares'
import { Middleware } from '@/presentation/protocols'
import { makeKeycloaksAdapter } from '@/main/factories/infra'

const keycloaksAdapter = makeKeycloaksAdapter()

export const makePermissionMiddleware = (permission: string): Middleware => {
  return new PermissionMiddleware(keycloaksAdapter, permission)
}
