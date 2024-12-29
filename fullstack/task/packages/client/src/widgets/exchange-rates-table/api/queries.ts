import { gql } from '@apollo/client';

export const GET_EXCHANGE_RATES = gql`
    query GetExchangeRates {
        exchangeRates {
            id
            country
            currency
            amount
            code
            rate
            fetchedAt
            version
            createdAtUtc
        }
    }
`;
