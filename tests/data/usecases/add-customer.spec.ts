import { DbAddCustomer } from '@/data/usecases'
import { AddCustomerRepository } from '@/data/protocols'
import { mockAddCustomerParams, throwError } from '@/tests/domain'
import { AddCustomerRepositorySpy } from '../mock'

type SutTypes = {
  sut: DbAddCustomer
  addCustomerRepositorySpy: AddCustomerRepository
}

const makeSut = (): SutTypes => {
  const addCustomerRepositorySpy = new AddCustomerRepositorySpy()
  const sut = new DbAddCustomer(addCustomerRepositorySpy)
  return {
    sut,
    addCustomerRepositorySpy
  }
}

describe('DbAddCustomer Usecase', () => {
  test('Should call AddCustomerRepository with correct values', async () => {
    const { sut, addCustomerRepositorySpy } = makeSut()
    const addCustomerParam = mockAddCustomerParams()
    const addSpy = jest.spyOn(addCustomerRepositorySpy, 'add')
    await sut.add(addCustomerParam)

    expect(addSpy).toBeCalledWith(addCustomerParam)
  })

  test('Should throw if AddCustomerRepository throws', async () => {
    const { sut, addCustomerRepositorySpy } = makeSut()
    jest.spyOn(addCustomerRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddCustomerParams())
    await expect(promise).rejects.toThrow()
  })
})
