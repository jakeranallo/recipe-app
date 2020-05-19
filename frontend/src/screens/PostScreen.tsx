
import React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks'
import { NavigationInjectedProps } from 'react-navigation'

export const PostScreen = ({ navigation }: NavigationInjectedProps) => {
  const image = useNavigationParam('image');
  return (
    <View style={{ padding: 10, flexDirection: 'row' }}>
      <Image
        source={{ uri: image }}
        style={{ resizeMode: 'contain', aspectRatio: 1, width: 72 }}
      />
      <TouchableOpacity
        onPress={() => {
          if (image) {
            navigation.goBack();
            console.log(image)
          } else {
            alert('Need valid description');
          }
        }}
      >
        <Text>Share</Text>
      </TouchableOpacity>
    </View>
  );
}