import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { FeedScreen, ProfileScreen, RecipeScreen, ResultScreen, PostScreen } from '../screens';
import colours from '../theme/colours'

const RootStack = createStackNavigator({
  Feed: {
    navigationOptions: () => ({
      header: undefined,
    }),
    screen: FeedScreen
  },
  Profile: {
    navigationOptions: () => ({
      header: undefined
    }),
    screen: ProfileScreen
  },
  Recipe: {
    navigationOptions: () => ({
      header: undefined
    }),
    screen: RecipeScreen
  },
  Result: {
    navigationOptions: () => ({
      header: undefined
    }),
    screen: ResultScreen
  },
  Post: {
    navigationOptions: () => ({
      header: undefined
    }),
    screen: PostScreen
  }
},
  {
    defaultNavigationOptions: {
      headerShown: false,
      cardStyle: { backgroundColor: colours.secondary },
    }
  });

export default createAppContainer(RootStack);
