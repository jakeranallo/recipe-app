import React, { useRef } from 'react';
import { Animated, Text, View, ScrollView, Image, RefreshControl, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks'
import { NavigationInjectedProps } from 'react-navigation'
import styled from 'styled-components/native'
import { useFonts } from '@use-expo/font';
import colors from '../theme/colours'
import fonts from '../theme/fonts'
import { SvgXml } from 'react-native-svg';
import { useQuery } from '@apollo/react-hooks';
import { SingleRecipeQuery } from '../gql/queries/singleRecipe'
import { Recipe, Ingredient, Result, Step } from '../utils/types'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Modal from 'react-native-modalbox'
import { back, menu, tick } from '../theme/icons'

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
  flex-wrap: wrap;
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

const DescriptionContainer = styled.TouchableHighlight`
  padding: 8px 16px 0 16px;
  overflow: hidden;
`

const Checkbox = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`

const CheckboxContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  flex-direction: row;
`

type StepsProps =
  NavigationInjectedProps &
  {
    steps:
    [{
      src: string,
      title: string,
      description: string
    }]
  } &
  { recipeId: number }

const Steps = ({ steps, recipeId, navigation }: StepsProps) => {

  const [activeStep, setActiveStep] = React.useState(0);
  const step = steps[activeStep]

  return (
    <View>
      {activeStep + 1 <= steps.length ?
        <View>
          <Image source={{ uri: step.src }} style={{ width: '100%', height: 500, borderRadius: 20 }} />
          <Text>{step.title}</Text>
          <Text>{step.description}</Text>
          <TouchableOpacity
            onPress={() => activeStep === 0 ? null : setActiveStep(activeStep - 1)}>
            <Text>Prev</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveStep(activeStep + 1)}>
            <Text>Next</Text>
          </TouchableOpacity>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {steps && steps.map((step, i: number) =>
              <View
                key={i}
                style={{
                  width: `${100 / steps.length}%`,
                  height: 8,
                  backgroundColor: activeStep === i ? 'red' : 'blue'
                }} />)}
          </View>
        </View> :
        <View style={{ paddingTop: 40 }}>
          <Text>Recipe Complete</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Result', {
                recipeId: recipeId,
              });
            }}>
            <Text>Share Your Result</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveStep(0)}>
            <Text>Start Again</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  )
}


const IngredientsTab = () => {

  const recipeId = useNavigationParam('recipe');
  const { loading, error, data } = useQuery(SingleRecipeQuery, {
    variables: { recipeId: recipeId.id },
  });
  const recipe = data.singleRecipe[0]

  const [checkedItems, setCheckedItems] = React.useState<Ingredient>({});

  const handleCheck = (ingredient: Ingredient) => {
    Object.values(checkedItems).map(e => e).includes('' + ingredient.id) ?
      setCheckedItems(Object.values(checkedItems).filter(item => item.id !== ingredient.id)) :
      setCheckedItems({ ...checkedItems, [ingredient.id]: ingredient });
    // console.log("checkedItems: ", checkedItems);
    console.log()
  }

  return (
    <View>
      {recipe.ingredients && recipe.ingredients.map((ingredient: Ingredient, i: number) =>
        <View key={i}>
          <CheckboxContainer onPress={() => handleCheck(ingredient)}>
            <Checkbox
              style={{ backgroundColor: checkedItems[ingredient.id] ? colors.positive : colors.strokeGrey }}>
              {checkedItems[ingredient.id] && <SvgXml xml={tick} />}</Checkbox>
            <Paragraph
              style={{ fontFamily: fonts.secondary, color: checkedItems[ingredient.id] ? 'white' : colors.textGrey }}>
              {ingredient.amount} {ingredient.name}</Paragraph>
          </CheckboxContainer>
        </View>
      )}
    </View>
  )
}

const ResultsTab = () => {

  const recipeId = useNavigationParam('recipe');
  const { loading, error, data } = useQuery(SingleRecipeQuery, {
    variables: { recipeId: recipeId.id },
  });
  const recipe = data.singleRecipe[0]

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
        {recipe.results.map((result: Result, i: number) =>
          <TileContainer key={i}>
            <TileImage source={{ uri: result.img }} />
          </TileContainer>
        )}
      </GridContainer>
    </View>
  );
}

function wait(timeout: number) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const initialLayout = { width: Dimensions.get('window').width };

export const RecipeScreen = ({ navigation }: NavigationInjectedProps) => {

  // Tabs Function

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Ingredients' },
    { key: 'second', title: 'Results' },
  ]);
  const renderScene = SceneMap({
    first: IngredientsTab,
    second: ResultsTab,
  });

  // Refresh Function

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  // Get Recipe

  const recipeId = useNavigationParam('recipe');
  const { loading, error, data } = useQuery(SingleRecipeQuery, {
    variables: { recipeId: recipeId.id },
  });
  const recipe = data && data.singleRecipe[0]

  // Get Fonts

  const [fontsLoaded] = useFonts({
    'Neuton-Bold': require('../../assets/fonts/Neuton-Bold.ttf'),
    'Metropolis-Regular': require('../../assets/fonts/Metropolis-Regular.otf'),
    'Metropolis-SemiBold': require('../../assets/fonts/Metropolis-SemiBold.otf'),
  });
  ;

  const [expanded, setExpanded] = React.useState(false);

  const [modalOpen, setModalOpen] = React.useState(false);


  return (
    <>
      {fontsLoaded && loading ? <Text>Loading...</Text> :
        error ? <Text>{error.message}</Text> : recipe &&
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
            <Modal isOpen={modalOpen} position={"center"} onClosed={() => setModalOpen(!modalOpen)}>
              <Steps steps={recipe && recipe.step} recipeId={recipeId.id} navigation={navigation} />
            </Modal>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}>
              <DescriptionContainer style={{ height: expanded ? 'auto' : 55 }}>
                <Paragraph
                  onPress={() => setExpanded(!expanded)}
                  numberOfLines={expanded ? 0 : 2}
                  style={{ color: expanded ? 'white' : colors.textGrey, fontFamily: fonts.secondary }}>
                  {recipe.description} {recipe.description}
                </Paragraph>
              </DescriptionContainer>
              <TabView
                renderTabBar={props =>
                  <TabBar {...props}
                    indicatorStyle={{ backgroundColor: colors.primary }}
                    style={{ backgroundColor: colors.secondary, borderBottomColor: colors.strokeGrey, borderBottomWidth: 1 }}
                    renderLabel={({ route, focused }) => (
                      <Text style={{ color: focused ? colors.primary : colors.textInactive, textAlign: 'center', fontFamily: fonts.tertiary, fontSize: 16 }}>
                        {route.title}
                      </Text>
                    )}
                  />}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
              />

            </ScrollView>
            <ButtonContainer>
              <Button onPress={() => setModalOpen(!modalOpen)}>
                <ButtonText style={fontsLoaded && { fontFamily: fonts.primary }}>Start Recipe</ButtonText>
              </Button>
            </ButtonContainer>
          </>
      }
    </>
  );
}