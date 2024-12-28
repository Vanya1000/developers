import { Module } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateResolver } from './exchange-rate.resolver';
import { exchangeRateConfig } from '../../config';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forFeature(exchangeRateConfig),],
    providers: [ExchangeRateService, ExchangeRateResolver],
    exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
