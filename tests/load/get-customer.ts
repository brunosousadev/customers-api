import autocannon from 'autocannon'

if (process.env.BASE_URL_CUSTOMER_API && process.env.CUSTOMER_ID && process.env.TOKEN) {

  const url = `${process.env.BASE_URL_CUSTOMER_API}/customers/${process.env.CUSTOMER_ID}`

  autocannon(
    {
      title: 'customer-api',
      url: url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      timeout: 900,
      connections: 100,
      pipelining: 1,
      amount: 1000
    },
    (error: any, result: any) => {
      if (error) {
        console.log('error', error)
      }
      console.table(result.statusCodeStats);
    },
  )
}