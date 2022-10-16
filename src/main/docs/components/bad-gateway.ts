export const badGateway = {
  description: 'cache unavailable',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
