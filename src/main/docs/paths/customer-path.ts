import { customerCreateExample, customerExample } from '../schemas/'
import { getParamCustomerId, getResponseNotFound, getResponses } from './util'

export const postCustomerCreatePath = {
  post: {
    security: [{
      bearerAuth: [] as string[]
    }],
    summary: 'Create Customer',
    tags: ['Customers'],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: customerCreateExample
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              example: customerExample
            }
          }
        }
      },
      ...getResponses
    }
  }
}

export const customeByIdPath = {
  get: {
    security: [{
      bearerAuth: [] as string[]
    }],
    tags: ['Customers'],
    summary: 'Find Customer',
    parameters: [getParamCustomerId],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              example: customerExample
            }
          }
        }
      },
      ...getResponses,
      ...getResponseNotFound
    }
  },
  put: {
    security: [{
      bearerAuth: [] as string[]
    }],
    tags: ['Customers'],
    summary: 'Update Customer',
    parameters: [getParamCustomerId],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: customerExample
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              example: customerExample
            }
          }
        }
      },
      ...getResponses,
      ...getResponseNotFound
    }
  }
}
