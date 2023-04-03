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
    Animated
} from 'react-native';
import { IMAGES } from '../Assets/Images/Images';
import { DIMENSIONS } from '../Constants/Constants';
import {
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
}

const DetailsView: React.FC<Props> = ({ style, item }) => {
    const progressRef = React.useRef(DIMENSIONS.HEIGHT * 3);
    // const progress: Animated.SharedValue<number> = useSharedValue(DIMENSIONS.HEIGHT * 3);
    const [showDetails, setShowDetails] = useState(false);


    return (
        <View style={[style, styles.container, { top: 5, flex: 1, height: '100%' }]}>
            <View
                style={{
                    borderWidth: 2,
                    borderColor: "#0333A1",
                    marginStart: 20,
                    borderRadius: 10,
                    width: "90%",
                    justifyContent: 'center',
                    padding: 5
                }}
            >
                {/* ==========Avatar======== */}
                <View
                    style={{
                        width: 55,
                        height: 55,
                        justifyContent: "center",
                        backgroundColor: "#fff",
                        position: showDetails ? 'relative' : 'absolute',
                        borderRadius: 100,
                        borderColor: "#0333A1",
                        alignSelf: showDetails ? "center" : 'auto',
                        borderWidth: 2,
                        zIndex: 5,
                        margin:5,
                    }}
                >
                    <Image
                        style={{
                            height: 20,
                            width: 20,
                            alignSelf: "center",
                            padding: 15
                        }}
                        source={IMAGES.user}
                    />
                </View>
                {/* ==========Name========== */}
                <View style={styles.textContainer}>
                    <Text>Name:</Text>
                    <Text
                        style={styles.cardtext}

                    >{item.username}
                    </Text>
                </View>
                {/* ==============email============ */}
                <View style={styles.textContainer}>
                    <Text>Email:</Text>
                    <Text
                        style={styles.cardtext}
                    >{item.email}
                    </Text>
                </View>
                {/* ===========Contact============= */}
                <View style={styles.textContainer}>
                    <Text>Contact:</Text>
                    <Text
                        style={styles.cardtext}
                    >{item.contact}
                    </Text>
                </View>
                {
                    showDetails ?
                        <View>
                            <View style={styles.textContainer}>
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
                                <Text style={{
                                    backgroundColor: '#78eb78',
                                    width: '45%',
                                    height: showDetails ? 30 : 0,
                                    textAlignVertical: 'center',
                                    textAlign: 'center',
                                    fontWeight: '700',
                                    marginRight: 4.5,
                                }}>UPDATE</Text>
                                <Text style={{
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
        alignSelf: 'center',
        justifyContent: 'center',

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


