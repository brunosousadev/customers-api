import { DbUpdateCustomer } from '@/data/usecases'
import { FindCustomerByIdRepository, UpdateCustomerRepository } from '@/data/protocols'
import { FindCustomerByIdRepositorySpy, UpdateCustomerRepositorySpy } from '../mock'
import { mockUpdateCustomerParams, throwError } from '@/tests/domain'

type SutTypes = {
  sut: DbUpdateCustomer
  findCustomerByIdRepositorySpy: FindCustomerByIdRepository
  updateCustomerRepositorySpy: UpdateCustomerRepository
}

const makeSut = (): SutTypes => {
  const findCustomerByIdRepositorySpy = new FindCustomerByIdRepositorySpy()
  const updateCustomerRepositorySpy = new UpdateCustomerRepositorySpy()
  const sut = new DbUpdateCustomer(findCustomerByIdRepositorySpy, updateCustomerRepositorySpy)
  return {
    sut,
    findCustomerByIdRepositorySpy,
    updateCustomerRepositorySpy
  }
}

describe('DbUpdateCustomer Usecase', () => {
  test('Should call FindCustomerByIdRepository with correct values', async () => {
    const { sut, findCustomerByIdRepositorySpy } = makeSut()
    const updateCustomerParams = mockUpdateCustomerParams()
    const findByIdSpy = jest.spyOn(findCustomerByIdRepositorySpy, 'findById')
    await sut.update(updateCustomerParams)

    expect(findByIdSpy).toBeCalledWith(updateCustomerParams.id)
  })

  test('Should throw if FindCustomerByIdRepository throws', async () => {
    const { sut, findCustomerByIdRepositorySpy } = makeSut()
    jest.spyOn(findCustomerByIdRepositorySpy, 'findById').mockImplementationOnce(throwError)

    const promise = sut.update(mockUpdateCustomerParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if FindCustomerByIdRepository returns null', async () => {
    const { sut, findCustomerByIdRepositorySpy } = makeSut()
    jest.spyOn(findCustomerByIdRepositorySpy, 'findById').mockImplementationOnce(null)
    const customer = await sut.update(mockUpdateCustomerParams())
    expect(customer).toBeNull()
  })

  test('Should call UpdateCustomerRepository with correct values', async () => {
    const { sut, updateCustomerRepositorySpy } = makeSut()
    const updateCustomerParams = mockUpdateCustomerParams()
    const updateSpy = jest.spyOn(updateCustomerRepositorySpy, 'update')
    await sut.update(updateCustomerParams)

    expect(updateSpy).toBeCalledWith(updateCustomerParams)
  })

  test('Should throw if FindCustomerByIdRepository throws', async () => {
    const { sut, updateCustomerRepositorySpy } = makeSut()
    jest.spyOn(updateCustomerRepositorySpy, 'update').mockImplementationOnce(throwError)

    const promise = sut.update(mockUpdateCustomerParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return customer on success', async () => {
    const { sut } = makeSut()
    const updateCustomerParams = mockUpdateCustomerParams()

    const customer = await sut.update(updateCustomerParams)

    expect(customer).toEqual(updateCustomerParams)
  })
})
