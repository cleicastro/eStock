import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { RefreshControl, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ApointmentProductItem from '../../components/ApointmentProductItem'
import { AppContext } from '../../context/AppContext'
import { ACTIONS } from '../../context/inventoryReduce'
import getRealm from '../../services/realm'

import {
  Container,
  Scroller,
  HeaderArea,
  HeaderAreaTitle,
  HeaderTitle,
  ApointmentsArea,
  ApointmentInput,
  ApontimentFinder,
  ListArea
} from './styles'

export interface Produto {
  id: number
  descricao: string
  quantidade: number
}

interface ApointmentProductFinished {
  id: number
  item: {
    id: number
    codigo: number
    descricao: string
    unidade: string
  }
  lote: number
  produtos: Array<Produto>
  vencimento: string
  obs: string
  created_at: Date
}

const HomeProduFinished: React.FC = () => {
  const navigation = useNavigation()
  const [scrollY] = useState(new Animated.Value(0))
  const [refreshing, setRefreshing] = useState(false)
  const [searchText, setSearchText] = useState<string>('')
  const {
    state: { apointmentsPF },
    dispatch
  }: any = useContext(AppContext)

  useEffect(() => {
    async function loadApointments(): Promise<void> {
      const realm = await getRealm()
      const data = realm.objects('ApointmentProductFinished').sorted('id', true)
      dispatch({
        type: ACTIONS.LIST_APOINTMENT_PF,
        payload: data
      })
    }
    loadApointments()
  }, [])

  const handleSearchApointment = async (): Promise<void> => {
    const realm = await getRealm()
    if (searchText !== '') {
      const data = realm
        .objects('ApointmentProductFinished')
        .filtered(`item.descricao LIKE "*${searchText}*"`)
        .sorted('id', false)
      dispatch({
        type: ACTIONS.LIST_APOINTMENT_PF,
        payload: data
      })
    } else {
      const data = realm
        .objects('ApointmentProductFinished')
        .sorted('id', false)
      dispatch({
        type: ACTIONS.LIST_APOINTMENT_PF,
        payload: data
      })
    }
  }

  const handleRefresh = async (): Promise<void> => {
    setRefreshing(true)
    const realm = await getRealm()
    const data = realm.objects('ApointmentProductFinished').sorted('id', true)
    dispatch({
      type: ACTIONS.LIST_APOINTMENT_PF,
      payload: data
    })
    setRefreshing(false)
  }

  const handleBackOption = (): void => {
    navigation.reset({
      routes: [{ name: 'SelectOperation' }]
    })
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
        <HeaderAreaTitle>
          <Icon
            name="arrow-back"
            size={26}
            color="#FFF"
            onPress={handleBackOption}
          />
          <HeaderTitle numberOfLines={2}>
            {apointmentsPF.length} Apontamentos para sincronizar
          </HeaderTitle>
        </HeaderAreaTitle>
        <ApointmentsArea>
          <ApointmentInput
            placeholder="Descrição do item"
            placeholderTextColor="#fff"
            value={searchText}
            onChangeText={(text): void => setSearchText(text)}
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
          {apointmentsPF.map((item: ApointmentProductFinished) => (
            <ApointmentProductItem key={item.id} data={item} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  )
}

export default HomeProduFinished
