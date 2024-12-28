import { ExchangeRatesTable } from '@entities/exchange-rate/ui';
import { TimeAgo } from '@shared/ui';
import { FIVE_MINUTES } from '@shared/constants';
import { useGetExchangeRatesQuery } from '../api';

export const ExchangeRates = () => {
    const { data, loading, error } = useGetExchangeRatesQuery({
        pollInterval: FIVE_MINUTES,
    });

    if (error) return <div>Error: {error.message}</div>;
    if (loading) return <div>Loading...</div>;
    if (!data) {
        return <div>No data</div>;
    }

    const latestRates = data.exchangeRates;
    const fetchTime = latestRates[0]?.fetchedAt;

    return (
        <div className="space-y-4">
            <TimeAgo dateString={fetchTime} />

            <ExchangeRatesTable exchangeRates={latestRates} />
        </div>
    );
};
