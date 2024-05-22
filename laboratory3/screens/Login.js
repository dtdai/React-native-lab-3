import { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Button, HelperText, Text, TextInput } from 'react-native-paper'
import { login, useMyContextProvider } from '../routers/firestore'

const Login = ({ navigation }) => {
  const [controller, dispatch] = useMyContextProvider()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPass, setErrorPass] = useState('')
  const { userLogin } = controller

  useEffect(() => {
    if (userLogin != null) {
      navigation.navigate('Home')
    }
  }, [navigation, userLogin])

  const handleLogin = () => {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!email.match(regEmail)) {
      setErrorEmail('Invalid Email Address!')
    } else if (password.length < 6) {
      setErrorPass('Password has at least 6 characters!')
    } else login(dispatch, email, password)
    login(dispatch, email, password)
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
      <TextInput style={{ ...styles.textInput }} placeholder='Email' value={email} onChangeText={setEmail} />
      {errorEmail && <HelperText type='error'>{errorEmail}</HelperText>}
      <TextInput style={{ ...styles.textInput }} placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry />
      {errorPass && <HelperText type='error'>{errorPass}</HelperText>}
      <Button mode='contained' buttonColor='blue' onPress={handleLogin}> Log in </Button>
      <View style={{ alignItems: 'center' }}>
        <Text>Don't have an account?<Button onPress={() => navigation.navigate('Register')}> Sign up </Button> </Text>
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

export default Login