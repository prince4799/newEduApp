
import React, { useEffect, useState } from 'react';
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
import Animated, { BounceInLeft, BounceInRight } from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';
import { Deferred } from '@firebase/util';
import DetailsView from '../../Components/DetailsView';

// import { useNetInfo } from '@react-native-community/netinfo';

const data = [
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
        "color":'yellow',

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
        "color":'red'

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
        "color":'red'

    },{
        "_id": "641c1eafafe09da82d30e015",
        "email": "viper@mail.com",
        "password": "$2b$10$30LA0jSq4mcnuGblVH4gRuZdG0WY9ZCxECyl7ETQHp3wt50q60hCS",
        "username": "Prince",
        "contact": 12023453,
        "userType": "Public",
        "paid": "demo",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFjMWVhZmFmZTA5ZGE4MmQzMGUwMTUiLCJpYXQiOjE2Nzk1NjQ0NjN9.fBRFRYWPOwJd5nTfsrb70a8UkkUNSYYudc7YilwrN9g",
        "__v": 0,
        "color":'red'

    },{
        "_id": "641c1eafafe09da82d30e015",
        "email": "viper@mail.com",
        "password": "$2b$10$30LA0jSq4mcnuGblVH4gRuZdG0WY9ZCxECyl7ETQHp3wt50q60hCS",
        "username": "Prince",
        "contact": 12023453,
        "userType": "Public",
        "paid": "demo",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFjMWVhZmFmZTA5ZGE4MmQzMGUwMTUiLCJpYXQiOjE2Nzk1NjQ0NjN9.fBRFRYWPOwJd5nTfsrb70a8UkkUNSYYudc7YilwrN9g",
        "__v": 0,
        "color":'red'

    },{
        "_id": "641c1eafafe09da82d30e015",
        "email": "viper@mail.com",
        "password": "$2b$10$30LA0jSq4mcnuGblVH4gRuZdG0WY9ZCxECyl7ETQHp3wt50q60hCS",
        "username": "Prince",
        "contact": 12023453,
        "userType": "Public",
        "paid": "demo",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFjMWVhZmFmZTA5ZGE4MmQzMGUwMTUiLCJpYXQiOjE2Nzk1NjQ0NjN9.fBRFRYWPOwJd5nTfsrb70a8UkkUNSYYudc7YilwrN9g",
        "__v": 0,
        "color":'red'

    },{
        "_id": "641c1eafafe09da82d30e015",
        "email": "viper@mail.com",
        "password": "$2b$10$30LA0jSq4mcnuGblVH4gRuZdG0WY9ZCxECyl7ETQHp3wt50q60hCS",
        "username": "Prince",
        "contact": 12023453,
        "userType": "Public",
        "paid": "demo",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFjMWVhZmFmZTA5ZGE4MmQzMGUwMTUiLCJpYXQiOjE2Nzk1NjQ0NjN9.fBRFRYWPOwJd5nTfsrb70a8UkkUNSYYudc7YilwrN9g",
        "__v": 0,
        "color":'red'

    },{
        "_id": "641c1eafafe09da82d30e015",
        "email": "viper@mail.com",
        "password": "$2b$10$30LA0jSq4mcnuGblVH4gRuZdG0WY9ZCxECyl7ETQHp3wt50q60hCS",
        "username": "Prince",
        "contact": 12023453,
        "userType": "Public",
        "paid": "demo",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFjMWVhZmFmZTA5ZGE4MmQzMGUwMTUiLCJpYXQiOjE2Nzk1NjQ0NjN9.fBRFRYWPOwJd5nTfsrb70a8UkkUNSYYudc7YilwrN9g",
        "__v": 0,
        "color":'red'

    },{
        "_id": "641c1eafafe09da82d30e015",
        "email": "viper@mail.com",
        "password": "$2b$10$30LA0jSq4mcnuGblVH4gRuZdG0WY9ZCxECyl7ETQHp3wt50q60hCS",
        "username": "Prince",
        "contact": 12023453,
        "userType": "Public",
        "paid": "demo",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFjMWVhZmFmZTA5ZGE4MmQzMGUwMTUiLCJpYXQiOjE2Nzk1NjQ0NjN9.fBRFRYWPOwJd5nTfsrb70a8UkkUNSYYudc7YilwrN9g",
        "__v": 0,
        "color":'red'

    },{
        "_id": "641c1eafafe09da82d30e015",
        "email": "viper@mail.com",
        "password": "$2b$10$30LA0jSq4mcnuGblVH4gRuZdG0WY9ZCxECyl7ETQHp3wt50q60hCS",
        "username": "Prince",
        "contact": 12023453,
        "userType": "Public",
        "paid": "demo",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFjMWVhZmFmZTA5ZGE4MmQzMGUwMTUiLCJpYXQiOjE2Nzk1NjQ0NjN9.fBRFRYWPOwJd5nTfsrb70a8UkkUNSYYudc7YilwrN9g",
        "__v": 0,
        "color":'red'

    },{
        "_id": "641c1eafafe09da82d30e015",
        "email": "viper@mail.com",
        "password": "$2b$10$30LA0jSq4mcnuGblVH4gRuZdG0WY9ZCxECyl7ETQHp3wt50q60hCS",
        "username": "Prince",
        "contact": 12023453,
        "userType": "Public",
        "paid": "demo",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDFjMWVhZmFmZTA5ZGE4MmQzMGUwMTUiLCJpYXQiOjE2Nzk1NjQ0NjN9.fBRFRYWPOwJd5nTfsrb70a8UkkUNSYYudc7YilwrN9g",
        "__v": 0,
        "color":'red'

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
        "color":'red'

    }
]
const AdminManageUsers = ({ }) => {

    // const netInfo = useNetInfo();
    // const net = netInfo.isConnected;

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: '#fdf',height:'100%'  }}>
            <FlatList
                data={data}
                style={{ backgroundColor: '#fff',height:300,padding:5}}
                renderItem={({ item }) =>
                <SafeAreaView style={{justifyContent:'center',alignItems:'center'}}>
                    <DetailsView item={item} style={{height:300,marginBottom:20,alignSelf:'center'}} />
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
    }
})

export default AdminManageUsers;


