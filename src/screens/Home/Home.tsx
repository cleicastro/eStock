import React, { useContext, useEffect, useState } from 'react'
import { RefreshControl, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ApointmentItem from '../../components/ApointmentItem'
import { AppContext } from '../../context/AppContext'
import { ACTIONS } from '../../context/inventoryReduce'
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

interface Apointment {
  id: number
  item: {
    id: number
    codigo: number
    descricao: string
    unidade: string
  }
  lote: number
  date: string
  volume: number
  prateleira: string
  corredor: string
  quantidade: number
  vencimento: Date
  obs: string
  created_at: Date
}

const Home: React.FC = () => {
  const [scrollY] = useState(new Animated.Value(0))
  const [refreshing, setRefreshing] = useState(false)
  const [searchText, setSearchText] = useState<string>('')
  const {
    state: { apointments },
    dispatch
  } = useContext(AppContext)

  useEffect(() => {
    async function loadApointments() {
      const realm = await getRealm()
      const data = realm.objects('Apointment').sorted('id', true)
      dispatch({
        type: ACTIONS.LIST_APOINTMENT,
        payload: data
      })
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
      dispatch({
        type: ACTIONS.LIST_APOINTMENT,
        payload: data
      })
    } else {
      const data = realm.objects('Apointment').sorted('id', false)
      dispatch({
        type: ACTIONS.LIST_APOINTMENT,
        payload: data
      })
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    const realm = await getRealm()
    const data = realm.objects('Apointment').sorted('id', true)
    dispatch({
      type: ACTIONS.LIST_APOINTMENT,
      payload: data
    })
    setRefreshing(false)
  }

  return (
    <Container>
      <HeaderArea
        as={Animated.View}
        style={{
          marginTop: scrollY.interpolate({
            inputRange: [0, 50, 100],
            outputRange: [0, -50, -100],
            extrapolate: 'clamp'
          })
        }}
      >
        <HeaderTitle numberOfLines={2}>
          {apointments.length} Apontamentos para sincronizar
        </HeaderTitle>
        <ApointmentsArea>
          <ApointmentInput
            placeholder="Descrição do item"
            placeholderTextColor="#fff"
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />
          <ApontimentFinder onPress={handleSearchApointment}>
            <Icon name="search" size={26} color="#FFF" />
          </ApontimentFinder>
        </ApointmentsArea>
      </HeaderArea>
      <Scroller
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: scrollY }
              }
            }
          ],
          { useNativeDriver: false }
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <ListArea>
          {apointments.map((item: Apointment) => (
            <ApointmentItem key={item.id} data={item} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  )
}

export default Home
