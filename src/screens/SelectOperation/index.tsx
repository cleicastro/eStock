import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {
  Container,
  Title,
  ButtonContainer,
  ButtonOperation,
  Wrapper
} from './styles'

interface User {
  name: string
  token: string
  matricula: string
  code: string
  email: string
}

const SelectOperation: React.FC = () => {
  const navigation = useNavigation()
  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    const getNameUser = async (): Promise<void> => {
      const userStorage: any = await AsyncStorage.getItem('token')
      const parseUser: User = JSON.parse(userStorage)
      setUserName(parseUser.name)
    }
    getNameUser()
  }, [])

  const NavigateToStock = (): void => {
    navigation.navigate('MainTabStock')
  }
  const NavigateToProductFinished = (): void => {
    navigation.navigate('MainTabProductFinished')
  }

  return (
    <Container>
      <Title>{`Bem vindo, ${userName}!`}</Title>
      <Wrapper>
        <ButtonContainer>
          <ButtonOperation onPress={NavigateToStock}>
            <Icon name="pending-actions" size={48} color="#f00" />
            <Text>Estoque</Text>
          </ButtonOperation>
          <ButtonOperation onPress={NavigateToProductFinished}>
            <Icon name="add-shopping-cart" size={48} color="#f00" />
            <Text>Produto Acabado</Text>
          </ButtonOperation>
        </ButtonContainer>
      </Wrapper>
    </Container>
  )
}

export default SelectOperation
