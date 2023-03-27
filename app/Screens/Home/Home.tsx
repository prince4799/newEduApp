import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import Animated, { FadeInUp, log, SlideInLeft, SlideInRight, ZoomIn } from 'react-native-reanimated';
import * as CONSTANTS from '../../Constants/Constants'
import { IMAGES } from "../../Assets/Images/Images"
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { COLORS } from '../../Constants/Colors';
import AnimatedView from '../../Components/AnimatedView';
import { useNetInfo } from '@react-native-community/netinfo';

// import * as CONSTANTS from '../../Constants/Constants'


const Home = () => {
  const [search, setSearch] = useState('')
  const scrollX = useRef(new Animated.Value(0)).current

  const netInfo = useNetInfo();
  const net = netInfo.isConnected;


  return (
 
    // <AnimatedView
    //       netStatus={false}
    //     />
   
    
    <ScrollView style={{ flex: 1 }}>
      <View
        // aria-busy={true}
        style={styles.container}>
        <Image
          style={{
            // height: _height * 10,
            height: CONSTANTS.DIMENSIONS.HEIGHT * 10,
            
            width: CONSTANTS.DIMENSIONS.WIDTH * 10,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: - CONSTANTS.DIMENSIONS.HEIGHT * 2,
            zIndex: -1,
            
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
        >Welcome Back ! {`\n`}userName</Text>

        <View
          style={{
            height: CONSTANTS.DIMENSIONS.HEIGHT,
            width: CONSTANTS.DIMENSIONS.HEIGHT,
            backgroundColor: "#fff",
            opacity: 0,
            marginTop: CONSTANTS.DIMENSIONS.HEIGHT / 3,
            borderRadius: CONSTANTS.DIMENSIONS.HEIGHT / 2,
          }} />
        <View
          style={{
            height: CONSTANTS.DIMENSIONS.HEIGHT / 2,
            width: CONSTANTS.DIMENSIONS.WIDTH * 8,
            backgroundColor: '#fff',
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
       <AnimatedView netStatus={net} style={{top:130}} />
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
            // onPress={() => SignInUser({ email, password })}
            // onPress={()=>firebaseDB.FirebaseDBPush({email,password})}
            // onPress={()=>firebaseDB.FirebaseDBRead()}

            style={{
              ...styles.button,
              width: (CONSTANTS.DIMENSIONS.WIDTH) * 5,
            }}>
            <Text style={styles.buttonText}>Explore ➝</Text>
          </TouchableOpacity>

        </ImageBackground>
        <View style={{ elevation: 50 }}>
          <ImageBackground
            source={IMAGES.gradientbg}
            resizeMode='cover'
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: CONSTANTS.DIMENSIONS.HEIGHT / 6,
              paddingBottom: CONSTANTS.DIMENSIONS.HEIGHT / 1.6,
            }}
          >
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: CONSTANTS.DIMENSIONS.WIDTH * 10,
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
              }}>My Activities{`\n`}</Text>
              <Text
                onPress={() => console.log("..View All..")
                }
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#fff',
                  alignSelf: 'flex-start',
                  textAlignVertical: 'center',
                  marginTop: 10,
                  textDecorationLine: 'underline',

                }}>View All{`\n`}</Text>
            </View>
            <Animated.FlatList
              entering={FadeInUp}
              showsHorizontalScrollIndicator={false}
              data={[1, 2, 3, 4,]}
              horizontal
              renderItem={({ item }) =>
                <Animated.View
                  entering={FadeInUp}
                  style={{
                    elevation: 10,
                    height: CONSTANTS.DIMENSIONS.HEIGHT * 2,
                    width: CONSTANTS.DIMENSIONS.WIDTH * 4,
                    backgroundColor: '#fff',
                    borderBottomLeftRadius: CONSTANTS.DIMENSIONS.HEIGHT / 2,
                    borderBottomRightRadius: CONSTANTS.DIMENSIONS.HEIGHT / 2,
                    borderTopRightRadius: CONSTANTS.DIMENSIONS.HEIGHT / 2,
                    padding: 10,
                    // top:-10,
                    // marginVertical: CONSTANTS.DIMENSIONS.HEIGHT,
                    marginHorizontal: 10,
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{
                      height: CONSTANTS.DIMENSIONS.HEIGHT,
                      width: CONSTANTS.DIMENSIONS.WIDTH * 1.5,
                      backgroundColor: COLORS.T_background,
                      borderTopRightRadius: CONSTANTS.DIMENSIONS.HEIGHT,
                    }} />
                    <Text style={{ marginLeft: 5, fontWeight: 'bold', }}>$5000{`\n`}per month</Text>
                  </View>
                  <Text style={{ fontSize: CONSTANTS.DIMENSIONS.HEIGHT / 5, fontWeight: 'bold', paddingTop: 5, }}>Zumba Training</Text>
                  <View style={{
                    // marginTop: 5,
                    marginBottom: 3,
                    height: 1, alignSelf: 'center',
                    width: '100%',
                    backgroundColor: '#d3d3d3'
                  }} />
                  <Text style={{ color: '#9c9998', fontSize: CONSTANTS.DIMENSIONS.HEIGHT / 7, fontWeight: '700' }} >Zumba Training</Text>
                </Animated.View>
              }
            />
          </ImageBackground>

        </View>

      </View>
    </ScrollView>
  
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
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
export default Home
