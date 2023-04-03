import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Alert, Linking } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { version } from "../../../package.json";
import * as extFun from "../../Assets/Utils/ExtenFunc";
import * as CONSTANTS from '../../Constants/Constants'
import AsyncStorage from '@react-native-community/async-storage';
import { useRoute } from '@react-navigation/native';
const MODULE_NAME = 'Splash';
var count = 0
import AnimatedView from '../../Components/AnimatedView';

const Splash = ({ navigation }) => {
  const route = useRoute();
  const { height, width, scale, fontScale } = useWindowDimensions();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    CONSTANTS.APP_VERSION = version;
    CONSTANTS.DIMENSIONS.HEIGHT = height / 10;
    CONSTANTS.DIMENSIONS.WIDTH = width / 10;
    if (CONSTANTS.DIMENSIONS.HEIGHT > 0) {
      console.log("height and width ", CONSTANTS.DIMENSIONS.HEIGHT);
    }
  }, [CONSTANTS.DIMENSIONS]);

  const navigate = () => {
    extFun.retrieveData('@isLoggedIn', MODULE_NAME).then(
      (val) => {
        if (val.status === 'false' && isConnected && route.name === 'Splash') {
          navigation.replace('SignUpRegisterDrawer')
        }
        else if (isConnected == true && route.name === 'Splash')
          navigation.replace('BottomTab')
      });
  };

  const netStatusCheck=()=>{
    NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      CONSTANTS.NET_STATUS = state.isConnected
    });
  }
  useEffect(() => {
    netStatusCheck()
    // return ()=> netStatusCheck()
  }, [CONSTANTS.NET_STATUS]);

  useEffect(() => {
    setIsConnected(CONSTANTS.NET_STATUS)
    console.log("isconnected", isConnected, CONSTANTS.NET_STATUS, '\n', route);
    if (isConnected && route.name === 'Splash' && count <= 1) {
      count = count + 1
      navigate();
    }
  }, [isConnected, CONSTANTS.NET_STATUS]);



  /*  useEffect(() => {
      // console.log('useEffect called');
      try {
        NetInfo.addEventListener((state) => {
          CONSTANTS.NET_STATUS = state.isConnected
          // console.log("eventlistener", CONSTANTS.NET_STATUS);
          state.isConnected ? navigate() : null;
        })
        navigate();
      } catch (err) {
        console.log(">>>>>", err)
      }
    }, [CONSTANTS.NET_STATUS, extFun.retrieveData,])
  //=================================
  */
  return (
    <View style={styles.container}>
      <View
        style={{
          height: CONSTANTS.DIMENSIONS.HEIGHT / 2,
          width: CONSTANTS.DIMENSIONS.WIDTH * 10,
          justifyContent: 'center',
          flexDirection: 'row',
          top: 0,
          alignSelf: 'flex-start',
        }}
      >
        <AnimatedView
          netStatus={isConnected}
        />
      </View>

    </View>

  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Splash;


