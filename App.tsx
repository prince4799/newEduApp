/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native';
import * as AppStack from './app/Navigators/StackNavigator/AppStack'
import Home from "./app/Screens/Home/Home"
import BottomTab from './app/Navigators/BottomNavigation/BottomTab';





function App(): JSX.Element {

  return (<>
  <StatusBar hidden={true}/>
    <NavigationContainer>
      <AppStack.default />
    </NavigationContainer>
     {/* <ExtenFunc/> */}
  </>
);
}



export default App;
