
import React, { useState } from 'react';

import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SignUp from '../../Screens/SignUp/SignUp';
import Login from '../../Screens/Login/Login';
import Home from '../../Screens/Home/Home'
import Splash from '../../Screens/Splash/Splash'
import { COLORS } from '../../Constants/Colors';

const Tab = createMaterialTopTabNavigator();
var tabIndex = 0;
var route = "SignUp"

export default function SignUpRegisterDrawer() {

  return (

      <Tab.Navigator


        // tabBarOptions={{
        //   headerShown: false,
        //   activeTintColor: COLORS.Button,
        //   backgroundColor: COLORS.Button,
        //   tabBarStyle: { backgroundColor: 'powderblue' },
        //   labelStyle: {
        //     textTransform: "uppercase",
        //   },
        //   inactiveTintColor: COLORS.Border,
        //   tabBarIndicatorStyle: {
        //     height: null,
        //     top: '10%',
        //     bottom: '10%',
        //     width: '45%',
        //     left: '2.5%',
        //     borderRadius: 100,
        //     backgroundColor: COLORS.ButtonText,
        //   },
        //   style: {
        //     alignSelf: "center",
        //     width: '70%',
        //     borderRadius: 100,
        //     // backgroundColor: "black",
        //     elevation: 5, // shadow on Android

        //   },
        //   tabStyle: {
        //     borderRadius: 100,
        //     // backgroundColor: COLORS.Background,

        //   },
        // }}

        screenOptions={{
          activeTintColor: COLORS.Font,
          // indicatorStyle: {
          //   height: null,
          //   top: '10%',
          //   bottom: '10%',
          //   width: '100%',
          //   left: '2.5%',
          //   borderRadius: 100,
          //   backgroundColor: "yellow",
          // },
          style: {
            alignSelf: "center",
            width: '100%',
            borderRadius: 100,
            elevation: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
             color: COLORS.Font,
             zIndex:4,
             height:25,
             textAlign:'center',
             justifyContent:'center',
             fontWeight:900,
             bottom:5,
          },
          tabBarIndicatorContainerStyle: {
            backgroundColor: "#fff",
            inactiveTintColor: COLORS.Border,
          },
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.T_background,
            height:'100%',
            zIndex:0,
          },

          tabBarItemStyle: {
            // width: '100%',
            alignSelf: 'center',
          },
          tabBarStyle: {
            backgroundColor: COLORS.Font,
            width: '100%',
            elevation: 4,
            alignSelf: 'center',
            height:35,
            
          },
        }}



      >
       
        <Tab.Screen
          headerShown={false}
          name="Home" component={Home} />
       
        <Tab.Screen
          headerShown={false}
          name="Login" component={Login} />
       
        <Tab.Screen
          headerShown={false}
          name="SignUp" component={SignUp} />
      </Tab.Navigator>
  );
}

// export default  SignUpRegisterDrawer
