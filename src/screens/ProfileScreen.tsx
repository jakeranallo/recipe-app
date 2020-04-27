import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ProfileScreen extends React.Component {
  public render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center'
  }
});
