import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { exchangeRateConfig } from './config';
import { ExchangeRateException } from './exceptions/exchange-rate.exception';
import { ExchangeRateParserService } from './exchange-rate-parser.service';
import { IExchangeRateBase } from './interfaces/exchange-rate.interface';

@Injectable()
export class ExchangeRateApiService {
    private readonly logger = new Logger(ExchangeRateApiService.name);

    constructor(
        private readonly httpService: HttpService,
        private readonly parserService: ExchangeRateParserService,
        @Inject(exchangeRateConfig.KEY)
        private readonly config: ConfigType<typeof exchangeRateConfig>
    ) {}

    async fetchRates(): Promise<IExchangeRateBase[]> {
        try {
            const { data } = await firstValueFrom(
                this.httpService.get<string>(this.config.apiUrl).pipe(
                    catchError((error: AxiosError) => {
                        this.handleApiError(error);
                    })
                )
            );

            return this.parserService.parseRatesData(data);
        } catch (error) {
            this.logger.error('Error in fetchRates:', error);
            throw new ExchangeRateException('Failed to fetch exchange rates', error);
        }
    }

    private handleApiError(error: AxiosError): never {
        this.logger.error('API Error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
        });
        throw new ExchangeRateException('Failed to fetch exchange rates from API', error);
    }
}
