import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  FetchResult,
  InMemoryCache,
  Observable,
  split,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { REFRESH } from './mutation/refreshTokens';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = createHttpLink({
  uri: 'http://192.168.0.141:8080/graphql',
  credentials: 'include',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://192.168.0.141:8080/subscriptions',
  })
);

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions?.code) {
          case 'UNAUTHENTICATED':
            if (operation.operationName === 'RefreshTokens') return;
            const observable = new Observable<FetchResult<Record<string, any>>>(
              (observer) => {
                (async () => {
                  try {
                    await client.mutate({
                      mutation: REFRESH,
                    });
                    const subscriber = {
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer),
                    };
                    forward(operation).subscribe(subscriber);
                  } catch (err) {
                    observer.error(err);
                  }
                })();
              }
            );
            return observable;
        }
      }
    }
    if (networkError) console.error(`[Network error]: ${networkError}`);
  }
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, splitLink]),
  connectToDevTools: true,
  cache: new InMemoryCache({
    typePolicies: {
      UnconventionalRootQuery: {
        queryType: true,
        mutationType: true,
      },
    },
  }),
});

export default client;
