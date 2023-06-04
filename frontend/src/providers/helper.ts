export const then = [(res: any) => [res, null], (err: any) => [null, err]]

export const throwErrorMessage = (err: string): void => {
  if (err) throw err
}
