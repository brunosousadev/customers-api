export interface Generator {
  generatorId: () => Promise<string>
}
