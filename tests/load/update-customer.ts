import autocannon from 'autocannon'

if (process.env.BASE_URL_CUSTOMER_API && process.env.CUSTOMER_ID && process.env.TOKEN) {

  const url = `${process.env.BASE_URL_CUSTOMER_API}/customers/${process.env.CUSTOMER_ID}`
  
  autocannon(
    {
      title: 'customer-api',
      url: url,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      body: JSON.stringify({
        id: process.env.CUSTOMER_ID,
        name: 'Test',
        document: 123
      }),
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