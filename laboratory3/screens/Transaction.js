import { useEffect, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import { useMyContextProvider } from "../context"
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore"
import { db } from "../context/firebase"

const Transaction = () => {
  const [controller, dispatch] = useMyContextProvider()
  const [appointments, setAppointments] = useState([])
  const { userLogin } = controller

  useEffect(() => {
    const listAppointment = onSnapshot(collection(db, 'APPOINTMENTS'), (docs) => {
      var arr = []
      docs.forEach(async doc => {
        const appointmentData = doc.data()
        const serviceDoc = await doc(db, 'SERVICES', appointmentData.id)

        if (serviceDoc.exists) {
          const serviceData = serviceDoc.data()
          const appointmentWithServiceName = { ...appointmentData, service: serviceData.name }
          arr.push(appointmentWithServiceName)
          setAppointments(arr)
        }
      })
    })
    return () => listAppointment()
  }, [userLogin])

  const handleAccept = async (id, complete) => {
    await updateDoc(doc(db, 'APPOINTMENTS', id), { complete: !complete })
  }

  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={{ ...styles.borderFlatlst, flexDirection: 'row' }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'column',
              padding: 5,
              marginLeft: 5,
              marginRight: 5,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                User name:{' '}
              </Text>
              <Text style={{ fontSize: 18 }}>{item.customerId}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                Service name:{' '}
              </Text>
              <Text style={{ fontSize: 18 }}>{item.service}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Date: </Text>
              <Text style={{ fontSize: 18 }}>
                {item.datetime.toDate().toLocaleString()}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              left: 40,
            }}>
            <IconButton
              icon={
                item.complete ? 'check-circle' : 'checkbox-blank-circle-outline'
              }
              color={item.complete ? 'green' : 'gray'}
              onPress={() => handleAccept(item.id)}
            />
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={{ margin: 10 }}>
      <Text variant="headlineSmall" style={{ color: '#000', fontWeight: 'bold' }}>
        Danh sách dịch vụ đăng kí
      </Text>
      <FlatList
        data={appointments}
        // keyExtractor={(item, index) => index.toString()}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  borderFlatlst: {
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 10,
    margin: 10,
    borderRadius: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
})

export default Transaction