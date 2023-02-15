import React from 'react'
import { View, Text, TouchableOpacity, Image, ImageBackground, Dimensions, StyleSheet } from 'react-native'
import { IMAGES } from '../../Assets/Images/Images';
import { COLORS } from '../../Constants/Colors';
import { DIMENSIONS } from '../../Constants/Constants';

const Profile = () => {

    return (
        <View
            style={{ flex: 1, backgroundColor: '#fff' }}>

            <Image
                source={IMAGES.halfbg}
                style={{
                    height: DIMENSIONS.HEIGHT * 5,
                    width: DIMENSIONS.WIDTH * 10,
                    position: 'absolute'
                }} />
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
                        backgroundColor: '#fff',
                        elevation: 8,
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
                        color: COLORS.Font,


                    }}>Prince Verma</Text>
                <Text style={{
                    fontSize: 12,
                    color: COLORS.Font,
                }}>example@mail.com</Text>
            </View>
            {/* =============Contact & User Type============= */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginVertical: DIMENSIONS.HEIGHT / 1.3,
                    opacity:1,
                }}>
                <ImageBackground
                source={IMAGES.gradientbg}
                    style={styles.card}>
                    <Text
                        style={styles.cardtext}
                        numberOfLines={2}
                    >User Type{`\n`}Student</Text>
                </ImageBackground>
                <ImageBackground
                source={IMAGES.gradientbg}
                    style={styles.card}>
                    <Text
                        style={styles.cardtext}
                        >Contact No. 9621205058</Text>
                </ImageBackground>
            </View>
            <View>
            <TouchableOpacity
                    style={styles.button}>
                        <Image source={IMAGES.payment}
                        style={styles.buttonIcon}/>
                        <Text style={styles.buttonText}>Payment History </Text>
                        <Image source={IMAGES.rightarrow}
                        style={{...styles.buttonIcon,left:DIMENSIONS.WIDTH*4}}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.button}>
                        <Image source={IMAGES.aboutus}
                        style={styles.buttonIcon}/>
                        <Text style={styles.buttonText}>About Us!</Text>
                        <Image source={IMAGES.rightarrow}
                        style={{...styles.buttonIcon,left:DIMENSIONS.WIDTH*4}}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.button}>
                        <Image source={IMAGES.logout}
                        style={styles.buttonIcon}/>
                        <Text style={styles.buttonText}>Logout</Text>
                        <Image source={IMAGES.rightarrow}
                        style={{...styles.buttonIcon,left:DIMENSIONS.WIDTH*4}}/>
                    </TouchableOpacity>

            </View>
        </View>

    )

}
const styles=StyleSheet.create({
    button:{
        height:DIMENSIONS.HEIGHT/1.3,
        width:DIMENSIONS.WIDTH*9.9,
        backgroundColor:'#fff',
        alignSelf:'center',
        flexDirection:'row',
        borderRadius:10,
        elevation:5,
        marginVertical:5,
    },
    buttonIcon:{
        height:DIMENSIONS.HEIGHT/3,
        width:DIMENSIONS.HEIGHT/3,
        alignSelf:'center',
        left:5,

    },
    buttonText:{
        fontSize:DIMENSIONS.HEIGHT/4,
        width:DIMENSIONS.WIDTH*4,
        alignSelf:'center',
        left:15,
        fontWeight:'700',
    },
    card:{
        height: DIMENSIONS.HEIGHT*1.5,
        width: DIMENSIONS.WIDTH * 4,
        // borderRadius: 10,
        alignItems: 'center',
        // padding: 5,
        opacity:1,
        justifyContent: 'center',
        elevation: 5,

    },
    cardtext:{ 
            fontSize:18,
        textAlign: 'center',
         color:'#fff'}
})
export default Profile;