import axios from 'axios'
import { VerifyToken, CheckPermission, Exception, Decode } from '@/data/protocols'

export class KeycloaksAdapter implements VerifyToken, CheckPermission {
  constructor (private readonly baseURL: string,
    private readonly grantType: string,
    private readonly clientId: string,
    private readonly clientSecret: string,
    private readonly decode: Decode
  ) {}

  checkPermission (token: string, permission: string): boolean {
    const decoded: any = this.decode.decode(token)
    const resource = permission.split(':')
    const payload = decoded?.payload

    if (!!decoded && resource.length === 2 && payload && payload.resource_access) {
      const resourceAccess = payload.resource_access
      const scope = resource[0]
      const permissionValue = resource[1]
      const listScope = resourceAccess[scope]

      if (listScope && Array.isArray(listScope.roles) && listScope.roles.includes(permissionValue)) {
        return true
      }
    }
    return false
  }

  async verifyToken (token: string): Promise<boolean> {
    try {
      await axios.post(`${this.baseURL}/userinfo`,
        new URLSearchParams({
          grant_type: this.grantType,
          client_id: this.clientId,
          client_secret: this.clientSecret
        }),
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      )
      return true
    } catch (error: any) {
      throw new Exception(error.response.status, error.response.data)
    }
  }
}
