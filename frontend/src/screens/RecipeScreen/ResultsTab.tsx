import React from 'react';
import { View } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks'
import styled from 'styled-components/native'
import { useQuery } from '@apollo/react-hooks';
import { SingleRecipeQuery } from '../../gql/queries/singleRecipe'
import { Result } from '../../utils/types'
import { Hero } from '../../components'

const TileImage = styled.ImageBackground`
  position: absolute;
  border-radius: 2px;
  margin: 4px;
  background-color: red;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

const TileContainer = styled.TouchableOpacity`
  position: relative;
  padding-top: 33.3%;
  width: 33.3%;
  height: 0px;
`

const GridContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`

export const ResultsTab = () => {

  const recipeId = useNavigationParam('recipe');
  const { loading, error, data } = useQuery(SingleRecipeQuery, {
    variables: { recipeId: recipeId.id },
  });
  const recipe = data.singleRecipe[0]

  return (
    <View>
      <Hero
        imgOne={recipe.imgOne}
        imgTwo={recipe.imgTwo}
        imgThree={recipe.imgThree} />
      <GridContainer>
        {recipe.results.map((result: Result, i: number) =>
          <TileContainer key={i}>
            <TileImage source={{ uri: result.img }} />
          </TileContainer>
        )}
      </GridContainer>
    </View>
  );
}