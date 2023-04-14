import React, { useEffect, useState } from 'react';
import { ViewProps } from 'react-native';
import {
    View, Text, StyleSheet, useWindowDimensions, Alert, Linking, SafeAreaView,
    Image,
    TouchableOpacity,
    ImageBackground,
    StyleProp,
    ViewStyle,
    LayoutAnimation,
    NativeModules,
} from 'react-native';
import { IMAGES } from '../Assets/Images/Images';
import { DIMENSIONS } from '../Constants/Constants';
import Animated,{
    useAnimatedStyle,
    withSpring,
    useSharedValue,
    withTiming,
    Easing,
    Value,
} from "react-native-reanimated";
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

const DetailsView: React.FC<Props> = ({ style, item, index, onChildData }) => {
    const progressRef = React.useRef(DIMENSIONS.HEIGHT * 3);
    // const progress: Animated.SharedValue<number> = useSharedValue(DIMENSIONS.HEIGHT * 3);
    const [showDetails, setShowDetails] = useState(false);
    const [deleteAnim, setDeleteAnim] = useState(false);
    

    return (
       <View style={[style,
            styles.container,
            {  
                //  opacity:index&&showDetails?0.5:1,
                top: 5,
                flex: 1,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                padding:10,
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
                        width:showDetails? 55:40,
                        height: showDetails? 55:40,
                        justifyContent: "center",
                        // backgroundColor: "#989879",
                        position: showDetails ? 'relative' : 'absolute',
                        borderRadius: 100,
                        borderColor: "#0333A1",
                        alignSelf: showDetails ? "center" : 'auto',
                        borderWidth: 2,
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
                {/* ==============email============ */}
                <View style={{ ...styles.textContainer, alignItems: 'center', marginStart: showDetails ? 20 : 60 }}>
                    <Text>Email:</Text>
                    <Text
                        style={styles.cardtext}
                    >{item.email}
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
                {
                    showDetails ?
                        <View>
                            <View style={{ ...styles.textContainer, alignItems: 'center', marginStart: showDetails ? 20 : 60 }}>
                                <Text>Contact:</Text>
                                <Text
                                    style={styles.cardtext}
                                >{item.contact}
                                </Text>
                            </View>
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
                                 onPress={() => 
                                    {
                                      setTimeout(()=>{
                                         onChildData(index)
                                         setShowDetails(!showDetails)
                                     },2000)}
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

export default DetailsView;


