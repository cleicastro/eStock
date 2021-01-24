/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef, useContext } from 'react'
import { Alert, Picker, TextInput, View } from 'react-native'
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

interface ProdutoID {
  id: number
  descricao: string
  quantidade: number
}

interface Produto {
  descricao: string
  quantidade: string
}

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
  const { apointmentsPF, dispatch }: any = useContext(AppContext)
  const loteRef = useRef<TextInput>(null)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showDateVencimento, setShowDateVencimento] = useState<boolean>(false)
  const [matricula, setMatricula] = useState<string>('')
  const [lote, setLote] = useState<string>('')
  const [vencimento, setVencimento] = useState<string>(
    moment().format('DD/MM/YYYY')
  )
  const [dateVencimento, setDateVencimento] = useState<Date>(new Date())
  const [obs, setObs] = useState<string>('')
  const [itemSelected, setItemSelected] = useState<Item>({
    id: 0,
    codigo: 0,
    descricao: '',
    unidade: ''
  })
  const [produtos, setProdutos] = useState<Array<Produto>>([
    {
      descricao: '',
      quantidade: '0'
    }
  ])

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

  const clearNewNote = (): void => {
    setObs('')
    setDateVencimento(new Date())
    setVencimento(moment().format('DD/MM/YYYY'))
    setLote('')
    setItemSelected({
      id: 0,
      codigo: 0,
      descricao: '',
      unidade: ''
    })
    setProdutos([
      {
        descricao: '',
        quantidade: '0'
      }
    ])
    // eslint-disable-next-line no-unused-expressions
    loteRef.current?.isFocused()
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

  const handleAddProduct = (): void => {
    setProdutos([
      ...produtos,
      {
        descricao: '',
        quantidade: '0'
      }
    ])
  }

  const handleRemoveProduct = (index: number): void => {
    const listItem = produtos.slice()
    listItem.splice(index, 1)
    setProdutos(listItem)
  }

  const handleChangeQuantidade = (quantidade: string, index: number): void => {
    const valueAux = produtos.map((value, key) =>
      key === index ? { ...value, quantidade } : value
    )
    setProdutos(valueAux)
  }

  const handleChangeBaseProduct = (descricao: string, index: number): void => {
    const valueAux = produtos.map((value, key) =>
      key === index ? { ...value, descricao } : value
    )
    setProdutos(valueAux)
  }

  const handleSaveApointment = async (): Promise<void> => {
    if (itemSelected.descricao) {
      try {
        const realm = await getRealm()

        const listProduct: ProdutoID[] = []
        realm.write(() => {
          produtos.map((produto: Produto) => {
            const lastProdutos: number =
              realm.objects('Produtos').max('id') > 0
                ? Number(realm.objects('Produtos').max('id'))
                : 1
            const data = {
              id: lastProdutos,
              descricao: produto.descricao,
              quantidade: Number(produto.quantidade)
            }
            realm.create('Produtos', data, true)
            listProduct.push(data)
          })
        })

        const incrementID: number = realm
          .objects('ApointmentProductFinished')
          .max('id')
          ? Number(realm.objects('ApointmentProductFinished').max('id'))
          : 1
        const { codigo, descricao, id, unidade } = itemSelected
        const data = {
          id: incrementID + 1,
          item: {
            codigo,
            descricao,
            id,
            unidade
          },
          matricula,
          lote,
          obs,
          vencimento: moment(dateVencimento).format('YYYY-MM-DD'),
          produtos: listProduct,
          created_at: new Date()
        }

        realm.write(() => {
          realm.create('ApointmentProductFinished', data, true)
        })
        const getApointments = realm
          .objects('ApointmentProductFinished')
          .sorted('id', true)

        dispatch({
          type: ACTIONS.LIST_APOINTMENT_PF,
          payload: getApointments
        })
        Alert.alert('Produto acabado', 'Produto adicionado com sucesso!')
        clearNewNote()
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível salvar este apontamento. ' + error
        )
      }
    } else {
      Alert.alert(
        'Produto acabado',
        'Não foi possivel salvar este apontamento. Favor, verifique seus dados'
      )
    }
  }

  return (
    <Container>
      <LabelItemCod>{itemSelected.codigo}</LabelItemCod>
      <InputArea>
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

      {produtos.map((produto: Produto, key: number) => (
        <InputArea key={key}>
          <LabelItemCod style={{ marginRight: 10 }}>{`Fase ${
            key + 1
          }`}</LabelItemCod>
          <View style={{ backgroundColor: '#fff' }}>
            <Picker
              selectedValue={produto.descricao}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue): void =>
                handleChangeBaseProduct(itemValue, key)
              }
            >
              <Picker.Item label="Selecione uma base" value="" />
              <Picker.Item label="Base líquida" value="Base líquida" />
              <Picker.Item label="Base sólido" value="Base sólido" />
            </Picker>
          </View>
          <Input
            keyboardType="decimal-pad"
            placeholder="Quantidade"
            style={{ marginLeft: 10 }}
            value={produto.quantidade}
            onChangeText={(text): void => handleChangeQuantidade(text, key)}
          />
          {produtos.length === key + 1 ? (
            <ItemFinder onPress={(): void => handleAddProduct()}>
              <Icon name={'add'} size={26} color="#63c2d1" />
            </ItemFinder>
          ) : (
            <ItemFinder onPress={(): void => handleRemoveProduct(key)}>
              <Icon name={'remove'} size={26} color="#63c2d1" />
            </ItemFinder>
          )}
        </InputArea>
      ))}

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
