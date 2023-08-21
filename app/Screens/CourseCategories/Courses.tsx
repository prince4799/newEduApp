import React, { useState, useRef } from 'react';

import {
    Button,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    useColorScheme,
    useWindowDimensions,
    View,
} from 'react-native';
import Lottie from 'lottie-react-native';
import Animated from "react-native-reanimated";
import { COLORS } from '../../Constants/Colors';
import { IMAGES } from '../../Assets/Images/Images';
import { DIMENSIONS } from '../../Constants/Constants';
import UPSC from './Education/UPSC';
import Yoga from './Physical/Physcal';
import CoursesCategories from '../../Navigators/TopNavigation/CoursesCategories';
import AnimatedView from '../../Components/AnimatedView';
import { useNetInfo } from '@react-native-community/netinfo';


function Courses(): JSX.Element {

    const netInfo = useNetInfo();
    const net = netInfo.isConnected;
    return (
        <View
            style={{ flex: 1, backgroundColor: '#fff' }}>
                <AnimatedView netStatus={net} style={{ top: 320, position: 'absolute' }} />
            <ImageBackground
                source={IMAGES.halfbg}
                style={{ height: DIMENSIONS.HEIGHT * 2.2, marginBottom: 10 }}>
                <Lottie style={{
                    top: 0,
                    alignSelf: 'center',
                    height: DIMENSIONS.HEIGHT * 2.5,
                    width: DIMENSIONS.WIDTH * 8,
                }} source={IMAGES.online} autoPlay loop />
            </ImageBackground>
            <CoursesCategories />
        </View>
    )
}
export default Courses;

const styles = StyleSheet.create({
    AnimatedViewContainer: {
        height: DIMENSIONS.HEIGHT,
        width: DIMENSIONS.WIDTH * 10,
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: 'red',
        top: 300,

    }
})