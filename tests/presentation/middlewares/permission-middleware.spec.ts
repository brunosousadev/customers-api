import { PermissionMiddleware } from '@/presentation/middlewares'
import { CheckPermission } from '@/data/protocols'
import { mockHttpRequest } from '@/tests/presentation/middlewares/mocks'
import { mockCheckPermission } from '@/tests/data/mock'
import { ok, serverError, unauthorized } from '@/presentation/helpers'
import { throwError } from '@/tests/domain'
import { AccessDeniedError } from '@/presentation/errors'
type SutTypes = {
  sut: PermissionMiddleware
  checkPermissionSpy: CheckPermission
}

const makeSut = (): SutTypes => {
  const checkPermissionSpy = mockCheckPermission()
  const sut = new PermissionMiddleware(checkPermissionSpy, 'permission:value')
  return {
    sut,
    checkPermissionSpy
  }
}

describe('Permission Middleware', () => {
  test('Should call CheckPermission with correct values', async () => {
    const { sut, checkPermissionSpy } = makeSut()
    const checkPermissionMethodSpy = jest.spyOn(checkPermissionSpy, 'checkPermission')
    await sut.handle(mockHttpRequest())
    expect(checkPermissionMethodSpy).toHaveBeenCalledWith('value', 'permission:value')
  })

  test('Should return unauthorized if CheckPermission return false', async () => {
    const { sut, checkPermissionSpy } = makeSut()
    jest.spyOn(checkPermissionSpy, 'checkPermission').mockImplementationOnce(() => false)
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(unauthorized(new AccessDeniedError()))
  })

  test('Should return ok if CheckPermission return true', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(ok())
  })

  test('Should return serverError if CheckPermission return throw', async () => {
    const { sut, checkPermissionSpy } = makeSut()
    jest.spyOn(checkPermissionSpy, 'checkPermission').mockImplementation(throwError)
    const response = await sut.handle(mockHttpRequest())
    expect(response).toEqual(serverError(new Error()))
  })
})
