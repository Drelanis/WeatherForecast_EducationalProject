import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  FetchResult,
  InMemoryCache,
  Observable,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { REFRESH } from './mutation/refreshTokens';

const httpLink = createHttpLink({
  uri: 'http://localhost:7000/graphql',
  credentials: 'include',
});

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

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
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
