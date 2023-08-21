
import React, { ReactElement, useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, useWindowDimensions, Alert, Linking, SafeAreaView,
    Image,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator,
} from 'react-native';
import * as extFun from "../../../Assets/Utils/ExtenFunc";
import * as CONSTANTS from '../../../Constants/Constants'
import AnimatedView from '../../../Components/AnimatedView';
import { COLORS } from '../../../Constants/Colors';
import { IMAGES } from '../../../Assets/Images/Images';
import Animated, { BounceInLeft, BounceInRight, log } from 'react-native-reanimated';
import { FlatList, RefreshControl, TextInput } from 'react-native-gesture-handler';
import { Deferred } from '@firebase/util';
import UserDetailsView from '../../../Components/DetailsView';
import Home from '../../Home/Home';
import Lottie from 'lottie-react-native';

// import { useNetInfo } from '@react-native-community/netinfo';

var dataArray: Array<{}> = [];
const AdminManageUsers = ({ }) => {

    const [list, setList] = useState<any>([])
    const [searchText, setSearchText] = useState(false)
    const [childData, setChildData] = useState<Number>();
    const [loading, setLoading] = useState(false)
    const [expandedIndex, setExpandedIndex] = useState(null);

    const removeItem = (index: number) => {
        const newArray = [...dataArray]; // make a copy of the array
        newArray.splice(index, 1); // remove the item at the specified index
        setList(newArray); // update the state with the 
        // dataArray=newArray
    }; 

    const handleChildData = (index: number) => {
        extFun.printInfo('index', index)
        setChildData(index);
        removeItem(index)
    };

    const filterlist = (text: any) => {
        if (text.length > 3) {
            setSearchText(true);
            const filteredList = dataArray.filter((item) =>
                item.username.toLowerCase().includes(text.toLowerCase()) ||
                item.contact.toString().includes(text)
            );
            setList(filteredList);
        }
        else {
            setList(dataArray)
        }

    }

    const numberOfUser: any = () => {
        return (<>
            <Text
                style={styles.header}
            >Total Users: {list.length}</Text>
        </>)
    }

    const asyncRetrieve = async () => {
        try {
            const tokenPromise = extFun.retrieveData('@token', 'Home');
            const secretKeyPromise = extFun.retrieveData('@secretKey', 'home')
            const secretValPromise = extFun.retrieveData('@secretVal', 'Home')
            const [token, secretKey, secretVal] = await Promise.all([tokenPromise, secretKeyPromise, secretValPromise]);
            // extFun.printSucess("token", token);
            // extFun.printSucess("secretKey", secretKey);
            // extFun.printSucess("secretVal", secretVal);
            let key = secretKey.value + '';
            let val = secretVal.value + '';

            let apiParams = {
                url: 'admin/getalluser',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    [key]: val
                },
                secret: token.value + ''
            }
            extFun.printLog('\u001b[34m', tokenPromise)

            try {
                setLoading(true)
                const response = await extFun.apiCaling(apiParams)
                extFun.alert(response.message)
                if (response.status == "true" && response.users) {
                    setList(response.users)
                    dataArray = list
                    setLoading(false)
                }
                if (response.status) {
                    setLoading(false)
                }
            } catch (err) {
                extFun.printError("Error in fetching Users", err)
                extFun.alert("Error in fetching Users")
                setLoading(false)
            }
        } catch (error) {
            extFun.printError("Home", error); // Handle any errors here
        }
    };

    useEffect(() => {
        asyncRetrieve()
    }, [])


    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.White,
                height: '100%',
            }}>
                   
            <View
                style={{
                    height: CONSTANTS.DIMENSIONS.HEIGHT / 1.5,
                    width: '95%',
                    borderWidth: 0.5,
                    alignSelf: 'center',
                    margin: 10,
                    // marginBottom: 30,
                    borderColor: 'grey',
                    flexDirection: 'row',
                    borderRadius: 5,
                    justifyContent: 'center',
                    backgroundColor: COLORS.White,
                }}
            >
                <Image
                    resizeMode='contain'
                    style={{ height: 25, width: '10%', alignSelf: 'center', marginStart: 15 }}
                    source={IMAGES.search} />
                <TextInput
                    onChange={({ nativeEvent }) => filterlist(nativeEvent.text)}
                    placeholder='Search by name or contact.'
                    placeholderTextColor={'lightgrey'}
                    style={{
                        alignSelf: 'center',
                        width: '85%',
                        height: '90%',
                        margin: 10,
                    }} />
            </View>
            <View
            style={{
                height:'100%'
            }}>
            {/* <Lottie
                style={{
                    alignSelf: 'center',
                    height: '80%',
                    width: '100%',
                    position: 'absolute',
                    zIndex: 0,
                    transform: [{ scaleX: 1 }, { scaleY: 1.5 },{rotateZ: '90deg'}],
                    top:0,
                }}
                source={IMAGES.animationArray['wave']}
                autoPlay
                loop
            />  */}
            <FlatList
                ListHeaderComponent={numberOfUser}
                ListHeaderComponentStyle={styles.header}
                ListFooterComponentStyle={styles.footer}
                ListFooterComponent={loading ? null : <Text style={styles.footer}>End of list.</Text>}
                data={searchText ? list : list}
                style={{ height: 300, backgroundColor: 'transparent' }}
                renderItem={({ item, index }) =>
                    <SafeAreaView style={{}}>
                        
                        <UserDetailsView
                            item={item}
                            onChildData={() => handleChildData(index)}
                            index={index}
                            expanded={index === expandedIndex}
                            onToggleDetails={() => setExpandedIndex(index)}
                            style={{
                                height: 300,
                                marginBottom: 10,
                                alignSelf: 'center',
                                elevation: 5,
                                backgroundColor: COLORS.LightBlue,
                                borderRadius: 10,
                                width: '95%'
                            }} />

                    </SafeAreaView>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={() => asyncRetrieve()}
                        colors={[COLORS.Blue]} // Customize the loading indicator colors
                    />
                }
            />

            </View>
           
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
        fontSize: 12,
        color: 'grey'

    },
    header: {
        alignSelf: 'center',
        fontSize: 12,
        color: 'grey'
    }
})

export default AdminManageUsers;


