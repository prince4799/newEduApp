import React from 'react'
import { View, Text, TouchableOpacity, Image, ImageBackground, Dimensions, StyleSheet, SafeAreaView } from 'react-native'
import { IMAGES } from '../../Assets/Images/Images';
import { COLORS } from '../../Constants/Colors';
import { DIMENSIONS } from '../../Constants/Constants';
import Animated, { BounceInLeft, BounceInRight } from 'react-native-reanimated';

const Profile = () => {

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: '#fff' }}>

            <Image
                source={IMAGES.halfbg}
                style={{
                    height: DIMENSIONS.HEIGHT * 5,
                    width: DIMENSIONS.WIDTH * 10,
                    position: 'absolute'
                }} />
                <TouchableOpacity style={{
                    height:DIMENSIONS.HEIGHT/2,
                    width:DIMENSIONS.HEIGHT/2,
                    alignSelf:'flex-end',
                    position:'absolute',
                    top:10,
                    right:10,
                    justifyContent:'center',
                    alignItems:'center',
                    }}>
                        <Image
                        source={IMAGES.editing}
                        style={{
                            height:'50%',
                            width:'50%',
                            tintColor:'#fff'
                        }}/>
                        <Text style={{color:'#fff',}}>Edit </Text>
                    </TouchableOpacity>
            <View
                style={{
                    height: DIMENSIONS.HEIGHT + 10,
                    width: DIMENSIONS.HEIGHT + 10,
                    borderRadius: DIMENSIONS.HEIGHT / 2 + 10,
                    backgroundColor: COLORS.ButtonText,
                    alignSelf: 'center',
                    marginTop: DIMENSIONS.HEIGHT / 3,
                    elevation: 10,
                    justifyContent: 'center'
                }}>
                <View
                    style={{
                        height: DIMENSIONS.HEIGHT,
                        width: DIMENSIONS.HEIGHT,
                        alignSelf: 'center',
                        backgroundColor: '#fff',
                        elevation: 8,
                        borderRadius: DIMENSIONS.HEIGHT / 2,
                    }} />
            </View>
            {/* ========Username & mailID============= */}
            <View
                style={{
                    margin: 5,
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: '700',
                        color: COLORS.Font,


                    }}>Prince Verma</Text>
                <Text style={{
                    fontSize: 12,
                    color: COLORS.Font,
                }}>example@mail.com</Text>
            </View>
            {/* =============Contact & User Type============= */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginVertical: DIMENSIONS.HEIGHT / 1.3,
                    opacity: 1,
                }}>
                <ImageBackground
                imageStyle={{borderRadius:10,}}
                    source={IMAGES.gradientbg}
                    style={styles.card}>
                    <Text
                        style={styles.cardtext}
                        numberOfLines={2}
                    >User Type{`\n`}Student</Text>
                </ImageBackground>
                <ImageBackground
                imageStyle={{borderRadius:10,}}

                    source={IMAGES.gradientbg}
                    style={styles.card}>
                    <Text
                        style={styles.cardtext}
                    >Contact No. 9621205058</Text>
                </ImageBackground>
            </View>
            <View>
                <Animated.View
                entering={BounceInLeft}>
                <TouchableOpacity
                    style={styles.button}>
                    <Image source={IMAGES.payment}
                        style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Payment History </Text>
                    <Image source={IMAGES.rightarrow}
                        style={{ ...styles.buttonIcon, left: DIMENSIONS.WIDTH * 4 }} />
                </TouchableOpacity>
                </Animated.View>
                <Animated.View
                entering={BounceInLeft}
                exiting={BounceInRight}>
                  <TouchableOpacity
                    style={styles.button}>
                    <Image source={IMAGES.aboutus}
                        style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>About Us!</Text>
                    <Image source={IMAGES.rightarrow}
                        style={{ ...styles.buttonIcon, left: DIMENSIONS.WIDTH * 4 }} />
                </TouchableOpacity>  
                </Animated.View>
                <Animated.View
                entering={BounceInLeft}>
                 <TouchableOpacity
                    style={styles.button}>
                    <Image source={IMAGES.logout}
                        style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Logout</Text>
                    <Image source={IMAGES.rightarrow}
                        style={{ ...styles.buttonIcon, left: DIMENSIONS.WIDTH * 4 }} />
                </TouchableOpacity>   
                </Animated.View>
                

            </View>
        </SafeAreaView>

    )

}
const styles = StyleSheet.create({
    button: {
        height: DIMENSIONS.HEIGHT / 1.3,
        width: DIMENSIONS.WIDTH * 9.9,
        backgroundColor: '#fff',
        alignSelf: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        elevation: 5,
        marginVertical: 5,
    },
    buttonIcon: {
        height: DIMENSIONS.HEIGHT / 3,
        width: DIMENSIONS.HEIGHT / 3,
        alignSelf: 'center',
        left: 5,

    },
    buttonText: {
        fontSize: 16,
        width: DIMENSIONS.WIDTH * 4,
        alignSelf: 'center',
        left: 15,
        fontWeight: '700',
    },
    card: {
        height: DIMENSIONS.HEIGHT * 1.5,
        width: DIMENSIONS.WIDTH * 4,
        // borderRadius: 10,
        alignItems: 'center',
        // padding: 5,
        opacity: 1,
        justifyContent: 'center',
        elevation: 5,
        backgroundColor:'#fff',
        borderRadius:10,

    },
    cardtext: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff'
    }
})
export default Profile;