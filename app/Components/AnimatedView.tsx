import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native';
import { DIMENSIONS, NET_STATUS } from '../Constants/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';
interface Props {
    netStatus: boolean;
}
const AnimatedView: React.FC<Props> = ({ netStatus, }) => {
    const isFocused = useIsFocused();
    const translateY = useSharedValue(-DIMENSIONS.HEIGHT*6);
    const slideIn = () => {
        translateY.value = withTiming(-DIMENSIONS.HEIGHT*4.8, { duration: 2000 });
    };
    const slideOut = () => {
        translateY.value = withTiming(-DIMENSIONS.HEIGHT*6, { duration: 2000 }, () => {
        });
    };
        //   console.log("");
          const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    const modalVisibility = () => {
        if ( netStatus ==false) {
            // console.log("modav1")
            slideIn();
        }
        if (netStatus==true) {
            // console.log("modav2")
            slideOut()
        }
    }

    useEffect(() => {
        console.log("modav", netStatus)
        modalVisibility()
    }, [netStatus])

    return (
                <Animated.View style={[styles.view, animatedStyle]}>
                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: '300' }}>
                        No Internet Connection.
                    </Text>
                </Animated.View>
    );
};


const styles = StyleSheet.create({
    view: {
        width: '100%',
        // heights:200,
        height: DIMENSIONS.HEIGHT / 1.8,
        backgroundColor: '#000',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute',
        top:130,
        zIndex:9,
        flex:1
    }
});

export default AnimatedView;


/*
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

const AnimatedHeader = () => {
  const [animation] = useState(new Animated.Value(0));
  const [isConnected, setIsConnected] = useState<boolean| null>(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const toggleHeader = () => {
      Animated.timing(animation, {
        toValue: isConnected ? 0 : 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    };
    toggleHeader();
  }, [isConnected]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <Animated.View style={[styles.container, {transform: [{translateY}]}]}>
      <Text style={styles.title}>My Animated Header</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AnimatedHeader;
*/