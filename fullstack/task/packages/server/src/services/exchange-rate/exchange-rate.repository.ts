import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityWithMeta } from '../../common';
import { ExchangeRate } from '../../entities';

@Injectable()
export class ExchangeRateRepository {
    constructor(
        @InjectRepository(ExchangeRate)
        private repository: Repository<ExchangeRate>
    ) {}

    async findLatestRates(): Promise<{ rates: ExchangeRate[]; fetchedAt: Date } | null> {
        const latestRates = await this.repository.find({
            order: { fetchedAt: 'DESC' },
            take: 1,
        });

        if (latestRates.length === 0) {
            return null;
        }

        const allRatesForTimestamp = await this.repository.find({
            where: { fetchedAt: latestRates[0].fetchedAt },
        });

        return {
            rates: allRatesForTimestamp,
            fetchedAt: latestRates[0].fetchedAt,
        };
    }

    async saveRates(rates: Omit<ExchangeRate, keyof EntityWithMeta>[]): Promise<ExchangeRate[]> {
        const entities = rates.map((rate) => this.repository.create(rate));
        return this.repository.save(entities);
    }
}
