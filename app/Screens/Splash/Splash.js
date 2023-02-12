import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import * as CONSTANTS from '../../Constants/Constants'

// import * as CONSTANTS from '../../Constants/Constants'



 const Splash = ({navigation}) => {

  const { height, width, scale, fontScale } = useWindowDimensions()
  useLayoutEffect(()=>{
    CONSTANTS.DIMENSIONS.HEIGHT=height/10;
    CONSTANTS.DIMENSIONS.WIDTH=width/10;

    if(CONSTANTS.DIMENSIONS.HEIGHT>0){
      console.log("height and width ", CONSTANTS.DIMENSIONS.HEIGHT);
       navigation.navigate('SignUpRegisterDrawer')
    }


  },[CONSTANTS.DIMENSIONS])
  
  

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
 card:{ height: CONSTANTS.DIMENSIONS.HEIGHT*2,
   width:CONSTANTS.DIMENSIONS.WIDTH*2,
    backgroundColor: 'red' }
});

export default Splash
