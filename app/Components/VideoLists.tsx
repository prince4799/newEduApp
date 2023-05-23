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
    TouchableOpacity,
    LayoutAnimation,
    NativeModules,
} from 'react-native';
import Animated, { FadeInUp, log, SlideInLeft, SlideInRight, ZoomIn } from 'react-native-reanimated';
import * as CONSTANTS from '../Constants/Constants'
import { IMAGES } from "../Assets/Images/Images"
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { COLORS } from '../Constants/Colors';
import { SafeAreaView, SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { VideoDetailsView } from './DetailsView';
import MyModal from './MyModal';
import { printError, printSucess, retrieveData } from '../Assets/Utils/ExtenFunc';


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

const myData = [1,2,3,4]


interface Props {

    SecretKey?: string,
    SecretPassword?: string,
}
const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);


export const VideoPlayLists: React.FC<any | Props> = ({
    ObjectData,
    screenName,
    title,
    navigation,
    SecretKey = '1',
    SecretPassword = '1'
}) => {
    let secretValPromise = ''
    let secretKeyPromise = ''
    const [showListHeader, setShowListHeader] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(-1);

    const handleCardPress = (index) => {
      if (expandedIndex === index) {
        // Collapse the card if it is already expanded
        setExpandedIndex(-1);
      } else {
        // Expand the clicked card and collapse the previously expanded card
        setExpandedIndex(index);
      }
    };
    const onModalClose = (data: boolean) => {
        setShowModal(false);
    };

    const asyncRetrieve = async () => {
        try {
            let key = await retrieveData('@secretKey', 'home')
            secretKeyPromise = key.value
            printSucess(key)
            let val = await retrieveData('@secretVal', 'Home')
            secretValPromise = val.value
        } catch (err) {
            printError('error in Video List', err)
        }
    }
    useEffect(() => {
        if (secretKeyPromise !== undefined && secretValPromise !== undefined) {
            setShowListHeader(true);
        } else {
            setShowListHeader(false);
        }
    }, [secretKeyPromise, secretValPromise]);
    useEffect(() => {
        asyncRetrieve()
    }, [secretKeyPromise, secretValPromise])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <Text style={{
                    height: '10%',
                    textAlign: 'center',
                    fontSize: 18,
                    verticalAlign: 'middle',
                }}>{'Name of Category'.toUpperCase()}</Text> */}

            <View style={{ width: '100%' }}>
                <FlatList
                ListEmptyComponent={<Text>There are no data to show</Text>}
                    ListHeaderComponent={showListHeader ?
                        < TouchableOpacity
                            onPress={() => {
                                setShowModal(true)
                            }}
                           >
                           <Text
                           style={{
                            height: CONSTANTS.DIMENSIONS.HEIGHT / 1.5,
                            width:CONSTANTS.DIMENSIONS.WIDTH*9,
                            backgroundColor: COLORS.Button,
                            margin: 15,
                            borderRadius: CONSTANTS.DIMENSIONS.HEIGHT / 2,
                            alignSelf: 'center',
                            textAlignVertical:'center',
                            textAlign:'center',
                            elevation: 5,
                            color:COLORS.ButtonText,
                            fontWeight:'bold',
                            fontSize:16,
                        }}
                           >UPLOAD VIDEO</Text>
                        </TouchableOpacity> : null
                    }
                    bounces
                    data={myData}
                    // style={{flexDirection;}}
                    renderItem={({ item }) =>
                        <VideoDetailsView
                            secretKeyID={secretKeyPromise}
                            secretPassword={secretValPromise}
                        />
                    } />
            </View>
            {/* Add Button */}

            {showModal ?
                <MyModal
                    showModal={showModal}
                    modalText={'Add New Video'}
                    category={'Category'}
                    link={'Link of the video'}
                    thumbnail={'Link of thumbnail'}
                    title={'Enter title'}
                    onModalClose={onModalClose}
                />
                : null}

        </SafeAreaView >
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

    },
    cardtext: {
        textAlign: 'auto',
        fontFamily: "OpenSans-Bold",
        width: 250,
        color: "#000",
        fontSize: 13,
        marginStart: 5,
        alignSelf: "center",
    },
    textContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // width: "85%",
        marginStart: 60,

    }
});


/*
{
    showListHeader ?
        < TouchableOpacity
            onPress={() => {
                setShowModal(true)
            }}
            style={{
                position: 'absolute',
                height: CONSTANTS.DIMENSIONS.HEIGHT / 1.5,
                width: CONSTANTS.DIMENSIONS.HEIGHT / 1.5,
                backgroundColor: "#2196f3",
                zIndex: 5,
                bottom: CONSTANTS.DIMENSIONS.HEIGHT / 50,
                right: CONSTANTS.DIMENSIONS.WIDTH / 10,
                margin: 15,
                borderRadius: CONSTANTS.DIMENSIONS.HEIGHT / 2,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 8
            }}>
            <Image
                source={IMAGES.plus}
                style={{
                    height: '60%',
                    width: '60%',
                    tintColor: '#fff',
                    alignSelf: 'center',
                }}
            />
        </TouchableOpacity>
        : null
}

*/