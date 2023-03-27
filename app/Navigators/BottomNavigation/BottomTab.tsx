import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from "react-native"
import Animated, { SlideInRight, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { IMAGES } from '../../Assets/Images/Images';
import { COLORS } from '../../Constants/Colors';
import Home from "../../Screens/Home/Home"
import Profile from '../../Screens/Profile/Profie';
import Courses from '../../Screens/CourseCategories/Courses';

const Tab = createBottomTabNavigator();


function TabBar({...props}): JSX.Element {
  const [buttonIndex,setButtonIndex]=useState(1);

  function  changeButton(index:number,screen:string):void{
    setButtonIndex(index)
    props.navigation.navigate(screen)
  }


  return (
    <ImageBackground
      source={IMAGES.gradientbg}
      style={{
        backgroundColor: COLORS.Font,
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}>
        {/* ===========first tab button=========== */}
      <View style={{
        height: '100%',
        width: '30%',
        alignSelf: 'center',
        justifyContent: 'center',
      }} >
        {buttonIndex ==1 ?<Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          style={styles.buttonBackground} >
          <Text style={styles.buttonTextStyle}>Home</Text>
        </Animated.View>:
        <Animated.Text
        entering={ZoomIn}
        exiting={ZoomOut} onPress={()=>changeButton(1,'Home')} style={styles.buttonTextStyle}>Home</Animated.Text>
        }
      </View>
        {/* ===========Second tab button=========== */}

      <View style={{
        height: '100%',
        width: '30%',
        alignSelf: 'center',
        justifyContent: 'center'
      }} >
       {buttonIndex ==2 ?<Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          style={styles.buttonBackground} >
          <Text  style={styles.buttonTextStyle}>Course</Text>
        </Animated.View>:
        <Animated.Text
        entering={ZoomIn}
        exiting={ZoomOut}
        onPress={()=>changeButton(2,'Courses')} style={styles.buttonTextStyle}>Course</Animated.Text>
        }
      </View>

        {/* ===========third tab button=========== */}

      <View style={{
        height: '100%',
        width: '30%',
        alignSelf: 'center',
        justifyContent: 'center'
      }} >
        {buttonIndex ==3 ?<Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          style={styles.buttonBackground} >
          <Text style={styles.buttonTextStyle}>Profile</Text>
        </Animated.View>:
        <Animated.Text
        entering={ZoomIn}
        exiting={ZoomOut} onPress={()=>changeButton(3,'Profile')} style={styles.buttonTextStyle}>Profile</Animated.Text>
        }
      </View>



    </ImageBackground>
  )
}

function BottomTab() {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,

      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Courses" component={Courses} />
    </Tab.Navigator>
  );
}
export default BottomTab;

const styles = StyleSheet.create({
  buttonTextStyle: {
    textAlign: 'center',
      color:COLORS.ButtonText,
      fontWeight:'900',
      textAlignVertical:'center',
      height:'100%',
      width:'100%'
  },
  buttonBackground: {
    height: '70%',
    // width: '30%',
    borderRadius: 50,
    backgroundColor: COLORS.Button,
    alignItems: 'center',
    elevation:5,
    justifyContent:'center'
  }
})