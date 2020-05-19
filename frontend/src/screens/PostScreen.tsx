
import React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks'
import { NavigationInjectedProps } from 'react-navigation'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const CREATE_RESULT = gql`
  mutation CreateResult($img: String!, $recipeId: Int, $userId: Int) {
    createResult(img: $img, recipeId: $recipeId, userId: $userId) {
      img
      recipeId
      userId
    }
  }
`;
export const PostScreen = ({ navigation }: NavigationInjectedProps) => {
  const image = useNavigationParam('image');
  const recipeId = useNavigationParam('recipeId');
  // const recipeId = parseInt(id)
  const [createResult, { data }] = useMutation(CREATE_RESULT);

  return (
    <View style={{ padding: 10, flexDirection: 'column' }}>
      <Image
        source={{ uri: image }}
        style={{ resizeMode: 'contain', aspectRatio: 1, width: '100%' }}
      />
      <TouchableOpacity
        onPress={() => {
          if (image) {
            createResult({ variables: { img: image, recipeId, userId: 1 } })
            navigation.goBack();
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