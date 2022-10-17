import autocannon from 'autocannon'

if (process.env.BASE_URL_CUSTOMER_API && process.env.TOKEN) {
  const url = `${process.env.BASE_URL_CUSTOMER_API}/customers`
  autocannon(
    {
      title: 'customer-api',
      url: url,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
       body: JSON.stringify({
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
      console.log(result)
      console.table(result);
    },
  )
}