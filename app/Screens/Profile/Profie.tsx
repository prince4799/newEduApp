import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ImageBackground, Dimensions, StyleSheet, SafeAreaView } from 'react-native'
import { IMAGES } from '../../Assets/Images/Images';
import { COLORS } from '../../Constants/Colors';
import { DIMENSIONS } from '../../Constants/Constants';
import Animated, { BounceInLeft, BounceInRight } from 'react-native-reanimated';
import { useNetInfo } from '@react-native-community/netinfo';
import AnimatedView from '../../Components/AnimatedView';
import { printError, printSucess, retrieveData } from '../../Assets/Utils/ExtenFunc';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationProp ,ParamListBase} from '@react-navigation/native';

// Define the type for the 'navigation' prop
type ProfileProps = {
  navigation: NavigationProp<ParamListBase>;
};

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
    const netInfo = useNetInfo();
    const net = netInfo.isConnected;
    const [values, setValues] = useState<object>({})

    const gettingData = async () => {
        try {
            const username = await retrieveData('@username', 'Profile')
            const contact = await retrieveData('@contact', 'Profile')
            const userType = await retrieveData('@userType', 'Profile')
            const email = await retrieveData('@email', 'Profile')
            setValues({
                username: (username as { value: string }).value,
                contact: (contact as { value: string }).value,
                userType: (userType as { value: string }).value,
                email: (email as { value: string }).value
            })
            // printSucess("values", values); // Handle the result here
        } catch (error) {
            printError("Home", error); // Handle any errors here
        }

    };
    const logout = async () => {
        await AsyncStorage.clear();
        navigation.replace('SignUpRegisterDrawer')
    }

    useEffect(() => {
        gettingData()
    }, [])

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: COLORS.Background }}>
            <AnimatedView netStatus={net} style={{ top: DIMENSIONS.HEIGHT * 4.7, position: 'absolute' }} />
            <Image
                 source={IMAGES.halfbg}
                 style={{
                     height: DIMENSIONS.HEIGHT * 5,
                     width: DIMENSIONS.WIDTH * 10,
                     position: 'absolute'
                 }}  />
            <TouchableOpacity style={{
                height: DIMENSIONS.HEIGHT / 2,
                width: DIMENSIONS.HEIGHT / 2,
                alignSelf: 'flex-end',
                position: 'absolute',
                top: 10,
                right: 10,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    source={IMAGES.editing}
                    style={{
                        height: '50%',
                        width: '50%',
                        tintColor: COLORS.White
                    }} />
                <Text style={{ color: COLORS.White, }}>Edit </Text>
            </TouchableOpacity>
            <View
                style={{
                    height: DIMENSIONS.HEIGHT + 10,
                    width: DIMENSIONS.HEIGHT + 10,
                    borderRadius: DIMENSIONS.HEIGHT / 2 + 10,
                    backgroundColor: COLORS.ButtonText,
                    alignSelf: 'center',
                    marginTop: DIMENSIONS.HEIGHT / 3,
                    elevation: 10,
                    justifyContent: 'center'
                }}>
                <View
                    style={{
                        height: DIMENSIONS.HEIGHT,
                        width: DIMENSIONS.HEIGHT,
                        alignSelf: 'center',
                        backgroundColor: COLORS.White,
                        elevation: 2,
                        borderRadius: DIMENSIONS.HEIGHT / 2,
                    }} />
            </View>
            {/* ========Username & mailID============= */}
            <View
                style={{
                    margin: 5,
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: '700',
                        color: COLORS.White,
                    }}> {String((values as { username: string }).username)}</Text>
                <Text style={{
                    fontSize: 12,
                    color: COLORS.White,
                }}>{String((values as { email: string }).email)}</Text>
            </View>
            {/* =============Contact & User Type============= */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: DIMENSIONS.HEIGHT*2,
                    // opacity: 1,
                    // backgroundColor:'red'
                }}>
                <View                  
                    style={{...styles.card,backgroundColor:COLORS.Blue}}>
                    <Text
                        style={styles.cardtext}
                        numberOfLines={2}
                    >User Type{`\n`}{String((values as { userType: string }).userType)=='Public'?'Student':String((values as { userType: string }).userType)}</Text>
                </View>
                <View                  
                    style={{...styles.card,backgroundColor:COLORS.Blue}}>
                    <Text
                        style={styles.cardtext}
                    >Contact No. {String((values as { contact: string }).contact)}</Text>
                </View>
            </View>
            <View style={{top:'2%'}}>
                <Animated.View
                    entering={BounceInLeft}>
                    <TouchableOpacity
                        style={styles.button}>
                        <Image source={IMAGES.payment}
                            style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Payment History </Text>
                        <Image source={IMAGES.rightarrow}
                            style={{ ...styles.buttonIcon, left: DIMENSIONS.WIDTH * 3.5 }} />
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View
                    entering={BounceInLeft}
                    exiting={BounceInRight}>
                    <TouchableOpacity
                        style={styles.button}>
                        <Image source={IMAGES.aboutus}
                            style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>About Us!</Text>
                        <Image source={IMAGES.rightarrow}
                            style={{ ...styles.buttonIcon, left: DIMENSIONS.WIDTH * 3.5 }} />
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View
                    entering={BounceInLeft}>
                    <TouchableOpacity
                        onPress={()=>logout()}
                        style={styles.button}>
                        <Image source={IMAGES.logout}
                            style={styles.buttonIcon} />
                        <Text style={styles.buttonText}>Logout</Text>
                        <Image source={IMAGES.rightarrow}
                            style={{ ...styles.buttonIcon, left: DIMENSIONS.WIDTH * 3.5 }} />
                    </TouchableOpacity>
                </Animated.View>


            </View>
        </SafeAreaView>

    )

}
const styles = StyleSheet.create({
    button: {
        height: DIMENSIONS.HEIGHT / 1.3,
        width: DIMENSIONS.WIDTH * 9.5,
        backgroundColor: COLORS.White,
        alignSelf: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        elevation: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    buttonIcon: {
        height: DIMENSIONS.HEIGHT / 3,
        width: DIMENSIONS.HEIGHT / 3,
        alignSelf: 'center',
        // left: 5,
        tintColor:COLORS.Blue,
    },
    buttonText: {
        fontSize: 16,
        width: DIMENSIONS.WIDTH * 4,
        alignSelf: 'center',
        left: 15,
        fontWeight: '700',
        color:COLORS.DarkBlue,
    },
    card: {
        height: DIMENSIONS.HEIGHT * 1.5,
        width: DIMENSIONS.WIDTH * 4,
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
        color: COLORS.White,
        fontWeight:'700'
    }
})
export default Profile;