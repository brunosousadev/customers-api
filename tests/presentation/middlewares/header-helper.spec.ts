import { checkHeaderToken } from '@/presentation/middlewares/header-helper'
import { mockHttpRequest } from '@/tests/presentation/middlewares/mocks'
describe('checkHeaderToken()', () => {
  test('Should return null if no token exists in headers', () => {
    const result = checkHeaderToken({} as any)
    expect(result).toBeNull()
  })
  test('Should return null if type diff Bearer in headers', () => {
    const result = checkHeaderToken({
      headers: {
        authorization: ' '
      }
    } as any)
    expect(result).toBeNull()
  })

  test('Should return token correct', () => {
    const result = checkHeaderToken(mockHttpRequest())
    expect(result).toBe('value')
  })
})