import { ExchangeRateException } from '../exceptions/exchange-rate.exception';
import { ExchangeRateParserService } from '../exchange-rate-parser.service';

describe('ExchangeRateParserService', () => {
    let service: ExchangeRateParserService;

    beforeEach(() => {
        service = new ExchangeRateParserService();
    });

    describe('parseRatesData', () => {
        it('should parse valid data correctly', () => {
            const data = `Header Line 1
Header Line 2
USA|Dollar|1|USD|1.2345
UK|Pound|1|GBP|1.4567`;

            const result = service.parseRatesData(data);

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({
                country: 'USA',
                currency: 'Dollar',
                amount: 1,
                code: 'USD',
                rate: 1.2345,
            });
            expect(result[1]).toEqual({
                country: 'UK',
                currency: 'Pound',
                amount: 1,
                code: 'GBP',
                rate: 1.4567,
            });
        });

        it('should throw an ExchangeRateException if parsing fails', () => {
            const data = `Header Line 1
Header Line 2
US|Dollar|invalid|USD|rate`;

            expect(() => service.parseRatesData(data)).toThrowError(ExchangeRateException);
        });
    });

    describe('isValidLine (private)', () => {
        it('should return true for a well-formed line', () => {
            const line = 'USA|Dollar|1|USD|1.2345';
            const result = (service as any).isValidLine(line);
            expect(result).toBe(true);
        });

        it('should return false for an empty line', () => {
            const line = '';
            const result = (service as any).isValidLine(line);
            expect(result).toBe(false);
        });

        it('should return false if "|" is missing', () => {
            const line = 'JustARegularString';
            const result = (service as any).isValidLine(line);
            expect(result).toBe(false);
        });
    });

    describe('parseLine (private)', () => {
        it('should correctly parse a valid line', () => {
            const line = 'USA|Dollar|1|USD|1.2345';
            const result = (service as any).parseLine(line);
            expect(result).toEqual({
                country: 'USA',
                currency: 'Dollar',
                amount: 1,
                code: 'USD',
                rate: 1.2345,
            });
        });

        it('should throw error if fields are missing', () => {
            const line = 'USA|Dollar|1|USD';
            expect(() => (service as any).parseLine(line)).toThrowError(
                `Failed to parse line: ${line}`
            );
        });
    });
});
