{/* */ }
import * as React from 'react';
import { Text, View } from 'react-native';
import Animated, { RotateInDownLeft } from 'react-native-reanimated';
import { COLORS } from '../Constants/Colors';

function Header({ ...props }): JSX.Element {
  return (
   <Text
        onPress={() => props.navigation.goBack()}
        style={{
          textAlign: 'center',
          paddingLeft: 10,
          marginLeft: 10, textAlignVertical: 'center',
          transform: [{ scaleX: -1 }],
          fontSize: 24, color: COLORS.ButtonText
        }}>➦</Text>
  )
}

export default Header;