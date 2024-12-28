import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateResolver } from './exchange-rate.resolver';
import { exchangeRateConfig } from './config';
import { ExchangeRate } from '../../entities';
import { ExchangeRateApiService } from './exchange-rate-api.service';
import { ExchangeRateParserService } from './exchange-rate-parser.service';
import { ExchangeRateRepository } from './exchange-rate.repository';
import { ExchangeRateCacheService } from './exchange-rate-cache.service';

@Module({
    imports: [
        ConfigModule.forFeature(exchangeRateConfig), 
        TypeOrmModule.forFeature([ExchangeRate]), 
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 1,
    }),],
    providers: [
        ExchangeRateService, 
        ExchangeRateResolver, 
        ExchangeRateApiService, 
        ExchangeRateParserService,
        ExchangeRateRepository,
        ExchangeRateCacheService,
    ],
    exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
