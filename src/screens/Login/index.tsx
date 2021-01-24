import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import StockIcon from '../../assets/stock.svg'
import {
  Container,
  LoadingIcon,
  InputArea,
  SignInput,
  Input,
  CustomButtom,
  CustomButtomText,
  SignQrCode
} from './styles'
import login from '../../services/login'

Icon.loadFont()

const Login: React.FC = () => {
  const navigation = useNavigation()
  const [load, setLoad] = useState<boolean>(true)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    const checkToken = async (): Promise<void> => {
      const token = await AsyncStorage.getItem('token')
      if (token) {
        navigation.reset({
          routes: [{ name: 'SelectOperation' }]
        })
      }
      setLoad(false)
    }
    checkToken()
  }, [])

  const handleSignClick = async (): Promise<void> => {
    setLoad(true)
    if (email !== '' && password !== '') {
      const response: any = await login.logar({ email, password })
      if (response.status === 200) {
        await AsyncStorage.setItem('token', JSON.stringify(response.data))
        navigation.reset({
          routes: [{ name: 'SelectOperation' }]
        })
      } else {
        Alert.alert('Login', 'Verifique o email ou senha digitado')
      }
      setLoad(false)
    } else {
      Alert.alert('Login', 'Verifique o email ou senha digitado')
      setLoad(false)
    }
  }

  const handleSignQrCodeClick = (): void => {
    navigation.navigate('ReadQrCode')
  }

  return (
    <Container>
      <StockIcon width="100%" height="190" />
      {load ? (
        <LoadingIcon size="large" color="#fff" />
      ) : (
        <InputArea>
          <SignInput>
            <Icon name="email" size={26} color="#268596" />
            <Input
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={(text): void => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="email"
            />
          </SignInput>
          <SignInput>
            <Icon name="lock" size={26} color="#268596" />
            <Input
              placeholder="Digite sua senha"
              value={password}
              onChangeText={(text): void => setPassword(text)}
              secureTextEntry
            />
          </SignInput>

          <CustomButtom onPress={handleSignClick}>
            <CustomButtomText>LOGIN</CustomButtomText>
          </CustomButtom>
        </InputArea>
      )}

      <SignQrCode onPress={handleSignQrCodeClick}>
        <Icon name="qr-code-2" size={64} color="#268596" />
      </SignQrCode>
    </Container>
  )
}

export default Login
