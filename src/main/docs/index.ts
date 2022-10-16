import schemas from './schemas'
import components from './components'
import paths from './paths'

export default {
  openapi: '3.0.0',
  info: {
    title: 'API to manage clients',
    description: 'Technical tests of Stone selection process',
    version: '0.0.1'
  },
  servers: [
    { url: 'http://localhost:3000' }
  ],
  tags: [
    {
      name: 'Customers',
      describe: 'APIs relacionadas a Customers'
    }
  ],
  paths,
  schemas,
  components
}
