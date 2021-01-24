import React, { useCallback, useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'
import 'moment/locale/pt-br'

import getRealm from '../../services/realm'
import { ACTIONS } from '../../context/inventoryReduce'

import {
  Modal,
  ModalArea,
  ModalBody,
  CloseButton,
  ItemInfo,
  ItemInfoCol,
  ItemInfoDescrible,
  ItemDescrible,
  RowItem,
  ColItem,
  Span,
  ExitButton,
  ExitButtonText
} from './styles'
import { Alert } from 'react-native'
import { AppContext } from '../../context/AppContext'

export interface Produto {
  id: number
  descricao: string
  quantidade: number
}

type Apoitment = {
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

type Props = {
  show: boolean
  setShow: any
  apontamento: Apoitment
}

const ItemModalPF: React.FC<Props> = ({ show, setShow, apontamento }) => {
  const {
    state: { apointmentsPF },
    dispatch
  }: any = useContext(AppContext)

  const handleCloseModal = (): void => {
    setShow(false)
  }

  const handleDeleteApointment = useCallback((id: number) => {
    Alert.alert('Inventário', 'Realmente deseja remover este apontamneto?', [
      {
        text: 'Não',
        onPress: (): boolean => false
      },
      {
        text: 'Sim',
        onPress: async (): Promise<void> => {
          const realm = await getRealm()
          realm.write(() => {
            realm.delete(
              realm.objectForPrimaryKey('ApointmentProductFinished', id)
            )
          })
          const data = apointmentsPF.filter(
            (apointment: Apoitment) => apointment.id !== id
          )
          dispatch({
            type: ACTIONS.LIST_APOINTMENT,
            payload: data
          })
          setShow(false)
        },
        style: 'cancel'
      }
    ])
  }, [])

  return (
    <Modal transparent={true} visible={show} animationType="fade">
      <ModalArea>
        <ModalBody>
          <CloseButton
            onPress={(): void => handleDeleteApointment(apontamento.id)}
          >
            <Icon name="delete" size={26} color="#f00" />
          </CloseButton>
          <ItemInfo style={{ flexDirection: 'column' }}>
            <ItemDescrible>{apontamento.item.descricao}</ItemDescrible>
            <ItemInfoDescrible>
              <Span>Cod: {apontamento.item.codigo}</Span>
              <Span>Unidade: {apontamento.item.unidade}</Span>
              <Span>Lote: {apontamento.lote}</Span>
            </ItemInfoDescrible>
            <ItemInfoDescrible style={{ marginTop: 10 }}>
              <Span>
                Criado em:{' '}
                {moment(new Date(apontamento.created_at)).format(
                  'DD/MM/YYYY h:mm:ss'
                )}
              </Span>
            </ItemInfoDescrible>
          </ItemInfo>
          <ItemInfoCol>
            {apontamento.produtos.map((apontamento: Produto, key: number) => (
              <RowItem key={key}>
                <Span style={{ marginRight: 28 }}>{apontamento.descricao}</Span>
                <Span>{apontamento.quantidade.toFixed(2)}</Span>
              </RowItem>
            ))}
          </ItemInfoCol>
          <ItemInfo>
            <RowItem>
              <ColItem style={{ marginRight: 28 }}>
                <Span>Vencimento: </Span>
                <Span>
                  {moment(apontamento.vencimento).format('DD/MM/YYYY')}
                </Span>
              </ColItem>
              <ColItem>
                <Span>Total: </Span>
                <Span>
                  {apontamento.produtos.reduce(
                    (acc, produto) => produto.quantidade + acc,
                    0
                  )}
                </Span>
              </ColItem>
            </RowItem>
          </ItemInfo>
          <ItemInfo style={{ flexDirection: 'column' }}>
            <Span>Obs:</Span>
            <ItemDescrible>{apontamento.obs}</ItemDescrible>
          </ItemInfo>
          <ExitButton onPress={handleCloseModal}>
            <ExitButtonText>Sair</ExitButtonText>
          </ExitButton>
        </ModalBody>
      </ModalArea>
    </Modal>
  )
}

export default ItemModalPF
