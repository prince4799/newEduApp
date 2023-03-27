
import React, { useState } from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UPSC from '../../Screens/CourseCategories/Education/UPSC'
import Yoga from '../../Screens/CourseCategories/Physical/Yoga';
import { COLORS } from '../../Constants/Colors';

const Tab = createMaterialTopTabNavigator();

export default function CoursesCategories() {

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
             fontWeight:"900",
             bottom:5,
          },
          tabBarIndicatorContainerStyle: {
            backgroundColor: "#fff",
            inactiveTintColor: COLORS.Button,
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
          name="Physical" component={Yoga} />
       
        <Tab.Screen
          headerShown={false}
          name="Education" component={UPSC} />
      </Tab.Navigator>
  );
}

// export default  CoursesCategories
