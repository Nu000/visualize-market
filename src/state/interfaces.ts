export interface IPort {
    code: string,
    name: string
}
export interface IRate {
    day: string,
    mean: number,
    low: number,
    high: number
}
export interface IRootState {
  ports: IPort[],
  origin: string | null,
  destination: string | null,
  rates: IRate[],
  loadingPorts: boolean,
  loadingRates: boolean,
  errorPorts: string | null,
  errorRates: string | null
}
