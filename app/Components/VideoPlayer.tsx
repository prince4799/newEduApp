// import React, { useEffect, useState } from 'react';
// import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
// import Video from 'react-native-video';
// import Orientation from 'react-native-orientation-locker';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { DIMENSIONS } from '../Constants/Constants';

// // https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4
// // https://gdurl.com/fbNw ====gd url
// export const Player = ({ sourceUri = 'https://gdurl.com/jBxR' }) => {
//   const [fullscreen, setFullscreen] = useState(false);
//   const [showControls, setShowControls] = useState(true);
//   const [resizeModeValue, setResizeModeValue] = useState<string>('constain');
//   const [loading, setLoading] = useState(true);

//   useEffect(
//     React.useCallback(() => {
//       // Change orientation to landscape
//       Orientation.lockToLandscape();

//       // Cleanup function to reset orientation when the screen is unfocused
//       return () => {
//         Orientation.unlockAllOrientations();
//       };
//     }, [])
//   );

//   // Function to show the controls and start the timer to hide them
//   const handleTap = () => {
//     setShowControls(true);
//     setTimeout(() => setShowControls(false), 3010);
//   };

//   return (
//     // <SafeAreaView
//     // style={{ flex: 1}}>
//     <TouchableOpacity
//       style={{
//         flex: 1,
//         backgroundColor: '#000'
//       }}
//       activeOpacity={1}
//       onPress={handleTap}
//     >
//       <Video
//         source={{ uri: sourceUri }}
//         style={{
//           width: '100%',
//           height: '100%',
//         }}
//         fullscreenOrientation={'landscape'}
//         fullscreen={fullscreen}
//         fullscreenAutorotate={true}
//         onFullscreenPlayerWillPresent={() => setFullscreen(true)}
//         onFullscreenPlayerWillDismiss={() => setFullscreen(false)}
//         resizeMode={resizeModeValue}
//         preferredForwardBufferDuration={5}
//         // scaleX={0.8}
//         // scaleY={0.8}
//         onLoad={() => setLoading(false)} // Set loading to false when video is loaded
//         onError={() => setLoading(false)} // Set loading to false when video fails to load
//         controls={true} // Hide default controls
//       />
//       {showControls && (
//         <View
//           style={{
//             height: '15%',
//             width: '100%',
//             backgroundColor: 'rgba(0, 0, 0,0.4)',
//             position: 'absolute',
//             alignSelf: 'center',
//             justifyContent: 'space-between',
//             flexDirection: 'row',
//             alignItems: 'center',
//             right: 0,
//           }}
//         >
//           {/*"crop","crop-16-9","crop-3-2",
// "crop-5-4","crop-7-5","crop-din",
// "crop-free","crop-landscape",
// "crop-original","crop-portrait",
// "crop-rotate","crop-square", */}
//           <Icon
//             name="arrow-back" size={30}
//             color="#fff"
//           />
//           <Text style={{ color: '#fff' }}>qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq</Text>
//           <Icon
//             name={resizeModeValue == 'cover' ? "crop-square" : "crop-landscape"} size={30}
//             color="#fff"
//             onPress={() => {
//               resizeModeValue == 'cover' ? setResizeModeValue('contain') : setResizeModeValue('cover')
//               console.log(">>>", resizeModeValue)
//             }}
//           />

//         </View>
//       )}
//       {loading && (
//           <ActivityIndicator style={{alignSelf:'center',position:'absolute',top:DIMENSIONS.WIDTH*5-40}} size={40} color="#ffffff" />
//       )}

//     </TouchableOpacity>
//   );
// };

import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import Orientation from 'react-native-orientation-locker';
export const Player = () => {



  const injectedJavaScript = `
  console.log("WebView URL:");
  const downloadForm = document.getElementById("download-form");
  if (downloadForm) {
    downloadForm.submit();
  } 
  if (typeof window !== "undefined") {
    const tempEl = document.createElement('div');
    tempEl.innerHTML = document.documentElement.innerHTML;
    const webViewDocument = document.querySelector("body");
    const webViewDocumentHTML = webViewDocument.outerHTML;
    let webViewTitle = document.title;
    const webViewUrl = window.location.href;
    const divElement = webViewDocument.querySelector('.ndfHFb-c4YZDc-Wrql6b');
    if (divElement) {
      divElement.remove();
      window.ReactNativeWebView.postMessage(divElement);
      divElement.style.display = 'none';
    }

    const imgElement = webViewDocument.querySelector('.ndfHFb-c4YZDc-aTv5jf-bVEB4e-RJLb9c');
    if (imgElement) {
      // Do something with the img element
      imgElement.submit();
    }
     
    const handleClick = (event) => {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'click', target: event.target.outerHTML }));
    };
  
    // Add the click event listener to the document
    // document.addEventListener('click', handleClick);
  
    // if(webViewDocumentHTML){
    //   window.ReactNativeWebView.postMessage(webViewDocumentHTML);
    // }
   
  }
`;

useEffect(() => {
  Orientation.addOrientationListener(handleOrientationChange);

  return () => {
    Orientation.removeOrientationListener(handleOrientationChange);
  };
}, []);

const handleOrientationChange = (orientation: any) => {
  // Do something based on the orientation
};



  const [videoSource, setVideoSource] = useState('');
  const [webViewRef, setWebViewRef] = useState(null);


  const handleMessage = (event: any) => {
    console.log("Received message:", event.nativeEvent.data);

  };




  return (
    
    <WebView
      source={{ uri: 'https://drive.google.com/file/d/1ZQxJK-7wZLIDm-SE8o1gtiQqcZBMsaRK/view?usp=share_link' }}
      style={{ width: '100%', height: '100%' }}
      javaScriptEnabled={true}
      allowsFullscreenVideo={true}
      injectedJavaScript={injectedJavaScript}
      onMessage={handleMessage}
    />
  );
};

