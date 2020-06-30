import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { AuthScreen } from '../screens';
import colours from '../theme/colours'

const RootStack = createStackNavigator({
  Auth: {
    navigationOptions: () => ({
      header: undefined,
    }),
    screen: AuthScreen
  }
},
  {
    defaultNavigationOptions: {
      headerShown: false,
      cardStyle: { backgroundColor: colours.secondary },
    }
  });

export default createAppContainer(RootStack);
