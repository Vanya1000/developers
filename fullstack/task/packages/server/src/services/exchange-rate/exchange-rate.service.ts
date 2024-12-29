import { Injectable, Logger } from '@nestjs/common';
import { ExchangeRate } from '../../entities';
import { ExchangeRateException } from './exceptions/exchange-rate.exception';
import { ExchangeRateApiService } from './exchange-rate-api.service';
import { ExchangeRateCacheService } from './exchange-rate-cache.service';
import { IExchangeRateWithTimestamp } from './interfaces/exchange-rate.interface';

@Injectable()
export class ExchangeRateService {
    private readonly logger = new Logger(ExchangeRateService.name);

    constructor(
        private readonly cacheService: ExchangeRateCacheService,
        private readonly apiService: ExchangeRateApiService
    ) {}

    public async getExchangeRates(): Promise<ExchangeRate[]> {
        try {
            const cachedRates = await this.cacheService.getCachedRates();
            if (cachedRates) {
                return cachedRates;
            }

            return this.fetchAndCacheRates();
        } catch (error) {
            this.logger.error('Error in getExchangeRates:', error);
            throw new ExchangeRateException('Failed to get exchange rates', error);
        }
    }

    private async fetchAndCacheRates(): Promise<ExchangeRate[]> {
        const rates = await this.apiService.fetchRates();

        const ratesWithTimestamp: IExchangeRateWithTimestamp[] = rates.map((rate) => ({
            ...rate,
            fetchedAt: new Date(),
        }));

        return this.cacheService.saveRates(ratesWithTimestamp);
    }
}
