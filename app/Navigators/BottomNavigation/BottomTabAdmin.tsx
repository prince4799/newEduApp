import { useEffect, useLayoutEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, BackHandler, BackHandlerStatic, BackPressEventName, RippleBackgroundPropType, Alert } from "react-native"
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { IMAGES } from '../../Assets/Images/Images';
import { COLORS } from '../../Constants/Colors';
import Profile from '../../Screens/Profile/Profie';
import { strings } from '../../Constants/Strings';
import AdminDashboard from '../../Screens/Admin/UI/AdminDashboard';
import { VideoLists, VideoPlayLists } from '../../Components/VideoLists';
import Header from '../../Components/Header';
import { printLog } from '../../Assets/Utils/ExtenFunc';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function TabBar({ ...props }): JSX.Element {
    const [buttonIndex, setButtonIndex] = useState(1);

    useEffect(() => {
        const handleBackPress = () => {
            const previousScreen = props.navigation.dangerouslyGetState().routes[props.navigation.dangerouslyGetState().index - 1]?.name;
            printLog("previousScreen....",props.navigation.dangerouslyGetState())
            if(previousScreen==undefined){
                setButtonIndex(1)
                BackHandler.exitApp()
                return true;
            }
          if (props.navigation.canGoBack() && previousScreen!=undefined) {
            setButtonIndex(getButtonIndex(previousScreen));
            props.navigation.navigate(previousScreen);
            return true;
          }
          return false;
        };
      
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => backHandler.remove();
      }, [props.navigation]);
      
      function getButtonIndex(screenName : string) {
        if (screenName === 'Home'||screenName ==undefined) {
          return 1;
        } else if (screenName === 'Courses') {
          return 2;
        } else if (screenName === 'Profile') {
          return 3;
        }
        return 1; // Default to Home screen if the screen name is unknown
      }

    function changeButton(index: number, screen: string): void {
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
                {buttonIndex == 1 ? <Animated.View
                    entering={ZoomIn}
                    exiting={ZoomOut}
                    style={styles.buttonBackground} >
                    <Text style={styles.buttonTextStyle}>{strings.Home}</Text>
                </Animated.View> :
                    <Animated.Text
                        entering={ZoomIn}
                        exiting={ZoomOut} onPress={() => changeButton(1, strings.Home)} style={styles.buttonTextStyle}>{strings.Home}</Animated.Text>
                }
            </View>
            {/* ===========Second tab button=========== */}

            <View style={{
                height: '100%',
                width: '30%',
                alignSelf: 'center',
                justifyContent: 'center'
            }} >
                {buttonIndex == 2 ? <Animated.View
                    entering={ZoomIn}
                    exiting={ZoomOut}
                    style={styles.buttonBackground} >
                    <Text style={styles.buttonTextStyle}>{strings.Courses}</Text>
                </Animated.View> :
                    <Animated.Text
                        entering={ZoomIn}
                        exiting={ZoomOut}
                        // onPress={() => changeButton(2, 'strings.Courses')} 
                        style={styles.buttonTextStyle}>{strings.Courses}</Animated.Text>
                }
            </View>

            {/* ===========third tab button=========== */}

            <View style={{
                height: '100%',
                width: '30%',
                alignSelf: 'center',
                justifyContent: 'center'
            }} >
                {buttonIndex == 3 ? <Animated.View
                    entering={ZoomIn}
                    exiting={ZoomOut}
                    style={styles.buttonBackground} >
                    <Text style={styles.buttonTextStyle}>{strings.Profile}</Text>
                </Animated.View> :
                    <Animated.Text
                        entering={ZoomIn}
                        exiting={ZoomOut} onPress={() => changeButton(3, strings.Profile)} style={styles.buttonTextStyle}>{strings.Profile}</Animated.Text>
                }
            </View>
        </ImageBackground>
    )
}



function BottomTabAdmin() {
    return (
        <Tab.Navigator
            tabBar={(props: any) => <TabBar {...props} />}
            screenOptions={{

            }}
        >
            <Tab.Screen
                options={{
                    headerShown: false
                }}
                name={strings.Home} component={AdminDashboard} />
            {/* <Tab.Screen
                options={{
                    headerShown: false
                }}
                name={strings.Courses} component={} /> */}
            <Tab.Screen
                options={{
                    headerShown: false
                }}
                name={strings.Profile} component={Profile} />

        </Tab.Navigator>
    );
}
export default BottomTabAdmin;

const styles = StyleSheet.create({
    buttonTextStyle: {
        textAlign: 'center',
        color: COLORS.ButtonText,
        fontWeight: '900',
        textAlignVertical: 'center',
        height: '100%',
        width: '100%'
    },
    buttonBackground: {
        height: '70%',
        // width: '30%',
        borderRadius: 50,
        backgroundColor: COLORS.Button,
        alignItems: 'center',
        elevation: 5,
        justifyContent: 'center'
    }
})