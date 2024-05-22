import { ScrollView, TouchableOpacity, View } from "react-native"
import { Text } from "react-native-paper"

const Setting = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {/* <Text> Setting Screen </Text> */}
        <View>
          {/* Profile */}
        </View>
        <TouchableOpacity><Text> Update Profile </Text></TouchableOpacity>
        <TouchableOpacity><Text> Change Password </Text></TouchableOpacity>
        <TouchableOpacity><Text> Log Out </Text></TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default Setting