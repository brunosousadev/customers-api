import { apiBearerAuth } from './schemas/'
import { badGateway, badRequest, notFound, serverError, unauthorized } from './components/'

export default {
  securitySchemes: {
    bearerAuth: apiBearerAuth
  },
  badGateway,
  badRequest,
  notFound,
  serverError,
  unauthorized
}
