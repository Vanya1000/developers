import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const exchangeRateConfigSchema = z.object({
    EXCHANGE_RATE_CACHE_DURATION: z.string().transform((val) => {
        if (!val) {
            throw new Error('EXCHANGE_RATE_CACHE_DURATION is required in production!');
        }
        return parseInt(val, 10);
    }),
    EXCHANGE_RATE_API_URL: z.string().transform((val) => {
        if (!val) {
            throw new Error('EXCHANGE_RATE_API_URL is required in production!');
        }
        return val;
    }),
});

export const exchangeRateConfig = registerAs('exchangeRate', () => {
    const config = exchangeRateConfigSchema.parse(process.env);
    return {
        cacheDuration: config.EXCHANGE_RATE_CACHE_DURATION,
        apiUrl: config.EXCHANGE_RATE_API_URL,
    };
});
