import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from "react-native"
import Animated, { SlideInRight, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { IMAGES } from '../../Assets/Images/Images';
import { COLORS } from '../../Constants/Colors';
import Home from "../../Screens/Home/Home"
import Profile from '../../Screens/Profile/Profie';
import Courses from '../../Screens/CourseCategories/Courses';
import { strings } from '../../Constants/Strings';
import { LoginProvider, useLogin } from '../../Statemanagement/Login/LoginContext';
import { SignupProvider, useSignup } from '../../Statemanagement/Signup/SignupContext';
import { HistoryProvider, useLoadHistory } from '../../Statemanagement/Load/History/HistoryContext';
import { VideoPlayLists } from '../../Components/VideoLists';
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
          <Text style={styles.buttonTextStyle}>{strings.Home}</Text>
        </Animated.View>:
        <Animated.Text
        entering={ZoomIn}
        exiting={ZoomOut} onPress={()=>changeButton(1,strings.Home)} style={styles.buttonTextStyle}>{strings.Home}</Animated.Text>
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
          <Text  style={styles.buttonTextStyle}>{strings.Courses}</Text>
        </Animated.View>:
        <Animated.Text
        entering={ZoomIn}
        exiting={ZoomOut}
        onPress={()=>changeButton(2,strings.Courses)} style={styles.buttonTextStyle}>{strings.Courses}</Animated.Text>
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
          <Text style={styles.buttonTextStyle}>{strings.Profile}</Text>
        </Animated.View>:
        <Animated.Text
        entering={ZoomIn}
        exiting={ZoomOut} onPress={()=>changeButton(3,strings.Profile)} style={styles.buttonTextStyle}>{strings.Profile}</Animated.Text>
        }
      </View>
    </ImageBackground>
  )
}

function BottomTab() {
  return (
    <Tab.Navigator
      tabBar={(props:any) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,

      }}
    >
      <Tab.Screen name={strings.Home} component={Home} />
      <Tab.Screen name={strings.Profile} component={Profile} />
      <Tab.Screen name={strings.Courses} component={Courses} />
      <Tab.Screen name={strings.VideoPlayLists} component={VideoPlayLists} />

      {/* VideoPlayLists */}
    </Tab.Navigator>
  );
}
// export default BottomTab;


const UserTab = (props: any) => {
  return (
    <LoginProvider>
      <HistoryProvider>
        <BottomTab {...props} />
      </HistoryProvider> 
    </LoginProvider>
  );
};
export default UserTab

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