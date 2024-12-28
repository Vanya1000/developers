import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AxiosError } from 'axios';
import { ConfigType } from '@nestjs/config';

import { ExchangeRateException } from '../exceptions/exchange-rate.exception';
import { exchangeRateConfig } from '../config';
import { ExchangeRateApiService } from '../exchange-rate-api.service';
import { ExchangeRateParserService } from '../exchange-rate-parser.service';
import { IExchangeRateBase } from '../interfaces/exchange-rate.interface';

describe('ExchangeRateApiService', () => {
    let service: ExchangeRateApiService;
    let httpService: HttpService;
    let parserService: ExchangeRateParserService;
    let config: ConfigType<typeof exchangeRateConfig>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: HttpService,
                    useValue: {
                        get: jest.fn(),
                    },
                },
                {
                    provide: ExchangeRateParserService,
                    useValue: {
                        parseRatesData: jest.fn(),
                    },
                },
                {
                    provide: exchangeRateConfig.KEY,
                    useValue: {
                        apiUrl: 'https://mock-api-url.com',
                    },
                },
                ExchangeRateApiService,
            ],
        }).compile();

        service = module.get<ExchangeRateApiService>(ExchangeRateApiService);
        httpService = module.get<HttpService>(HttpService);
        parserService = module.get<ExchangeRateParserService>(ExchangeRateParserService);
        config = module.get<ConfigType<typeof exchangeRateConfig>>(exchangeRateConfig.KEY);
    });

    describe('fetchRates', () => {
        it('should return parsed rates when API call and parsing succeed', async () => {
            const mockData = 'SOME_RAW_DATA';
            const mockResponse = { data: mockData };
            const mockParsedRates: IExchangeRateBase[] = [
                {
                    country: 'USA',
                    currency: 'Dollar',
                    amount: 1,
                    code: 'USD',
                    rate: 1.23,
                },
            ];

            (httpService.get as jest.Mock).mockReturnValueOnce(of(mockResponse));
            (parserService.parseRatesData as jest.Mock).mockReturnValueOnce(mockParsedRates);

            const result = await service.fetchRates();

            expect(httpService.get).toHaveBeenCalledWith(config.apiUrl);
            expect(parserService.parseRatesData).toHaveBeenCalledWith(mockData);
            expect(result).toEqual(mockParsedRates);
        });

        it('should throw an ExchangeRateException if the API call fails', async () => {
            const axiosError = new AxiosError('API error message');
            (httpService.get as jest.Mock).mockReturnValueOnce(throwError(() => axiosError));

            await expect(service.fetchRates()).rejects.toThrowError(ExchangeRateException);
        });

        it('should throw an ExchangeRateException if parserService.parseRatesData fails', async () => {
            const mockData = 'SOME_RAW_DATA';
            const mockResponse = { data: mockData };

            (httpService.get as jest.Mock).mockReturnValueOnce(of(mockResponse));
            (parserService.parseRatesData as jest.Mock).mockImplementation(() => {
                throw new Error('Parsing error');
            });

            await expect(service.fetchRates()).rejects.toThrowError(ExchangeRateException);
        });
    });
});
