
import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, useWindowDimensions, Alert, Linking, SafeAreaView,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import * as extFun from "../../../Assets/Utils/ExtenFunc";
import * as CONSTANTS from '../../../Constants/Constants'
import AnimatedView from '../../../Components/AnimatedView';
import { COLORS } from '../../../Constants/Colors';
import { IMAGES } from '../../../Assets/Images/Images';
import Animated, { BounceInLeft, BounceInRight } from 'react-native-reanimated';
import { strings } from '../../../Constants/Strings';
import Lottie from 'lottie-react-native';


// import { useNetInfo } from '@react-native-community/netinfo';


const AdminDashboard = ({ navigation }) => {



    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')

    const asyncRetrieve = async () => {
        try {
            const tokenPromise = extFun.retrieveData('@token', 'Home');
            const usernamePromise = extFun.retrieveData('@username', 'Home');
            const emailPromise = extFun.retrieveData('@email', 'Home');
            const [token, username, email] = await Promise.all([tokenPromise, usernamePromise, emailPromise]);
            return { token, username, email };
        } catch (error) {
            extFun.printError("Home", error); // Handle any errors here
            return { token: null, username: null, email: null };
        }
    };

    (async function () {

        const $token = await extFun.retrieveData('@token', 'splash')
        const $username = await extFun.retrieveData('@username', 'splash')
        const $email = await extFun.retrieveData('@email', 'splash')
        const $contact = await extFun.retrieveData('@contact', 'splash')
        const $userType = await extFun.retrieveData('@userType', 'splash')
        const $secretKey = await extFun.retrieveData('@secretKey', 'splash')
        const $secretVal = await extFun.retrieveData('@secretVal', 'splash')
        CONSTANTS.stored.TOKEN = $token.value
        CONSTANTS.stored.USER_NAME = $username.value
        CONSTANTS.stored.EMAIL = $email.value
        CONSTANTS.stored.CONTACT = $contact.value
        CONSTANTS.stored.USER_TYPE = $userType.value
        CONSTANTS.stored.SECRET_KEY = $secretKey.value
        CONSTANTS.stored.SECRET_VALUE = $secretVal.value
        // extFun.printLog('\u001b[36m', '........', CONSTANTS.stored)
    })()

    useEffect(() => {
        const retrieveData = async () => {
            const { username, email } = await asyncRetrieve();
            extFun.printSucess(username);
            setUsername(username.value)
            setEmail(email.value)
        };
        retrieveData();
    })


    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: COLORS.Background }}>

            {/* <Lottie
                style={{
                    alignSelf: 'center',
                    height: '80%',
                    width: '100%',
                    position: 'absolute',
                    zIndex: 9,
                    transform: [{ scaleX: 1 }, { scaleY: 1.5 }],
                    top:-50,
                }}
                source={IMAGES.animationArray['wave']}
                autoPlay
                loop
            /> */}

            {/* ============Edit Button============= */}
            <Image
                source={IMAGES.halfbg}
                style={{
                    height: CONSTANTS.DIMENSIONS.HEIGHT * 5,
                    width: CONSTANTS.DIMENSIONS.WIDTH * 10,
                    position: 'absolute'
                }} />
            <View
                style={{
                    height: CONSTANTS.DIMENSIONS.HEIGHT + 10,
                    width: CONSTANTS.DIMENSIONS.HEIGHT + 10,
                    borderRadius: CONSTANTS.DIMENSIONS.HEIGHT / 2 + 10,
                    backgroundColor: COLORS.ButtonText,
                    alignSelf: 'center',
                    marginTop: CONSTANTS.DIMENSIONS.HEIGHT / 3,
                    elevation: 10,
                    justifyContent: 'center',
                    zIndex: 9,

                }}>
                <View
                    style={{
                        height: CONSTANTS.DIMENSIONS.HEIGHT,
                        width: CONSTANTS.DIMENSIONS.HEIGHT,
                        alignSelf: 'center',
                        backgroundColor: COLORS.White,
                        elevation: 2,
                        borderRadius: CONSTANTS.DIMENSIONS.HEIGHT / 2,
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
                        color: COLORS.White,


                    }}>{username}</Text>
                {/* }}>username</Text> */}
                <Text style={{
                    fontSize: 12,
                    color: COLORS.White,
                }}>{email}</Text>
            </View>
            {/* ===========Menus=================== */}
            <View
                style={{
                    top: '40%',
                    // backgroundColor: 'red',
                }}>
                {/* Manage User */}
                <Animated.View
                    entering={BounceInLeft}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Users')}
                        style={styles.button}>
                        <Image source={IMAGES.manageUser}
                            style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Manage User</Text>
                        <Image source={IMAGES.rightarrow}
                            style={{ ...styles.buttonIcon, left: CONSTANTS.DIMENSIONS.WIDTH * 3.5 }} />
                    </TouchableOpacity>
                </Animated.View>
                {/* Manage Categories */}
                <Animated.View
                    entering={BounceInLeft}
                    exiting={BounceInRight}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(strings.Categories)}
                        style={styles.button}>
                        <Image source={IMAGES.manageCategories}
                            style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Manage Categories</Text>
                        <Image source={IMAGES.rightarrow}
                            style={{ ...styles.buttonIcon, left: CONSTANTS.DIMENSIONS.WIDTH * 3.5 }} />
                    </TouchableOpacity>
                </Animated.View>
                {/* >Manage Videos */}
                <Animated.View
                    entering={BounceInLeft}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(strings.VideoList)}
                        style={styles.button}>
                        <Image source={IMAGES.manageVideos}
                            style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Manage Videos</Text>
                        <Image source={IMAGES.rightarrow}
                            style={{ ...styles.buttonIcon, left: CONSTANTS.DIMENSIONS.WIDTH * 3.5 }} />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </SafeAreaView>

    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: CONSTANTS.DIMENSIONS.HEIGHT / 1.3,
        width: CONSTANTS.DIMENSIONS.WIDTH * 9.5,
        backgroundColor: COLORS.White,
        alignSelf: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        elevation: 5,
        marginVertical: 5,
        paddingHorizontal: 10,
    },
    buttonIcon: {
        height: CONSTANTS.DIMENSIONS.HEIGHT / 3,
        width: CONSTANTS.DIMENSIONS.HEIGHT / 3,
        alignSelf: 'center',
        tintColor: COLORS.Blue,
        // left: 5,

    },
    buttonText: {
        fontSize: 16,
        width: CONSTANTS.DIMENSIONS.WIDTH * 4,
        alignSelf: 'center',
        left: 15,
        fontWeight: '700',
        color: COLORS.DarkBlue,

    },
    card: {
        height: CONSTANTS.DIMENSIONS.HEIGHT * 1.5,
        width: CONSTANTS.DIMENSIONS.WIDTH * 3.8,
        // borderRadius: 10,
        alignItems: 'center',
        // padding: 5,
        opacity: 1,
        justifyContent: 'center',
        elevation: 5,

    },
    cardtext: {
        fontSize: 18,
        textAlign: 'center',
        color: COLORS.White,
        fontWeight:'700'

    }
})

export default AdminDashboard;


