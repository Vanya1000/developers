export interface IExchangeRateBase {
    country: string;
    currency: string;
    amount: number;
    code: string;
    rate: number;
}

export interface IExchangeRateWithTimestamp extends IExchangeRateBase {
    fetchedAt: Date;
}
