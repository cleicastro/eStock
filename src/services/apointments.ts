import apiConfig from './api'
import AsyncStorage from '@react-native-community/async-storage'

interface Token {
  username: string
  token: string
  matricula: string
  code: string
  time: string
}

interface Item {
  id: number
  codigo: number
  descricao: string
  unidade: string
}

interface Apointments {
  id_produto: number
  matricula: string
  lote: string
  corredor: string
  prateleira: string
  obs: string
  vencimento: Date
  volume: number
  quantidade: number
}

const apointments = {
  insertApointments: async (data: Array<Apointments>) => {
    const user: any = await AsyncStorage.getItem('token')
    const parseToken: Token = JSON.parse(user)
    return await apiConfig.post('estoque', data, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': parseToken.token
      }
    })
  }
}

export default apointments
