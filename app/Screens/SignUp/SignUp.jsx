/**
 * Sample React Native Signup
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
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
  Alert,
  ImageBackground,
  ToastAndroid
} from 'react-native';
// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
import { COLORS } from '../../Constants/Colors';
// import * as firebaseDB from "../../Firebase/FirebaseDB"
// import * as firebaseAuth from "../../Firebase/FirebaseAuth"
// import { CreateNewUser } from "../../Firebase/FirebaseAuth"
// import { CONSTANTS, DIMENSIONS } from '../../Constants/Constants';
import { SignupProvider, useSignup } from '../../Statemanagement/Signup/SignupContext';
import { log } from 'react-native-reanimated';
// import { async } from '@firebase/util';

const SignUp = (props) => {

  const { height, width, scale, fontScale } = useWindowDimensions()
  const [email, setEmail] = useState(String)
  const [phone, setPhone] = useState(String)
  const [username, setUsername] = useState(String)
  const [password, setPassword] = useState(String)
  const { state, dispatch, signUpUser } = useSignup();
  const portrait = (height / 10) * 6;
  const landscape = height


  /*const SiginUpValidation = async ({ password, email, phone, username }) => {
    if (password == '' || email == '' || phone == '' || username == '') {
      Alert.alert("None of the fields can be empty")
    } else if (password.length < 8 || phone.length < 10 || username.length < 6) {
      { password.length < 8 ? Alert.alert("Password Must be greater than 8 characters.") : null }
      { phone.length < 10 ? Alert.alert("Invalid Phone No.") : null }
      { username.length < 6 ? Alert.alert("username Must be greater than 6 characters.") : null }
      return;
    } else {
      const user = { password, email, phone, username }
      signUpUser(user);
      console.log("state......", state)
      if (state.error) {
        ToastAndroid.showWithGravityAndOffset(
          state.error.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        )
      }
      else {
        ToastAndroid.showWithGravityAndOffset(
          state.user.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        )
        props.navigation.navigate('BottomTab')
      }
    }
  }*/

  const SiginUpValidation = async ({ password, email, phone, username }) => {
    if (!password || !email || !phone || !username) {
      Alert.alert("None of the fields can be empty")
      return;
    }

    if (password.length < 8) {
      Alert.alert("Password must be greater than 8 characters.")
      return;
    }

    if (phone.length < 10) {
      Alert.alert("Invalid Phone No.")
      return;
    }

    if (username.length < 6) {
      Alert.alert("Username must be greater than 6 characters.")
      return;
    }

    const user = { password, email, phone, username }
    signUpUser(user);

    console.log("state from SignUp", state)
    if (state.error) {
      ToastAndroid.showWithGravityAndOffset(
        state.error.message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      )
    } else {
      ToastAndroid.showWithGravityAndOffset(
        state.user.message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      )
      props.navigation.navigate('BottomTab')
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      {state.loading == true ? <View
        style={{
          position: 'absolute',
          top: '45%',
          left: '45%',
          height: '5%',
          width: '5%',
          backgroundColor: '#fff'
        }} /> : null}
      <ImageBackground style={{ height: height, width: width, justifyContent: 'center', alignItems: 'center' }} resizeMode='cover' source={require("../../Assets/Images/gradient_bg.png")} >
        <ImageBackground style={{ ...styles.form(height, width), elevation: 8 }} source={require("../../Assets/Images/half_bg.png")} >
          <View style={{ ...styles.form(height, width), }}>
            <ScrollView style={{}}>
              <View style={{ alignSelf: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 24, color: COLORS.Font }}>SIGNUP</Text>
                <View style={{ height: '20%', width: '25%', top: 0, margin: 10 }} />
                <Text>APP LOGO</Text>
              </View>
              <KeyboardAvoidingView style={{ height: height > width ? portrait : landscape, width: '90%', alignSelf: 'center', marginBottom: 50, }} behavior='padding' >
                <View style={{ ...styles.inputContainer, alignSelf: "stretch", }} >
                  <Image style={{ ...styles.inputImg, }} source={require('../../Assets/Images/user.png')} />
                  <TextInput style={{ ...styles.inputs, width: '45%', color: COLORS.Font }}
                    value={username}

                    onChangeText={(text) => setUsername(text)}
                    placeholder='Enter User Name' />
                </View>
                <View style={{ ...styles.inputContainer, alignSelf: "stretch", }} >
                  <Image style={{ ...styles.inputImg, }} source={require('../../Assets/Images/phone.png')} />
                  <TextInput style={{ ...styles.inputs, width: '45%', color: COLORS.Font }}
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    placeholder='Enter Mobile No.' />
                </View>
                <View style={{ ...styles.inputContainer }} >
                  <Image style={styles.inputImg} source={require('../../Assets/Images/mail.png')} />
                  <TextInput style={{ ...styles.inputs, color: COLORS.Font }}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder='Enter Your Mail' />
                </View>
                <View style={styles.inputContainer}>
                  <Image style={styles.inputImg} source={require('../../Assets/Images/padlock.png')} />

                  <TextInput style={{ ...styles.inputs, color: COLORS.Font }}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    placeholder='Enter Your Password' />
                  <Image style={{ ...styles.inputImg, }} source={require('../../Assets/Images/eye.png')} />
                </View>
                <View
                  style={{
                    // marginTop:50
                  }}>
                  <TouchableOpacity
                    disabled={state.loading}
                    onPress={() => SiginUpValidation({ password, email, phone, username })} style={{ ...styles.button, width: (width / 10) * 6, marginTop: 60, }}>
                    <Text style={{ color: COLORS.ButtonText }}>SIGNUP NOW</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ ...styles.button, width: (width / 10) * 6, justifyContent: 'center', flexDirection: 'row', }}>
                    <Text style={{ alignSelf: 'center', textAlign: 'center', color: COLORS.ButtonText }}>SignUp with google</Text>
                    <Image style={{ ...styles.inputImg, height: 30, width: 30, tintColor: null }} source={require('../../Assets/Images/google.png')} />
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
    backgroundColor: COLORS.Background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: (deviceHeight, deviceWidth) => ({
    height: (deviceHeight / 10) * 8,
    width: (deviceWidth / 10) * 8,
    backgroundColor: COLORS['T-Background']

  }),
  inputs: {
    width: '80%',
    height: '95%',
    padding: 5,
    alignSelf: 'center',
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
    height: 40,
    width: 120,
    backgroundColor: COLORS.Button,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    elevation: 3,

  },
  buttonText: {
    alignSelf: 'center',
    textAlign: 'center',
  }
});


// export default SignUp;

const SignupWrapper = (props) => {
  return (
    <SignupProvider>
      <SignUp {...props} />
    </SignupProvider>
  );
};

export default SignupWrapper;