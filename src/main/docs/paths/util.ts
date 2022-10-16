export const getResponses = ({
  400: {
    $ref: '#/components/badRequest'
  },
  401: {
    $ref: '#/components/unauthorized'
  },
  500: {
    $ref: '#/components/serverError'
  },
  502: {
    $ref: '#/components/badGateway'
  }
})

export const getResponseNotFound = ({
  404: {
    $ref: '#/components/notFound'
  }
})

export const getParamCustomerId = ({
  in: 'params',
  name: 'id',
  schema: { type: 'string' },
  required: true,
  example: '0a3567fb-3c4f-4701-b5ec-f1355e2ca21b'
})
