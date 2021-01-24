/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useRef, useContext } from 'react'
import { Alert, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import DateTimePicker from '@react-native-community/datetimepicker'
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment'
import 'moment/locale/pt-br'

import { AppContext } from '../../context/AppContext'
import { ACTIONS } from '../../context/inventoryReduce'
import ModalSelectIIem from './components/ModalSelectIIem'
import getRealm from '../../services/realm'

import {
  Container,
  InputArea,
  ItemFinder,
  Input,
  ButtonArea,
  ActionButton,
  ActionButtonText,
  LabelItemDescription,
  LabelItemCod
} from './styles'

interface Item {
  id: number
  codigo: number
  descricao: string
  unidade: string
}

interface Token {
  username: string
  token: string
  matricula: string
  code: string
  time: string
}

const Apointment: React.FC = () => {
  const { dispatch }: any = useContext(AppContext)

  const loteRef = useRef<TextInput>(null)
  const volumeRef = useRef<TextInput>(null)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showDateVencimento, setShowDateVencimento] = useState<boolean>(false)
  const [matricula, setMatricula] = useState<string>('')
  const [lote, setLote] = useState<string>('')
  const [corredor, setCorredor] = useState<string>('')
  const [prateleira, setPrateleira] = useState<string>('')
  const [vencimento, setVencimento] = useState<string>(
    moment().format('DD/MM/YYYY')
  )
  const [dateVencimento, setDateVencimento] = useState<Date>(new Date())
  const [volume, setVolume] = useState<string>('')
  const [quantidade, setQuantidade] = useState<string>('')
  const [total, setTotal] = useState<string>('')
  const [obs, setObs] = useState<string>('')
  const [itemSelected, setItemSelected] = useState<Item>({
    id: 0,
    codigo: 0,
    descricao: '',
    unidade: ''
  })

  useEffect(() => {
    if (volume !== '' || quantidade !== '') {
      const calcTotal = Number(volume) * Number(quantidade)
      setTotal(calcTotal.toFixed(2).toString())
    }
  }, [volume, quantidade])

  useEffect(() => {
    const matriculaStorage = async (): Promise<void> => {
      const user: any = await AsyncStorage.getItem('token')
      const tokenParse: Token = JSON.parse(user)
      setMatricula(tokenParse.matricula)
    }
    matriculaStorage()
  }, [])

  const handleShowItem = (): void => {
    setShowModal(true)
  }

  const clearNewNote = (isClear: boolean): void => {
    setVolume('')
    setQuantidade('')
    setTotal('')
    setObs('')
    volumeRef.current?.isFocused()
    if (isClear) {
      setLote('')
      setCorredor('')
      setPrateleira('')
      setDateVencimento(new Date())
      setVencimento(moment().format('DD/MM/YYYY'))
      setItemSelected({
        id: 0,
        codigo: 0,
        descricao: '',
        unidade: ''
      })
      loteRef.current?.isFocused()
    }
  }

  const handleSelectItem = (item: Item): void => {
    setItemSelected(item)
    setShowModal(false)
  }

  const onChangeVencimento = (event: Event, selectedDate?: Date): void => {
    const currentDate = selectedDate || dateVencimento
    setShowDateVencimento(false)
    setDateVencimento(currentDate)
    setVencimento(moment(currentDate).format('DD/MM/YYYY'))
  }

  const handleSaveApointment = async (): Promise<void> => {
    try {
      const realm = await getRealm()
      const incrementID: number =
        realm.objects('Apointment').max('id') > 0
          ? Number(realm.objects('Apointment').max('id'))
          : 1
      const data = {
        id: incrementID || 1,
        item: itemSelected,
        matricula,
        lote,
        corredor,
        prateleira,
        obs,
        vencimento: moment(dateVencimento).format('YYYY-MM-DD'),
        volume: Number(volume),
        quantidade: Number(quantidade),
        created_at: new Date()
      }
      realm.write(() => {
        realm.create('Apointment', data, true)
      })
      const getApointments = realm.objects('Apointment').sorted('id', true)

      dispatch({
        type: ACTIONS.LIST_APOINTMENT,
        payload: getApointments
      })

      Alert.alert(
        'Inventário',
        'Existe outro volume ou volume intermediário do mesmo lote?',
        [
          {
            text: 'Sim',
            onPress: (): void => {
              clearNewNote(false)
            }
          },
          {
            text: 'Não',
            onPress: (): void => {
              clearNewNote(true)
            },
            style: 'cancel'
          }
        ]
      )
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar este apontamento. ' + error)
    }
  }

  return (
    <Container>
      <LabelItemCod>{itemSelected.codigo}</LabelItemCod>
      <InputArea>
        {/* <Input
          value={itemSelected.descricao}
          placeholder="Item"
          editable={false}
          style={{ backgroundColor: '#dfdfdf' }}
        /> */}
        <LabelItemDescription>{itemSelected.descricao}</LabelItemDescription>
        <ItemFinder onPress={handleShowItem}>
          <Icon name="search" size={26} color="#63c2d1" />
        </ItemFinder>
      </InputArea>
      <InputArea>
        <Input
          keyboardType="number-pad"
          placeholder="Matricula"
          value={matricula}
          onChangeText={setMatricula}
        />
      </InputArea>
      <InputArea>
        <Input
          placeholder="Lote"
          value={lote}
          onChangeText={setLote}
          ref={loteRef}
        />
        <Input
          placeholder="Vencimento"
          style={{ marginLeft: 10 }}
          value={vencimento}
          onChangeText={setVencimento}
        />
        <ItemFinder onPress={(): void => setShowDateVencimento(true)}>
          <Icon name="calendar-today" size={26} color="#63c2d1" />
        </ItemFinder>
        {showDateVencimento && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateVencimento}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onChangeVencimento}
          />
        )}
      </InputArea>
      <InputArea>
        <Input
          placeholder="Corredor"
          value={corredor}
          onChangeText={setCorredor}
        />
        <Input
          placeholder="Prateleira"
          value={prateleira}
          onChangeText={setPrateleira}
          style={{ marginLeft: 10 }}
        />
      </InputArea>
      <InputArea>
        <Input
          keyboardType="decimal-pad"
          placeholder="Volume"
          value={volume}
          onChangeText={setVolume}
          ref={volumeRef}
        />
        <Input
          keyboardType="decimal-pad"
          placeholder="Quantidade"
          style={{ marginLeft: 10 }}
          value={quantidade}
          onChangeText={setQuantidade}
        />
      </InputArea>
      <InputArea>
        <Input
          placeholder="Total"
          editable={false}
          style={{ backgroundColor: '#dfdfdf' }}
          value={total}
        />
      </InputArea>
      <InputArea>
        <Input placeholder="Obs" value={obs} onChangeText={setObs} />
      </InputArea>
      <ButtonArea>
        <ActionButton onPress={handleSaveApointment}>
          <ActionButtonText>Salvar</ActionButtonText>
        </ActionButton>
      </ButtonArea>
      <ModalSelectIIem
        show={showModal}
        setShow={setShowModal}
        selectItem={handleSelectItem}
      />
    </Container>
  )
}

export default Apointment
