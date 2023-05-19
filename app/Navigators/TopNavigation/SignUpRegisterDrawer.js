
import React, { useState } from 'react';

import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SignupWrapper from '../../Screens/SignUp/SignUp';

import Home from '../../Screens/Home/Home'
import Splash from '../../Screens/Splash/Splash'
import { COLORS } from '../../Constants/Colors';
import LoginWrapper from '../../Screens/Login/Login';
import { strings } from '../../Constants/Strings';

const Tab = createMaterialTopTabNavigator();
var tabIndex = 0;
var route = "SignUp"

export default function SignUpRegisterDrawer() {

  return (

      <Tab.Navigator
        screenOptions={{
          activeTintColor: COLORS.Font,
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
          name={strings.Login} component={LoginWrapper} />
       
        <Tab.Screen
          headerShown={false}
          name={strings.SignUp} component={SignupWrapper} />
      </Tab.Navigator>
  );
}


