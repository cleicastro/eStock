import apiConfig from './api'
import AsyncStorage from '@react-native-community/async-storage'

interface Token {
  username: string
  token: string
  matricula: string
  code: string
  time: string
}

const item = {
  getitems: async () => {
    const user: any = await AsyncStorage.getItem('token')
    const parseToken: Token = JSON.parse(user)
    return apiConfig.get('produtos', {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': parseToken.token
      }
    })
  }
}

export default item
