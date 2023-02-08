/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// import Login from './app/Screens/Login/Login'
// import SignUp from './app/Screens/SignUp/SignUp'
import SignUpRegisterDrawer from "./app/Navigators/TopDrawers/SignUpRegisterDrawer"
// import {SignUpRegisterDrawer} from './app/Navigators/TopDrawers/SignUpRegisterDrawer'
// import Login from './app/Screens/Login/Login'
import { COLORS } from './app/Constants/Colors';




function App(): JSX.Element {

  return (
   <SignUpRegisterDrawer/>
  );
}



export default App;
