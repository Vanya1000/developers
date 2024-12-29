import { Injectable, Logger } from '@nestjs/common';
import { ExchangeRateException } from './exceptions/exchange-rate.exception';
import { IExchangeRateBase } from './interfaces/exchange-rate.interface';

@Injectable()
export class ExchangeRateParserService {
    private readonly logger = new Logger(ExchangeRateParserService.name);

    parseRatesData(data: string): IExchangeRateBase[] {
        try {
            const lines = data.split('\n');
            const rateLines = lines.slice(2);

            return rateLines.filter(this.isValidLine).map(this.parseLine);
        } catch (error) {
            this.logger.error('Error parsing exchange rates data:', error);
            throw new ExchangeRateException('Failed to parse exchange rates data', error);
        }
    }

    private isValidLine(line: string): boolean {
        return Boolean(line.trim() && line.includes('|'));
    }

    private parseLine(line: string): IExchangeRateBase {
        try {
            const [country, currency, amount, code, rate] = line
                .split('|')
                .map((item) => item.trim());

            const parsedAmount = parseFloat(amount);
            const parsedRate = parseFloat(rate);

            if (Number.isNaN(parsedAmount) || Number.isNaN(parsedRate)) {
                throw new Error('Invalid numeric values');
            }

            return {
                country,
                currency,
                amount: parsedAmount,
                code,
                rate: parsedRate,
            };
        } catch (error) {
            throw new Error(`Failed to parse line: ${line}`);
        }
    }
}
