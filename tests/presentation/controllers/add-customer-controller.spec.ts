import { AddCustomerController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/validation/mocks'
import { AddCustomerSpy } from '../mocks'
import { HttpRequest } from '../protocols'
import { badRequest } from '@/presentation/helpers'

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'name', document: 123
  },
  headers: {},
  method: 'POST',
  params: {},
  query: {},
  url: 'url'
})

type SutTypes = {
  sut: AddCustomerController
  addCustomerSpy: AddCustomerSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const addCustomerSpy = new AddCustomerSpy()
  const validationSpy = new ValidationSpy()
  const sut = new AddCustomerController(addCustomerSpy, validationSpy)
  return {
    sut,
    addCustomerSpy,
    validationSpy
  }
}

describe('AddCustomer Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    const validateSpy = jest.spyOn(validationSpy, 'validate')
    await sut.handle(request)
    expect(validateSpy).toBeCalledWith(request.body)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => new Error())
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddCustomer with correct values', async () => {
    const { sut, addCustomerSpy } = makeSut()
    const request = mockRequest()
    const addSpy = jest.spyOn(addCustomerSpy, 'add')
    await sut.handle(request)
    expect(addSpy).toBeCalledWith(request.body)
  })

  test('Should return 201 on success', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toBeDefined()
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body.id).toBeDefined()
    expect(httpResponse.body.name).toBe(request.body.name)
    expect(httpResponse.body.document).toBe(request.body.document)
  })
})
