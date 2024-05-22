import { createStackNavigator } from '@react-navigation/stack'
import Admin from '../screens/Admin'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Customer from '../screens/Customer'

const Stack = createStackNavigator()
const Router = () => {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='Admin' component={Admin} />
      <Stack.Screen name='Customer' component={Customer} />
    </Stack.Navigator>
  )
}

export default Router