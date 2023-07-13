/**
 * Sample React Native Signup
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useRef, useState } from 'react';
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
import { COLORS } from '../../Constants/Colors';
import { SignupProvider, useSignup } from '../../Statemanagement/Signup/SignupContext';
import { log } from 'react-native-reanimated';
import { alert, handleSelectionChange, printError, printInfo, printSucess, storeData } from '../../Assets/Utils/ExtenFunc';
import RadioButton from '../../Components/RadioButton';
import { IMAGES } from '../../Assets/Images/Images';
import MyModal from '../../Components/MyModal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomTab from '../../Navigators/BottomNavigation/BottomTab';
// import { async } from '@firebase/util';

const SignUp = (props) => {

  const { height, width, scale, fontScale } = useWindowDimensions()
  const [email, setEmail] = useState(String)
  const [phone, setPhone] = useState(String)
  const [secureText, setSecureText] = useState < boolean > (false)
  const [username, setUsername] = useState(String)
  const [password, setPassword] = useState(String)
  const [userType, setUserType] = useState('User')
  const { state, dispatch, signUpUser } = useSignup();
  const [showModal, setShowModal] = useState(false)
  const [secret, setSecret] = useState < Object > ('')
  const portrait = (height / 10) * 6;
  const landscape = height
  var [radio, setRadio] = useState < boolean > (false)
  const prevCountRef = useRef();
  const onModalClose = (data) => {
    // printSucess(data)
    // setSecret(data)
    setShowModal(false);
  };
  useEffect(() => {
    if (userType === 'Admin') {
      setShowModal(true);
    }
    if (userType === 'User') {
      setShowModal(false);
    }
  }, [userType]);

  useEffect(() => {
    printInfo("state form SignUp", JSON.stringify(state))
    if (state.loading == false) {
      if (state.error) {
        alert(state.error.message)
      }
      if (state.user) {
        alert(state.user.message)
        storingData(state)
        userType == 'Public' ? props.navigation.navigate('BottomTabUser') : props.navigation.navigate('BottomTabAdmin')
      }
    }
  }, [state])

  const storingData = async (data) => {
    try {
      const $token = await storeData('@token', '' + data.token, "Login")
      const $username = await storeData('@username', '' + username, "Login")
      const $email = await storeData('@email', '' + email, "Login")
      const $contact = await storeData('@contact', '' + phone, "Login")
      const $userType = await storeData('@userType', '' + userType, "Login")
      const $isLoggedIn = await storeData('@isLoggedIn', '' + data.user.status)
      if (Object.keys(secret).length > 0 && secret && secret.secretKey && secret.secretValue) {
        const $secretKey = await storeData('@secretKey', '' + secret.secretKey, "Login")
        const $secretVal = await storeData('@secretVal', '' + secret.secretValue, "Login")
      }
    } catch (error) {
      printError(error); // Handle any errors here
    }
  };

  const SiginUpValidation = async ({ password, email, phone, username, userType }) => {
    printSucess("SiginUpValidation", password, email, phone, username, userType)
    if (!password || !email || !phone || !username) {
      alert("None of the fields can be empty")
      radio = true
      return;
    }

    if (password.length < 8) {
      alert("Password must be greater than 8 characters.")
      return;
    }

    if (phone.length < 10) {
      alert("Invalid Phone No.")
      return;
    }

    if (username.length < 6) {
      alert("Username must be greater than 6 characters.")
      return;
    }
    if (userType !== '' && userType === 'Admin') {
      const secretKey = secret.secretKey
      const secretValue = secret.secretValue
      const user = { password, email, phone, username, secretValue, secretKey, userType }
      signUpUser(user);
    }

    if (userType !== '' && userType === 'User') {
      const user = { password, email, phone, username, userType }
      signUpUser(user);
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
                <Text style={{ fontWeight: 'bold', fontSize: 24, color: COLORS.DarkBlue,top: 10,textAlign:'center' }}>SIGNUP</Text>
                <View style={{ height: '10%', width: '25%', backgroundColor: COLORS.White, top: 0, margin: 10  }} />
                <Text>APP LOGO</Text>
              </View>
              <KeyboardAvoidingView style={{ height: height > width ? portrait : landscape, width: '90%', alignSelf: 'center', marginBottom: 50, }} behavior='padding' >

                {/* UserName */}
                <View style={{ ...styles.inputContainer, alignSelf: "stretch", }} >
                  <Image style={{ ...styles.inputImg, }} source={require('../../Assets/Images/user.png')} />
                  <TextInput style={{ ...styles.inputs, }}
                    value={username}
                    onSelectionChange={(event) => handleSelectionChange(event, setUsername, username)}
                    autoFocus={true}
                    onChangeText={(text) => setUsername(text)}
                    placeholderTextColor={COLORS.White}
                    placeholder='Enter User Name' />
                </View>

                {/* Phone */}
                <View style={{ ...styles.inputContainer, alignSelf: "stretch", }} >
                  <Image style={{ ...styles.inputImg, }} source={require('../../Assets/Images/phone.png')} />
                  <TextInput style={{ ...styles.inputs, }}
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    placeholderTextColor={COLORS.White}
                    placeholder='Enter Mobile No.' />
                </View>

                {/* mail */}
                <View style={{ ...styles.inputContainer }} >
                  <Image style={styles.inputImg} source={require('../../Assets/Images/mail.png')} />
                  <TextInput style={{ ...styles.inputs, }}
                    keyboardType={'email-address'}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor={COLORS.White}
                    placeholder='Enter Your Mail' />
                </View>

                {/* Password */}
                <View style={styles.inputContainer}>
                  <Image style={styles.inputImg} source={require('../../Assets/Images/padlock.png')} />

                  <TextInput style={{ ...styles.inputs, }}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={secureText}
                    onSubmitEditing={() => {
                      if (username && password && email && phone) {
                        setRadio(true)
                      }
                    }}
                    placeholderTextColor={COLORS.White}
                    placeholder='Enter Your Password' />
                  <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                    <Image style={{ ...styles.inputImg, }} source={secureText ? IMAGES.eyeopen : IMAGES.eyeclosed} />
                  </TouchableOpacity>
                </View>

                {/* RadioButton */}
                {password && email && phone && username ? <View style={{
                  flexDirection: 'row',
                  top: '5%',
                  alignItems: 'center',
                }}>
                  <TouchableOpacity style={{ backgroundColor: 'transparent', flexDirection: 'row', marginHorizontal: 12 }}
                    onPress={() => setUserType('Admin')}
                  >
                    {userType === 'Admin' ? <Icon name="check-box" size={20} color={COLORS.Links} /> :
                      <Icon name="check-box-outline-blank" size={20} color={COLORS.Links} />}
                    <Text style={{ ...styles.label, color: '#000', marginLeft: 5, }}>Click on this box if you are already have special credentials and want to register as a trainer</Text>
                  </TouchableOpacity>
                </View> : null}

                {/* SignUp */}
                <View
                  style={{
                    // marginTop:50
                  }}>
                  <TouchableOpacity
                    // disabled={state.loading}
                    onPress={() => SiginUpValidation({ password, email, phone, username, userType })} style={{ ...styles.button, width: (width / 10) * 6, marginTop: 60, }}>
                    <Text style={{ color: COLORS.ButtonText }}>SIGNUP NOW</Text>
                  </TouchableOpacity>
                  <Text
                    onPress={() => props.navigation.navigate('Login')}
                    style={{ alignSelf: 'center', textAlign: 'center', color: COLORS.Links, textDecorationLine: 'underline', marginVertical: 10, }}>Already have an account? Login</Text>
                </View>

              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </ImageBackground>
      </ImageBackground>
      {showModal && <MyModal
        modalText={'SignUp '}
        showModal={true}
        onModalClose={onModalClose}
      />}
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
    color: COLORS.DarkBlue,

  },

  inputContainer: {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.DarkBlue,
  },

  inputImg: {
    height: 15,
    width: 15,
    tintColor: COLORS.DarkBlue,
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
  },
  label: {
    fontSize: 12,
  },
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



