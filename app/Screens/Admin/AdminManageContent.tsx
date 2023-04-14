
import React, { ReactElement, useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, useWindowDimensions, Alert, Linking, SafeAreaView,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import * as extFun from "../../Assets/Utils/ExtenFunc";
import * as CONSTANTS from '../../Constants/Constants'
import AnimatedView from '../../Components/AnimatedView';
import { COLORS } from '../../Constants/Colors';
import { IMAGES } from '../../Assets/Images/Images';
import Animated, { BounceInLeft, BounceInRight, log } from 'react-native-reanimated';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Deferred } from '@firebase/util';
import DetailsView from '../../Components/DetailsView';
import { useNetInfo } from '@react-native-community/netinfo';
import { LinearGradient } from 'expo-linear-gradient';

var dataArray = [
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
const AdminManageContent = ({ }) => {

    const [list, setList] = useState<any>([dataArray])
    const [searchText, setSearchText] = useState(false)
    const [childData, setChildData] = useState<Number>();

    const removeItem = (index: number) => {
        const newArray = [...dataArray]; // make a copy of the array
        newArray.splice(index, 1); // remove the item at the specified index
        setList(newArray); // update the state with the new 
        // dataArray=newArray
        console.log(">>", list, '\n >>>>', newArray)
    };

    const handleChildData = (index: number) => {
        setChildData(index);
        console.log(".....", childData, index);

        removeItem(index)
    };

    const filterlist = (text: any) => {
        if (text.length > 3) {
            setSearchText(true);
            const filteredList = dataArray.filter((item) =>
                item.title.toLowerCase().includes(text.toLowerCase()) || item.category.toLowerCase().includes(text.toLowerCase())

            );
            setList(filteredList);
            console.log("from if list", list)
        }
        else {
            setList(dataArray)
            console.log("from else list", list)

        }

    }

    // const COLORS = ['#ffe0b2', '#fff9c4', '#e1f5fe', '#f1f8e9', '#fce4ec', '#f3e5f5'];
    // const COLORS = ['#3f51b5', '#2196f3', '#009688', '#ff5722', '#607d8b', '#f44336'];
    // const COLORS = ['#c62828', '#6a1b9a', '#0d47a1', '#1b5e20', '#e65100', '#37474f', '#00695c', '#bf360c', '#3e2723', '#4a148c'];
    const COLORS = ['#ffcdd2', '#e1bee7', '#bbdefb', '#c8e6c9', '#ffccbc', '#cfd8dc', '#b2dfdb', '#ffab91', '#d7ccc8', '#ce93d8'];

    const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];


    const numberOfUser: any = () => {
        return (<>
            <Text
                style={{
                    paddingLeft: 15,
                    marginBottom: 10,
                }}
            >Total Users: {dataArray.length}</Text>
        </>)
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#fff',
                height: '100%',
            }}>
            <Text
                style={{
                    padding: 10,
                    alignSelf: 'center',
                    textAlign: 'center',
                    fontSize: 24,
                    fontWeight: '800'
                }}
            >CATEGORIES</Text>
            <View
                style={{
                    height: 45,
                    width: '90%',
                    borderWidth: 1,
                    alignSelf: 'center',
                    margin: 10,
                    // marginBottom: 30,
                    borderColor: 'grey',
                    flexDirection: 'row',
                    borderRadius: 5,
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                }}
            >
                <Image
                    resizeMode='contain'
                    style={{ height: 25, width: '10%', alignSelf: 'center', marginStart: 15 }}
                    source={IMAGES.search} />
                <TextInput
                    onChange={({ nativeEvent }) => filterlist(nativeEvent.text)}
                    placeholder='Search...'
                    placeholderTextColor={'lightgrey'}
                    style={{
                        alignSelf: 'center',
                        width: '85%',
                        height: '90%',
                        margin: 10,
                    }} />
            </View>
            <FlatList
                data={searchText ? list : dataArray}
                numColumns={3}
                style={{ height: 300, }}
                renderItem={({ item, index }) =>
                    <SafeAreaView style={{
                        height: 100,
                        width: 100,
                        backgroundColor: getRandomColor(),
                        margin: 10,

                    }}>
                      

                    </SafeAreaView>
                } />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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


