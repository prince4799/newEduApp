import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../Screens/Home/Home';
import Profile from '../../Screens/Profile/Profie';

const Stack = createStackNavigator();

export default function AdminStack():JSX.Element{
    return(<Stack.Navigator>
        <Stack.Group
          screenOptions={{ headerStyle: { backgroundColor: 'papayawhip' } }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="Search" component={Search } />
          <Stack.Screen name="Share" component={ShareScreen} />
        </Stack.Group>
      </Stack.Navigator>
      )
}