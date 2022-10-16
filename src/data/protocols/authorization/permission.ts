export interface CheckPermission {
  checkPermission: (token: string, permission: string) => boolean
}
