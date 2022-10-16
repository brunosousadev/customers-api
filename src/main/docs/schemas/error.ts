export const error = {
  type: 'object',
  properties: {
    statusCode: { type: 'number' },
    body: { type: 'string' }
  },
  required: ['statusCode', 'body']
}
