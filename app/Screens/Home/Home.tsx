import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Animated, { FadeInUp, log, SlideInLeft, SlideInRight, ZoomIn } from 'react-native-reanimated';
import * as CONSTANTS from '../../Constants/Constants'
import { IMAGES } from "../../Assets/Images/Images"
import { FlatList, ScrollView, State, TextInput } from 'react-native-gesture-handler';
import { COLORS } from '../../Constants/Colors';
import AnimatedView from '../../Components/AnimatedView';
import { useNetInfo } from '@react-native-community/netinfo';
import { printError, printInfo, printLog, printSucess, retrieveData } from '../../Assets/Utils/ExtenFunc';
import { LoginProvider, useLogin } from '../../Statemanagement/Login/LoginContext';
import { SignupProvider, useSignup } from '../../Statemanagement/Signup/SignupContext';
import { HistoryProvider, useLoadHistory } from '../../Statemanagement/Load/History/HistoryContext';
import base64js from 'base64-js';
import { useIsFocused } from '@react-navigation/native'; // Import the useIsFocused hook
import { strings } from '../../Constants/Strings';


const HomeScreen = (navigation: any) => {
  const [search, setSearch] = useState('')
  const scrollX = useRef(new Animated.Value(0)).current
  const netInfo = useNetInfo();
  const net = netInfo.isConnected;
  const [username, setUsername] = useState<string>('')
  const { state, dispatch, loadHistory } = useLoadHistory();
  const isFocused = useIsFocused(); // Get the isFocused boolean from the hook


  const nav = navigation.navigation;
  console.log(">>>",nav);
  

  const asyncRetrieve = async () => {
    try {
      const tokenPromise = retrieveData('@token', 'Home');
      const usernamePromise = retrieveData('@username', 'Home');
      const [token, username] = await Promise.all([tokenPromise, usernamePromise]);
      setUsername((username as { value: string }).value);
      // printLog("usernamePromise.value", username)
      if (username) {
        loadHistory()
        return
      }
    } catch (error) {
      printError("Home", error); // Handle any errors here
    }
  };
  // printError("state in Home",state.data.List.details.data[0])

  useEffect(() => {
    asyncRetrieve()
  }, [isFocused])

  const thumbnailImg = (data: any) => {
    let imagebase64 = data
    const uint8Array = new Uint8Array(imagebase64);
    const newUnit8Array = new Uint8Array(data)
    const base64String = data ? base64js.fromByteArray(uint8Array) : data;
    // const newbase64String = base64js.fromByteArray(newUnit8Array);
    // printSucess(data)
    return { uri: `data:image/jpeg;base64,${base64String}` }
  }

  return (

    <View
      style={styles.container}>
      <Image
        resizeMode='cover'
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          // top: - CONSTANTS.DIMENSIONS.HEIGHT * 2,
          zIndex: -1,
          backgroundColor: 'red',

        }} source={IMAGES.halfbg} />
      <Text
        style={{
          color: '#fff',
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          top: CONSTANTS.DIMENSIONS.HEIGHT / 3,
        }}
        onPress={(e) => {
          console.log("positions", e.nativeEvent.locationX, e.nativeEvent.locationY);
        }}
      >Welcome Back ! {`\n`}{username}</Text>

      <View
        style={{
          height: CONSTANTS.DIMENSIONS.HEIGHT,
          width: CONSTANTS.DIMENSIONS.HEIGHT,
          backgroundColor: "#fff",
          opacity: 0,
          marginTop: CONSTANTS.DIMENSIONS.HEIGHT / 3,
          borderRadius: CONSTANTS.DIMENSIONS.HEIGHT / 2,
        }} />

      {/* search view  */}
      <View
        style={{
          height: CONSTANTS.DIMENSIONS.HEIGHT / 2,
          width: CONSTANTS.DIMENSIONS.WIDTH * 8,
          backgroundColor: COLORS.darkBg,
          borderRadius: 20,
          // margin: 5,
          top: CONSTANTS.DIMENSIONS.HEIGHT / 8,
          justifyContent: 'center',
          flexDirection: 'row',
          elevation: 5,
        }}
      >
        <TextInput
          value={search}
          placeholder='Explore'
          onChangeText={(text) => setSearch(text)}
          style={{
            width: "85%",
            padding: 5,
          }}
        />

        <Image source={IMAGES.glass}
          style={{
            height: "50%",
            width: "5%",
            padding: "5%",
            alignSelf: 'center',
            tintColor: '#dbd7d7'
          }} />
      </View>

      {/* animated view */}
      <AnimatedView netStatus={net} style={{ top: CONSTANTS.DIMENSIONS.HEIGHT * 4.7, position: 'absolute' }} />

      {/* Explore card */}
      <ImageBackground
        source={IMAGES.gradientbg}
        resizeMode={'stretch'}
        style={{
          height: CONSTANTS.DIMENSIONS.HEIGHT * 1.8,
          width: CONSTANTS.DIMENSIONS.WIDTH * 8,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 5,
          marginTop: CONSTANTS.DIMENSIONS.HEIGHT / 4,
        }}>

        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: CONSTANTS.DIMENSIONS.HEIGHT / 4
          }}
        >100+ Videos available explore them now!</Text>
        <TouchableOpacity

          style={{
            ...styles.button,
            width: (CONSTANTS.DIMENSIONS.WIDTH) * 5,
          }}>
          <Text onPress={() => nav.navigate(strings.Chat)} style={styles.buttonText}>Explore ➝</Text>
        </TouchableOpacity>

      </ImageBackground>

      {/* last activities  */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: CONSTANTS.DIMENSIONS.WIDTH * 10,
        backgroundColor: COLORS.DarkBlue,
        marginTop: '2%',
      }}>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#fff',
          alignSelf: 'flex-start',
          // backgroundColor:'red',
          textAlignVertical: 'center',
          marginLeft: 10,
          marginTop: 10,
        }}>Latest Activities{`\n`}</Text>

      </View>

      {state.loading ? <ActivityIndicator size={'large'} color={COLORS.DarkBlue} /> :
        <View
          style={{
            height: '25%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.darkBg,
            // flex:1,
          }}>
          <Animated.FlatList
            // entering={FadeInUp}
            showsHorizontalScrollIndicator={false}
            data={state.data && state.data.List.details ? state.data.List.details.data : []}
            horizontal
            renderItem={({ item }) =>
              <TouchableOpacity
                // entering={FadeInUp}
                activeOpacity={0.7}
                style={{
                  height: '80%',
                  width: CONSTANTS.DIMENSIONS.WIDTH * 4,
                  backgroundColor: COLORS.darkBg,
                  borderBottomLeftRadius: CONSTANTS.DIMENSIONS.HEIGHT / 2,
                  borderBottomRightRadius: CONSTANTS.DIMENSIONS.HEIGHT / 2,
                  borderTopRightRadius: CONSTANTS.DIMENSIONS.HEIGHT / 2,
                  padding: 10,
                  alignSelf: 'center',
                  // borderWidth:0.4 ,
                  borderColor: COLORS.greyBoder,
                  margin: 10,
                  elevation: 10,
                  shadowColor: COLORS.shadow, // Slightly darker shade for the card shadow
                  shadowOffset: { width: -50, height: 50 },
                  shadowOpacity: 20,
                  shadowRadius: 18,

                  // margin:'10%',
                  // marginVertical: CONSTANTS.DIMENSIONS.HEIGHT,
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    resizeMode='contain'
                    style={{
                      height: '95%',
                      width: '95%',
                      alignSelf: 'center',
                    }}
                    source={thumbnailImg(item.thumbnail.data)}
                  // source={IMAGES.aboutus}
                  />
                </View>
                <Text style={{ color: '#fff', fontSize: CONSTANTS.DIMENSIONS.HEIGHT / 5, fontWeight: 'bold', paddingTop: 5, }}>{item.title}</Text>
                <View style={{
                  // marginTop: 5,
                  marginBottom: 3,
                  height: 1, alignSelf: 'center',
                  width: '100%',
                  backgroundColor: '#d3d3d3'
                }} />
                <Text style={{ color: '#9c9998', fontSize: CONSTANTS.DIMENSIONS.HEIGHT / 7, fontWeight: '700' }} >{item.category}</Text>
              </TouchableOpacity>
            }
          />
        </View>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',

  },

  button: {
    height: 35,
    width: 120,
    backgroundColor: COLORS.Button,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 5,
    elevation: 3,
    flexDirection: 'row',


  },
  buttonText: {
    alignSelf: 'center',
    textAlign: 'center',
    color: COLORS.ButtonText,
  },
});
const card = (width: any, height: any): ViewStyle => ({
  width: width * 2,
  height: height * 2,
  backgroundColor: 'red',

})

// const Home = (props: any) => {
//   return (
//     <LoginProvider>
//       <HistoryProvider>
//         <HomeScreen {...props} />
//       </HistoryProvider> 
//     </LoginProvider>
//   );
// };
export default HomeScreen


