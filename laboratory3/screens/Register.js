import { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Button, HelperText, Text, TextInput } from 'react-native-paper'
import { createAccount } from '../routers/firestore'

const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [errorfullName, seterFullName] = useState('')
  const [erroremail, seterEmail] = useState('')
  const [errorpassword, seterPassword] = useState('')
  const [errorconfirmpassword, seterConfirmPassword] = useState('')

  const handleCreateAccount = () => {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!email.match(regEmail)) {
      seterEmail('Invalid Email Address!')
    } else if (fullName === '') {
      seterFullName('FullName cannot be empty!')
    } else if (password.length < 6) {
      seterPassword('Password has at least 6 characters!')
    } else if (confirmpassword !== password) {
      seterConfirmPassword('Password does not match!')
    } else createAccount(email, password, fullName)
  }

  return (
    <View style={{ ...styles.container }}>
      <View style={{ alignItems: 'center' }}>
        <Image
          style={{ margin: 25, width: 100, height: 100 }}
          source={{ uri: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/firebase_logo_icon_171157.png' }}
          resizeMode='cover'
        />
      </View>
      <TextInput style={{ ...styles.textInput }} placeholder='Full Name' value={fullName} onChangeText={setFullName} />
      {errorfullName && <HelperText type='error'>{errorfullName}</HelperText>}
      <TextInput style={{ ...styles.textInput }} placeholder='Email' value={email} onChangeText={setEmail} />
      {erroremail && <HelperText type='error'>{erroremail}</HelperText>}
      <TextInput style={{ ...styles.textInput }} placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry />
      {errorpassword && <HelperText type='error'>{errorpassword}</HelperText>}
      <TextInput style={{ ...styles.textInput }} placeholder='Confirm Password' value={confirmpassword} onChangeText={setConfirmPassword} secureTextEntry />
      {errorconfirmpassword && <HelperText type='error'>{errorconfirmpassword}</HelperText>}
      <Button mode='contained' buttonColor='blue' onPress={handleCreateAccount}> Sign up </Button>
      <View style={{ alignItems: 'center' }}>
        <Text>Already got an account?<Button onPress={() => navigation.goBack()}> Log in </Button> </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    marginBottom: 15,
  },
  button: {
    width: 200
  },
})

export default Register