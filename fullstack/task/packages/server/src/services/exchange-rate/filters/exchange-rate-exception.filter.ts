import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { ExchangeRateException } from '../exceptions/exchange-rate.exception';

@Catch(ExchangeRateException)
export class ExchangeRateExceptionFilter implements ExceptionFilter {
    catch(exception: ExchangeRateException, host: ArgumentsHost) {
        const gqlHost = GqlArgumentsHost.create(host);
        const context = gqlHost.getContext();

        return {
            message: exception.message,
            timestamp: new Date().toISOString(),
            path: context.req?.url,
        };
    }
}
