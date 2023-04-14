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
import AdminDashboard from './app/Screens/Admin/AdminDashboard';
import AdminManageUsers from './app/Screens/Admin/AdminManageUsers';
import AdminManageContent from './app/Screens/Admin/AdminManageContent';



function App(): JSX.Element {

  return (<>
  <StatusBar hidden={true}/>
  {/* <AdminDashboard/> */}
  {/* <AdminManageUsers/> */}
  <AdminManageContent/>
    {/* <NavigationContainer>
      <AppStack.default />
    </NavigationContainer> */}
  </>
);
}



export default App;
