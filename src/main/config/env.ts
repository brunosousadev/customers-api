export default {
  port: process.env.PORT || 3000,
  redisUrl: process.env.REDIS_URL || 'redis:6379',
  prefixCustomer: process.env.PREFIX_CUSTOMER || 'customer',
  auth: {
    baseUrl: process.env.BASE_URL,
    grantType: process.env.GRANT_TYPE || '',
    clientId: process.env.CLIENT_ID || '',
    clientSecret: process.env.CLIENT_SECRET || ''
  }
}
