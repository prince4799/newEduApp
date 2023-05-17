import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  useSharedValue,
} from 'react-native-reanimated';

const AdminManageUsersHeader = ({ scrollY }: { scrollY: any }) => {
  const headerHeight = 100; // Adjust the header height according to your design
  const maxScroll = 200; // Adjust the maximum scroll distance before the header is fully hidden

  const animatedStyle = useAnimatedStyle(() => {
    const translateYValue = interpolate(
      scrollY.value,
      [0, maxScroll],
      [0, -headerHeight],
      'clamp'
    );

    return {
      transform: [{ translateY: translateYValue }],
    };
  });

  return (
    <Animated.View style={[styles.headerContainer, animatedStyle]}>
      {/* Add your header content here */}
      <Text style={styles.headerTitle}>Admin Manage Users</Text>
    </Animated.View>
  );
};

const AnimatedHeader = () => {
  const scrollY = useSharedValue(0); // Shared value to keep track of scroll position

  const scrollHandler = useAnimatedScrollHandler((event: any) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <ScrollView onScroll={scrollHandler} scrollEventThrottle={16}>
      <AdminManageUsersHeader scrollY={scrollY} />
      {/* Add your content here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    headerContainer: {
      height: 100, // Adjust the header height according to your design
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ebf0f0',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default AnimatedHeader;
