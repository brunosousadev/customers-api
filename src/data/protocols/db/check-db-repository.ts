export interface IsConnectedRepository {
  isConnected: () => Promise<boolean>
}
