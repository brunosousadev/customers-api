import { CheckPermission } from '@/data/protocols'

export const mockCheckPermission = (): CheckPermission => {
  class CheckPermissionSpy implements CheckPermission {
    checkPermission (token: string, permission: string): boolean {
      return true
    }
  }
  return new CheckPermissionSpy()
}
