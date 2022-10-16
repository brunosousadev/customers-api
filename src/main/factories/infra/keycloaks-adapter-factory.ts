import { KeycloaksAdapter } from '@/infra/authorization'
import { makeJwtAdapter } from './jwt-adapter'
import env from '@/main/config/env'

const jwtAdapter = makeJwtAdapter()

export const makeKeycloaksAdapter = (): KeycloaksAdapter => {
  return new KeycloaksAdapter(
    env.auth.baseUrl,
    env.auth.grantType,
    env.auth.clientId,
    env.auth.clientSecret,
    jwtAdapter)
}
