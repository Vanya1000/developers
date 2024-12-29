import { ApolloProvider } from '@apollo/client';
import { PropsWithChildren } from 'react';
import { apolloClient } from '@shared/api';

export const ApolloClientProvider = ({ children }: PropsWithChildren) => (
    <ApolloProvider client={apolloClient}> {children}</ApolloProvider>
);
