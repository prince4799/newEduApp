import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../../Screens/Splash/Splash';
import SignUpRegisterDrawer from '../TopNavigation/SignUpRegisterDrawer';
import BottomTab from '../BottomNavigation/BottomTab';
import BottomTabAdmin from '../BottomNavigation/BottomTabAdmin';
import AdminManageUsers from '../../Screens/Admin/UI/AdminManageUsers';
import AnimatedHeader from '../../Components/AnimatedHeader';
import { strings } from '../../Constants/Strings';
import { StyleSheet, Text } from 'react-native';
import Header from '../../Components/Header';
import { VideoPlayLists } from '../../Components/VideoLists';
import AdminManageCategories from '../../Screens/Admin/UI/AdminManageCategories';
import { stored } from '../../Constants/Constants';
import { COLORS } from '../../Constants/Colors';
import { VideoPlayer } from '../../Components/VideoPlayer';

const Stack = createStackNavigator();

export default function AppStack() {
  const isUserAdmin = stored.USER_TYPE === 'Admin';

  return (
    <Stack.Navigator initialRouteName={strings.Splash}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={strings.Splash}
        component={Splash}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={strings.SignUpRegisterDrawer}
        component={SignUpRegisterDrawer}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={strings.BottomTabUser}
        component={BottomTab}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={strings.BottomTabAdmin}
        component={BottomTabAdmin}
      />
{/* Videoplayer */}
<Stack.Screen
        options={{
          headerShown: false,
        }}
        name={strings.Videoplayer}
        component={VideoPlayer}
      />

      <Stack.Screen
        name={strings.VideoList}
        component={VideoPlayLists}
        options={({ navigation }) => ({
          headerStyle:styles.header,
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerLeft: () => <Header navigation={navigation} />,
        })}
      />
      {isUserAdmin && (
        <>
          <Stack.Screen
            name={strings.Users}
            component={AdminManageUsers}
            options={({ navigation }) => ({
              headerStyle:styles.header,
              headerTintColor: '#000',
              headerTitleStyle: {
                fontWeight: '600',
              },
              headerLeft: () => <Header navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name={strings.Categories}
            component={AdminManageCategories}
            options={({ navigation }) => ({
              headerStyle:styles.header,
              headerTintColor: '#000',
              headerTitleStyle: {
                fontWeight: '600',
              },
              headerLeft: () => <Header 
              // entering={SlideInRight}
              // exiting={SlideOutLeft}
              // delay={1000}
              navigation={navigation} />,
            })}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles=StyleSheet.create({
  header:{
    backgroundColor: COLORS.Button,
    height: 50,
    // borderBottomLeftRadius:30,
    borderBottomRightRadius:30,

  }
})