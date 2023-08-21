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
import { HistoryProvider, useLoadHistory } from '../../../Statemanagement/Load/History/HistoryContext';
import { printError, printInfo } from '../../../Assets/Utils/ExtenFunc';


// getVideoByCategory=()=>{

// }

const getImages:any=()=>{



}


function Physical (navigation: any): JSX.Element {
const { state, dispatch, loadHistory } = useLoadHistory();
const list_data=state.data.Category.details.category;
printInfo("list_data",list_data)
    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}>
                <FlatList
                // data={[1,23,4,5,]}
                data={list_data}
                // data={['yoga','meditation','zumba']}


                // keyExtractor = {(index) => index.toString()}
                // numColumns={2}
                ListFooterComponent={<Text
                    style={{color:"#000",textAlign:'center',fontWeight:'800',fontSize:18,}}
                    >End of List</Text>}
                ListEmptyComponent={<Text
                style={{color:"#000",textAlign:'center',fontWeight:'800',fontSize:18,}}
                >No item to show.</Text>}
                    renderItem={({item,index})=>
                        // <View style={{height:DIMENSIONS.HEIGHT*2,width:DIMENSIONS.HEIGHT*2,backgroundColor:'red',margin:DIMENSIONS.HEIGHT/4,}}>
                        //     <Text>
                        //         {item.category}
                        //     </Text>
                        // </View>
                        <VideoLists
                        title={item.category}
                        screenName={'Physical'}
                        navigation={navigation}
                        index={index}
                        />
                        
                    }

                />
                

            {/* <ScrollView
            
                style={{ flex: 1,height:'100%' }}>
                <VideoLists ObjectData={[1]}
                screenName={'Profile'} title={"Physical..."} 
                navigation={navigation}/>
                
            </ScrollView> */}

        </SafeAreaView>
    )
}
export default Physical;

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