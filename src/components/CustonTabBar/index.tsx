/* eslint-disable @typescript-eslint/camelcase */
import React, { useContext, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ActivityIndicator, Alert } from 'react-native'

import getRealm from '../../services/realm'
import apiItem from '../../services/items'
import apiApointments from '../../services/apointments'

import { TabArea, TabItem, TabItemCenter } from './styles'
import { AppContext } from '../../context/AppContext'
import { ACTIONS } from '../../context/inventoryReduce'
import moment from 'moment'

interface Item {
  id: number
  codigo: number
  descricao: string
  unidade: string
}

export interface Produto {
  descricao: string
  quantidade: number
}

export interface ApointmentPF {
  item: Item
  matricula: string
  lote: number
  produtos: Array<Produto>
  vencimento: string
  created_at: Date
}

interface Apointments {
  id: number
  item: Item
  matricula: string
  lote: string
  corredor: string
  prateleira: string
  obs: string
  vencimento: Date
  volume: number
  quantidade: number
  createdAt: Date
}

type Props = {
  state: {
    history: Array<{
      key: string
      type: string
    }>
    index: number
    key: string
    routeNames: Array<string>
    routes: Array<{
      key: string
      name: string
      params: undefined
    }>
    stale: boolean
    type: string
  }
  navigation: any
}

const CustonTabBar: React.FC<Props> = ({ state, navigation }) => {
  const { dispatch }: any = useContext(AppContext)

  const [loadItem, setLoadItem] = useState<boolean>(false)
  const [loadApointments, setLoadApointments] = useState<boolean>(false)
  const goTo = (screenName: string): void => {
    navigation.navigate(screenName)
  }

  const handleSyncItemAPI = async (): Promise<void> => {
    const realm = await getRealm()
    const apointments = realm.objects('Apointment')
    const items = realm.objects('Item')
    if (apointments.length === 0) {
      setLoadItem(true)
      try {
        realm.write(() => {
          realm.delete(items)
        })

        const response = await apiItem.getitems()
        // insert items api response
        response.data.map((item: Item) => {
          realm.write(() => {
            realm.create('Item', {
              id: Number(item.id),
              codigo: Number(item.codigo),
              descricao: item.descricao,
              unidade: item.unidade
            })
          })
        })
        setLoadItem(false)
        Alert.alert('Itens', `${response.data.length} itens atualizados`)
      } catch (error) {
        Alert.alert('Erro', `Erro ao conectar na API ${error}`)
        setLoadItem(false)
      }
    } else {
      Alert.alert(
        'Itens',
        'Você tem apontamentos pendentes para enviar, sincronize os apontamentos para depois atualizar os itens'
      )
    }
  }

  const handleSyncApointmentsAPI = async (): Promise<void> => {
    setLoadApointments(true)
    const realm = await getRealm()
    const apointments = realm.objects('Apointment').sorted('id', true)
    if (apointments.length > 0) {
      try {
        const data: Array<any> = []
        apointments.map((apointment: Apointments) => {
          data.push({
            // eslint-disable-next-line @typescript-eslint/camelcase
            id_produto: apointment.item.id,
            matricula: apointment.matricula,
            lote: apointment.lote,
            vencimento: moment(apointment.vencimento).format('YYYY-MM-DD'),
            corredor: apointment.corredor,
            prateleira: apointment.prateleira,
            volume: apointment.volume,
            quantidade: apointment.quantidade,
            obs: apointment.obs
          })
        })
        const response = await apiApointments.insertApointments(data)
        if (response.data.status === 'success') {
          realm.write(() => {
            realm.delete(apointments)
          })
          dispatch({
            type: ACTIONS.LIST_APOINTMENT,
            payload: []
          })
          Alert.alert('Estoque', 'Dados sincronizados com sucesso')
          handleSyncApointmentsPF()
        } else {
          Alert.alert('Estoque', 'Verifique suas credenciais')
          handleSyncApointmentsPF()
        }

        setLoadApointments(false)
      } catch (error) {
        setLoadApointments(false)
        console.log('errorAPI', error)
        Alert.alert(
          'Apontamentos Erro',
          `Erro ao conectar com a API ${error} :(`
        )
      }
    } else {
      // setLoadApointments(false)
      // Alert.alert('Apontamentos', 'Não há apontamentos para enviar')
      handleSyncApointmentsPF()
    }
  }

  const handleSyncApointmentsPF = async (): Promise<void> => {
    const realm = await getRealm()
    const produtos = realm.objects('Produtos').sorted('id', true)
    const apointmentsPF: Array<ApointmentPF> = realm
      .objects('ApointmentProductFinished')
      .sorted('id', true)
    if (apointmentsPF.length > 0) {
      try {
        const listAuxApointments: any = []
        apointmentsPF.map((apointment: ApointmentPF) => {
          const produtos: Produto[] = apointment.produtos.map(
            (item): Produto => ({
              descricao: item.descricao,
              quantidade: item.quantidade
            })
          )
          const data = {
            id_produto: apointment.item.id,
            matricula: apointment.matricula,
            lote: apointment.lote,
            produtos,
            vencimento: apointment.vencimento,
            created_at: apointment.created_at
          }
          listAuxApointments.push(data)
        })
        const response = await apiApointments.insertApointmentsPF(
          listAuxApointments
        )
        if (response.data.status === 'success') {
          realm.write(() => {
            realm.delete(apointmentsPF)
            realm.delete(produtos)
          })
          dispatch({
            type: ACTIONS.LIST_APOINTMENT_PF,
            payload: []
          })
          Alert.alert('Apontamentos', 'Dados sincronizados com sucesso')
        } else {
          Alert.alert('Apontamentos', 'Verifique suas credenciais')
        }
        setLoadApointments(false)
      } catch (error) {
        setLoadApointments(false)
        console.log('errorAPI', error)
        Alert.alert(
          'Produtos acabado erro',
          `Erro ao conectar com a API ${error} :(`
        )
      }
    } else {
      setLoadApointments(false)
      Alert.alert('Apontamentos', 'Não há apontamentos para enviar')
    }
  }

  return (
    <TabArea>
      <TabItem onPress={(): void => goTo('Home')}>
        <Icon
          style={{ opacity: state.index === 0 ? 1 : 0.5 }}
          name="home"
          size={32}
          color="#FFF"
        />
      </TabItem>
      <TabItem onPress={(): void => goTo('ViewApointment')}>
        <Icon
          style={{ opacity: state.index === 1 ? 1 : 0.5 }}
          name="sd-card"
          size={32}
          color="#FFF"
        />
      </TabItem>
      <TabItemCenter onPress={(): void => goTo('Apointment')}>
        <Icon name="add" size={32} color="#4eadbe" />
      </TabItemCenter>

      <TabItem onPress={handleSyncItemAPI}>
        {loadItem ? (
          <ActivityIndicator size="large" color="#FFF" />
        ) : (
          <Icon name="cloud-download" size={32} color="#FFF" />
        )}
      </TabItem>
      <TabItem onPress={handleSyncApointmentsAPI}>
        {loadApointments ? (
          <ActivityIndicator size="large" color="#FFF" />
        ) : (
          <Icon name="cloud-upload" size={32} color="#FFF" />
        )}
      </TabItem>
    </TabArea>
  )
}

export default CustonTabBar
