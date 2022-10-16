import request from 'supertest'
import { setupApp } from '@/main/config/app'
import { CustomerRedisRepository } from '@/infra/db'
import { KeycloaksAdapter } from '@/infra/authorization'
import { jwtMock } from '../mocks'

jest.mock('ioredis')

const mockCustomer = (): any => ({
  id: '0a3567fb-3c4f-4701-b5ec-f1355e2ca21b',
  name: 'name',
  document: 123
})
const app = setupApp()

describe('ComponentTest: Customers', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })
  describe('When get one customer', () => {
    test('Should return 502', async () => {
      jest.spyOn(KeycloaksAdapter.prototype , 'checkPermission').mockImplementationOnce(() => true)
      jest.spyOn(KeycloaksAdapter.prototype , 'verifyToken').mockImplementationOnce((): any => true)
      jest.spyOn(CustomerRedisRepository.prototype, 'isConnected').mockResolvedValueOnce(false)

      const id = '0a3567fb-3c4f-4701-b5ec-f1355e2ca21b'
      const response = await request(app).get(`/customers/${id}`).auth(jwtMock, { type: 'bearer' })
      expect(response.status).toBe(502)
    })
    test('Should return 404', async () => {
      jest.spyOn(KeycloaksAdapter.prototype , 'checkPermission').mockImplementationOnce(() => true)
      jest.spyOn(KeycloaksAdapter.prototype , 'verifyToken').mockImplementationOnce((): any => true)
      jest.spyOn(CustomerRedisRepository.prototype, 'isConnected').mockResolvedValueOnce(true)
      jest.spyOn(CustomerRedisRepository.prototype, 'findById').mockResolvedValueOnce(null)

      const id = '0a3567fb-3c4f-4701-b5ec-f1355e2ca21b'
      const response = await request(app).get(`/customers/${id}`).auth(jwtMock, { type: 'bearer' })

      expect(response.status).toBe(404)
    })

    test('Should return 400', async () => {
      jest.spyOn(KeycloaksAdapter.prototype , 'checkPermission').mockImplementationOnce(() => true)
      jest.spyOn(KeycloaksAdapter.prototype , 'verifyToken').mockImplementationOnce((): any => true)
      jest.spyOn(CustomerRedisRepository.prototype, 'isConnected').mockResolvedValueOnce(true)
      const response = await request(app).get('/customers/0a3567fb').auth(jwtMock, { type: 'bearer' })

      expect(response.status).toBe(400)
      expect(response.body).toEqual({ error: 'Invalid param: id' })
    })
  })

  describe('When create customer', () => {
    test('Shoul return 502', async () => {
      jest.spyOn(KeycloaksAdapter.prototype , 'checkPermission').mockImplementationOnce(() => true)
      jest.spyOn(KeycloaksAdapter.prototype , 'verifyToken').mockImplementationOnce((): any => true)
      jest.spyOn(CustomerRedisRepository.prototype, 'isConnected').mockResolvedValueOnce(false)

      const response = await request(app).post('/customers').auth(jwtMock, { type: 'bearer' }).send({ name: 'name', document: 123 })

      expect(response.status).toBe(502)
    })
    test('Shoul return 400', async () => {
      jest.spyOn(KeycloaksAdapter.prototype , 'checkPermission').mockImplementationOnce(() => true)
      jest.spyOn(KeycloaksAdapter.prototype , 'verifyToken').mockImplementationOnce((): any => true)
      jest.spyOn(CustomerRedisRepository.prototype, 'isConnected').mockResolvedValueOnce(true)

      const response = await request(app).post('/customers').auth(jwtMock, { type: 'bearer' }).send({ name: 'name' })

      expect(response.status).toBe(400)
      expect(response.body).toEqual({ error: 'Missing param: document' })
    })
    test('Shoul return 400', async () => {
      jest.spyOn(KeycloaksAdapter.prototype , 'checkPermission').mockImplementationOnce(() => true)
      jest.spyOn(KeycloaksAdapter.prototype , 'verifyToken').mockImplementationOnce((): any => true)
      jest.spyOn(CustomerRedisRepository.prototype, 'isConnected').mockResolvedValueOnce(true)

      const response = await request(app).post('/customers').auth(jwtMock, { type: 'bearer' }).send({ document: 123 })

      expect(response.status).toBe(400)
      expect(response.body).toEqual({ error: 'Missing param: name' })
    })
    test('Should return 201', async () => {
      jest.spyOn(KeycloaksAdapter.prototype , 'checkPermission').mockImplementationOnce(() => true)
      jest.spyOn(KeycloaksAdapter.prototype , 'verifyToken').mockImplementationOnce((): any => true)
      jest.spyOn(CustomerRedisRepository.prototype, 'isConnected').mockResolvedValueOnce(true)

      const response = await request(app).post('/customers').auth(jwtMock, { type: 'bearer' }).send({ name: 'name', document: 123 })

      expect(response.status).toBe(201)
      expect(response.body).toBeDefined()
      expect(response.body.id).toBeDefined()
      expect(response.body.name).toBe('name')
      expect(response.body.document).toBe(123)
    })
  })

  describe('When update customer', () => {
    test('Should return 502', async () => {
      const customer = mockCustomer()
      jest.spyOn(KeycloaksAdapter.prototype , 'checkPermission').mockImplementationOnce(() => true)
      jest.spyOn(KeycloaksAdapter.prototype , 'verifyToken').mockImplementationOnce((): any => true)
      jest.spyOn(CustomerRedisRepository.prototype, 'isConnected').mockResolvedValueOnce(false)
      const response = await request(app).put(`/customers/${customer.id}`).auth(jwtMock, { type: 'bearer' }).send({ name: 'name S', document: 1234 })

      expect(response.status).toBe(502)
    })

    test('Should return 404', async () => {
      const customer = mockCustomer()
      jest.spyOn(KeycloaksAdapter.prototype , 'checkPermission').mockImplementationOnce(() => true)
      jest.spyOn(KeycloaksAdapter.prototype , 'verifyToken').mockImplementationOnce((): any => true)
      jest.spyOn(CustomerRedisRepository.prototype, 'isConnected').mockResolvedValueOnce(true)

      const response = await request(app).put(`/customers/${customer.id}`).auth(jwtMock, { type: 'bearer' }).send({ name: 'name S', document: 1234 })
      expect(response.status).toBe(404)
      expect(response.body).toEqual({ error: 'non-existent customer 0a3567fb-3c4f-4701-b5ec-f1355e2ca21b' })
    })

    test('Should return 400', async () => {
      const customer = mockCustomer()
      jest.spyOn(KeycloaksAdapter.prototype , 'checkPermission').mockImplementationOnce(() => true)
      jest.spyOn(KeycloaksAdapter.prototype , 'verifyToken').mockImplementationOnce((): any => true)
      jest.spyOn(CustomerRedisRepository.prototype, 'isConnected').mockResolvedValueOnce(true)
      const response = await request(app).put(`/customers/${customer.id}`).auth(jwtMock, { type: 'bearer' }).send({ document: 1234 })

      expect(response.status).toBe(400)
      expect(response.body).toEqual({ error: 'Missing param: name' })
    })

    test('Should return 400', async () => {
      const customer = mockCustomer()
      jest.spyOn(KeycloaksAdapter.prototype , 'checkPermission').mockImplementationOnce(() => true)
      jest.spyOn(KeycloaksAdapter.prototype , 'verifyToken').mockImplementationOnce((): any => true)
      jest.spyOn(CustomerRedisRepository.prototype, 'isConnected').mockResolvedValueOnce(true)
      const response = await request(app).put(`/customers/${customer.id}`).auth(jwtMock, { type: 'bearer' }).send({ name: 'name S' })

      expect(response.status).toBe(400)
      expect(response.body).toEqual({ error: 'Missing param: document' })
    })

    test('Should return 400', async () => {
      jest.spyOn(KeycloaksAdapter.prototype , 'checkPermission').mockImplementationOnce(() => true)
      jest.spyOn(KeycloaksAdapter.prototype , 'verifyToken').mockImplementationOnce((): any => true)
      jest.spyOn(CustomerRedisRepository.prototype, 'isConnected').mockResolvedValueOnce(true)
      const response = await request(app).put('/customers/123').auth(jwtMock, { type: 'bearer' }).send({ name: 'name S', document: 123 })

      expect(response.status).toBe(400)
      expect(response.body).toEqual({ error: 'Invalid param: id' })
    })

    test('Should return 200', async () => {
      const customer = mockCustomer()
      jest.spyOn(KeycloaksAdapter.prototype , 'checkPermission').mockImplementationOnce(() => true)
      jest.spyOn(KeycloaksAdapter.prototype , 'verifyToken').mockImplementationOnce((): any => true)
      jest.spyOn(CustomerRedisRepository.prototype, 'isConnected').mockResolvedValueOnce(true)
      jest.spyOn(CustomerRedisRepository.prototype, 'findById').mockResolvedValueOnce(customer)
      jest.spyOn(CustomerRedisRepository.prototype, 'update').mockResolvedValueOnce({ name: 'name S', document: 1234, id: customer.id })

      const response = await request(app).put(`/customers/${customer.id}`).auth(jwtMock, { type: 'bearer' }).send({ name: 'name S', document: 1234 })
      expect(response.status).toBe(200)
    })
  })
})
