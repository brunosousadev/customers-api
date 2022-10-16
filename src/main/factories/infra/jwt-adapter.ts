import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'

export const makeJwtAdapter = (): JwtAdapter => {
  return new JwtAdapter()
}
