/**
 * Sample React Native Login
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground
} from 'react-native';

import { COLORS } from '../../Constants/Colors';
// import * as FirebaseAuth from "../../Firebase/FirebaseAuth"
// import { SignInUser } from '../../Firebase/FirebaseAuth';
import {SignInUser,CreateNewUser} from '../../Firebase/FirebaseAuth'
import * as firebaseDB from '../../Firebase/FirebaseDB';
const Login = () => {

  const { height, width, scale, fontScale } = useWindowDimensions()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const portrait = (height / 10) * 5;
  const landscape = (height / 10) * 8

  return (
    <SafeAreaView style={styles.container}>
            <ImageBackground style={{height:height,width:width,justifyContent:'center',alignItems:'center'}} resizeMode='cover' source={require("../../Assets/Images/gradient_bg.png")} >

      <ImageBackground style={{ ...styles.form(height, width), elevation:8 }} source={require("../../Assets/Images/half_bg.png")} >

      <View style={{ ...styles.form(height, width), borderRadius: 10, }}>
        <ScrollView style={{ height: (height / 10) * 8, }}>

          <View style={{ alignSelf: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, top:10, color: COLORS.Font }}>LOGIN</Text>
            <View style={{ height: '20%', width: '25%', backgroundColor: '#fff', top: 0, margin: 10 }} />
            <Text>APP LOGO</Text>
          </View>

          <KeyboardAvoidingView style={{ height: height > width ? portrait : landscape, width: '90%', alignSelf: 'center', marginBottom: 80, }} behavior='padding' >
            <View style={{ ...styles.inputContainer }} >
              <Image style={styles.inputImg} source={require('../../Assets/Images/mail.png')} />
              <TextInput style={styles.inputs}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder='Enter Your Mail' />
            </View>
            <View style={styles.inputContainer}>
              <Image style={styles.inputImg} source={require('../../Assets/Images/padlock.png')} />

              <TextInput style={styles.inputs}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder='Enter Your Password' />
              <Image style={{ ...styles.inputImg, }} source={require('../../Assets/Images/eye.png')} />
            </View>

            <View style={{ bottom: 0, top: '40%' }}>

              <TouchableOpacity
              onPress={()=>SignInUser({email,password})}
              // onPress={()=>firebaseDB.FirebaseDBPush({email,password})}
              // onPress={()=>firebaseDB.FirebaseDBRead()}

              style={{
                ...styles.button,
                width: (width / 10) * 6,
              }}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>

            
              <TouchableOpacity
                style={{
                  ...styles.button,
                  width: (width / 10) * 6,
                  alignItems: 'center',
                }}>
                <Text style={styles.buttonText}>SignIn with google</Text>
                <Image
                  style={{
                    ...styles.inputImg,
                    height: 30,
                    width: 30,
                    tintColor: null
                  }}
                  source={require('../../Assets/Images/google.png')} />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>

      </View>

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
  }
});

export default Login;
