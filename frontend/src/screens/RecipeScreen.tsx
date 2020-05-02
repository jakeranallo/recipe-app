import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks'
import { NavigationInjectedProps } from 'react-navigation'
import styled from 'styled-components/native'
import { useFonts } from '@use-expo/font';
import colors from '../theme/colours'
import fonts from '../theme/fonts'
import { SvgXml } from 'react-native-svg';

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
  width: 80%;
  padding: 0 16px;
`

const HeaderAction = styled.TouchableOpacity`
  width: 10%;
  height: 50px;
  display: flex;
  align-items: center;
  flex:1;
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

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
  width: 100%;
`

const Button = styled.TouchableOpacity`
  background-color: ${colors.primary};
  padding: 8px 64px;
  border-radius: 50px;
`

const ButtonText = styled.Text`
  font-size: 24px;
  text-align: center;
  line-height: 0;
  margin-bottom: 8px;
`

const Paragraph = styled.Text`
  font-size: 16px;
  line-height: 22px;
  color: ${colors.textGrey};
`

const DescriptionContainer = styled.View`
  padding: 8px 24px 0 24px;
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
          <TileImage source={{ uri: recipe.imgOne }} />
        </MainTile>
        <SideContainer>
          <SideTileContainer>
            <TileImage source={{ uri: recipe.imgTwo }} />
          </SideTileContainer>
          <SideTileContainer>
            <TileImage source={{ uri: recipe.imgThree }} />
          </SideTileContainer>
        </SideContainer>
      </HeroContainer>

      <GridContainer>
        <TileContainer>
          <TileImage source={{ uri: recipe.imgOne }} />
        </TileContainer>
        <TileContainer>
          <TileImage source={{ uri: recipe.imgTwo }} />
        </TileContainer>
        <TileContainer>
          <TileImage source={{ uri: recipe.imgThree }} />
        </TileContainer>
      </GridContainer>
    </View>
  );
}

const back = `<svg width="26px" height="22px" viewBox="0 0 26 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <g id="back" transform="translate(3.000000, 1.000000)" stroke="#FFFFFF" stroke-width="3">
        <polyline id="Path" points="9.92156863 19.8431373 -1.24344979e-14 9.92156863 9.92156863 -2.48689958e-14"></polyline>
        <line x1="22.3235294" y1="9.92156863" x2="0" y2="9.92156863" id="Path"></line>
    </g>
</g>
</svg>`

const menu = `<svg width="5px" height="20px" viewBox="0 0 5 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <g id="menu" fill="#FFFFFF" fill-rule="nonzero">
        <circle id="Oval" cx="2.5" cy="2.5" r="2.5"></circle>
        <circle id="Oval-Copy" cx="2.5" cy="10" r="2.5"></circle>
        <circle id="Oval-Copy-2" cx="2.5" cy="17.5" r="2.5"></circle>
    </g>
</g>
</svg>`

export const RecipeScreen = ({ navigation }: NavigationInjectedProps) => {
  const recipe = useNavigationParam('recipe');
  const [fontsLoaded] = useFonts({ 'Neuton-Bold': require('../../assets/fonts/Neuton-Bold.ttf'), 'Metropolis-Regular': require('../../assets/fonts/Metropolis-Regular.otf'), 'Metropolis-SemiBold': require('../../assets/fonts/Metropolis-SemiBold.otf'), });
  ;
  const [isActive, setActive] = React.useState(1)
  return (
    <>
      <Header>
        <HeaderAction onPress={() => { navigation.goBack() }}>
          <SvgXml xml={back} />
          <Image source={require('../../assets/icons/back.svg')} style={{ width: 100, height: 100 }} /></HeaderAction>
        <Title style={fontsLoaded && { fontFamily: fonts.primary }}>{recipe.title}</Title>
        <HeaderAction>
          <SvgXml xml={menu} />
        </HeaderAction>
      </Header>
      <ScrollView>
        <DescriptionContainer>
          <Paragraph style={{ fontFamily: fonts.secondary }}>{recipe.description}</Paragraph>
        </DescriptionContainer>
        <TabBar>
          <TabSelect style={{ left: isActive == 1 ? 0 : '50%' }} />
          <TabButton
            onPress={() => setActive(1)}>
            <Text style={{ color: isActive == 1 ? colors.primary : colors.textInactive, textAlign: 'center', fontFamily: fonts.tertiary, fontSize: 16 }}>Ingredients</Text>
          </TabButton>
          <TabButton
            onPress={() => setActive(2)}>
            <Text style={{ color: isActive == 2 ? colors.primary : colors.textInactive, textAlign: 'center', fontFamily: fonts.tertiary, fontSize: 16 }}>Results</Text>
          </TabButton>
        </TabBar>
        <View style={{ padding: 4 }}>
          {isActive === 1 ? <IngredientsTab recipe={recipe} /> : <ResultsTab recipe={recipe} />}
        </View>
      </ScrollView>
      <ButtonContainer>
        <Button>
          <ButtonText style={fontsLoaded && { fontFamily: fonts.primary }}>Start Recipe</ButtonText>
        </Button>
      </ButtonContainer>
    </>
  );
}