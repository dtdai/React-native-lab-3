import { useEffect, useState } from "react"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { IconButton, TextInput } from "react-native-paper"
import { db } from "../context/firebase"
import { collection, onSnapshot } from "firebase/firestore"

const Services = ({ navigation }) => {
  const [services, setServices] = useState([])
  const [servicess, setServicess] = useState([])
  const [name, setName] = useState('')
  const cSERVICES = collection(db, 'SERVICES')

  useEffect(() => {
    onSnapshot(cSERVICES, response => {
      var arr = []
      response.forEach(element => arr.push(element.data()))
      setServices(arr)
      setServicess(arr)
    })
  }, [])

  useEffect(() => {
    setServicess(services.filter(s => s.name.includes(name)));
  }, [name])

  const renderItem = ({ item }) => {
    const { id, name, price } = item
    return (
      <TouchableOpacity style={{ flexDirection: 'row', borderWidth: 1, height: 60, borderRadius: 10, margin: 5, justifyContent: 'space-between', padding: 10 }} onPress={navigation.navigate('ServiceDetail', { id: id })}>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}> {name} </Text>
        <Text style={{ fontSize: 25 }}> {price} VND </Text>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <Image source={require('../../assets/logo.png')}
        style={{ alignSelf: 'center', marginTop: 70, marginBottom: 30 }} />
      <TextInput label={'Search name'} value={name} onChangeText={setName} underlineColor="transparent" underlineStyle={0}
        style={{
          margin: 10,
          backgroundColor: 'none',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderWidth: 1,
          borderColor: 'grey',
        }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}> Danh sách dịch vụ </Text>
        <IconButton icon={'plus-circle'} size={50} iconColor='red' onPress={() => navigation.navigate('AddNewService')} />
      </View>
      <FlatList data={servicess} keyExtractor={item => item.id} renderItem={renderItem} />
    </View>
  )
}

export default Services