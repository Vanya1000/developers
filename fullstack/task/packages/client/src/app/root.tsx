import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ExchangeRatesPage } from '@pages/exchange-rates';
import { ApolloClientProvider } from './providers/apollo-client';

import './styles/index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <StrictMode>
        <ApolloClientProvider>
            <ExchangeRatesPage />
        </ApolloClientProvider>
    </StrictMode>
);
