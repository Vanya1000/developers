import * as Types from '../../../shared/api/models.gen';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetExchangeRatesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetExchangeRatesQuery = { __typename?: 'Query', exchangeRates: Array<{ __typename?: 'ExchangeRate', id: string, country: string, currency: string, amount: number, code: string, rate: number, fetchedAt: any, version: number, createdAtUtc: any }> };


export const GetExchangeRatesDocument = gql`
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

/**
 * __useGetExchangeRatesQuery__
 *
 * To run a query within a React component, call `useGetExchangeRatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExchangeRatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExchangeRatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetExchangeRatesQuery(baseOptions?: Apollo.QueryHookOptions<GetExchangeRatesQuery, GetExchangeRatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExchangeRatesQuery, GetExchangeRatesQueryVariables>(GetExchangeRatesDocument, options);
      }
export function useGetExchangeRatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExchangeRatesQuery, GetExchangeRatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExchangeRatesQuery, GetExchangeRatesQueryVariables>(GetExchangeRatesDocument, options);
        }
export function useGetExchangeRatesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetExchangeRatesQuery, GetExchangeRatesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExchangeRatesQuery, GetExchangeRatesQueryVariables>(GetExchangeRatesDocument, options);
        }
export type GetExchangeRatesQueryHookResult = ReturnType<typeof useGetExchangeRatesQuery>;
export type GetExchangeRatesLazyQueryHookResult = ReturnType<typeof useGetExchangeRatesLazyQuery>;
export type GetExchangeRatesSuspenseQueryHookResult = ReturnType<typeof useGetExchangeRatesSuspenseQuery>;
export type GetExchangeRatesQueryResult = Apollo.QueryResult<GetExchangeRatesQuery, GetExchangeRatesQueryVariables>;