/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import * as AppStack from './app/Navigators/StackNavigator/AppStack'
import Home from "./app/Screens/Home/Home"
import BottomTab from './app/Navigators/BottomNavigation/BottomTab';





function App(): JSX.Element {

  return (
    <NavigationContainer>
      <AppStack.default />
    </NavigationContainer>
);
}



export default App;
