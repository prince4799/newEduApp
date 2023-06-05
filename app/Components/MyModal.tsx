import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  PermissionsAndroid,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Animated, { SlideInDown, SlideInUp, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { apiCaling, printError, printLog, printSucess } from '../Assets/Utils/ExtenFunc';
import { DIMENSIONS } from '../Constants/Constants';
import RNFS from 'react-native-fs';
import ImagePicker, { openCamera, openPicker } from 'react-native-image-crop-picker';
import { IMAGES } from '../Assets/Images/Images';
import { COLORS } from '../Constants/Colors';

let options = {
  title: 'Select Image',
  maxWidth: 700,
  maxHeight: 700,
  mediaType: 'photo',
  saveToPhotos: true,
  includeExtra: false,
  compressImage: true,              // Enable image compression
  compressImageQuality: 0.4,
};
interface Props {
  modalText: string;
  showModal: boolean;
  link?: string,
  title?: string,
  thumbnail?: string,
  category?: string,
  newTitle?: string,
  onModalClose: (data: any) => void,
}

const MyModal: React.FC<Props> = ({
  modalText,
  showModal,
  link,
  title,
  thumbnail,
  category,
  newTitle,
  onModalClose,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(showModal);
  const [categoryName, setCategoryName] = useState<string | undefined>('');
  const [resourceLink, setResourceLink] = useState<string | undefined>('');
  const [resourceTitle, setResourceTitle] = useState<string | undefined>('');
  const [resourceThumbnail, setResourceThumbnail] = useState<undefined | string | null | any>('');
  const [resourceNewTitle, setResourceNewTitle] = useState<string | undefined>('')
  const [secretKey, setSecretKey] = useState<string>('')
  const [secretValue, setSecretValue] = useState<string>('')
  const [thumbnailModal, setThumbnailModal] = useState<boolean>(false)
  const inputRef = useRef(null);
  const [imageSource, setImageSource] = useState<any>(IMAGES.thumbnail);



  const modalVisibility = () => {
    setModalVisible(false)
    setCategoryName('')
    setResourceLink('')
    setResourceTitle('')
    setResourceThumbnail('')
    setResourceNewTitle('')
    setSecretKey('')
    setSecretValue('')
    onModalClose(null);
    setImageSource(IMAGES.thumbnail)
  }

  useEffect(() => {
    setModalVisible(showModal);
    setSecretKey('')
    setSecretValue('')

  }, [showModal]);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Required Camera Permission',
          message:
            'App needs access to your camera ' +
            'so you can take  pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        try {
          const image = await openCamera({
            maxWidth: 700,
            maxHeight: 700,
            mediaType: 'photo',
            includeExtra: false,
            compressImage: true,              // Enable image compression
            compressImageQuality: 0.3,
          });
          printLog("image",image)
          setResourceThumbnail(image)
          setThumbnailModal(false)
          setImageSource({ uri: `${image.path}` });
        } catch (error) {
          // Handle the error
          setThumbnailModal(false)
          console.log(error);
        }
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Required Storage Permission',
          message:
            'App needs access to your storage ' +
            'so you can select  pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        try {
          const image = await openPicker({
            maxWidth: 700,
            maxHeight: 700,
            mediaType: 'photo',
            includeExtra: false,
          });
          printLog("image",image)
          setResourceThumbnail(image)
          setThumbnailModal(false)
          setImageSource({ uri: `${image.path}` });
        } catch (error) {
          setThumbnailModal(false)
          console.log(error);
        }
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };



  const onSubmit = () => {
    // Extract the required data from the component's state
    const rawData = {
      categoryName,
      resourceLink,
      resourceTitle,
      resourceThumbnail,
      resourceNewTitle,
      secretKey,
      secretValue,
    };
    const data = Object.fromEntries(
      Object.entries(rawData).filter(([key, value]) => value !== '' && value !== null && value !== undefined)
    );
    // Call the onModalClose function with the extracted data
    onModalClose(data);
    printError(data)
    setModalVisible(false);
  };
  return (

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      style={{ backgroundColor: '#000' }}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(false);
      }}
    >
      <ScrollView style={styles.modalView}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: '#f76060',
              height: 20,
              width: 20,
              alignSelf: 'flex-end',
              justifyContent: 'center',
              alignItems:'center'
            }}
            onPress={() => modalVisibility()}
          ><Text style={{ fontWeight: 'bold', color: '#000' }}>X</Text></TouchableOpacity>
          <Text style={{ marginVertical: 20, fontSize: 20 }}>{modalText} </Text>


          {link !== undefined && (
            <View
              style={{
                width: '100%',
                borderWidth: 0,
              }}>
              {resourceLink && <Animated.Text
                entering={ZoomIn}
                exiting={ZoomOut}
                style={{
                  fontSize: 10,
                  zIndex: 8,
                  backgroundColor: '#fff',
                  position: 'absolute',
                  left: 20,
                  top: 2,
                }}>{link.replace('Enter', '')}</Animated.Text>}
              <TextInput
                style={styles.input}
                placeholder={link}
                value={resourceLink}
                onChangeText={setResourceLink}
                autoFocus={true}
                ref={inputRef}
              />
            </View>
          )}

          {title !== undefined && (

            <View
              style={{
                width: '100%',
                borderWidth: 0,
              }}
            >
              {resourceTitle && <Animated.Text
                entering={ZoomIn}
                exiting={ZoomOut}
                style={{
                  fontSize: 10,
                  zIndex: 8,
                  backgroundColor: '#fff',
                  position: 'absolute',
                  left: 20,
                  top: 2,
                }}>{title.replace('Enter', '')}</Animated.Text>}
              <TextInput
                style={styles.input}
                placeholder={title}
                value={resourceTitle}
                onChangeText={setResourceTitle}
              />
            </View>


          )}
          {category !== undefined && (
            <View
              style={{
                width: '100%',
                borderWidth: 0,
              }}
            >
              {categoryName && <Animated.Text
                entering={ZoomIn}
                exiting={ZoomOut}
                style={{
                  fontSize: 10,
                  zIndex: 8,
                  backgroundColor: '#fff',
                  position: 'absolute',
                  left: 20,
                  top: 2,
                }}>{category.replace('Enter', '')}</Animated.Text>}
              <TextInput
                style={styles.input}
                placeholder={category}
                value={categoryName}
                onChangeText={setCategoryName}
              />
            </View>

          )}
          {newTitle !== undefined && (
            <View
              style={{
                width: '100%',
                borderWidth: 0,
              }}
            >
              {resourceNewTitle && <Animated.Text
                entering={ZoomIn}
                exiting={ZoomOut}
                style={{
                  fontSize: 10,
                  zIndex: 8,
                  backgroundColor: '#fff',
                  position: 'absolute',
                  left: 20,
                  top: 2,
                }}>{newTitle.replace('Enter', '')}</Animated.Text>}
              <TextInput
                style={styles.input}
                placeholder={newTitle}
                value={resourceNewTitle}
                onChangeText={setResourceNewTitle}
              />
            </View>

          )}
          <View
            style={{
              width: '100%',
              borderWidth: 0,
            }}
          >
            {secretKey && <Animated.Text
              entering={ZoomIn}
              exiting={ZoomOut}
              style={{
                fontSize: 10,
                zIndex: 8,
                backgroundColor: '#fff',
                position: 'absolute',
                left: 20,
                top: 2,
              }}>Secret Id</Animated.Text>}
            <TextInput
              style={styles.input}
              placeholder={'Secret Id'}
              value={secretKey}
              onChangeText={(text) => {
                let key = text.replace(/[^a-zA-Z\-]/g, '')
                setSecretKey(key)
              }}
            />
          </View>

          <View
            style={{
              width: '100%',
              borderWidth: 0,
            }}
          >
            {secretValue && <Animated.Text
              entering={ZoomIn}
              exiting={ZoomOut}
              style={{
                fontSize: 10,
                zIndex: 8,
                backgroundColor: '#fff',
                position: 'absolute',
                left: 20,
                top: 2,
              }}>Secret Password</Animated.Text>}
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder={'Secret Password'}
              value={secretValue}
              onChangeText={(text) => {
                let pass = text.replace(/[^a-zA-Z\#\@]/g, '')
                setSecretValue(pass)
              }} />
          </View>
          <View style={{
            flexDirection: 'row', alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            {thumbnail !== undefined && (
              <TouchableOpacity
                onPress={() => {
                  // requestCameraPermission()
                  setThumbnailModal(true)
                }}
                style={{
                  // width: '100%',
                  borderWidth: 0,
                  alignItems: 'center',
                  flexDirection: 'row',
                  left: -50,
                  marginLeft: 0,
                  borderRadius: 5,

                }}>

                <Image style={{
                  ...styles.pickerModalImage,
                  height: 80,
                  width: 80,
                  marginVertical: 5,
                  borderRadius: 5,

                }}
                  resizeMode='cover'
                  source={imageSource} />

                <Modal
                  visible={thumbnailModal}
                  animationType="fade"
                  transparent={true}
                  onRequestClose={() => setThumbnailModal(false)}
                >
                  <TouchableOpacity
                    onPress={() => setThumbnailModal(false)}
                    style={styles.pickermodalContainer}>
                    <View style={styles.pickermodalContent}>
                      <TouchableOpacity style={styles.touchable} onPress={() => { requestCameraPermission() }}>
                        <Image style={styles.pickerModalImage} resizeMode='contain' source={IMAGES.camera} />
                        <Text>Open Camera</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.touchable} onPress={() => { requestStoragePermission() }}>
                        <Image style={styles.pickerModalImage} resizeMode='contain' source={IMAGES.storage} />
                        <Text>Select from storage</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </Modal>
              </TouchableOpacity>
            )}
            {thumbnail !== undefined && <Text style={{
              left: -30
            }}>Select Thumbnail</Text>}
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            // backgroundColor: 'red',
            width: '90%',
            height: 40,
            alignItems: 'center',
            margin: 20,
          }}>
            {/* <Text onPress={() => modalVisibility()} style={{ ...styles.button, backgroundColor: '#f76060', }}>CANCEL</Text> */}
            <Text onPress={onSubmit} style={[styles.button,{backgroundColor: '#78eb78', }]}>SUBMIT</Text>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({

  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#bbdefb',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '30%',
    padding: 10,
  },
  button: {
    borderRadius: 20,
    elevation: 5,
    height: 50,
    width: '90%',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight:'bold',
  },
  input: {
    borderColor: '#86b588',
    borderWidth: 0.5,
    height: 40,
    width: '100%',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    elevation: 1,
    zIndex: 0,
  },
  pickermodalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  pickermodalContent: {
    height: 80,
    width: '90%',
    // backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  touchable: {
    width: '40%',
    borderColor: '#86b588',
    backgroundColor: '#fff',
    borderWidth: 0.8,
    borderRadius: 5,
    elevation: 5,
    marginHorizontal: 10,
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerModalImage: {
    height: 30,
    width: 30
  }

});

export default MyModal;
