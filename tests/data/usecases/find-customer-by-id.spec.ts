import { DbFindCustomerById } from '@/data/usecases'
import { FindCustomerByIdRepository } from '@/data/protocols'
import { FindCustomerByIdRepositorySpy } from '../mock'
import { mockFindCustomerByIdParams, throwError } from '@/tests/domain'

type SutTypes = {
  sut: DbFindCustomerById
  findCustomerByIdRepositorySpy: FindCustomerByIdRepository
}

const makeSut = (): SutTypes => {
  const findCustomerByIdRepositorySpy = new FindCustomerByIdRepositorySpy()
  const sut = new DbFindCustomerById(findCustomerByIdRepositorySpy)

  return {
    sut,
    findCustomerByIdRepositorySpy
  }
}

describe('DbFindCustomerById Usecase', () => {
  test('Should call FindCustomerByIdRepository with correct values', async () => {
    const { sut, findCustomerByIdRepositorySpy } = makeSut()
    const findCustomerByIdParams = mockFindCustomerByIdParams()

    const findByIdSpy = jest.spyOn(findCustomerByIdRepositorySpy, 'findById')
    await sut.findCustomerById(findCustomerByIdParams)

    expect(findByIdSpy).toBeCalledWith(findCustomerByIdParams)
  })

  test('Should throw if FindCustomerByIdRepository throws', async () => {
    const { sut, findCustomerByIdRepositorySpy } = makeSut()
    jest.spyOn(findCustomerByIdRepositorySpy, 'findById').mockImplementationOnce(throwError)
    const promise = sut.findCustomerById(mockFindCustomerByIdParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if FindCustomerByIdRepository returns null', async () => {
    const { sut, findCustomerByIdRepositorySpy } = makeSut()
    jest.spyOn(findCustomerByIdRepositorySpy, 'findById').mockImplementationOnce(null)
    const customer = await sut.findCustomerById(mockFindCustomerByIdParams())
    expect(customer).toBeNull()
  })
})
