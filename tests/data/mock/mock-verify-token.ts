import { VerifyToken } from '@/data/protocols'

export const mockVerifyToken = (): VerifyToken => {
  class VerifyTokenSpy implements VerifyToken {
    async verifyToken (token: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true))
    }
  }
  return new VerifyTokenSpy()
}
