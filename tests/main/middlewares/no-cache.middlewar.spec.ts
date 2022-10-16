import { noCache } from '@/main/middlewares'

import request from 'supertest'
import express, { Express } from 'express'

describe('NoCacheMiddleware', () => {
  let appInstance: Express

  beforeAll(async () => {
    appInstance = express()
  })

  test('Should disable cache', async () => {
    appInstance.get('/test_no_cache', noCache, (req, res) => res.send())

    await request(appInstance)
      .get('/test_no_cache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
