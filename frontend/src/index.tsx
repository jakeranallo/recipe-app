import React from 'react';
import Main from './navigation/Main';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from '../src/utils/apollo'

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  )
}
