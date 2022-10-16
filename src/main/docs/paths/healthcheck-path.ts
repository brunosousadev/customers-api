export const healthcheckPath = {
  get: {
    summary: 'healthcheck',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              example: {
                ok: true
              }
            }
          }
        }
      },
      500: {
        $ref: '#/components/serverError'
      },
      502: {
        $ref: '#/components/badGateway'
      }
    }
  }
}
