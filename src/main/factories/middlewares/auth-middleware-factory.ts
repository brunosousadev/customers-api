import { AuthMiddleware } from '@/presentation/middlewares'
import { Middleware } from '@/presentation/protocols'
import { makeKeycloaksAdapter } from '@/main/factories/infra'

const keycloaksAdapter = makeKeycloaksAdapter()
export const makeAuthMiddleware = (): Middleware => {
  return new AuthMiddleware(keycloaksAdapter)
}
