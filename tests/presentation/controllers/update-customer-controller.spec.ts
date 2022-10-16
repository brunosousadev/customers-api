import { UpdateCustomerController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/validation/mocks'
import { badRequest, notFound } from '@/presentation/helpers'
import { UpdateCustomerSpy } from '../mocks'
import { HttpRequest } from '../protocols'

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'name',
    document: 123,
    id: 'id'
  },
  headers: {},
  method: 'POST',
  params: { id: 'id' },
  query: {},
  url: 'url'
})

type SutTypes = {
  sut: UpdateCustomerController
  validationSpy: ValidationSpy
  updateCustomerSpy: UpdateCustomerSpy
}

const makeSut = (): SutTypes => {
  const updateCustomerSpy = new UpdateCustomerSpy()
  const validationSpy = new ValidationSpy()
  const sut = new UpdateCustomerController(updateCustomerSpy, validationSpy)
  return {
    sut,
    updateCustomerSpy,
    validationSpy
  }
}

describe('UpdateCustomer Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    const validateSpy = jest.spyOn(validationSpy, 'validate')
    await sut.handle(request)
    expect(validateSpy).toBeCalledWith({
      ...request.body, id: request.params.id
    })
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => new Error())
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call UpdateCustomer with correct values', async () => {
    const { sut, updateCustomerSpy } = makeSut()
    const request = mockRequest()
    const updateSpy = jest.spyOn(updateCustomerSpy, 'update')
    await sut.handle(request)
    expect(updateSpy).toBeCalledWith({
      ...request.body, id: request.params.id
    })
  })

  test('Should return 404 if UpdateCustomer return null', async () => {
    const { sut, updateCustomerSpy } = makeSut()
    const request = mockRequest()
    jest.spyOn(updateCustomerSpy, 'update').mockImplementationOnce(() => null)
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(notFound(`non-existent customer ${request.params.id}`))
  })

  test('Should return 200 on sucess', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)

    expect(httpResponse).toBeDefined()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.id).toBe(request.params.id)
    expect(httpResponse.body.name).toBe(request.body.name)
    expect(httpResponse.body.document).toBe(request.body.document)
  })
})
