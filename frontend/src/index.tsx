import React from 'react';
import Main from './navigation/Main';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from '../src/utils/apollo'
import { StatusBar } from 'react-native'

export const App = () => {
  return (

    <ApolloProvider client={client}>
      <StatusBar barStyle="light-content" hidden={false} translucent={true} />
      <Main />
    </ApolloProvider>
  )
}
