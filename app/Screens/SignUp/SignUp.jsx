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
  Alert
} from 'react-native';
// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
import { COLORS } from '../../Constants/Colors';
import * as firebaseDB from "../../Firebase/FirebaseDB"
import * as firebaseAuth from "../../Firebase/FirebaseAuth"
import {CreateNewUser} from "../../Firebase/FirebaseAuth"
// import { async } from '@firebase/util';

const SignUp = () => {

  const { height, width, scale, fontScale } = useWindowDimensions()
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const portrait=(height / 10) * 6;
  const landscape=height  
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  const SiginUpValidation=async({name,email,phone})=>{
     var response=  CreateNewUser({ email, password })
     console.log("asdfghj",response)
      if(response == 'success'){
          firebaseDB.FirebaseDBPush({name,email,phone})
      }
      else{
        Alert.alert("Unable to create the user")
      }
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ ...styles.form(height, width), borderRadius: 10, elevation: 5,backgroundColor: COLORS.T_background }}>
        <ScrollView   style={{}}>

          <View style={{ alignSelf: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 24,color:COLORS.Font }}>SIGNUP</Text>
            <View style={{ height: '20%', width: '25%', top: 0, margin: 10 }} />
            <Text>APP LOGO</Text>
          </View>

          <KeyboardAvoidingView style={{ height: height>width? portrait:landscape, width: '90%', alignSelf: 'center',marginBottom:50,}} behavior='padding' >
    
          <View style={{ ...styles.inputContainer,alignSelf:"stretch", }} >
              <Image style={{...styles.inputImg, }} source={require('../../Assets/Images/user.png')} />
              <TextInput style={{...styles.inputs, width:'45%',color:COLORS.Font }}
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder='Enter User Name' />
            </View>
          <View style={{ ...styles.inputContainer,alignSelf:"stretch", }} >
              <Image style={{...styles.inputImg, }} source={require('../../Assets/Images/phone.png')} />
              <TextInput style={{...styles.inputs, width:'45%',color:COLORS.Font }}
                value={phone}
                onChangeText={(text) => setPhone(text)}
                placeholder='Enter Mobile No.' />
            </View>
              
            <View style={{ ...styles.inputContainer }} >
              <Image style={styles.inputImg} source={require('../../Assets/Images/mail.png')} />
              <TextInput style={{...styles.inputs,color:COLORS.Font }}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder='Enter Your Mail' />
            </View>
            <View style={styles.inputContainer}>
              <Image style={styles.inputImg} source={require('../../Assets/Images/padlock.png')} />

              <TextInput style={{...styles.inputs,color:COLORS.Font }}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder='Enter Your Password' />
              <Image style={{ ...styles.inputImg, }} source={require('../../Assets/Images/eye.png')} />
            </View>
            <TouchableOpacity onPress={()=> SiginUpValidation({name,email,phone})} style={{ ...styles.button,width:(width / 10) * 6, marginTop:60,}}>
              <Text style={{color:COLORS.ButtonText}}>SIGNUP NOW</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.button,width:(width / 10) * 6,justifyContent:'center',flexDirection:'row', }}>
              <Text style={{ alignSelf:'center', textAlign:'center', color:COLORS.ButtonText }}>SignUp with google</Text>
              <Image style={{...styles.inputImg, height:30,width:30,tintColor:null}} source={require('../../Assets/Images/google.png')} />

            </TouchableOpacity>
            </KeyboardAvoidingView>
        </ScrollView>

      </View>
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
    height: (deviceHeight / 10) * 9,
    width: (deviceWidth / 10) * 9,
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
    height: 35,
    width: 120,
    backgroundColor: COLORS.Button,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    elevation:3


  },
  buttonText: {
    alignSelf: 'center',
    textAlign: 'center',
  }
});


export default SignUp;
