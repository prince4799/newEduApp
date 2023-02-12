import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Image,
  ImageBackground
} from 'react-native';
import Animated, { log } from 'react-native-reanimated';
import * as CONSTANTS from '../../Constants/Constants'
import { IMAGES } from "../../Assets/Images/Images"
import { FlatList, TextInput } from 'react-native-gesture-handler';

// import * as CONSTANTS from '../../Constants/Constants'


const Home = () => {
  const [search, setSearch] = useState('')
  const scrollX=useRef(new Animated.Value(0)).current

  return (
    <View 
    aria-busy
    style={styles.container}>
      <Image
        blurRadius={5}

        style={{
          // height: _height * 10,
          height:CONSTANTS.DIMENSIONS.HEIGHT*10,

          width: CONSTANTS.DIMENSIONS.WIDTH * 10,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: - CONSTANTS.DIMENSIONS.HEIGHT* 2,
          zIndex: -1,

        }} source={IMAGES.halfbg} />
      <Text
        style={{
          color: '#fff',
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center'

        }}
      >Welcome Back ! {`\n`}userName</Text>
      <View
        style={{
          height: CONSTANTS.DIMENSIONS.HEIGHT / 1.5,
          width: CONSTANTS.DIMENSIONS.WIDTH* 8,
          backgroundColor: '#fff',
          borderRadius: 20,
          margin: 5,
          // top: _height * 1.5,
          // left: 10,
          justifyContent: 'center',
          flexDirection: 'row'
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

      <Animated.FlatList
      onScroll={Animated.event(
        [{nativeEvent:{contentOffset:{x:scrollX}}}],
        {useNativeDriver:true}
      )}
      data={[1,2,3,4,]}
      horizontal
      renderItem={({item}) =>
      <Animated.View
      
      style={{
        height:CONSTANTS.DIMENSIONS.HEIGHT*4,
        width:CONSTANTS.DIMENSIONS.WIDTH*10,
        backgroundColor:'#000',
        margin:CONSTANTS.DIMENSIONS.HEIGHT,
      }}>

        <View style={{
           height:CONSTANTS.DIMENSIONS.HEIGHT*2,
           width:CONSTANTS.DIMENSIONS.WIDTH*2,
           backgroundColor:'#fff',
        }}/>

      </Animated.View>
 }
      />

     

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },

});
const card = (width: any, height: any): ViewStyle => ({
  width: width * 2,
  height: height * 2,
  backgroundColor: 'red',

})
export default Home
