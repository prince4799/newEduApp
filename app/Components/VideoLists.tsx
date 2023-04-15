import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
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
import * as CONSTANTS from '../Constants/Constants'
import { IMAGES } from "../Assets/Images/Images"
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { COLORS } from '../Constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollViewComponent } from 'react-native';


export const VideoLists: React.FC<any> = ({
    ObjectData,
    screenName,
    title,
    navigation
}) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={IMAGES.gradientbg}
                style={styles.flatlistContainer}>
                <View style={{
                    height: CONSTANTS.DIMENSIONS.HEIGHT / 2,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // backgroundColor:'red',
                    width: '100%'
                }}>
                    <Text style={styles.flatlisttitle}>{title}</Text>
                    <Text
                        onPress={() => navigation.navigate(screenName)}
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

                <FlatList
                    data={ObjectData}
                    horizontal
                    renderItem={({ item }) =>
                        <View
                            style={styles.flatlistcard}>
                        </View>
                    } />
            </ImageBackground>
        </SafeAreaView>
    )
};

const myData = [1, 2, 5, 6, 7, 8, 9, 0, 3]


export const VideoPlayLists: React.FC<any> = ({
    ObjectData,
    screenName,
    title,
    navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={IMAGES.gradientbg}
            // style={styles.flatlistContainer}
            >

                <Text style={{
                    height: '10%',
                    textAlign: 'center',
                    fontSize: 18,
                    verticalAlign: 'middle',
                }}>{'Name of Category'.toUpperCase()}</Text>

                <View style={{ height: '90%', width: '100%' }}>
                    <FlatList
                        bounces
                        data={myData}
                        // style={{flexDirection;}}
                        renderItem={({ item }) =>

                            // {/* Thumbnail */}
                            <View
                                style={styles.videoList}>
                                <View style={{
                                    justifyContent: 'center',
                                    // backgroundColor: 'red',
                                    width: '30%',
                                    borderRadius: 5,
                                }}>
                                    <Image
                                        style={{ height: '100%', width: '100%', }}
                                        source={IMAGES.aboutus} />
                                </View>
                                {/* Details */}
                                <View
                                    style={{ width: '70%',justifyContent:'space-around'}}>
                                    <Text style={{ ...styles.text, fontSize: 20 }}>Title</Text>
                                    <Text style={{ ...styles.text, fontSize: 12 }}>Category</Text>
                                </View>
                            </View>

                        } />
                </View>

            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    videoList: {
        width: '95%',
        height: CONSTANTS.DIMENSIONS.HEIGHT * 1.5,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginTop: 10,
        alignSelf: 'center',
        borderRadius: 5,
        elevation: 5,
        flexDirection: 'row',
    },
    text: {
        padding: 5,
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
    flatlistContainer: {
        height: CONSTANTS.DIMENSIONS.HEIGHT * 10,
        backgroundColor: '#555',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    flatlisttitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        alignSelf: 'flex-start',
        textAlignVertical: 'center',
        marginLeft: 10,
        marginTop: 10,
    },
    flatlistcard: {
        elevation: 10,
        height: CONSTANTS.DIMENSIONS.HEIGHT * 2,
        width: CONSTANTS.DIMENSIONS.WIDTH * 4,
        backgroundColor: '#fff',
        borderBottomLeftRadius: CONSTANTS.DIMENSIONS.HEIGHT / 2,
        borderBottomRightRadius: CONSTANTS.DIMENSIONS.HEIGHT / 2,
        borderTopRightRadius: CONSTANTS.DIMENSIONS.HEIGHT / 2,
        padding: 10,
        marginHorizontal: 10,
        marginTop: 10,

    }
});