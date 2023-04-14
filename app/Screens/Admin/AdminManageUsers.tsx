
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

// import { useNetInfo } from '@react-native-community/netinfo';

var dataArray = [
    {
        "_id": "641c1eafafe09da82d30e015",
        "email": "viper@mail.com",
        "password": "$2b$10$30LA0jSq4mcnuGblVH4gRuZdG0WY9ZCxECyl7ETQHp3wt50q60hCS",
        "username": "lucas",
        "contact": 12023453,
        "userType": "Public",
        "paid": "demo",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFjMWVhZmFmZTA5ZGE4MmQzMGUwMTUiLCJpYXQiOjE2Nzk1NjQ0NjN9.fBRFRYWPOwJd5nTfsrb70a8UkkUNSYYudc7YilwrN9g",
        "__v": 0,
        "color": 'yellow',

    },
    {
        "_id": "641c1eafafe09da82d30e015",
        "email": "viper@mail.com",
        "password": "$2b$10$30LA0jSq4mcnuGblVH4gRuZdG0WY9ZCxECyl7ETQHp3wt50q60hCS",
        "username": "Prince",
        "contact": 125453,
        "userType": "Public",
        "paid": "demo",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFjMWVhZmFmZTA5ZGE4MmQzMGUwMTUiLCJpYXQiOjE2Nzk1NjQ0NjN9.fBRFRYWPOwJd5nTfsrb70a8UkkUNSYYudc7YilwrN9g",
        "__v": 0,
        "color": 'red'

    },
    {
        "_id": "641c1eafafe09da82d30e015",
        "email": "viper@mail.com",
        "password": "$2b$10$30LA0jSq4mcnuGblVH4gRuZdG0WY9ZCxECyl7ETQHp3wt50q60hCS",
        "username": "Prince",
        "contact": 12023453,
        "userType": "Public",
        "paid": "demo",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFjMWVhZmFmZTA5ZGE4MmQzMGUwMTUiLCJpYXQiOjE2Nzk1NjQ0NjN9.fBRFRYWPOwJd5nTfsrb70a8UkkUNSYYudc7YilwrN9g",
        "__v": 0,
        "color": 'red'

    },
    {
        "_id": "641c1eafafe09da82d30e015",
        "email": "viper@mail.com",
        "password": "$2b$10$30LA0jSq4mcnuGblVH4gRuZdG0WY9ZCxECyl7ETQHp3wt50q60hCS",
        "username": "priver",
        "contact": 125453,
        "userType": "Public",
        "paid": "demo",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFjMWVhZmFmZTA5ZGE4MmQzMGUwMTUiLCJpYXQiOjE2Nzk1NjQ0NjN9.fBRFRYWPOwJd5nTfsrb70a8UkkUNSYYudc7YilwrN9g",
        "__v": 0,
        "color": 'red'

    },
    {
        "_id": "641c1eafafe09da82d30e015",
        "email": "viper@mail.com",
        "password": "$2b$10$30LA0jSq4mcnuGblVH4gRuZdG0WY9ZCxECyl7ETQHp3wt50q60hCS",
        "username": "qwerty",
        "contact": 12023453,
        "userType": "Public",
        "paid": "demo",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFjMWVhZmFmZTA5ZGE4MmQzMGUwMTUiLCJpYXQiOjE2Nzk1NjQ0NjN9.fBRFRYWPOwJd5nTfsrb70a8UkkUNSYYudc7YilwrN9g",
        "__v": 0,
        "color": 'red'

    },
    {
        "_id": "641c1eafafe09da82d30e015",
        "email": "viper@mail.com",
        "password": "$2b$10$30LA0jSq4mcnuGblVH4gRuZdG0WY9ZCxECyl7ETQHp3wt50q60hCS",
        "username": "qazxw",
        "contact": 12023453,
        "userType": "Public",
        "paid": "demo",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFjMWVhZmFmZTA5ZGE4MmQzMGUwMTUiLCJpYXQiOjE2Nzk1NjQ0NjN9.fBRFRYWPOwJd5nTfsrb70a8UkkUNSYYudc7YilwrN9g",
        "__v": 0,
        "color": 'red'

    },
    // {
    //     "_id": "641c1eafafe09da82d30e015",
    //     "email": "viper@mail.com",
    //     "password": "$2b$10$30LA0jSq4mcnuGblVH4gRuZdG0WY9ZCxECyl7ETQHp3wt50q60hCS",
    //     "username": "Prince",
    //     "contact": 12023453,
    //     "userType": "Public",
    //     "paid": "demo",
    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFjMWVhZmFmZTA5ZGE4MmQzMGUwMTUiLCJpYXQiOjE2Nzk1NjQ0NjN9.fBRFRYWPOwJd5nTfsrb70a8UkkUNSYYudc7YilwrN9g",
    //     "__v": 0,
    //     "color": 'red'

    // },
    // {
    //     "_id": "641c1eafafe09da82d30e015",
    //     "email": "viper@mail.com",
    //     "password": "$2b$10$30LA0jSq4mcnuGblVH4gRuZdG0WY9ZCxECyl7ETQHp3wt50q60hCS",
    //     "username": "Prince",
    //     "contact": 12023453,
    //     "userType": "Public",
    //     "paid": "demo",
    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFjMWVhZmFmZTA5ZGE4MmQzMGUwMTUiLCJpYXQiOjE2Nzk1NjQ0NjN9.fBRFRYWPOwJd5nTfsrb70a8UkkUNSYYudc7YilwrN9g",
    //     "__v": 0,
    //     "color": 'red'

    // },
    // {
    //     "_id": "641c1eafafe09da82d30e015",
    //     "email": "viper@mail.com",
    //     "password": "$2b$10$30LA0jSq4mcnuGblVH4gRuZdG0WY9ZCxECyl7ETQHp3wt50q60hCS",
    //     "username": "Prince",
    //     "contact": 12023453,
    //     "userType": "Public",
    //     "paid": "demo",
    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFjMWVhZmFmZTA5ZGE4MmQzMGUwMTUiLCJpYXQiOjE2Nzk1NjQ0NjN9.fBRFRYWPOwJd5nTfsrb70a8UkkUNSYYudc7YilwrN9g",
    //     "__v": 0,
    //     "color": 'red'

    // },
    // {
    //     "_id": "641c1eafafe09da82d30e015",
    //     "email": "viper@mail.com",
    //     "password": "$2b$10$30LA0jSq4mcnuGblVH4gRuZdG0WY9ZCxECyl7ETQHp3wt50q60hCS",
    //     "username": "Prince",
    //     "contact": 12023453,
    //     "userType": "Public",
    //     "paid": "demo",
    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFjMWVhZmFmZTA5ZGE4MmQzMGUwMTUiLCJpYXQiOjE2Nzk1NjQ0NjN9.fBRFRYWPOwJd5nTfsrb70a8UkkUNSYYudc7YilwrN9g",
    //     "__v": 0,
    //     "color": 'red'

    // },
    // {
    //     "_id": "641c1eafafe09da82d30e015",
    //     "email": "viper@mail.com",
    //     "password": "$2b$10$30LA0jSq4mcnuGblVH4gRuZdG0WY9ZCxECyl7ETQHp3wt50q60hCS",
    //     "username": "Prince",
    //     "contact": 12023453,
    //     "userType": "Public",
    //     "paid": "demo",
    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFjMWVhZmFmZTA5ZGE4MmQzMGUwMTUiLCJpYXQiOjE2Nzk1NjQ0NjN9.fBRFRYWPOwJd5nTfsrb70a8UkkUNSYYudc7YilwrN9g",
    //     "__v": 0,
    //     "color": 'red'

    // },
    // {
    //     "_id": "641c1eafafe09da82d30e015",
    //     "email": "viper@mail.com",
    //     "password": "$2b$10$30LA0jSq4mcnuGblVH4gRuZdG0WY9ZCxECyl7ETQHp3wt50q60hCS",
    //     "username": "Prince",
    //     "contact": 12023453,
    //     "userType": "Public",
    //     "paid": "demo",
    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFjMWVhZmFmZTA5ZGE4MmQzMGUwMTUiLCJpYXQiOjE2Nzk1NjQ0NjN9.fBRFRYWPOwJd5nTfsrb70a8UkkUNSYYudc7YilwrN9g",
    //     "__v": 0,
    //     "color": 'red'

    // }
]
const AdminManageUsers = ({ }) => {

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
                item.username.toLowerCase().includes(text.toLowerCase()) ||
                item.contact.toString().includes(text)
            );
            setList(filteredList);
            console.log("from if list", list)
        }
        else {
            setList(dataArray)
            console.log("from else list", list)

        }

    }

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
                    backgroundColor: '#fff'
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
            <FlatList
                ListHeaderComponent={numberOfUser}
                ListHeaderComponentStyle={styles.header}
                ListFooterComponentStyle={styles.footer}
                ListFooterComponent={<Text>End of list.</Text>}
                data={searchText ? list : dataArray}
                style={{ height: 300, }}
                renderItem={({ item, index }) =>
                    <SafeAreaView style={{}}>
                        <DetailsView
                            item={item}
                            onChildData={() => handleChildData(index)}
                            index={index}
                            style={{
                                height: 300,
                                marginBottom: 20,
                                alignSelf: 'center',
                                elevation: 5,
                                backgroundColor: '#fff',
                                borderRadius: 10,
                            }} />
                    </SafeAreaView>
                }
            />
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
    footer:{
        textAlign:'center',
        alignSelf:'center',
    },
    header:{
        alignSelf:'center',
    }
})

export default AdminManageUsers;


