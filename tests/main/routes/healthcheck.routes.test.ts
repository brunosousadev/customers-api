import { setupApp } from '@/main/config/app'
import request from 'supertest'

jest.mock('ioredis')

const app = setupApp()

describe('ComponentTest: healthcheck', () => {
  test('Should return 404', async () => {
    const response = await request(app).get('/healthcheck')
    expect(response.status).toBe(200)
  })
})
