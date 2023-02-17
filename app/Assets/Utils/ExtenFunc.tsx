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
import { DIMENSIONS } from '../../Constants/Constants'
import { IMAGES } from "../../Assets/Images/Images"
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { COLORS } from '../../Constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

// import * as CONSTANTS from '../../Constants/Constants'

// function ExtenFunc(ObjectData:Object | any  , screenName: string, navigation :any): JSX.Element {
//  export function ExtenFunc(ObjectData:Object | any  , screenName: string, title:string): JSX.Element {
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
                style={styles.flatlistContainer}
            >
                <View style={{
                    height: DIMENSIONS.HEIGHT / 2,
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
                    }
                />
            </ImageBackground>
        </SafeAreaView>
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
    flatlistContainer: {
        height: DIMENSIONS.HEIGHT * 3,
        // width: DIMENSIONS.WIDTH * 10,
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
        // backgroundColor:'red',
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

    }
});
const card = (width: any, height: any): ViewStyle => ({
    width: width * 2,
    height: height * 2,
    backgroundColor: 'red',

})

