import React from 'react';
import { NavigationInjectedProps } from 'react-navigation'
import { Container, Button, Content, Form, Item, Input, Text } from 'native-base';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

/*
import * as Facebook from 'expo-facebook';

async function logIn() {
  try {
    await Facebook.initializeAsync('3053194844729001');
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      const { id, userName } = (await response.json());
      const avatar = `https://graph.facebook.com/${id}/picture`;
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}
*/


export const AuthScreen = ({ screenProps }) => {

  const SIGNUP = gql`
  mutation SignUp($userName: String!, $email: String!, $password: String!) {
    signup(userName: $userName, email: $email, password: $password) {
      user {
        id
      }
      token
    }
  }
`;

  const [signup] = useMutation(SIGNUP);

  const [userName, setUserName] = React.useState('')
  const [userNameError, setUserNameError] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [emailError, setEmailError] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const [passwordError, setPasswordError] = React.useState(false)
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false)

  const handleSubmit = () => {
    if (userName.length === 0) {
      return setUserNameError(true);
    }
    setUserNameError(false);

    if (email.length === 0) {
      return setEmailError(true);
    }
    setEmailError(false);

    if (password.length === 0) {
      return setPasswordError(true);
    }
    setPasswordError(false);

    if (confirmPassword.length === 0) {
      return setConfirmPasswordError(true);
    }
    setConfirmPasswordError(false);

    if (password !== confirmPassword) {
      return setConfirmPasswordError(true), setPasswordError(true);
    }
    setConfirmPasswordError(false);
    setPasswordError(false);

    signup({ variables: { userName, email, password } })
      .then(({ data }) => {
        return screenProps.changeLoginState(true, data.signup.token),
          console.log('signed up:', data.signup.token)
      })
      .catch(e => { console.log(e) });

    // .catch(e => {
    //   if (/userName/i.test(e.message)) {
    //     setUserNameError(true);
    //   }
    //   if (/email/i.test(e.message)) {
    //     setEmailError(true);
    //   }
    //   if (/password/i.test(e.message)) {
    //     setPasswordError(true);
    //   }
    // });

  };

  const handleClick = () => {
    signup({ variables: { userName, email, password } })
  }

  return (
    <Container>
      <Content>
        <Form>
          <Item error={userNameError}>
            <Input
              placeholder="Username"
              onChangeText={value => setUserName(value)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Item>
          <Item error={emailError}>
            <Input
              placeholder="Email"
              onChangeText={value => setEmail(value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Item>
          <Item error={passwordError}>
            <Input
              placeholder="Password"
              onChangeText={value => setPassword(value)}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
            />
          </Item>
          <Item last error={confirmPasswordError}>
            <Input
              placeholder="Confirm Password"
              onChangeText={value => setConfirmPassword(value)}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
            />
          </Item>
        </Form>
        <Button full onPress={handleSubmit}>
          <Text>Sign Up</Text>
        </Button>
        {/* <Button full transparent onPress={() => navigation.navigate('Login')}>
          <Text>Sign In</Text>
        </Button> */}
      </Content>
    </Container>
  )
}