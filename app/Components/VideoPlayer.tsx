import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video';


export const Player = ({ sourceUri = 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' }) => {
  const [fullscreen, setFullscreen] = useState(true);

  return (
    <SafeAreaView style={{
      flex: 1,
       backgroundColor: 'green',
      
    }}>

      <Video
        source={{ uri: sourceUri }}
        resizeMode='contain'
        style={{
          top:10,
          width: '100%' ,
          height: '100%' ,
          alignSelf:'center',
          transform: [{ rotate: '90deg' }],
          // right:170,
          // backgroundColor: 'red'
        }}
        onFullscreenPlayerWillPresent={() => setFullscreen(true)}
        onFullscreenPlayerWillDismiss={() => setFullscreen(false)}
      />
    </SafeAreaView>
  );
};
