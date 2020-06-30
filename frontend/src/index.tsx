import React from 'react';
import MainStack from './navigation/MainStack';
import AuthStack from './navigation/AuthStack';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from '../src/utils/apollo'
import { StatusBar } from 'react-native'
import { getToken, signIn, signOut } from './utils/auth'

export const App = () => {

  const [loggedIn, setLoggedIn] = React.useState(false)

  React.useEffect(() => {
    async function loginCheck() {
      const token = await getToken();
      if (token) {
        setLoggedIn(true);
      }
    }
    loginCheck();
  }, []);

  const handleChangeLoginState = (loggedState: false, jwt: string) => {
    setLoggedIn(loggedState);
    if (loggedState) {
      signIn(jwt);
    } else {
      signOut();
    }
  };

  return (
    <ApolloProvider client={client}>
      <StatusBar barStyle="light-content" hidden={false} translucent={true} />
      {loggedIn ?
        <MainStack screenProps={{ changeLoginState: handleChangeLoginState }} /> :
        <AuthStack screenProps={{ changeLoginState: handleChangeLoginState }} />
      }
    </ApolloProvider>
  )
}

