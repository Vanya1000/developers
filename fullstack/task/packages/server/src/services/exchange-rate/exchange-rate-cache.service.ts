import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { exchangeRateConfig } from './config';
import { ExchangeRate } from '../../entities';
import { ExchangeRateRepository } from './exchange-rate.repository';
import { IExchangeRateWithTimestamp } from './interfaces/exchange-rate.interface';

@Injectable()
export class ExchangeRateCacheService {
    constructor(
        private readonly repository: ExchangeRateRepository,
        @Inject(exchangeRateConfig.KEY)
        private readonly config: ConfigType<typeof exchangeRateConfig>
    ) {}

    async getCachedRates(): Promise<ExchangeRate[] | null> {
        const latestRates = await this.repository.findLatestRates();

        if (!latestRates) {
            return null;
        }

        if (this.isCacheExpired(latestRates.fetchedAt)) {
            return null;
        }

        return latestRates.rates;
    }

    private isCacheExpired(fetchedAt: Date): boolean {
        const cacheAge = Date.now() - fetchedAt.getTime();
        return cacheAge > this.config.cacheDuration;
    }

    async saveRates(rates: IExchangeRateWithTimestamp[]): Promise<ExchangeRate[]> {
        return this.repository.saveRates(rates);
    }
}
