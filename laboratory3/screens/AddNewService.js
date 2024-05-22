import { useState } from "react"
import { Image, View } from "react-native"
import { Button, HelperText, TextInput } from "react-native-paper"
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from "../context/firebase"
import * as ImagePicker from "expo-image-picker"
import { useMyContextProvider } from "../context"

const AddNewService = ({ navigation }) => {
  const [controller, dispatch] = useMyContextProvider()
  const { userLogin } = controller
  const [serviceName, setServiceName] = useState('')
  const [price, setPrice] = useState('')
  const [imagePath, setImagePath] = useState('')
  const hasErrorServiceName = () => serviceName == ''
  const hasErrorPrice = () => price <= 0
  const SERVICES = collection(db, 'SERVICES')

  const handleAddNewService = async () => {
    const data = {
      name: serviceName,
      price: price,
      creator: userLogin.email,
      time: new Date().toUTCString(),
      utime: new Date().toUTCString()
    }

    const blob = await fetch(imagePath).then(r => r.blob())
    await addDoc(SERVICES, data)
      .then(response => {
        updateDoc(doc(db, 'SERVICES', response.id), { id: response.id })

        const metadata = { contentType: 'image/jpeg' }
        const storageRef = ref(storage, `services/${Date.now()}.jpg`)
        const uploadTask = uploadBytesResumable(storageRef, blob, metadata)

        uploadTask.on('state_changed', () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateDoc(doc(db, 'SERVICES', response.id), { image: downloadURL })
          })
        })
      })
      .catch(e => console.log(e))
  }

  const handleUploadImage = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!image.canceled) {
      setImagePath(image.assets[0].uri)
    }
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button onPress={handleUploadImage}> Upload Image </Button>
      <Image source={{ uri: imagePath }} style={{ height: 300, borderWidth: 1 , resizeMode:'stretch' }} />
      <TextInput style={{ marginTop: 50 }} label={'Input Service Name'} value={serviceName} onChangeText={setServiceName} />
      <HelperText type='error' visible={hasErrorServiceName()}>{'Service Name Error!'}</HelperText>
      <TextInput label={'Input Price'} value={price} onChangeText={setPrice} />
      <HelperText type='error' visible={hasErrorPrice()}>{'Price Error!'}</HelperText>
      <Button mode='contained' buttonColor='pink' onPress={handleAddNewService}> Add new Service </Button>
    </View>
  )
}

export default AddNewService