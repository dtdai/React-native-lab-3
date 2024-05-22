import { NavigationContainer } from '@react-navigation/native'
import { MyContextControllerProvider } from './context'
import Admin from './screens/Admin'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PaperProvider } from 'react-native-paper'

export default function Lab3() {
  return (
    <SafeAreaProvider>
      <MyContextControllerProvider>
        <PaperProvider>
          <NavigationContainer>
            <Admin />
          </NavigationContainer>
        </PaperProvider>
      </MyContextControllerProvider>
    </SafeAreaProvider>
  )
}