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
    Modal,
    ActivityIndicator,
} from 'react-native';
import Animated, { FadeInUp, log, SlideInLeft, SlideInRight, ZoomIn } from 'react-native-reanimated';
import * as CONSTANTS from '../Constants/Constants'
import { IMAGES } from "../Assets/Images/Images"
import { FlatList, RefreshControl, ScrollView, TextInput } from 'react-native-gesture-handler';
import { COLORS } from '../Constants/Colors';
import { SafeAreaView, SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { VideoDetailsView } from './DetailsView';
import MyModal from './MyModal';
import { alert, apiCaling, printError, printLog, printSucess, retrieveData, storeData } from '../Assets/Utils/ExtenFunc';
import { eventsName, strings } from '../Constants/Strings';
import { uploadCategories } from '../Screens/Categories/CategoriesFunc';
import { useRoute } from '@react-navigation/native';
// import { uploadCategories } from '../Screens/Categories/Categories';


export const VideoLists: React.FC<any> = ({
    ObjectData,
    screenName,
    title,
    navigation,
    index,
}) => {
    const COLOR = ['#f099ca', '#99b0f0', '#bf99f0']
    const new_title=title.toLowerCase()
    printLog("navigation",)

    return (
        <TouchableOpacity
        onPress={()=>navigation.navigation.navigate(strings.VideoPlayLists)}
        style={{
            height: CONSTANTS.DIMENSIONS.WIDTH * 5.5,
            width: CONSTANTS.DIMENSIONS.WIDTH * 9.7,
            borderRadius: 10,
            elevation: 2,
            alignSelf: 'center',
            margin: 10,
        }}>
             {/* <Image
                    resizeMode='contain'
                    source={IMAGES.cards[new_title]}
                    style={{ height: '100%', width: '100%' }}
                />  */}

            {IMAGES.cards.hasOwnProperty(new_title)?
                <Image
                    resizeMode='contain'
                    source={IMAGES.cards[new_title]}
                    style={{ height: '100%', width: '100%' }}
                /> :
                <View style={{
                    height: CONSTANTS.DIMENSIONS.WIDTH * 5.5,
                    width: CONSTANTS.DIMENSIONS.WIDTH * 9.7,                    
                }}>

<Image
                    resizeMode='contain'
                    source={IMAGES.cards['others']}
                    style={{ height: '100%', width: '100%' }}
                /> 

                </View>
            }
        </TouchableOpacity>
    )
};



interface Props {

    SecretKey?: string,
    SecretPassword?: string,
}
const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);


export const VideoPlayLists: React.FC<any | Props> = ({

    screenName,
    title,
    navigation,
    SecretKey,
    SecretPassword
}) => {
    let secretValPromise = ''
    let secretKeyPromise = ''
    const [showListHeader, setShowListHeader] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [list, setList] = useState([])
    const [loading, setLoading] = useState<boolean>(false)
    const [uploading, setUploading] = useState<boolean>(false)
    const [expandedIndex, setExpandedIndex] = useState(null);
    printLog("CONSTANTS.stored.USER_TYPE",CONSTANTS.stored.USER_TYPE)
    const route = useRoute()
    if (route.params) {
        var videoByCat = route.params.ObjectData
    }
    interface ModalClose {
        data?: any
    }

    async function uploadContent(data: any) {
        printError("data", data)
        const formData = new FormData();
        formData.append('videolink', data.resourceLink);
        formData.append('title', data.resourceTitle);
        formData.append('category', data.categoryName);
        formData.append('thumbnail', {
            uri: data.resourceThumbnail.path,
            name: data.resourceThumbnail.modificationDate + 'resourceThumbnail.jpg',
            type: data.resourceThumbnail.mime, // Replace with the appropriate file type
        });
        try {
            setUploading(true)
            const response = await fetch(CONSTANTS.BASE_URL + 'contents/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    [data.secretKey]: data.secretValue,
                    Authorization: CONSTANTS.stored.TOKEN,
                },
            });
            printLog("response=======>", response)
            if (response) {
                setUploading(false)
            }
            if (response.status >= 400) {
                printError(await response.json())
                alert("Upload failed as title or link may be already exists.")
            }

            if (response.ok) {
                const responseData = await response.json();
                alert(responseData.message)
                printLog("response=======>", responseData)
                listLoad()
            } else {
                // Error occurred during upload
                console.log('Upload failed:', response.status);
            }
        } catch (error) {
            setUploading(false)
            console.log('Error:', error);
        }
        // setUploading(false)
    }

    const onModalClose = (data: ModalClose) => {
        printLog('\u001b[32m', "onModalClose...", data)
        setShowModal(false);
        if (data) {
            if (data.resourceLink || data.resourceTitle || data.resourceThumbnail || data.categoryName) {
                uploadContent(data)
                uploadCategories(data.categoryName, data.secretKey, data.secretValue,)
            }
        }
    };

    async function listLoad() {
        setLoading(true)

        let params = {
            url: 'contents/load',
            method: "GET",
            secret: CONSTANTS.stored.TOKEN
        }
        try {
            let res = await apiCaling(params)
            if (res.message.includes('successfully')) {
                let revList = res.details.contents.reverse()
                setList(revList)
                setLoading(false)
                alert(res.message)
            }
        } catch (err) {
            printError("error in loading videos")
            alert("error in loading videos")
            setLoading(false)

        }
    }

    const changeList = async (type: string, name: string, index: number) => {
        let key = CONSTANTS.stored.SECRET_KEY;
        let val = CONSTANTS.stored.SECRET_VALUE;
        let deleteParams = {
            url: 'contents/delete',
            method: "DELETE",
            secret: CONSTANTS.stored.TOKEN,
            body: {
                "title": name
            },
            headers: {
                'Content-Type': 'application/json',
                [key]: val
            },
        }
        let updateParams = {
            url: '',
            method: "PUT",
            secret: CONSTANTS.stored.TOKEN,
            body: {
                "title": "first video",
                "thumbnail": "ne thumbnail;",
                "category": "meditation",
                "newtitle": "video"
            }
        }


        try {
            setLoading(true)

            let res = await apiCaling(type == eventsName.Delete ? deleteParams : updateParams)
            printSucess("res", res)
            alert(res.message)
            if (res.status == true) {
                setLoading(false)
            }
            if (res.message.includes('successfully')) {
                setList(prevList => prevList.filter((_, i) => i !== index));
            }
            return true
        } catch (err) {
            printError("error in deleting videos", err)
            alert(err.message)
            setLoading(false)
            return false
        }

    }

    const asyncRetrieve = async () => {
        try {
            let key = await retrieveData('@secretKey', 'home')
            secretKeyPromise = key.value
            printSucess(key)
            let val = await retrieveData('@secretVal', 'Home')
            secretValPromise = val.value
            let token = await retrieveData('@token', 'VideoLists')
            token = token.value
        } catch (err) {
            printError('error in Video List', err)
        }
    }

    useEffect(() => {
        printLog("secretKeyPromise",secretKeyPromise)
        if (secretKeyPromise.value !== undefined && secretValPromise.value !== undefined) {
            setShowListHeader(true);
        } else {
            setShowListHeader(false);
        }
        // printLog("ObjectData", videoByCat.details.contents[0])
        if (videoByCat == undefined) {
            !list.length ? listLoad() : null
        }
        else {
            setList(videoByCat.details.contents)
        }
    }, [secretKeyPromise, secretValPromise]);

    useEffect(() => {
        asyncRetrieve()
    }, [secretKeyPromise, secretValPromise])
    // console.log("list",list)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ width: '100%', flex: 1 }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={uploading}
                    style={{
                        backgroundColor: '#000',
                    }}>
                    <View
                        style={{
                            backgroundColor: COLORS.White,
                            height: 50,
                            width: '40%',
                            position: 'absolute',
                            alignSelf: 'center',
                            top: '40%',
                            elevation: 3,
                            borderWidth: 0.5,
                            borderColor: COLORS.Border,
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>
                        <Text style={{
                            textAlign: 'center',
                            textAlignVertical: 'center'
                        }}>Validating...</Text>
                        <ActivityIndicator
                            size={'small'}
                            color={COLORS.Blue} />
                    </View>
                </Modal>
                {CONSTANTS.stored.USER_TYPE== 'Admin' ?
                    < TouchableOpacity
                        onPress={() => {
                            // printLog('>>>>>>>>>>>>>..', showModal)
                            setShowModal(true)
                        }}
                    >
                        <Text
                            style={{
                                height: CONSTANTS.DIMENSIONS.HEIGHT / 1.5,
                                width: CONSTANTS.DIMENSIONS.WIDTH * 9,
                                backgroundColor: COLORS.Button,
                                margin: 15,
                                borderRadius: CONSTANTS.DIMENSIONS.HEIGHT / 2,
                                alignSelf: 'center',
                                textAlignVertical: 'center',
                                textAlign: 'center',
                                elevation: 5,
                                color: COLORS.ButtonText,
                                fontWeight: 'bold',
                                fontSize: 16,
                            }}
                        >UPLOAD VIDEO</Text>
                    </TouchableOpacity> : null
                }
                <FlatList
                    style={{ padding: 5, }}
                    ListEmptyComponent={<Text style={{ alignSelf: 'center' }}>There are no data to show</Text>}
                    data={list}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        <View style={{ paddingBottom: 10 }}>
                            <VideoDetailsView
                                secretKeyID={secretKeyPromise}
                                secretPassword={secretValPromise}
                                data={item}
                                navigation={navigation}
                                changeList={changeList}
                                index={index}
                                expanded={index === expandedIndex}
                                onToggleDetails={() => setExpandedIndex(index)}
                            />
                        </View>
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={() => listLoad()}
                            colors={[COLORS.Blue]} // Customize the loading indicator colors
                        />
                    } />
            </View>
            {/* Add Button */}
            <MyModal
                showModal={showModal}
                modalText={'Add New Video'}
                category={'Enter Category'}
                link={'Enter Link of the video'}
                thumbnail={'Enter Link of thumbnail'}
                title={'Enter Title'}
                // newTitle={'Enter New Title'}
                onModalClose={onModalClose}
            />

        </SafeAreaView >
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.White,
        alignItems: 'center',
    },
    videoList: {
        width: '95%',
        height: CONSTANTS.DIMENSIONS.HEIGHT * 1.5,
        backgroundColor: COLORS.White,
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
        color: COLORS.White,
        alignSelf: 'flex-start',
        textAlignVertical: 'center',
        marginLeft: 10,
        marginTop: 10,
    },
    flatlistcard: {
        elevation: 10,
        height: CONSTANTS.DIMENSIONS.HEIGHT * 2,
        width: CONSTANTS.DIMENSIONS.WIDTH * 4,
        backgroundColor: COLORS.White,
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
                    tintColor: COLORS.White,
                    alignSelf: 'center',
                }}
            />
        </TouchableOpacity>
        : null
}

*/