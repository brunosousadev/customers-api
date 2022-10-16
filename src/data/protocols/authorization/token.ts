export interface VerifyToken {
  verifyToken: (token: string) => Promise<boolean>
}
