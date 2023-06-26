/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{ useState,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { Dimensions, StatusBar } from 'react-native';
import * as AppStack from './app/Navigators/StackNavigator/AppStack'
import Home from "./app/Screens/Home/Home"
import BottomTab from './app/Navigators/BottomNavigation/BottomTab';
// import AdminDashboard from './app/Screens/UI/Admin/AdminDashboard';
// import AdminManageUsers from './app/Screens/Admin/AdminManageUsers';
import { VideoPlayLists } from './app/Components/VideoLists';
import { Player } from './app/Components/VideoPlayer';
import AdminDashboard from './app/Screens/Admin/UI/AdminDashboard';
import AdminManageUsers from './app/Screens/Admin/UI/AdminManageUsers';



function App(): JSX.Element {
  const [defaultDisplaySize, setDefaultDisplaySize] = useState(Dimensions.get('window'));
  const updateDefaultDisplaySize = () => {
    setDefaultDisplaySize(Dimensions.get('window'));
  };
  useEffect(() => {
    const removeNetDisplaySubscription:any = Dimensions.addEventListener('change', updateDefaultDisplaySize);
    return () => 
      removeNetDisplaySubscription
  });
  

  return (<>
  <StatusBar hidden={true}/>
    <NavigationContainer>
      <AppStack.default />
    </NavigationContainer>
  </>
);
}



export default App;
