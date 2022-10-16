export const mockTokenDecoded = (): any => ({
  payload: {
    exp: 1665864925,
    iat: 1665864625,
    typ: 'Bearer',
    azp: 'customers',
    acr: '1',
    resource_access: {
      customers: {
        roles: [
          'user'
        ]
      }
    }
  }
})

export const mockTokenEncoded = (): string => 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyTGYtamFReXZmQTNCN3dpVHZ3VkxhMjV1cHhiXzUtQXhZSDhmY3kySHhVIn0.eyJleHAiOjE2NjU4NjQ5MjUsImlhdCI6MTY2NTg2NDYyNSwianRpIjoiNTI5YTBiM2EtNDNkZi00ODBiLWFiYzUtMGY2OWVhMzI1YjI0IiwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5zZWd1cm9zLnZpdHRhLmNvbS5ici9hdXRoL3JlYWxtcy9jYXJlZXJzIiwic3ViIjoiNzk0ZmFkNjktMzkxNy00OThmLThhNjUtMWVjZGU5NjlmMGRiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiY3VzdG9tZXJzIiwiYWNyIjoiMSIsInJlc291cmNlX2FjY2VzcyI6eyJjdXN0b21lcnMiOnsicm9sZXMiOlsidXNlciJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJjbGllbnRJZCI6ImN1c3RvbWVycyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SG9zdCI6IjEwLjUwLjIuMTcxIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LWN1c3RvbWVycyIsImNsaWVudEFkZHJlc3MiOiIxMC41MC4yLjE3MSJ9.QW9A_mAzzGHSkAFe7Cl-BrBBfDKjyP932DSiNJ-o11gIXz8lte43QtzrBpSeS5BQ8imtnQfA20GuT3mXeQlZ4WV4KWZ_5uufVeeKu4rwuTWeKi6A1CoT1kWQ9Ko9woJhkqWMB3_iqK077lW0GYnDo7FrPiFxYDGwz_XkCnhcbOeeUogViqyICoSjg1Y9UZC6hGiZMr9iailgTfpqucWH1ONsTC5qFvl_ZpiDpob130z18ssT7sPJnTJfrqqaXnJXImAiUYl0ROQZxcPonSWwrHuwJQiTuKc9yRVTcg2R5h6dEXQLK5u9ZuzCI7_e-mdEAAgUlAfwK2jyWZPI0rj9RQ'
