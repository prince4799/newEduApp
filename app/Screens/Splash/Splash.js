import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Alert, Linking } from 'react-native';
import * as CONSTANTS from '../../Constants/Constants'
import NetInfo from '@react-native-community/netinfo';
import { version } from "../../../package.json"
import * as extFun from "../../Assets/Utils/ExtenFunc"
import AsyncStorage from '@react-native-community/async-storage';
const MODULE_NAME = 'Splash'

// import * as CONSTANTS from '../../Constants/Constants'



const Splash = ({ navigation }) => {
  const { height, width, scale, fontScale } = useWindowDimensions()
  useEffect(() => {
    CONSTANTS.APP_VERSION = version;
    CONSTANTS.DIMENSIONS.HEIGHT = height / 10;
    CONSTANTS.DIMENSIONS.WIDTH = width / 10;
    if (CONSTANTS.DIMENSIONS.HEIGHT > 0) {
      console.log("height and width ", CONSTANTS.DIMENSIONS.HEIGHT);
      //  navigation.navigate('SignUpRegisterDrawer')
    }
  }, [CONSTANTS.DIMENSIONS])


  const navigate = () => {
    extFun.retrieveData('@isLoggedIn', MODULE_NAME).then(
      (val) => {
        console.log("=++=", val)
        if (val.status === 'false' && CONSTANTS.NET_STATUS == true) {
          navigation.navigate('SignUpRegisterDrawer')
        }
        else {
          if (CONSTANTS.NET_STATUS == true)
            navigation.navigate('BottomTab')
            else{
              Alert.alert('Internet is not available','Please turn on your internet connection and try again.',
              [
                {text: 'Open mobile data settings', onPress: () => Linking.openSettings().then(() => {
                Linking.sendIntent('android.settings.WIRELESS_SETTINGS');
              })}],)
            }
        }
      });


  }


  useEffect(() => {
    console.log('useEffect called');
    try {
      NetInfo.addEventListener((state) => {
        CONSTANTS.NET_STATUS = state.isConnected
        console.log("eventlistener", CONSTANTS.NET_STATUS);
          state.isConnected? navigate():null;
      })
      navigate();
    } catch (err) {
      console.log(">>>>>")
    }
  }, [CONSTANTS.NET_STATUS, extFun.retrieveData,])







  // setTimeout(()=>{navigation.navigate('SignUpRegisterDrawer')},3000)

  return (
    <View style={styles.container}>
      <View style={styles.card} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    height: CONSTANTS.DIMENSIONS.HEIGHT * 2,
    width: CONSTANTS.DIMENSIONS.WIDTH * 2,
    backgroundColor: 'red'
  }
});

export default Splash

