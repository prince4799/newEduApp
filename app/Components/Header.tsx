{/* */}
      import * as React from 'react';
      import { Text } from 'react-native';
      
      function Header({ ...props }): JSX.Element {
        return(
            <Text
            onPress={() => props.navigation.goBack()}
            style={{
              textAlign: 'center',
              paddingLeft: 10,
              marginLeft: 10, textAlignVertical: 'center',
              transform: [{ scaleX: -1 }],
              fontSize: 24, color: "#000"
            }}>➦</Text>
        )
      }

      export default Header;