import React, { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ApointmentGroupItem from '../../components/ApointmentGroupItem'
import getRealm from '../../services/realm'

import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  ApointmentsArea,
  ApointmentInput,
  ApontimentFinder,
  ListArea
} from './styles'

interface ApointmentAgregate {
  id: number
  item: {
    id: number
    codigo: number
    descricao: string
    unidade: string
  }
  lote: number
  date: Date
  volume: number
  quantidade: number
}

const ViewApointment: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [searchText, setSearchText] = useState<string>('')
  const [apointments, setApointments] = useState<
    Array<ApointmentAgregate> | []
  >([])

  useEffect(() => {
    async function loadApointments() {
      const realm = await getRealm()
      const data = realm.objects('Apointment')
      const value = data.reduce((acc: any, apointment: any) => {
        acc[apointment.item.codigo] = [
          ...(acc[apointment.item.codigo] || []),
          apointment
        ]
        return acc
      }, [])

      setApointments(value)
    }
    loadApointments()
  }, [])

  const handleSearchApointment = async () => {
    const realm = await getRealm()
    if (searchText !== '') {
      const data = realm
        .objects('Apointment')
        .filtered(`item.descricao LIKE "*${searchText}*"`)
        .sorted('id', false)

      const value = data.reduce((acc: any, apointment: any) => {
        acc[apointment.item.codigo] = [
          ...(acc[apointment.item.codigo] || []),
          apointment
        ]
        return acc
      }, [])

      setApointments(value)
    } else {
      const data = realm.objects('Apointment').sorted('id', false)
      const value = data.reduce((acc: any, apointment: any) => {
        acc[apointment.item.codigo] = [
          ...(acc[apointment.item.codigo] || []),
          apointment
        ]
        return acc
      }, [])

      setApointments(value)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    const realm = await getRealm()
    const data = realm.objects('Apointment')
    const value = data.reduce((acc: any, apointment: any) => {
      acc[apointment.item.codigo] = [
        ...(acc[apointment.item.codigo] || []),
        apointment
      ]
      return acc
    }, [])
    setApointments(value)
    setRefreshing(false)
  }

  return (
    <Container>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <HeaderArea>
          <HeaderTitle>
            {apointments.reduce((acc: number) => acc + 1, 0)} Itens apontados
          </HeaderTitle>
        </HeaderArea>

        <ApointmentsArea>
          <ApointmentInput
            placeholder="Descrição do item"
            placeholderTextColor="#fff"
            value={searchText}
            onChangeText={text => setSearchText(text)}
            autoCapitalize="characters"
          />
          <ApontimentFinder onPress={handleSearchApointment}>
            <Icon name="search" size={26} color="#FFF" />
          </ApontimentFinder>
        </ApointmentsArea>

        <ListArea>
          {apointments.map((item: Array<ApointmentAgregate>, index: number) => (
            <ApointmentGroupItem key={index} data={item} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  )
}

export default ViewApointment
