import { adaptMiddleware } from '@/main/adapters'
import { makePermissionMiddleware } from '@/main/factories/middlewares'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const permission = (permission: string) => adaptMiddleware(makePermissionMiddleware(permission))
