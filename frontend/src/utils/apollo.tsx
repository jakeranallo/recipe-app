

/*
const httpLink = new HttpLink({ uri: 'http://localhost:4000/' });

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache()
})
*/

import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { getToken } from '../utils/auth';
import { ErrorLink } from "apollo-link-error";
import { ApolloLink } from 'apollo-link';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/' });
const authLink = setContext(async (req, { headers }) => {
  const token = await getToken();

  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const errorLink = new ErrorLink(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// const link = authLink.concat(httpLink);

const link = ApolloLink.from([
  errorLink,
  authLink.concat(httpLink)
]);


export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});