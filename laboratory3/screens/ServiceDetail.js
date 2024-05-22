import { useEffect, useState } from "react"
import { Image, View, StyleSheet } from "react-native"
import { Button, Text } from "react-native-paper"
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { } from 'firebase/storage'
import { db } from "../context/firebase"
import { useMyContextProvider } from "../context"
import { useRoute } from "@react-navigation/native"
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'

const ServiceDetail = ({ navigation }) => {
  const [controller, dispatch] = useMyContextProvider()
  const { userLogin } = controller
  const route = useRoute()
  const { id } = route.params
  const [service, setService] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [datetime, setDatetime] = useState(new Date())
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate('Signin');
    } else {
      setIsAdmin(userLogin.role == 'Admin')
    }

    const confirmDelete = () => {
      Alert.alert(
        'Xác nhận xóa',
        'Bạn có chắn chắn muốn xóa không!',
        [
          {
            text: 'CANCEL',
            onPress: () => console.log('Hủy xóa'),
            style: 'cancel',
          },
          {
            text: 'DELETE',
            onPress: handleDelete,
          },
        ],
        { cancelable: false },
      )
    }

    {
      isAdmin && navigation.setOptions({
        headerRight: () => (
          <IconButton icon={'delete'} onPress={confirmDelete} iconColor={'#fff'} />
        ),
      })
    }

    const getDetailService = onSnapshot(doc(db, 'SERVICES', id), (doc) => {
      if (doc.exists()) {
        setService(doc.data)
      } else {
        setService(null)
      }
      return () => getDetailService()
    })
  }, [id, userLogin, isAdmin])


  const handleDelete = async (id) => {
    await deleteDoc(db, 'SERVICES', id)
      .then(() => {
        alert('Delete susscess')
        navigation.goBack()
      })
      .catch(e => console.log(e.message))
  }

  const handleAddNewAppointment = async () => {
    const data = {
      customerId: userLogin.name,
      serviceId: id,
      time: new Date().toUTCString(),
      state: 'new',
      complete: false,
      email: userLogin.email
    }
    await addDoc(collection(db, 'APPOINTMENTS'), data).then(response => {
      updateDoc(doc(db, 'APPOINTMENTS', response.id), { id: response.id })
    })
      .catch(e => console.log(e.message))
  }

  const handleButtonPress = () => {
    if (isAdmin) {
      navigation.navigate('UpdateService', { id: service.id })
    } else {
      handleAddNewAppointment()
    }
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {service ? (
        <>
          <View style={{ marginBottom: 10 }}>
            {service.image && (
              <Image source={{ uri: service.image }} style={{ height: 300 }} />
            )}
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Text style={styles.txtName}>Service name: </Text>
            <Text style={styles.txtTitle}>{service.name}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Text style={styles.txtName}>Price: </Text>
            <Text style={styles.txtTitle}>{service.price}</Text>
          </View>
          {isAdmin && (
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={styles.txtName}>Create by: </Text>
              <Text style={styles.txtTitle}>{service.creator}</Text>
            </View>
          )}
          {isAdmin === false && (
            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Text>
                  Choose date time:{' '}
                  {datetime.toLocaleDateString() +
                    ' ' +
                    datetime.toLocaleTimeString()}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {/* DatePicker */}
          <Button mode="contained" onPress={handleButtonPress} style={{
            borderRadius: 5,
            backgroundColor: '#ff1493',
            marginTop: 10,
          }}> {isAdmin ? 'Update' : 'Payment'} </Button>
        </>
      ) : (
        <Text style={styles.txtTitle}> Service not found or deleted </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  txtName: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  txtTitle: {
    fontSize: 18,
  },
})

export default ServiceDetail