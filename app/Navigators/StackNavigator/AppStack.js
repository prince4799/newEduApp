import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../../Screens/Splash/Splash'
import SignUpRegisterDrawer from '../TopNavigation/SignUpRegisterDrawer'




const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="SignUpRegisterDrawer" component={SignUpRegisterDrawer} />

    </Stack.Navigator>
  );
}
