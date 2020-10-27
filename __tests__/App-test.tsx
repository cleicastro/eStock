/* eslint-disable @typescript-eslint/camelcase */
import 'react-native'
import apiApointments from '../src/services/apointments'

const data = [
  {
    item: {
      id: 1,
      codigo: 4,
      unidade: 'unidade',
      descricao: 'item'
    },
    matricula: '1120237',
    lote: '2',
    corredor: '1',
    prateleira: '5',
    obs: '',
    vencimento: new Date(),
    volume: 23,
    quantidade: 123,
    created_at: new Date()
  },
  {
    item: {
      id: 1,
      codigo: 4,
      unidade: 'unidade',
      descricao: 'item'
    },
    matricula: '1120237',
    lote: '2',
    corredor: '1',
    prateleira: '5',
    obs: '',
    vencimento: new Date(),
    volume: 23,
    quantidade: 123,
    created_at: new Date()
  }
]

const APIPost = async () => {
  const response = await apiApointments.insertApointments(data)
  return response
}

it('deverá salvar os dados do apontamento e retornar um JSON com sucesso', () => {
  APIPost().then(response => {
    expect(response.data).toEqual({
      message: `${data.length} Apontamentos inseridos com sucesso`,
      code: '1'
    })
  })
})
