
import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, useWindowDimensions, Alert, Linking, SafeAreaView,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import * as extFun from "../../Assets/Utils/ExtenFunc";
import * as CONSTANTS from '../../Constants/Constants'
import AnimatedView from '../../Components/AnimatedView';
import { COLORS } from '../../Constants/Colors';
import { IMAGES } from '../../Assets/Images/Images';
import Animated, { BounceInLeft, BounceInRight } from 'react-native-reanimated';

// import { useNetInfo } from '@react-native-community/netinfo';


const AdminDashboard = ({ }) => {

    // const netInfo = useNetInfo();
    // const net = netInfo.isConnected;

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* ============Edit Button============= */}
            <Image
                source={IMAGES.halfbg}
                style={{
                    height: CONSTANTS.DIMENSIONS.HEIGHT * 5,
                    width: CONSTANTS.DIMENSIONS.WIDTH * 10,
                    position: 'absolute'
                }} />
            <Image source={IMAGES.editing}
                style={{ ...styles.buttonIcon, left: '45%', top: 10, tintColor: '#fff' }} />
            <View
                style={{
                    height: CONSTANTS.DIMENSIONS.HEIGHT + 10,
                    width: CONSTANTS.DIMENSIONS.HEIGHT + 10,
                    borderRadius: CONSTANTS.DIMENSIONS.HEIGHT / 2 + 10,
                    backgroundColor: COLORS.ButtonText,
                    alignSelf: 'center',
                    marginTop: CONSTANTS.DIMENSIONS.HEIGHT / 3,
                    elevation: 10,
                    justifyContent: 'center'
                }}>
                <View
                    style={{
                        height: CONSTANTS.DIMENSIONS.HEIGHT,
                        width: CONSTANTS.DIMENSIONS.HEIGHT,
                        alignSelf: 'center',
                        backgroundColor: '#fff',
                        elevation: 8,
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
                        color: COLORS.Font,


                    }}>Prince Verma</Text>
                <Text style={{
                    fontSize: 12,
                    color: COLORS.Font,
                }}>example@mail.com</Text>
            </View>
            {/* ===========Menus=================== */}
            <View
                style={{
                    top: '20%',
                }}>
                <Animated.View
                    entering={BounceInLeft}>
                    <TouchableOpacity
                        style={styles.button}>
                        <Image source={IMAGES.manageUser}
                            style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Manage User</Text>
                        <Image source={IMAGES.manageUser}
                            style={{ ...styles.buttonIcon, left: CONSTANTS.DIMENSIONS.WIDTH * 3.8 }} />
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View
                    entering={BounceInLeft}
                    exiting={BounceInRight}>
                    <TouchableOpacity
                        style={styles.button}>
                        <Image source={IMAGES.manageCategories}
                            style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Manage Categories</Text>
                        <Image source={IMAGES.rightarrow}
                            style={{ ...styles.buttonIcon, left: CONSTANTS.DIMENSIONS.WIDTH * 3.8 }} />
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View
                    entering={BounceInLeft}>
                    <TouchableOpacity
                        style={styles.button}>
                        <Image source={IMAGES.manageVideos}
                            style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Manage Videos</Text>
                        <Image source={IMAGES.rightarrow}
                            style={{ ...styles.buttonIcon, left: CONSTANTS.DIMENSIONS.WIDTH * 3.8 }} />
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View
                    entering={BounceInLeft}>
                    <TouchableOpacity
                        style={styles.button}>
                        <Image source={IMAGES.logoutAdmin}
                            style={{ ...styles.buttonIcon }} />
                        <Text style={styles.buttonText}>Logout</Text>
                        <Image source={IMAGES.rightarrow}
                            style={{ ...styles.buttonIcon, left: CONSTANTS.DIMENSIONS.WIDTH * 3.8 }} />
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
        backgroundColor: '#fff',
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
        // left: 5,

    },
    buttonText: {
        fontSize: 16,
        width: CONSTANTS.DIMENSIONS.WIDTH * 4,
        alignSelf: 'center',
        left: 15,
        fontWeight: '700',
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
        color: '#fff'
    }
})

export default AdminDashboard;


