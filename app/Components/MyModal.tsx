import React, { useEffect, useReducer, useRef, useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { DIMENSIONS } from '../Constants/Constants';

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
// interface TextProps {
//   isShow: boolean,
//   text: string
// }

// const AnimatableText: React.FC<TextProps> = ({text, isShow}) => {

//   <View style={{backgroundColor:'red',width:80,height:30}}>
//     <Text>{text}</Text>
//   </View>

// }

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
  const [resourceThumbnail, setResourceThumbnail] = useState<string | undefined>('');
  const [resourceNewTitle, setResourceNewTitle] = useState<string | undefined>('')
  const [secretKey, setSecretKey] = useState<string>('')
  const [secretValue, setSecretValue] = useState<string>('')
  const inputRef = useRef(null);

  const modalVisibility = () => {
    setModalVisible(false)
  }

  useEffect(() => {
    setModalVisible(showModal);
    setSecretKey('')
    setSecretValue('')
  }, [showModal]);
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
    console.log("modal", data)
    // Call the onModalClose function with the extracted data
    onModalClose(data);
    setModalVisible(false);
  };
  return (

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      style={{ top: 40, backgroundColor: '#000' }}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(false);
      }}
    >
      <View style={styles.modalView}>
        <Text style={{ marginVertical: 20, fontSize: 20 }}>{modalText} </Text>


        {link !== undefined && (
          <TextInput
            style={styles.input}
            placeholder={link}
            value={resourceLink}
            onChangeText={setResourceLink}
            autoFocus={true}
            ref={inputRef}
          />
        )}
        {thumbnail !== undefined && (
          <TextInput
            style={styles.input}
            placeholder={thumbnail}
            value={resourceThumbnail}
            onChangeText={setResourceThumbnail}
          />
        )}
        {title !== undefined && (
          <TextInput
            style={styles.input}
            placeholder={title}
            value={resourceTitle}
            onChangeText={setResourceTitle}
          />
        )}
        {category !== undefined && (
          <TextInput
            style={styles.input}
            placeholder={category}
            value={categoryName}
            onChangeText={setCategoryName}
          />
        )}
        {thumbnail !== undefined && (
          <TextInput
            style={styles.input}
            placeholder={thumbnail}
            value={resourceThumbnail}
            onChangeText={setResourceThumbnail}
          />
        )}
        {newTitle !== undefined && (
          <TextInput
            style={styles.input}
            placeholder={newTitle}
            value={resourceNewTitle}
            onChangeText={setResourceNewTitle}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder={'Secret Id'}
          value={secretKey}
          onChangeText={(text) => setSecretKey(text)} />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder={'Secret Password'}
          value={secretValue}
          onChangeText={(text) => setSecretValue(text)} />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          // backgroundColor: 'red',
          width: '90%',
          height: 40,
          alignItems: 'center',
          margin: 20,
        }}>
          <Text onPress={() => modalVisibility()} style={{ ...styles.button, backgroundColor: '#f76060', }}>CANCEL</Text>
          <Text onPress={onSubmit} style={{ ...styles.button, backgroundColor: '#78eb78', }}>SUBMIT</Text>
        </View>
      </View>
    </Modal>

  );
};

const styles = StyleSheet.create({

  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    // padding: 35,
    alignItems: 'center',
    shadowColor: '#bbdefb',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    top: '10%'
  },
  button: {
    borderRadius: 20,
    elevation: 5,
    height: 30,
    width: 100,
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',

  },
  input: {
    borderColor: '#86b588',
    borderWidth: 1,
    height: 40,
    width: '90%',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    elevation: 1,
  }
});

export default MyModal;
