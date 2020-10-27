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

interface Apoitment {
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

type Props = {
  show: boolean
  setShow: any
  apontamento: Apoitment
}

const ItemModal: React.FC<Props> = ({ show, setShow, apontamento }) => {
  const {
    state: { apointments },
    dispatch
  } = useContext(AppContext)

  const handleCloseModal = () => {
    setShow(false)
  }

  const handleDeleteApointment = useCallback((id: number) => {
    Alert.alert('Inventário', 'Realmente deseja remover este apontamneto?', [
      {
        text: 'Não',
        onPress: () => false
      },
      {
        text: 'Sim',
        onPress: async () => {
          const realm = await getRealm()
          realm.write(() => {
            realm.delete(realm.objectForPrimaryKey('Apointment', id))
          })
          const data = apointments.filter(
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
          <CloseButton onPress={() => handleDeleteApointment(apontamento.id)}>
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
          <ItemInfo>
            <RowItem>
              <ColItem>
                <Span>Vencimento: </Span>
                <Span>
                  {moment(new Date(apontamento.vencimento)).format(
                    'DD/MM/YYYY'
                  )}
                </Span>
              </ColItem>
              <ColItem>
                <Span>Volume: </Span>
                <Span>{apontamento.volume.toFixed(2)}</Span>
              </ColItem>
              <ColItem>
                <Span>Quantidade: </Span>
                <Span>{apontamento.quantidade.toFixed(2)}</Span>
              </ColItem>
              <ColItem>
                <Span>Total: </Span>
                <Span>
                  {(apontamento.quantidade * apontamento.volume).toFixed(2)}
                </Span>
              </ColItem>
            </RowItem>
          </ItemInfo>
          <ItemInfo style={{ flexDirection: 'column' }}>
            <ItemInfoDescrible>
              <Span>Corredor: {apontamento.corredor}</Span>
              <Span>Prateleira: {apontamento.prateleira}</Span>
            </ItemInfoDescrible>
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

export default ItemModal
