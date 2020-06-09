
import React from 'react';
import { ScrollView, Image, View, TouchableOpacity } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks'
import { NavigationInjectedProps } from 'react-navigation'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components/native'
import { Button, Header } from '../components';
import { icons } from '../theme'

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
  width: 100%;
`

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
  const [createResult, { data }] = useMutation(CREATE_RESULT);

  return (
    <View style={{ height: "100%" }}>
      <Header
        title="Share Your Result"
        leftAction={() => { navigation.goBack() }}
        leftIcon={icons.back} />
      <ScrollView>
        <Image
          source={{ uri: image }}
          style={{ resizeMode: 'contain', aspectRatio: 1, width: '100%' }}
        />
      </ScrollView>
      <ButtonContainer>
        <Button onPress={() => {
          if (image) {
            createResult({ variables: { img: image, recipeId, userId: 1 } })
            navigation.navigate('Recipe', {
              recipe: recipeId,
            });
          } else {
            alert('Need valid description');
          }
        }}
          label="Share Now" />
      </ButtonContainer>
    </View>
  );
}