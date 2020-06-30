import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Avatar, Header, Hero, HeadlineTwo, SmallParagraph } from '../components'
import { icons, colours } from '../theme'
import { useQuery } from '@apollo/react-hooks';
import { useNavigationParam } from 'react-navigation-hooks'
import { SingleUserQuery } from '../gql/queries/singleUser'
import { NavigationInjectedProps } from 'react-navigation'
import styled from 'styled-components/native'

const DetailsContainer = styled.View`
display: flex;
align-items: center;
justify-content: center;
border-bottom-color: ${colours.strokeGrey};
border-bottom-width: 1px;
`

export const ProfileScreen = ({ navigation }: NavigationInjectedProps) => {

  const userId = useNavigationParam('user');
  const { loading, error, data } = useQuery(SingleUserQuery, {
    variables: { userId },
  });
  const user = data && data.singleUser[0]

  return (
    <>
      {loading ? <Text>Loading...</Text> :
        error ? <Text>{error.message}</Text> : user &&
          <>
            <Header
              title={user.userName}
              leftAction={() => { navigation.goBack() }}
              leftIcon={icons.back}
              rightAction={() => { navigation.goBack() }}
              rightIcon={icons.menu} />
            <DetailsContainer>
              <Avatar
                large
                source={user && user.avatar} />
              <View style={{ paddingTop: 16, paddingBottom: 16 }}>
                <HeadlineTwo color={colours.primary}>
                  {user.recipes.length} Recipe{user.recipes.length === 1 ? '' : 's'}
                </HeadlineTwo>
              </View>
            </DetailsContainer>
            <ScrollView>
              {user.recipes.map((recipe, i) =>
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    navigation.navigate('Recipe', {
                      recipe: recipe,
                    });
                  }}>
                  <Hero
                    imgOne={recipe.imgOne}
                    imgTwo={recipe.imgTwo}
                    imgThree={recipe.imgThree} />
                  <View style={{ padding: 8 }}>
                    <HeadlineTwo color='white'>{recipe.title}</HeadlineTwo>
                    <SmallParagraph>{recipe.results.length} Results</SmallParagraph>
                  </View>
                </TouchableOpacity>
              )}
            </ScrollView>
          </>
      }
    </>
  )
}