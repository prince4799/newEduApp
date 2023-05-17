import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../../Screens/Splash/Splash'
import SignUpRegisterDrawer from '../TopNavigation/SignUpRegisterDrawer'
import BottomTab from '../BottomNavigation/BottomTab';
import BottomTabAdmin from '../BottomNavigation/BottomTabAdmin';
import AdminManageUsers from '../../Screens/Admin/UI/AdminManageUsers';
import AnimatedHeader from '../../Components/AnimatedHeader';




const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
    >
      <Stack.Screen
      options={{
        headerShown:false
      }}
      name="Splash" component={Splash} />
      <Stack.Screen
       options={{
        headerShown:false
      }}
      name="SignUpRegisterDrawer" component={SignUpRegisterDrawer} />
      <Stack.Screen
       options={{
        headerShown:false
      }}
       name="BottomTabUser" component={BottomTab}/>
      <Stack.Screen
       options={{
        headerShown:false
      }}
      name='BottomTabAdmin' component={BottomTabAdmin}/>
      {/* users details view  */}
      <Stack.Screen 
      // options={{
      //   header: (props) => <AnimatedHeader {...props} />,
      // }}
         options={{
          
          headerStyle: {
            backgroundColor: '#ebf0f0',
            height:40,
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerTitle: 'Home Screen',
        }}
      name={'Users'} component={AdminManageUsers} /> 
    </Stack.Navigator>
  );
}
