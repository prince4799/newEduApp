import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../../Screens/Splash/Splash'
import SignUpRegisterDrawer from '../TopNavigation/SignUpRegisterDrawer'
import BottomTab from '../BottomNavigation/BottomTab';
import BottomTabAdmin from '../BottomNavigation/BottomTabAdmin';
import AdminManageUsers from '../../Screens/Admin/UI/AdminManageUsers';
import AnimatedHeader from '../../Components/AnimatedHeader';
import { strings } from '../../Constants/Strings';
import { Text } from 'react-native';
import Header from '../../Components/Header';




const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName={strings.Splash}
    >
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name={strings.Splash} component={Splash} />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name={strings.SignUpRegisterDrawer} component={SignUpRegisterDrawer} />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name={strings.BottomTabUser} component={BottomTab} />
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name={strings.BottomTabAdmin} component={BottomTabAdmin} />
      {/* users details view  */}
      <Stack.Screen
        name={strings.Users}
        component={AdminManageUsers}
        options={({ navigation }) => ({

          headerStyle: {
            backgroundColor: '#ebf0f0',
            height: 40,
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerLeft: () => (
            <Header navigation={navigation}/>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
