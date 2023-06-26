import React, { useEffect, useReducer, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import { apiCaling, printError, printLog, printSucess } from '../Assets/Utils/ExtenFunc';
import { openCamera, openPicker } from 'react-native-image-crop-picker';
import { IMAGES } from '../Assets/Images/Images';
import { COLORS } from '../Constants/Colors';
import { Modal } from 'react-native';

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
  const [thumbnailModal, setThumbnailModal] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(showModal)
  const inputRef = useRef(null);

  interface State {
    categoryName: string;
    resourceLink: string;
    resourceTitle: string;
    resourceThumbnail: object;
    resourceNewTitle: string;
    secretKey: string;
    secretValue: string;
    thumbnailModal: boolean;
    imageSource: any;
  }

  const initialState: State = {
    categoryName: '',
    resourceLink: '',
    resourceTitle: '',
    resourceThumbnail: {},
    resourceNewTitle: '',
    secretKey: '',
    secretValue: '',
    thumbnailModal: false,
    imageSource: IMAGES.thumbnail,
  };

  const [state, setState] = useState<State>(initialState);

  const modalVisibility = () => {
    setVisible(false)
    setState({ ...state, categoryName: '' })
    setState({ ...state, resourceLink: '' })
    setState({ ...state, resourceTitle: '' })
    setState({ ...state, resourceThumbnail: {} })
    setState({ ...state, resourceNewTitle: '' })
    setState({ ...state, secretKey: '' })
    setState({ ...state, secretValue: '' })
    setState({ ...state, imageSource: IMAGES.thumbnail })
    onModalClose(null);
  }

  useEffect(() => {
    setVisible(showModal)
    setState({ ...state, secretKey: '' })
    setState({ ...state, secretValue: '' })

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
            compressImageQuality:0.3,
            compressImageMaxHeight:200,
            compressImageMaxWidth:200,
          });
          setState({ ...state, resourceThumbnail: image, imageSource: { uri: `${image.path}` } })
          setThumbnailModal(false)
        } catch (error) {
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
            compressImage: true,              // Enable image compression
            compressImageQuality:0.3,
            compressImageMaxHeight:200,
            compressImageMaxWidth:200,
          });
          setState({ ...state, resourceThumbnail: image, imageSource: { uri: `${image.path}` } })
          setThumbnailModal(false)
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
    const rawData = { ...state }
    printLog("rawData", rawData)
    const data = Object.fromEntries(
      Object.entries(rawData).filter(([key, value]) => value !== '' && value !== null && value !== undefined)
    );
    onModalClose(data);
    printError(data)
    setVisible(false)
  };
  

  return (

    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      style={{ backgroundColor: '#000' }}>

      <ScrollView style={styles.modalView}>
        <View style={{ alignItems: 'center' }}>

          {/* cross Button  */}
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: '#f76060',
              height: 30,
              width: 30,
              alignSelf: 'flex-end',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => modalVisibility()}
          ><Text style={{ fontWeight: 'bold', color: '#000' }}>X</Text></TouchableOpacity>

          {/* modalText */}
          <Text style={{ marginVertical: 20, fontSize: 20 }}>{modalText} </Text>

          {/* link */}
          {link !== undefined && (
            <View
              style={{
                width: '100%',
                borderWidth: 0,
              }}>
              {state.resourceLink && <Animated.Text
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
                value={state.resourceLink}
                onChangeText={(text) => setState({ ...state, resourceLink: text })}
                autoFocus={true}
                ref={inputRef}
              />
            </View>
          )}

          {/* title */}
          {title !== undefined && (

            <View
              style={{
                width: '100%',
                borderWidth: 0,
              }}
            >
              {state.resourceTitle && <Animated.Text
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
                value={state.resourceTitle}
                onChangeText={(text) => setState({ ...state, resourceTitle: text })}
              />
            </View>


          )}

          {/* category */}
          {category !== undefined && (
            <View
              style={{
                width: '100%',
                borderWidth: 0,
              }}
            >
              {state.categoryName && <Animated.Text
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
                value={state.categoryName}
                onChangeText={(text) => setState({ ...state, categoryName: text })}
              />
            </View>

          )}

          {/* newTitle */}
          {newTitle !== undefined && (
            <View
              style={{
                width: '100%',
                borderWidth: 0,
              }}
            >
              {state.resourceNewTitle && <Animated.Text
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
                value={state.resourceNewTitle}
                onChangeText={(text) => setState({ ...state, resourceNewTitle: text })}
              />
            </View>

          )}

          {/* secretKey */}
          <View
            style={{
              width: '100%',
              borderWidth: 0,
            }}
          >
            {state.secretKey && <Animated.Text
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
              value={state.secretKey}
              onChangeText={(text) => {
                let key = text.replace(/[^a-zA-Z\-]/g, '')
                setState({ ...state, secretKey: key })
              }}
            />
          </View>

          {/* secretValue */}
          <View
            style={{
              width: '100%',
              borderWidth: 0,
            }}
          >
            {state.secretValue && <Animated.Text
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
              value={state.secretValue}
              onChangeText={(text) => {
                let pass = text.replace(/[^a-zA-Z\#\@]/g, '')
                setState({ ...state, secretValue: pass })
              }} />
          </View>

          {/* thumbnail */}
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
                  source={state.imageSource} />

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

          {/* submit */}
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
            <Text onPress={onSubmit} style={[styles.button, { backgroundColor: '#78eb78', }]}>SUBMIT</Text>
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
    fontWeight: 'bold',
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
