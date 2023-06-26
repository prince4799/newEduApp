import React, { useEffect, useState,useMemo } from 'react';
import { ViewProps } from 'react-native';
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    Alert,
    Linking,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ImageBackground,
    StyleProp,
    ViewStyle,
    LayoutAnimation,
    NativeModules,
} from 'react-native';
import { IMAGES } from '../Assets/Images/Images';
import { DIMENSIONS, stored } from '../Constants/Constants';
import Animated, {
    useAnimatedStyle,
    withSpring,
    useSharedValue,
    withTiming,
    Easing,
    Value,
} from "react-native-reanimated";
import { COLORS } from '../Constants/Colors';
import { alert, apiCaling, printError, printLog } from '../Assets/Utils/ExtenFunc';
// import { SharedValue } from "react-native-reanimated";
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);


interface Props {
    style?: StyleProp<ViewStyle>
    item?: Object | any
    index: Number
    onChildData: Function
}

const UserDetailsView: React.FC<Props> = ({ style, item, index, onChildData }) => {
    const progressRef = React.useRef(DIMENSIONS.HEIGHT * 3);
    // const progress: Animated.SharedValue<number> = useSharedValue(DIMENSIONS.HEIGHT * 3);
    const [showDetails, setShowDetails] = useState(false);
    const [deleteAnim, setDeleteAnim] = useState(false);

    return (
        <View style={[style,
            styles2.container,
            {
                //  opacity:index&&showDetails?0.5:1,
                top: 5,
                flex: 1,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                borderWidth: 0.5,
                borderColor: COLORS.Blue
            }]}>
            <View
                style={{
                    // borderWidth: 2,
                    // borderColor: "#0333A1",
                    // marginStart: 20,
                    borderRadius: 10,
                    width: "90%",
                    justifyContent: 'center',
                    padding: 5,
                    // elevation: 1
                }}
            >

                {/* ==========Avatar======== */}
                <View
                    style={{
                        width: showDetails ? 55 : 40,
                        height: showDetails ? 55 : 40,
                        justifyContent: "center",
                        backgroundColor: "#ebe6e6",
                        position: showDetails ? 'relative' : 'absolute',
                        borderRadius: 100,
                        borderColor: COLORS.Blue,
                        alignSelf: showDetails ? "center" : 'auto',
                        borderWidth: 0.5,
                        zIndex: 5,
                        // backgroundColor: 'red',
                        margin: 5,
                    }}
                >
                    <Image
                        style={{
                            height: 20,
                            width: 20,
                            alignSelf: "center",
                            padding: 15,
                            // backgroundColor: 'red'
                        }}
                        source={IMAGES.user}
                    />
                </View>
                {/* ==========Name========== */}
                <View style={{ ...styles.textContainer, alignItems: 'center', marginStart: showDetails ? 20 : 60 }}>
                    <Text>Name:</Text>
                    <Text
                        style={styles.cardtext}

                    >{item.username}
                    </Text>
                </View>

                {/* ===========Contact============= */}
                <View style={{ ...styles.textContainer, alignItems: 'center', marginStart: showDetails ? 20 : 60 }}>
                    <Text>Contact:</Text>
                    <Text
                        style={styles.cardtext}
                    >{item.contact}
                    </Text>
                </View>
                {/* ===========Contact============= */}
                <View style={{ ...styles.textContainer, alignItems: 'center', marginStart: showDetails ? 20 : 60 }}>
                    <Text>User Type:</Text>
                    <Text
                        style={styles.cardtext}
                    >{item.userType}
                    </Text>
                </View>
                {
                    showDetails ?
                        <View>
                            {/* ==============email============ */}
                            <View style={{ ...styles.textContainer, alignItems: 'center', marginStart: showDetails ? 20 : 60 }}>
                                <Text>Email:</Text>
                                <Text
                                    style={styles.cardtext}
                                >{item.email}
                                </Text>
                            </View>
                            {item.paid ? <View style={{ ...styles.textContainer, alignItems: 'center', marginStart: showDetails ? 20 : 60 }}>
                                <Text>Plan: </Text>
                                <Text
                                    style={styles.cardtext}
                                >{item.paid}
                                </Text>
                            </View> : null}
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                padding: 15,
                            }}>
                                <Text

                                    style={{
                                        backgroundColor: '#78eb78',
                                        width: '45%',
                                        height: showDetails ? 30 : 0,
                                        textAlignVertical: 'center',
                                        textAlign: 'center',
                                        fontWeight: '700',
                                        marginRight: 4.5,
                                    }}>UPDATE</Text>
                                <Text
                                    onPress={() => {
                                        setTimeout(() => {
                                            onChildData(index)
                                            setShowDetails(!showDetails)
                                        }, 2000)
                                    }
                                    }
                                    style={{
                                        backgroundColor: '#f76060',
                                        width: '45%',
                                        height: showDetails ? 30 : 0,
                                        fontWeight: '700',
                                        textAlign: 'center',
                                        marginLeft: 4.5,
                                        textAlignVertical: 'center'
                                    }}>DELETE</Text>

                            </View>

                        </View> : null
                }
                {/* ============Drop Arrow============ */}
                <TouchableOpacity
                    onPress={() => { setShowDetails(!showDetails); LayoutAnimation.easeInEaseOut(); }}
                    style={{
                        height: 40,
                        width: 40,
                        position: 'absolute',
                        alignSelf: 'flex-end',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Image
                        style={[{
                            height: 20, width: 20, transform: [
                                { rotateZ: showDetails ? '180deg' : '0deg' }
                            ]
                        }]}
                        source={IMAGES.downArrow} />
                </TouchableOpacity>

            </View>

        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: "row",
        height: '100%',

    },

    buttonIcon: {
        height: DIMENSIONS.HEIGHT / 3,
        width: DIMENSIONS.HEIGHT / 3,
        alignSelf: 'center',
        // left: 5,

    },
    card: {
        height: DIMENSIONS.HEIGHT * 1.5,
        width: DIMENSIONS.WIDTH * 3.8,
        // borderRadius: 10,
        alignItems: 'center',
        // padding: 5,
        opacity: 1,
        justifyContent: 'center',
        elevation: 5,

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
})

export default UserDetailsView;


import { NavigationProp } from '@react-navigation/native';


interface VideoDetailsViewProps {
    secretKeyID?: string,
    secretPassword?: string,
    data?: any,
    navigation?: NavigationProp<any>,
    changeList:any,
    index:Number,
}

import base64js from 'base64-js';
import { eventsName, strings } from '../Constants/Strings';


export const VideoDetailsView: React.FC<VideoDetailsViewProps> = ({
    secretKeyID,
    secretPassword,
    data,
    navigation,
    changeList,
    index
}) => {
    const [showDetails, setShowDetails] = useState(false);
    const imagebase64 = data.thumbnail.data
    const uint8Array = new Uint8Array(imagebase64);
    const base64String = base64js.fromByteArray(uint8Array);

    return (
        <View
            style={{
                ...styles2.videoList,
                flexDirection: showDetails ? 'column' : 'row',
                height: showDetails ? DIMENSIONS.HEIGHT * 4 : DIMENSIONS.HEIGHT * 1.5,
                borderWidth: 0.5,
                borderColor: COLORS.Blue,
            }}>
            {/* Thumbnail thumbnail.data */}
            <TouchableOpacity
            onPress={()=>{
                console.log("data.thumbnail.",data.videolink);
                navigation?.navigate(strings.Videoplayer)
            }}
            style={{
                justifyContent: 'center',
                width: showDetails ? undefined : '30%',
                height: showDetails ? '40%' : undefined,
            }}>
                <Image
                    resizeMode='contain'
                    style={{
                        height: '95%',
                        width: '95%',
                        alignSelf: 'center',
                    }}
                    source={{ uri: `data:image/jpeg;base64,${base64String}` }}
                    // source={IMAGES.aboutus}
                />
            </TouchableOpacity>
            {/* Details */}
            <View
                style={{ width: '70%', justifyContent: 'space-around' }}>
                <Text style={{ ...styles2.text, fontSize: 20 }}>{data.title}</Text>
                <Text style={{ ...styles2.text, fontSize: 12 }}>{data.category}</Text>
            </View>
            {/* BUTTONS */}
            {
                secretKeyID != undefined && secretPassword != undefined && showDetails ?
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 15,
                        }}>
                            <TouchableOpacity
                            style={{
                                width: '45%',
                                height: showDetails ? 30 : 0,
                                elevation:3,
                                borderRadius:3,
                                backgroundColor: '#78eb78',
                            }}
                            >
                             <Text
                                style={{
                                    
                                    width: '100%',
                                    height: showDetails ? 30 : 0,
                                    fontWeight: '700',
                                    textAlign: 'center',
                                    textAlignVertical: 'center'
                                }}>UPDATE</Text>   
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                            style={{
                                width: '45%',
                                height: showDetails ? 30 : 0,
                                elevation:3,
                                borderRadius:3,
                                backgroundColor: '#f76060',
                            }}
                            onPress={()=>changeList(eventsName.Delete,data.title,index)}
                            >
                               <Text
                            // onPress={changeList('delete')}
                                style={{
                                    
                                    width: '100%',
                                    height: showDetails ? 30 : 0,
                                    fontWeight: '700',
                                    textAlign: 'center',
                                    textAlignVertical: 'center'
                                }}>DELETE</Text>
  
                            </TouchableOpacity>
                           
                        </View>

                    </View> : null
            }
            {/* expand button */}
            {secretKeyID != undefined && secretPassword != undefined ? <TouchableOpacity
                onPress={() => { setShowDetails(!showDetails); LayoutAnimation.easeInEaseOut(); }}
                style={{
                    height: 40,
                    width: 40,
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor:'red',
                    right: 0,
                }}>
                <Image
                    style={[{
                        height: 20, width: 20,
                        tintColor: COLORS.Blue,
                        transform: [
                            { rotateZ: showDetails ? '180deg' : '0deg' }
                        ]
                    }]}
                    source={IMAGES.downArrow} />
            </TouchableOpacity> : null}
        </View>
    )
}

const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    videoList: {
        width: '95%',
        height: DIMENSIONS.HEIGHT * 1.5,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginTop: 10,
        alignSelf: 'center',
        borderRadius: 5,
        elevation: 8,
        padding:2,
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
        height: DIMENSIONS.HEIGHT * 10,
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
        height: DIMENSIONS.HEIGHT * 2,
        width: DIMENSIONS.WIDTH * 4,
        backgroundColor: '#fff',
        borderBottomLeftRadius: DIMENSIONS.HEIGHT / 2,
        borderBottomRightRadius: DIMENSIONS.HEIGHT / 2,
        borderTopRightRadius: DIMENSIONS.HEIGHT / 2,
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