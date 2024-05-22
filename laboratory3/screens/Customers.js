import { collection, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import { db } from "../context/firebase"
import { Text } from "react-native-paper"

const Customers = () => {
  const [customer, setCustomer] = useState([])

  useEffect(() => {
    onSnapshot(collection(db, 'USERS'), response => {
      var arr = []
      response.forEach(element => arr.push(element.data()))
      setCustomer(arr)
    })
  }, [])

  const renderItem = (item) => {
    const { id, name, email, role } = item
    return (
      <View style={{ flexDirection: 'row', borderWidth: 1, height: 100, borderRadius: 10, margin: 5, justifyContent: 'space-between', padding: 10 }} onPress={navigation.navigate('ServiceDetail', { id: id })}>
        <Text style={{ fontSize: 25 }}> {name} </Text>
        <Text style={{ fontSize: 25 }}> {email} </Text>
        <Text style={{ fontSize: 25 }}> {role} </Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList data={customer} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  )
}

export default Customers