import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../../Screens/Splash/Splash';
import SignUpRegisterDrawer from '../TopNavigation/SignUpRegisterDrawer';
import BottomTab from '../BottomNavigation/BottomTab';
import BottomTabAdmin from '../BottomNavigation/BottomTabAdmin';
import AdminManageUsers from '../../Screens/Admin/UI/AdminManageUsers';
import { strings } from '../../Constants/Strings';
import { StyleSheet, Text } from 'react-native';
import Header from '../../Components/Header';
import { VideoPlayLists } from '../../Components/VideoLists';
import Categories from '../../Screens/Categories/Categories';
import { stored } from '../../Constants/Constants';
import { COLORS } from '../../Constants/Colors';
import { VideoPlayer } from '../../Components/VideoPlayer';
import UserTab from '../BottomNavigation/BottomTab';
import Chat from '../../Screens/Chat/chat';

const Stack = createStackNavigator();

export default function AppStack() {
  const isUserAdmin = stored.USER_TYPE === 'Admin';

  return (
    <Stack.Navigator initialRouteName={strings.Splash}
      options={{
        cardStyleInterpolator: ({ current: { progress } }) => {
          const rotateY = progress.interpolate({
            inputRange: [0, 1],
            outputRange: ['00deg', '90deg'],
          });

          return {
            cardStyle: {
              transform: [{ rotateY }],
            },
          };
        },
      }}
    >
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
          ...horizontalAnimation,
          ...revHorizontalAnimation,
        }}
        name={strings.BottomTabUser}
        component={UserTab}
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
        options={{
          headerShown: false,
        }}
        name={strings.Chat}
        component={Chat}
      />

      <Stack.Screen
        name={strings.VideoList}
        component={VideoPlayLists}
        options={({ navigation }) => ({
          headerStyle: styles.header,
          headerTintColor: COLORS.ButtonText,
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerLeft: () => <Header navigation={navigation} />,
          ...horizontalAnimation,
          ...revHorizontalAnimation,
        })}
      />
      {/* {isUserAdmin && ( */}
      {/* <> */}
      <Stack.Screen
        name={strings.Users}
        component={AdminManageUsers}
        options={({ navigation }) => ({
          headerStyle: styles.header,
          headerTintColor: COLORS.ButtonText,
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerLeft: () => <Header navigation={navigation} />,
          ...horizontalAnimation,
          ...revHorizontalAnimation,
        })}
      />
      <Stack.Screen
        name={strings.Categories}
        component={Categories}
        options={({ navigation }) => ({
          headerStyle: styles.header,
          headerTintColor: COLORS.ButtonText,
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerLeft: () => <Header
            navigation={navigation} />,
          ...horizontalAnimation,
          ...revHorizontalAnimation,
        })}
      />
      {/* </> */}
      {/* )} */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.Button,
    height: 50,
    // borderBottomLeftRadius:30,
    borderBottomRightRadius: 30,

  }
})


const horizontalAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            rotateY: current.progress.interpolate({
              // inputRange: [0, 1],
              // outputRange: [layouts.screen.width, 0],
              inputRange: [0, 1],
              outputRange: ['00deg', '90deg'],
            }),
          },
        ],
      },
    };
  },
};

const revHorizontalAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            rotateY: current.progress.interpolate({
              // inputRange: [0, 1],
              // outputRange: [layouts.screen.width, 0],
              inputRange: [0, 1],
              outputRange: ['90deg', '0deg'],
            }),
          },
        ],
      },
    };
  },
}