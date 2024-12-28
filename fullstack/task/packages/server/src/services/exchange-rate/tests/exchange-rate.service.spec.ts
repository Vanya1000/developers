import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeRate } from '../../../entities';
import { ExchangeRateService } from '../exchange-rate.service';
import { ExchangeRateCacheService } from '../exchange-rate-cache.service';
import { ExchangeRateApiService } from '../exchange-rate-api.service';
import { IExchangeRateBase } from '../interfaces/exchange-rate.interface';

describe('ExchangeRateService', () => {
    let service: ExchangeRateService;
    let cacheService: jest.Mocked<ExchangeRateCacheService>;
    let apiService: jest.Mocked<ExchangeRateApiService>;

    const mockLogger = {
        error: jest.fn(),
        log: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
        verbose: jest.fn(),
    };

    const mockBaseRate: IExchangeRateBase = {
        country: 'USA',
        currency: 'Dollar',
        amount: 1,
        code: 'USD',
        rate: 1.0,
    };

    const mockExchangeRate: ExchangeRate = {
        ...mockBaseRate,
        id: '1',
        fetchedAt: new Date(),
        createdAtUtc: new Date(),
        version: 1,
    };

    beforeEach(async () => {
        const mockCacheService = {
            getCachedRates: jest.fn(),
            saveRates: jest.fn(),
        };

        const mockApiService = {
            fetchRates: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExchangeRateService,
                {
                    provide: ExchangeRateCacheService,
                    useValue: mockCacheService,
                },
                {
                    provide: ExchangeRateApiService,
                    useValue: mockApiService,
                },
                {
                    provide: 'Logger',
                    useValue: mockLogger,
                },
            ],
        })
            .setLogger(mockLogger)
            .compile();

        service = module.get<ExchangeRateService>(ExchangeRateService);
        cacheService = module.get(ExchangeRateCacheService);
        apiService = module.get(ExchangeRateApiService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getExchangeRates', () => {
        it('should return cached rates when available', async () => {
            const cachedRates = [mockExchangeRate];
            cacheService.getCachedRates.mockResolvedValue(cachedRates);

            const result = await service.getExchangeRates();

            expect(result).toEqual(cachedRates);
            expect(cacheService.getCachedRates).toHaveBeenCalledTimes(1);
            expect(apiService.fetchRates).not.toHaveBeenCalled();
            expect(cacheService.saveRates).not.toHaveBeenCalled();
        });

        it('should fetch and cache new rates when cache is empty', async () => {
            cacheService.getCachedRates.mockResolvedValue(null);
            apiService.fetchRates.mockResolvedValue([mockBaseRate]);
            cacheService.saveRates.mockResolvedValue([mockExchangeRate]);

            const result = await service.getExchangeRates();

            expect(result).toEqual([mockExchangeRate]);
            expect(cacheService.getCachedRates).toHaveBeenCalledTimes(1);
            expect(apiService.fetchRates).toHaveBeenCalledTimes(1);
            expect(cacheService.saveRates).toHaveBeenCalledTimes(1);
            expect(cacheService.saveRates).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        ...mockBaseRate,
                        fetchedAt: expect.any(Date),
                    }),
                ])
            );
        });

        it('should handle multiple rates correctly', async () => {
            const multipleBaseRates = [
                mockBaseRate,
                { ...mockBaseRate, country: 'EUR', currency: 'Euro', code: 'EUR', rate: 1.2 },
            ];

            cacheService.getCachedRates.mockResolvedValue(null);
            apiService.fetchRates.mockResolvedValue(multipleBaseRates);
            const savedRates = multipleBaseRates.map((rate) => ({
                ...rate,
                id: expect.any(String),
                fetchedAt: expect.any(Date),
                createdAtUtc: expect.any(Date),
                version: expect.any(Number),
            }));
            cacheService.saveRates.mockResolvedValue(savedRates);

            const result = await service.getExchangeRates();

            expect(result).toHaveLength(2);
            expect(result).toEqual(expect.arrayContaining(savedRates));
            expect(cacheService.saveRates).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        ...multipleBaseRates[0],
                        fetchedAt: expect.any(Date),
                    }),
                    expect.objectContaining({
                        ...multipleBaseRates[1],
                        fetchedAt: expect.any(Date),
                    }),
                ])
            );
        });
    });

    describe('fetchAndCacheRates', () => {
        it('should add timestamp to rates and save them', async () => {
            apiService.fetchRates.mockResolvedValue([mockBaseRate]);
            cacheService.saveRates.mockResolvedValue([mockExchangeRate]);

            const result = await (service as any).fetchAndCacheRates();

            expect(result).toEqual([mockExchangeRate]);
            expect(apiService.fetchRates).toHaveBeenCalledTimes(1);
            expect(cacheService.saveRates).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        ...mockBaseRate,
                        fetchedAt: expect.any(Date),
                    }),
                ])
            );
        });

        it('should handle empty rates array', async () => {
            apiService.fetchRates.mockResolvedValue([]);
            cacheService.saveRates.mockResolvedValue([]);

            const result = await (service as any).fetchAndCacheRates();

            expect(result).toEqual([]);
            expect(apiService.fetchRates).toHaveBeenCalledTimes(1);
            expect(cacheService.saveRates).toHaveBeenCalledWith([]);
        });
    });
});
