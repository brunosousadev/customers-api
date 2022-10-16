import { postCustomerCreatePath, customeByIdPath, healthcheckPath } from './paths/'

export default {
  '/customers': postCustomerCreatePath,
  '/customers/{id}': customeByIdPath,
  '/healthcheck': healthcheckPath
}
