
// import React, { ReactElement, useEffect, useRef, useState } from 'react';
// import {
//   View, Text, StyleSheet, useWindowDimensions, Alert, Linking, SafeAreaView,
//   Image,
//   TouchableOpacity,
//   ImageBackground,
//   RefreshControl,
//   Modal,
// } from 'react-native';
// import * as CONSTANTS from '../../Constants/Constants'
// import { IMAGES } from '../../Assets/Images/Images';

// import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
// import Lottie from 'lottie-react-native';
// import AnimatedLottieView from 'lottie-react-native';
// import MyModal from '../../Components/MyModal';
// import { COLORS } from '../../Constants/Colors';
// import { alert, apiCaling, printError, printLog, printSucess, retrieveData } from '../../Assets/Utils/ExtenFunc';
// import { async } from '@firebase/util';
// import { deleteCategories, loadCategories, updateList, uploadCategories } from './CategoriesFunc';
// import { statusCodes } from '@react-native-google-signin/google-signin';
// import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
// import { stat } from 'react-native-fs';


// interface Props {
//   SecretKey?: string,
//   SecretPassword?: string,
// }

// const Categories: React.FC<any | Props> = ({ }) => {

//   interface StateProps {
//     list: Array<any>,
//     filteredList: Array<any>,
//     searchText: boolean,
//     childData: Number | null,
//     loading: boolean
//   }
//   const initialState: StateProps = {
//     list: [],
//     filteredList: [],
//     searchText: false,
//     childData: null,
//     loading: false,
//   }
//   const [state, setState] = useState<StateProps>(initialState)
//   const [showModal, setShowModal] = useState<boolean>(false)
//   const [show, setShow] = useState<boolean>(false)

//   // const [highlight, setHighlight] = useState<number>(-1)
//   const flatListRef = useRef<FlatList>(null);
//   // const [isFourthIndex,setIsFourthIndex]=useState<boolean>(false)

//   const onModalClose = (data: boolean) => {
//     setShowModal(false);
//     if (data) {
//       uploadCategoriesData(data)
//     }

//   };
//   let secretValPromise = ''
//   let secretKeyPromise = ''
//   const [showListHeader, setShowListHeader] = useState(false);
//   const asyncRetrieve = async () => {
//     try {
//       let key = await retrieveData('@secretKey', 'home')
//       secretKeyPromise = key.value
//       let val = await retrieveData('@secretVal', 'Home')
//       secretValPromise = val.value
//     } catch (err) {
//       printError('error in Video List', err)
//     }
//   }

//   const loadCategoriesData = async () => {
//     setState({ ...state, loading: true })

//     try {
//       const res = await loadCategories();
//       // let t = [...res.details.category, {isCheck : false} ]
//       printLog("res"+ JSON.stringify(res))

//       let t = res.details.category.map((item:any, index:number) => {
//         return {
//           ...item,
//           isCheck: false
//         };
//       });
      
//       alert(res.message);
//       if (res.status) {
//         // const arr = res.details.category
//         const arr=t
//         setState({...state, list:arr})
//         printSucess("state",state.list)
//         // const newArr = res.details.category.filter((item: object, index: number) => (
//         //   item.category
//         // ))
//         // const newArr = res.details.category.map((item: string, index: number) => ({ category: item }));

//         // newArr.sort()
//         // printError("arrrrrrray",newArr)
//         // setState((prevState) => {
//         //   const newState = {
//         //     ...prevState,
//         //     list: newArr,
//         //   };
//         //   return newState;
//         // });

//       }
//     } catch (err) {
//       printError('Error in loading', err);
//     }
//     setState((prevState) => {
//       const newState = {
//         ...prevState,
//         loading: false,
//       };
//       return newState;
//     })

//   };

//   const uploadCategoriesData = async (data: object | any) => {
//     try {
//       const res = await uploadCategories(data.categoryName, data.secretKey, data.secretValue);
//       alert(res.message);
//       if (res.status && res.message.includes('successfully')) {
//         loadCategoriesData();
//       }
//       if (res.status && res.message.includes('already present')) {
//         const index = state.list.findIndex((item: any) => {
//           if (item && data.categoryName) {
//             return item.category.toLowerCase() === data.categoryName.toLowerCase();
//           }
//           return false;
//         });
//         printSucess('index', index,)

//         if (index !== -1) {
//           // setHighlight(index);
//           if (flatListRef.current) {
//             // setHighlight(index+1)
//             flatListRef.current.scrollToIndex({ index: index / 2 });
//             // printSucess('highlight', highlight)
//           }
//         }
//       }
//     } catch (err) {
//       printError('Error in loading', err);
//     }
//   };

//   // useEffect(()=>{
//   //     printSucess("highlight...useEffect",highlight)
//   // },[highlight,isFourthIndex])

//   useEffect(() => {
//     loadCategoriesData();
//   }, []);

//   useEffect(() => {
//     asyncRetrieve();
//     if (secretKeyPromise !== undefined && secretValPromise !== undefined) {
//       setShowListHeader(true);
//     } else {
//       setShowListHeader(false);
//     }
//   }, [secretKeyPromise, secretValPromise]);

//   const filterlist = (text: any) => {
//     if (text.length > 2) {
//       setState((prevState) => {
//         const filteredList = prevState.list.filter((item: any) =>
//           item.category.toLowerCase().includes(text.toLowerCase())
//         );
//         return { ...prevState, searchText: true, filteredList: filteredList, };
//       });
//     } else {
//       setState({ ...state, searchText: false })
//       text = null
//     }
//   };

//   // const COLORS = ['#ffe0b2', '#fff9c4', '#e1f5fe', '#f1f8e9', '#fce4ec', '#f3e5f5',"#86b588"];
//   // const COLORS = ['#3f51b5', '#2196f3', '#009688', '#ff5722', '#607d8b', '#f44336'];
//   // const COLORS = ['#c62828', '#6a1b9a', '#0d47a1', '#1b5e20', '#e65100', '#37474f', '#00695c', '#bf360c', '#3e2723', '#4a148c'];
//   const COLORSARRAY = ['#ffcdd2', '#e1bee7', '#bbdefb', '#ffccbc', '#cfd8dc', '#b2dfdb', '#ffab91', '#d7ccc8', '#ce93d8'];

//   const getRandomColor = () => COLORSARRAY[Math.floor(Math.random() * COLORSARRAY.length)];

//   const getRandomAnimation = (): string => {
//     const keysArray = Object.keys(IMAGES.animationArray);
//     const randomIndex = Math.floor(Math.random() * keysArray.length);
//     const randomKey = keysArray[randomIndex];
//     const randomValue = IMAGES.animationArray[randomKey];
//     return (randomValue)
//   }
 
  
//   const CardItem = ({ item, index }: { item: any; index: number }) => {
//       const [show, setShow] = useState(false);
//       const handleLongPress = () => {
//         setShow(true);
//       };
//       const handleContextMenuClose = () => {
//         setShow(false);
//       };
    
//       return (
//         <TouchableOpacity
//           key={index}
//           activeOpacity={0.7}
//           onPress={() => {
//             updateIndex(index, true);
//           }}
//           onLongPress={handleLongPress}
//           style={{
//             height: 150,
//             width: 150,
//             zIndex: index,
//             backgroundColor: getRandomColor(),
//             margin: 15,
//             justifyContent: 'center',
//             alignSelf: 'center',
//             elevation: 8,
//           }}
//         >
//           <Lottie
//             style={{
//               top: 0,
//               alignSelf: 'flex-start',
//               height: '80%',
//             }}
//             source={getRandomAnimation()}
//             autoPlay
//             loop
//           />
//           <Text
//             style={{
//               textAlign: 'center',
//               height: '10%',
//             }}
//           >
//             {item.category.toUpperCase()}
//             {/* {item.categories} */}
//           </Text>
//           {show && (
//             <Animated.View
//               entering={ZoomIn}
//               exiting={ZoomOut}
//               style={{
//                 // height: 80,
//                 width: 140,
//                 position: 'absolute',
//                 backgroundColor: '#fff',
//                 justifyContent: 'space-around',
//                 alignSelf: 'center',
//                 zIndex: index + 10,
//                 // flexDirection:'row',
//                 alignItems: 'center',
//                 elevation: 3,
//                 padding: 10,
//                 borderRadius: 5,
//                 borderWidth: 0.4,
//               }}
//             >
//               <Text  style={{ ...styles.updata_delete, borderColor: 'green' }}>UPDATE</Text>
//               <Text onPress={handleContextMenuClose} style={{ ...styles.updata_delete, borderColor: 'red' }}>
//                 CANCEL
//               </Text>
//             </Animated.View>
//           )}
//         </TouchableOpacity>
//       );
//     };
    
//     let updateIndex =(index: number, value: boolean)=> {
//       setState({ ...state, ...state.list, ...state.list[index], isCheck : value  })
//       printLog("updateIndex "+JSON.stringify(state.list))
 
//     }

//     const renderItem = React.useCallback(({ item, index }: { item: Array<any> | any; index: number }) => {
//       // printError('show', show);
//       return <CardItem item={item} index={index} />;
//     }, []);
    
//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: '#fff',
//         height: '100%',
//       }}>
//       {/* search tab and Title */}
//       <View style={{ backgroundColor: '#edeff2', }}>
//         <View
//           style={{
//             height: 45,
//             width: '90%',
//             borderWidth: 0.5,
//             alignSelf: 'center',
//             margin: 10,
//             // marginBottom: 30,
//             borderColor: COLORS.Blue,
//             flexDirection: 'row',
//             borderRadius: 5,
//             justifyContent: 'center',
//             backgroundColor: '#fff',

//           }}
//         >
//           <Image
//             resizeMode='contain'

//             style={{
//               height: 25,
//               width: '10%',
//               alignSelf: 'center',
//               tintColor: COLORS.Blue,
//               marginStart: 15
//             }}
//             source={IMAGES.search} />
//           <TextInput
//             onChange={({ nativeEvent }) => filterlist(nativeEvent.text)}
//             placeholder='Search...'
//             placeholderTextColor={COLORS.Blue}
//             style={{
//               alignSelf: 'center',
//               width: '85%',
//               height: '90%',
//               margin: 10,
//             }} />
//         </View>
//       </View>
//       {/* Category cards */}
//       <FlatList
//         ref={flatListRef}
//         data={state.searchText ? state.filteredList : state.list}
//         ListEmptyComponent={<Text style={{ textAlign: 'center', }}>No category to show</Text>}
//         ListFooterComponent={<Text style={{ textAlign: 'center', }}>End of list</Text>}
//         numColumns={2}
//         style={{ backgroundColor: '#fff' }}
//         renderItem={renderItem}
//         refreshControl={
//           <RefreshControl
//             refreshing={state.loading}
//             onRefresh={() => loadCategoriesData()}
//             colors={[COLORS.Blue]} // Customize the loading indicator colors
//           />
//         }
//       />
//       {showModal ?
//         <MyModal
//           showModal={showModal}
//           modalText={'Add New Category'}
//           category={'Category Name'}
//           onModalClose={onModalClose}
//         />
//         : null}

//       <Text
//         onPress={() => {
//           setShowModal(true)
//         }}
//         style={{
//           position: 'absolute',
//           bottom: 0,
//           right: 0,
//           height: CONSTANTS.DIMENSIONS.HEIGHT / 1.5,
//           width: CONSTANTS.DIMENSIONS.HEIGHT / 1.5,
//           backgroundColor: COLORS.Button,
//           margin: 15,
//           borderRadius: CONSTANTS.DIMENSIONS.HEIGHT / 2,
//           textAlignVertical: 'center',
//           textAlign: 'center',
//           elevation: 5,
//           color: COLORS.ButtonText,
//           fontWeight: 'bold',
//           fontSize: 30,
//         }}
//       >+</Text>
//     </SafeAreaView>
//   )
// };

// const styles = StyleSheet.create({

//   animatedView:{
//     // height: 80,
//     width: 140,
//     position: 'absolute',
//     backgroundColor: '#fff',
//     justifyContent: 'space-around',
//     alignSelf: 'center',
//     zIndex: 10,
//     // flexDirection:'row',
//     alignItems: 'center',
//     elevation: 3,
//     padding: 10,
//     borderRadius: 5,
//     borderWidth: 0.4,
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: COLORS.Background
//   },

//   buttonIcon: {
//     height: CONSTANTS.DIMENSIONS.HEIGHT / 3,
//     width: CONSTANTS.DIMENSIONS.HEIGHT / 3,
//     alignSelf: 'center',
//     // left: 5,

//   },
//   card: {
//     height: CONSTANTS.DIMENSIONS.HEIGHT * 1.5,
//     width: CONSTANTS.DIMENSIONS.WIDTH * 3.8,
//     // borderRadius: 10,
//     alignItems: 'center',
//     // padding: 5,
//     opacity: 1,
//     justifyContent: 'center',
//     elevation: 5,

//   },
//   cardtext: {
//     fontSize: 18,
//     textAlign: 'center',
//     color: '#fff'
//   },
//   footer: {
//     textAlign: 'center',
//     alignSelf: 'center',
//   },
//   header: {
//     alignSelf: 'center',
//   },
//   updata_delete: {
//     borderWidth: 0.3,
//     borderColor: '#000',
//     width: '95%',
//     height: '40%',
//     textAlignVertical: 'center',
//     textAlign: 'center',
//     margin: 10,
//     borderRadius: 10,
//   }
// })

// export default Categories;


// {/* <AnimatedLottieView
//                     // sourceJson={require('../../../Assets/Images/bouncing-ball.json')}
//                     sourceJson={require('../../../Assets/Images/bouncing-ball.json')}
//                     style={{ width: '60%', height: '60%',zIndex:5 }}
//                     aspectRatio={1}
//                     autoPlay
//                     loop
//                 /> */}


        {/* <Modal
          animationType="slide"
          transparent={true}
          //  visible={visible}
          style={{
            justifyContent: 'center',
            flex: 1,
          }}>
            <View
              style={{
                height: 100,
                width: 200,
                backgroundColor: '#fff',
                borderColor: COLORS.Blue,
                borderWidth: 0.5,
                padding: 10,
                alignSelf:'center',

              }}
            >
            </View>
        </Modal> */}
