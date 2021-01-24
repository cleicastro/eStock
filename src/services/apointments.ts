/* eslint-disable @typescript-eslint/camelcase */
import apiConfig from './api'
import AsyncStorage from '@react-native-community/async-storage'

interface Token {
  name: string
  token: string
  matricula: string
  code: string
  email: string
}

interface Item {
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

export interface Produto {
  descricao: string
  quantidade: number
}

export interface ApointmentPF {
  id_produto: number
  matricula: string
  lote: number
  produtos: Array<Produto>
  vencimento: string
  created_at: Date
}

const apointments = {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  insertApointments: async (data: Array<Apointments>) => {
    const user: any = await AsyncStorage.getItem('token')
    const parseToken: Token = JSON.parse(user)
    return await apiConfig.post('estoque', data, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': parseToken.token
      }
    })
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  insertApointmentsPF: async (data: Array<ApointmentPF>) => {
    return await apiConfig.post(
      'produto-acabado',
      { ...data },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}

export default apointments
