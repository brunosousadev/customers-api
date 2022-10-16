import { created, notFound, ok, badGateway, unauthorized } from '@/presentation/helpers'

describe('HttpHelper', () => {
  describe('created()', () => {
    test('Should create a 201 created HttpResponse', () => {
      const response = created()
      expect(response.body).toEqual('success')
      expect(response.statusCode).toEqual(201)
    })

    test('Should create a 201 created HttpResponse', () => {
      const response = created('created success')
      expect(response.body).toEqual('created success')
      expect(response.statusCode).toEqual(201)
    })
  })

  describe('notFound()', () => {
    test('Should create a 404 NofFound HttpResponse', () => {
      const response = notFound()

      expect(response.body).toEqual({ message: 'Not found' })
      expect(response.statusCode).toEqual(404)
    })

    test('Should create a 404 NofFound HttpResponse with body', () => {
      const data = { data: ['values'] }
      const response = notFound(data)

      expect(response.body).toEqual(data)
      expect(response.statusCode).toEqual(404)
    })
  })

  describe('ok()', () => {
    test('Should create a 200 OK HttpResponse', () => {
      const response = ok()
      expect(response.statusCode).toEqual(200)
    })

    test('Should create a 200 OK HttpResponse with body', () => {
      const data = { data: ['values'] }
      const response = ok(data)

      expect(response.body).toEqual(data)
      expect(response.statusCode).toEqual(200)
    })
  })

  describe('badGateway()', () => {
    test('Should create a 502 badGateway HttpResponse', () => {
      const response = badGateway()
      expect(response.body).toEqual({ message: 'Bad Gateway' })
      expect(response.statusCode).toEqual(502)
    })
    test('Should create a 502 badGateway HttpResponse with body', () => {
      const response = badGateway('cache unavailable')

      expect(response.body).toEqual('cache unavailable')
      expect(response.statusCode).toEqual(502)
    })
  })

  describe('unauthorized()', () => {
    test('Should create a 501 unauthorized HttpResponse', () => {
      const response = unauthorized()
      expect(response.body).toEqual({ message: 'Authorization Required' })
      expect(response.statusCode).toEqual(401)
    })

    test('Should create a 501 unauthorized HttpResponse with Error', () => {
      const response = unauthorized(new Error('unauthorized'))

      expect(response.body).toEqual('unauthorized')
      expect(response.statusCode).toEqual(401)
    })
  })

  describe('serverError()', () => {
    test('Should create a 500 unauthorized HttpResponse with Error', () => {
      const response = unauthorized(new Error('error'))

      expect(response.body).toEqual('error')
      expect(response.statusCode).toEqual(401)
    })
  })
})
