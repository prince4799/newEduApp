import React, { useState, useRef ,} from 'react';

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
import { FlatList } from 'react-native-gesture-handler';
import { DIMENSIONS } from '../../../Constants/Constants';
import { IMAGES } from '../../../Assets/Images/Images';
import { VideoLists } from '../../../Components/VideoLists';
import { getVideoByCategory } from '../../Categories/CategoriesFunc';

// getVideoByCategory=()=>{

// }

const getImages:any=()=>{



}


function Yoga(navigation: any): JSX.Element {
    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}>
            <ScrollView
            
                style={{ flex: 1,height:'100%' }}>
                <VideoLists ObjectData={[1]}
                screenName={'Profile'} title={"Yoga"} 
                height={(DIMENSIONS.HEIGHT/2) *Math.floor(Math.random() * 10)}
                navigation={navigation}/>
                 <VideoLists ObjectData={[1]}
                screenName={'Profile'} title={"Yoga"} 
                height={(DIMENSIONS.HEIGHT/3) *Math.floor(Math.random() * 10)}
                navigation={navigation}/>
                
            </ScrollView>
        </SafeAreaView>
    )
}
export default Yoga;

const styles=StyleSheet.create({
    flatlistContainer:{
        height: DIMENSIONS.HEIGHT * 3,
        // width: DIMENSIONS.WIDTH * 10,
        backgroundColor: '#555',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical:5,
    },
    flatlisttitle:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        alignSelf: 'flex-start',
        // backgroundColor:'red',
        textAlignVertical: 'center',
        marginLeft: 10,
        marginTop: 10,
    },
    flatlistcard:{
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
})