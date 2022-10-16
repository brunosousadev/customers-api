import { GetCustomerByIdController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/validation/mocks'
import { badRequest, notFound } from '@/presentation/helpers'
import { FindCustomerByIdSpy } from '../mocks'
import { HttpRequest } from '../protocols'

const mockRequest = (): HttpRequest => ({
  body: {},
  headers: {},
  method: 'POST',
  params: { id: 'id' },
  query: {},
  url: 'url'
})

type SutTypes = {
  sut: GetCustomerByIdController
  validationSpy: ValidationSpy
  findCustomerByIdSpy: FindCustomerByIdSpy
}

const makeSut = (): SutTypes => {
  const findCustomerByIdSpy = new FindCustomerByIdSpy()
  const validationSpy = new ValidationSpy()
  const sut = new GetCustomerByIdController(findCustomerByIdSpy, validationSpy)
  return {
    sut,
    validationSpy,
    findCustomerByIdSpy
  }
}

describe('GetCustomerById Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    const validateSpy = jest.spyOn(validationSpy, 'validate')
    await sut.handle(request)
    expect(validateSpy).toBeCalledWith(request.params)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => new Error())
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call FindCustomerById with correct values', async () => {
    const { sut, findCustomerByIdSpy } = makeSut()
    const request = mockRequest()
    const findSpy = jest.spyOn(findCustomerByIdSpy, 'findCustomerById')
    await sut.handle(request)
    expect(findSpy).toBeCalledWith(request.params.id)
  })

  test('Should return 404 if FindCustomerById return null', async () => {
    const { sut, findCustomerByIdSpy } = makeSut()
    const request = mockRequest()
    jest.spyOn(findCustomerByIdSpy, 'findCustomerById').mockImplementationOnce(() => null)
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(notFound(`non-existent customer ${request.params.id}`))
  })

  test('Should return 200 on sucess', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)

    expect(httpResponse).toBeDefined()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.id).toBeDefined()
    expect(httpResponse.body.name).toBe('name')
    expect(httpResponse.body.document).toBe(123)
  })
})
