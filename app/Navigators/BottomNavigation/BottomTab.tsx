import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from "react-native"
import Animated, { SlideInRight, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { IMAGES } from '../../Assets/Images/Images';
import { COLORS } from '../../Constants/Colors';
import Home from "../../Screens/Home/Home"

const Tab = createBottomTabNavigator();


function TabBar(): JSX.Element {
  const [buttonIndex,setButtonIndex]=useState(0);

  function  changeButton(index:number):void{
    console.log("here..............",index,buttonIndex)
    setButtonIndex(index)
    
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
      <View style={{
        height: '100%',
        width: '30%',
        alignSelf: 'center',
        justifyContent: 'center'
      }} >
        {buttonIndex ==1 ?<Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          style={styles.buttonBackground} >
          <Text onPress={()=>changeButton(0)} style={styles.buttonTextStyle}>Home</Text>
        </Animated.View>:
        <Text onPress={()=>changeButton(1)} style={styles.buttonTextStyle}>Home</Text>
        }
      </View>
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
          <Text onPress={()=>changeButton(0)} style={styles.buttonTextStyle}>Home</Text>
        </Animated.View>:
        <Text onPress={()=>changeButton(2)} style={styles.buttonTextStyle}>Home</Text>
        }
      </View>
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
          <Text onPress={()=>changeButton(0)} style={styles.buttonTextStyle}>Home</Text>
        </Animated.View>:
        <Text onPress={()=>changeButton(3)} style={styles.buttonTextStyle}>Home</Text>
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
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
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
  },
  buttonBackground: {
    height: '50%',
    // width: '30%',
    borderRadius: 50,
    backgroundColor: COLORS.Button,
    alignItems: 'center'
  }
})