import axios from 'axios'
import { KeycloaksAdapter } from '@/infra/authorization'
import { Decode } from '@/data/protocols'
import { mockTokenEncoded } from '../mocks/mock-token'
import { mockDecode } from '../mocks/mock-decode'

jest.mock('axios')

const mockHeaders = (token: string): any => ({
  headers: {
    authorization: `Bearer ${token}`
  }
})

const mockParams = (): URLSearchParams => new URLSearchParams({ grant_type: 'grantType', client_id: 'clientId', client_secret: 'clientSecret' })
const mockResponseError = (): any => ({ response: { status: 401, data: 'data' } })

type SutTypes = {
  sut: KeycloaksAdapter
  decodeSpy: Decode
}

const makeSut = (): SutTypes => {
  const decodeSpy = mockDecode()
  const sut = new KeycloaksAdapter('baseUrl', 'grantType', 'clientId', 'clientSecret', decodeSpy)
  return {
    sut,
    decodeSpy
  }
}

describe('Keycloaks Adapter', () => {
  let fakeAxios: jest.Mocked<typeof axios>

  beforeAll(() => {
    fakeAxios = axios as jest.Mocked<typeof axios>
    fakeAxios.post.mockResolvedValue({
      status: 200,
      data: 'any_data'
    })
  })

  beforeEach(() => {
    jest.restoreAllMocks()
  })
  describe('checkPermission()', () => {
    test('Should call decode with correct values', () => {
      const { sut, decodeSpy } = makeSut()
      const token = mockTokenEncoded()
      const decodeMethodSpy = jest.spyOn(decodeSpy, 'decode')
      sut.checkPermission(token, 'customers:user')
      expect(decodeMethodSpy).toHaveBeenCalledWith(token)
    })
    test('Should return false if Decode return null', () => {
      const { sut, decodeSpy } = makeSut()
      const token = mockTokenEncoded()
      jest.spyOn(decodeSpy, 'decode').mockImplementationOnce(() => null)
      const value = sut.checkPermission(token, 'customers:user')
      expect(value).toBeFalsy()
    })

    test('Should return false if poorly formatted permission', () => {
      const { sut } = makeSut()
      const token = mockTokenEncoded()
      const value = sut.checkPermission(token, 'user')
      expect(value).toBeFalsy()
    })
    test('Should return false if poorly formatted permission', () => {
      const { sut } = makeSut()
      const token = mockTokenEncoded()
      const value = sut.checkPermission(token, 'customer:')
      expect(value).toBeFalsy()
    })
    test('Should return false if poorly formatted permission', () => {
      const { sut } = makeSut()
      const token = mockTokenEncoded()
      const value = sut.checkPermission(token, '')
      expect(value).toBeFalsy()
    })

    test('Should return false if Decode returns value without payload', () => {
      const { sut, decodeSpy } = makeSut()
      const token = mockTokenEncoded()
      jest.spyOn(decodeSpy, 'decode').mockImplementationOnce((): any => ({ exp: 1665864925 }))
      const value = sut.checkPermission(token, 'customers:user')
      expect(value).toBeFalsy()
    })
    test('Should return false if Decode returns no payload value without resource_access property', () => {
      const { sut, decodeSpy } = makeSut()
      const token = mockTokenEncoded()
      jest.spyOn(decodeSpy, 'decode').mockImplementationOnce((): any => ({ exp: 1665864925, payload: { exp: 1665864925 } }))
      const value = sut.checkPermission(token, 'customers:user')
      expect(value).toBeFalsy()
    })

    test('Should return true if exist permission', () => {
      const { sut } = makeSut()
      const token = mockTokenEncoded()
      const value = sut.checkPermission(token, 'customers:user')
      expect(value).toBe(true)
    })
  })

  describe('verifyToken()', () => {
    test('Should call post with correct values', async () => {
      const { sut } = makeSut()
      const token = mockTokenEncoded()
      await sut.verifyToken(token)
      expect(fakeAxios.post).toHaveBeenCalledWith('baseUrl/userinfo', mockParams(), mockHeaders(token))
      expect(fakeAxios.post).toHaveBeenCalledTimes(1)
    })

    test('Should return true if Axios post return data on sucess', async () => {
      const { sut } = makeSut()
      const value = await sut.verifyToken(mockTokenEncoded())
      expect(value).toBe(true)
    })
    test('Should throw if Axios return throw', async () => {
      fakeAxios.post.mockRejectedValueOnce(mockResponseError())
      const { sut } = makeSut()

      await expect(sut.verifyToken(mockTokenEncoded())).rejects.toThrow()
    })
  })
})
