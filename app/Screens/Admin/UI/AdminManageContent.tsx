
import React, { ReactElement, useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, useWindowDimensions, Alert, Linking, SafeAreaView,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import * as CONSTANTS from '../../../Constants/Constants'
import { IMAGES } from '../../../Assets/Images/Images';

import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import Lottie from 'lottie-react-native';
import AnimatedLottieView from 'lottie-react-native';
import MyModal from '../../../Components/MyModal';
import { COLORS } from '../../../Constants/Colors';
import { printError, printSucess, retrieveData } from '../../../Assets/Utils/ExtenFunc';

var videoDataArray = [
    {
        "videolink": "https://drive.google.com/file/d/1t2YJCi_8yvfQZV7xqRMCf6nCjL6C_mwK/view?usp=share_link",
        "title": "first video",
        "thumbnail": "bertyui;",
        "category": "Yoga"
    },
    {
        "videolink": "https://drive.google.com/file/d/1t2YJCi_8yvfQZV7xqRMCf6nCjL6C_mwK/view?usp=share_link",
        "title": "first video",
        "thumbnail": "bertyui;",
        "category": "Yoga"
    },
    {
        "videolink": "https://drive.google.com/file/d/1t2YJCi_8yvfQZV7xqRMCf6nCjL6C_mwK/view?usp=share_link",
        "title": "first video",
        "thumbnail": "bertyui;",
        "category": "Yoga"
    },
    {
        "videolink": "https://drive.google.com/file/d/1t2YJCi_8yvfQZV7xqRMCf6nCjL6C_mwK/view?usp=share_link",
        "title": "first video",
        "thumbnail": "bertyui;",
        "category": "Yoga"
    },
    {
        "videolink": "https://drive.google.com/file/d/1t2YJCi_8yvfQZV7xqRMCf6nCjL6C_mwK/view?usp=share_link",
        "title": "first video",
        "thumbnail": "bertyui;",
        "category": "Yoga"
    },
    {
        "videolink": "https://drive.google.com/file/d/1t2YJCi_8yvfQZV7xqRMCf6nCjL6C_mwK/view?usp=share_link",
        "title": "first video",
        "thumbnail": "bertyui;",
        "category": "Yoga"
    },
    {
        "videolink": "https://drive.google.com/file/d/1t2YJCi_8yvfQZV7xqRMCf6nCjL6C_mwK/view?usp=share_link",
        "title": "first video",
        "thumbnail": "bertyui;",
        "category": "Yoga"
    },
    {
        "videolink": "https://drive.google.com/file/d/1t2YJCi_8yvfQZV7xqRMCf6nCjL6C_mwK/view?usp=share_link",
        "title": "first video",
        "thumbnail": "bertyui;",
        "category": "Yoga"
    },
    {
        "videolink": "https://drive.google.com/file/d/1t2YJCi_8yvfQZV7xqRMCf6nCjL6C_mwK/view?usp=share_link",
        "title": "first video",
        "thumbnail": "bertyui;",
        "category": "Yoga"
    }
]
var categoryDataArray = [

    {
        "_id": "6409937cba2f886c686eb71f",
        "category": "Meditate",
        "__v": 0
    },
    {
        "_id": "640993a7ba2f886c686eb721",
        "category": "meditate",
        "__v": 0
    },
    {
        "_id": "6438f50eb08bcec497ad8c6a",
        "category": "yoga",
        "__v": 0
    },
    {
        "_id": "6438f52db08bcec497ad8c6d",
        "category": "sadhna",
        "__v": 0
    },
    {
        "_id": "6438f535b08bcec497ad8c70",
        "category": "Dhyan",
        "__v": 0
    },
    {
        "_id": "6438f50eb08bcec497ad8c6a",
        "category": "yoga",
        "__v": 0
    },
    {
        "_id": "6438f52db08bcec497ad8c6d",
        "category": "sadhna",
        "__v": 0
    },
    {
        "_id": "6438f535b08bcec497ad8c70",
        "category": "Dhyan",
        "__v": 0
    },
    {
        "_id": "6438f52db08bcec497ad8c6d",
        "category": "sadhna",
        "__v": 0
    },
    {
        "_id": "6438f535b08bcec497ad8c70",
        "category": "Dhyan",
        "__v": 0
    },
    {
        "_id": "6438f593b08bcec497ad8c73",
        "category": "Weight Lose",
        "__v": 0
    }
]

interface Props {

    SecretKey?: string,
    SecretPassword?: string,
}

const AdminManageContent: React.FC<any | Props> = ({ }) => {

    const [list, setList] = useState<any>([videoDataArray])
    const [searchText, setSearchText] = useState(false)
    const [childData, setChildData] = useState<Number>();
    const [showModal, setShowModal] = useState<boolean>(false)

    const onModalClose = (data:boolean) => {
        setShowModal(false);
      };

      let secretValPromise = ''
      let secretKeyPromise = ''
      const [showListHeader, setShowListHeader] = useState(false);
      useEffect(() => {
          if (secretKeyPromise !== undefined && secretValPromise !== undefined) {
              setShowListHeader(true);
          } else {
              setShowListHeader(false);
          }
      }, [secretKeyPromise, secretValPromise]);
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
        asyncRetrieve()
    }, [secretKeyPromise, secretValPromise])

    const filterlist = (text: any) => {
        if (text.length > 2) {
            setSearchText(true);
            const filteredList = categoryDataArray.filter((item) =>
                item.category.toLowerCase().includes(text.toLowerCase()));
            setList(filteredList);
            console.log("from if list", list)
        }
        else {
            setList(categoryDataArray)
            console.log("from else list", list)

        }

    }

    // const COLORS = ['#ffe0b2', '#fff9c4', '#e1f5fe', '#f1f8e9', '#fce4ec', '#f3e5f5',"#86b588"];
    // const COLORS = ['#3f51b5', '#2196f3', '#009688', '#ff5722', '#607d8b', '#f44336'];
    // const COLORS = ['#c62828', '#6a1b9a', '#0d47a1', '#1b5e20', '#e65100', '#37474f', '#00695c', '#bf360c', '#3e2723', '#4a148c'];
    const COLORSARRAY = ['#ffcdd2', '#e1bee7', '#bbdefb', '#ffccbc', '#cfd8dc', '#b2dfdb', '#ffab91', '#d7ccc8', '#ce93d8'];


    const getRandomColor = () => COLORSARRAY[Math.floor(Math.random() * COLORSARRAY.length)];


    const getRandomAnimation = (): string => {
        const keysArray = Object.keys(IMAGES.animationArray);
        const randomIndex = Math.floor(Math.random() * keysArray.length);
        const randomKey = keysArray[randomIndex];
        const randomValue = IMAGES.animationArray[randomKey];
        return (randomValue)
    }

    const numberOfUser: any = () => {
        return (<>
            <Text
                style={{
                    paddingLeft: 15,
                    marginBottom: 10,
                }}
            >Total Users: {videoDataArray.length}</Text>
        </>)
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#fff',
                height: '100%',
            }}>
            {/* search tab and Title */}
            <View style={{  backgroundColor: '#edeff2', }}>
                <View
                    style={{
                        height: 45,
                        width: '90%',
                        borderWidth: 0.5,
                        alignSelf: 'center',
                        margin: 10,
                        // marginBottom: 30,
                        borderColor: COLORS.Blue,
                        flexDirection: 'row',
                        borderRadius: 5,
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        
                    }}
                >
                    <Image
                        resizeMode='contain'
                        
                        style={{ height: 25, 
                            width: '10%', 
                            alignSelf: 'center',
                            tintColor:COLORS.Blue, 
                            marginStart: 15 }}
                        source={IMAGES.search} />
                    <TextInput
                        onChange={({ nativeEvent }) => filterlist(nativeEvent.text)}
                        placeholder='Search...'
                        placeholderTextColor={COLORS.Blue}
                        style={{
                            alignSelf: 'center',
                            width: '85%',
                            height: '90%',
                            margin: 10,
                        }} />
                </View>
            </View>
            {/* Category cards */}
                <FlatList
                    data={searchText ? list : categoryDataArray}
                    ListEmptyComponent={<Text>No data to show</Text>}
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
                    numColumns={2}
                    style={{ backgroundColor:'#fff' }}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={{
                                height: 150,
                                width: 150,
                                backgroundColor: getRandomColor(),
                                margin: 15,
                                justifyContent: 'center',
                                alignSelf: 'center',
                                elevation: 8,
                            }}>
                            <Lottie style={{
                                top: 0,
                                alignSelf: 'flex-start',
                                height: '80%',
                            }}
                                source={getRandomAnimation()} autoPlay loop />
                            <Text style={{
                                textAlign: 'center',
                                height: '10%',
                            }}>
                                {item.category.toUpperCase()}
                            </Text>
                        </TouchableOpacity >
                    } />

            {showModal ? 
            <MyModal
                showModal={showModal}
                modalText={'Add New Category'}
                category={'Category Name'}
                onModalClose={onModalClose}
                /> 
                : null}
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:COLORS.Background
    },

    buttonIcon: {
        height: CONSTANTS.DIMENSIONS.HEIGHT / 3,
        width: CONSTANTS.DIMENSIONS.HEIGHT / 3,
        alignSelf: 'center',
        // left: 5,

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
    },
    footer: {
        textAlign: 'center',
        alignSelf: 'center',
    },
    header: {
        alignSelf: 'center',
    }
})

export default AdminManageContent;


{/* <AnimatedLottieView
                    // sourceJson={require('../../../Assets/Images/bouncing-ball.json')}
                    sourceJson={require('../../../Assets/Images/bouncing-ball.json')}

                    style={{ width: '60%', height: '60%',zIndex:5 }}
                    aspectRatio={1}
                    autoPlay
                    loop
                /> */}