import React from 'react';
import { Text, Button, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks'
import styled from 'styled-components/native'
import { useFonts } from '@use-expo/font';
import colors from '../theme/colours'

const Header = styled.View`
  display: flex;
  flex-direction: row;
  padding: 52px 8px 8px 8px;
`

const Title = styled.Text`
  color: white;
  font-size: 30px;
  line-height: 26px;
  text-align: center;
  width: 70%;
  padding: 0 16px;
`

const HeaderAction = styled.TouchableOpacity`
  width: 15%;
  height: 50px;
  background-color: red;
`

const TabBar = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  border-bottom-color: ${colors.strokeGrey};
  border-bottom-width: 1px;
`

const TabButton = styled.TouchableOpacity`
  width: 50%;
  padding: 16px;
`

const TabSelect = styled.View`
  width: 50%;
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: ${colors.primary};
`


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

const MainTile = styled.TouchableOpacity`
  position: relative;
  width: 66.6%;
  padding-top: 66.6%;
  height: 0px;
`

const TileContainer = styled.TouchableOpacity`
position: relative;
padding-top: 33.3%;
width: 33.3%;
height: 0px;
`

const SideContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 33.3%;
`
const SideTileContainer = styled.TouchableOpacity`
  position: relative;
  height:50%;
`

const HeroContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex: 1;
`

const GridContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const IngredientsTab = ({ recipe }) => {
  return (
    <View>
      {recipe.ingredients && recipe.ingredients.map((ingredient, i) =>
        <View>
          <Text key={i}>{ingredient.subhead}</Text>
          <View>{ingredient.list.map((item, i) =>
            <Text key={i}>{item}</Text>)}
          </View>
        </View>)}
    </View>
  );
}

const ResultsTab = ({ recipe }) => {
  return (
    <View>
      <HeroContainer>
        <MainTile>
          <TileImage source={{ uri: "https://reactnative.dev/img/header_logo.svg" }} />
        </MainTile>
        <SideContainer>
          <SideTileContainer>
            <TileImage source={{ uri: "https://reactnative.dev/img/header_logo.svg" }} />
          </SideTileContainer>
          <SideTileContainer>
            <TileImage source={{ uri: "https://reactnative.dev/img/header_logo.svg" }} />
          </SideTileContainer>
        </SideContainer>
      </HeroContainer>

      <GridContainer>
        <TileContainer>
          <TileImage source={{ uri: "https://reactnative.dev/img/header_logo.svg" }} />
        </TileContainer>
        <TileContainer>
          <TileImage source={{ uri: "https://reactnative.dev/img/header_logo.svg" }} />
        </TileContainer>
        <TileContainer>
          <TileImage source={{ uri: "https://reactnative.dev/img/header_logo.svg" }} />
        </TileContainer>
      </GridContainer>
    </View>
  );
}

export const RecipeScreen = () => {
  const recipe = useNavigationParam('recipe');
  const [fontsLoaded] = useFonts({ 'Neuton-Bold': require('../../assets/fonts/Neuton-Bold.ttf'), });
  const [isActive, setActive] = React.useState(1)
  return (
    <>
      <Header>
        <HeaderAction></HeaderAction>
        <Title style={fontsLoaded && { fontFamily: "Neuton-Bold" }}>{recipe.title}</Title>
        <HeaderAction></HeaderAction>
      </Header>
      <ScrollView style={{ padding: 4 }}>
        <Text>{recipe.description}</Text>
        <TabBar>
          <TabSelect style={{ left: isActive == 1 ? 0 : '50%' }} />
          <TabButton
            onPress={() => setActive(1)}>
            <Text style={{ color: isActive == 1 ? colors.primary : colors.textInactive, textAlign: 'center' }}>Ingredients</Text>
          </TabButton>
          <TabButton
            onPress={() => setActive(2)}>
            <Text style={{ color: isActive == 2 ? colors.primary : colors.textInactive, textAlign: 'center' }}>Results</Text>
          </TabButton>
        </TabBar>
        {isActive === 1 ? <IngredientsTab recipe={recipe} /> : <ResultsTab recipe={recipe} />}
      </ScrollView>
    </>
  );
}
