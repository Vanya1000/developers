import { ExchangeRates } from '@widgets/exchange-rates-table';

export const ExchangeRatesPage = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <header className="mb-8">
                <h1 className="text-3xl font-bold">Exchange Rates</h1>
            </header>
            <main>
                <ExchangeRates />
            </main>
        </div>
    );
};
