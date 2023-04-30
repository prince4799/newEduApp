/**
 * Sample React Native Login
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useRef, useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import {
  Button,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  View,
  Alert,
  Linking,
} from 'react-native';
import Animated from "react-native-reanimated";


import { COLORS } from '../../Constants/Colors';
// import * as FirebaseAuth from "../../Firebase/FirebaseAuth"
// import { SignInUser } from '../../Firebase/FirebaseAuth';
import { SignInUser, CreateNewUser } from '../../Firebase/FirebaseAuth'
import * as firebaseDB from '../../Firebase/FirebaseDB';
import { LoginProvider, useLogin } from '../../Statemanagement/Login/LoginContext';
import { NET_STATUS } from '../../Constants/Constants';
import { initialState } from '../../Statemanagement/Login/LoginReducer';
import AnimatedView from '../../Components/AnimatedView';
import { IMAGES } from '../../Assets/Images/Images'
import RadioButton from '../../Components/RadioButton';
import { alert, storeData } from '../../Assets/Utils/ExtenFunc';
const Login = ({ navigation }) => {

  const { height, width, scale, fontScale } = useWindowDimensions()
  const [id, setId] = useState('')
  const [checkValid, setCheckValid] = useState(false)
  const [password, setPassword] = useState('')
  const { state, dispatch, loginUser } = useLogin();
  const portrait = (height / 10) * 5;
  const landscape = (height / 10) * 8
  const [secureText, setSecureText] = useState < boolean > (false)
  const [userType, setUserType] = useState < String > ('')


  useEffect(() => {
    if (state && state.error && state !== initialState && checkValid) {
      alert(state.error.message)
      return;
    }
    if (state.user && state && state !== initialState && checkValid) {
      alert(state.user.message)
      // console.log("=====", state.user.token)
    }
  }, [state])

  const loginValidation = async({ id, password, userType }) => {
    // console.log("id, password, userType",id, password, userType)
    if (!id || !password || !userType) {
      alert('Enter the Credentials!')
      return;
    }
    if (NET_STATUS == false) {
      alert('Internet not available!')
      return;
    }

    const user = { id, password }

    loginUser(user)
    // console.log('===================',state)
    const result = await storeData('@isLoggedIn', state.user.status.toString(), module='Login.js');
    console.log('result',result)

    setCheckValid(true)
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={{ height: height, width: width, justifyContent: 'center', alignItems: 'center', }} resizeMode='cover' source={require("../../Assets/Images/gradient_bg.png")} >
          <ImageBackground style={{ ...styles.form(height, width), }} source={require("../../Assets/Images/half_bg.png")} >
            <View style={{ ...styles.form(height, width), }}>
              <ScrollView style={{ height: (height / 10) * 8, }}>
                <View style={{ alignSelf: 'center' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 24, top: 10, color: COLORS.Font }}>LOGIN</Text>
                  <View style={{ height: '20%', width: '25%', backgroundColor: '#fff', top: 0, margin: 10 }} />
                  <Text>APP LOGO</Text>
                </View>
                <KeyboardAvoidingView style={{ height: height > width ? portrait : landscape, width: '90%', alignSelf: 'center', marginBottom: 80, }} behavior='padding' >
                  <View style={{ ...styles.inputContainer }} >
                    <Image style={styles.inputImg} source={require('../../Assets/Images/mail.png')} />
                    <TextInput style={styles.inputs}
                      value={id}
                      onChangeText={(text) => setId(text)}
                      placeholder='Mail/Username' />
                  </View>
                  <View style={styles.inputContainer}>
                    <Image style={styles.inputImg} source={require('../../Assets/Images/padlock.png')} />
                    <TextInput style={styles.inputs}
                      value={password}
                      secureTextEntry={secureText}
                      onChangeText={(text) => setPassword(text)}
                      placeholder='Password' />
                    <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                      <Image style={{ ...styles.inputImg, }} source={secureText ? IMAGES.eyeopen : IMAGES.eyeclosed} />
                    </TouchableOpacity>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    top: '5%',
                    alignItems: 'center',
                  }}>
                    <RadioButton
                      label={"Admin"}
                      value={userType}
                      selectedValue={'Admin'}
                      onSelect={() =>
                        setUserType('Admin')
                      }
                    />
                    <RadioButton
                      label={"User"}
                      value={userType}
                      selectedValue={'User'}
                      onSelect={() =>
                        setUserType('User')
                      }
                    />
                  </View>
                  <View style={{ bottom: 0, top: '30%' }}>
                    <TouchableOpacity
                      onPress={() => loginValidation({ id, password,userType })}
                      // onPress={() => navigation.replace('BottomTab')}
                      style={{
                        ...styles.button,
                        width: (width / 10) * 6,
                      }}>
                      <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                    { /* <TouchableOpacity
                      style={{
                        ...styles.button,
                        width: (width / 10) * 6,
                        alignItems: 'center',
                      }}
                    >
                      <Text style={styles.buttonText}>SignIn with google</Text>
                      <Image
                        style={{
                          ...styles.inputImg,
                          height: 30,
                          width: 30,
                          tintColor: null
                        }}
                        source={require('../../Assets/Images/google.png')} />
                    </TouchableOpacity>*/}
                  </View>
                </KeyboardAvoidingView>
              </ScrollView>
            </View>
            <Text onPress={() => navigation.navigate('SignUp')} style={[styles.link]}>Create  An Account</Text>
          </ImageBackground>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#B2C600",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  form: (deviceHeight, deviceWidth) => ({
    height: (deviceHeight / 10) * 8,
    width: (deviceWidth / 10) * 8,
    backgroundColor: COLORS['T-Background'],


  }),
  inputs: {
    width: '80%',
    height: '95%',
    padding: 5,
    alignSelf: 'center',
    color: COLORS.Font
  },

  inputContainer: {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.Border,
  },

  inputImg: {
    height: 15,
    width: 15,
    tintColor: COLORS.Border,
    marginHorizontal: 5,

  },
  button: {
    height: 35,
    width: 120,
    backgroundColor: COLORS.Button,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    elevation: 3,
    flexDirection: 'row',


  },
  buttonText: {
    alignSelf: 'center',
    textAlign: 'center',
    color: COLORS.ButtonText
  },
  link: {
    color: COLORS.Links,
    textDecorationLine: 'underline',
    alignSelf: 'center',
    // backgroundColor:'red',
    bottom: '5%'
  }
});

// export default Login;

const LoginWrapper = (props) => {
  return (
    <LoginProvider>
      <Login {...props} />
    </LoginProvider>
  );
};

export default LoginWrapper;