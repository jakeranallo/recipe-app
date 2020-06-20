import React from 'react';
import { Text, ScrollView, RefreshControl, Dimensions, } from 'react-native';
import { useNavigationParam } from 'react-navigation-hooks'
import { NavigationInjectedProps } from 'react-navigation'
import styled from 'styled-components/native'
import { colours } from '../../theme'
import { useQuery } from '@apollo/react-hooks';
import { SingleRecipeQuery } from '../../gql/queries/singleRecipe'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Modal from 'react-native-modalbox'
import { back, menu } from '../../theme/icons'
import { Header, Button, Paragraph, HeadlineTwo } from '../../components'
import { Steps } from './Steps'
import { IngredientsTab } from './IngredientsTab'
import { ResultsTab } from './ResultsTab'

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
  width: 100%;
`

const DescriptionContainer = styled.TouchableHighlight`
  padding: 8px 16px 0 16px;
  overflow: hidden;
`

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

  // Descriptor State

  const [expanded, setExpanded] = React.useState(false);

  // Modal State

  const [modalOpen, setModalOpen] = React.useState(false);

  /*
              <Header
              title="Share Your Result"
              leftAction={() => { navigation.goBack() }}
              leftIcon={icons.back}
  */

  return (
    <>
      {loading ? <Text>Loading...</Text> :
        error ? <Text>{error.message}</Text> : recipe &&
          <>
            <Header
              title={recipe.title}
              leftAction={() => { navigation.goBack() }}
              leftIcon={back}
              rightAction={() => { navigation.goBack() }}
              rightIcon={menu} />
            <Modal isOpen={modalOpen} position={"bottom"} onClosed={() => setModalOpen(!modalOpen)} swipeArea={500}>
              <Steps steps={recipe && recipe.steps} recipeId={recipeId.id} navigation={navigation} userId={recipe.user.id} />
            </Modal>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colours.primary} />}>
              <DescriptionContainer onPress={() => setExpanded(!expanded)} style={{ height: expanded ? 'auto' : 55 }}>
                <Paragraph
                  numberOfLines={expanded ? 0 : 2}
                  color={expanded ? 'white' : colours.textGrey}>
                  {recipe.description} {recipe.description}
                </Paragraph>
              </DescriptionContainer>
              <TabView
                renderTabBar={props =>
                  <TabBar {...props}
                    indicatorStyle={{ backgroundColor: colours.primary }}
                    style={{ backgroundColor: colours.secondary, borderBottomColor: colours.strokeGrey, borderBottomWidth: 1 }}
                    renderLabel={({ route, focused }) => (
                      <HeadlineTwo color={focused ? colours.primary : colours.textInactive}>
                        {route.title}
                      </HeadlineTwo>
                    )}
                  />}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
              />

            </ScrollView>
            <ButtonContainer>
              <Button onPress={() => setModalOpen(!modalOpen)} label='Start Recipe' />
            </ButtonContainer>
          </>
      }
    </>
  );
}