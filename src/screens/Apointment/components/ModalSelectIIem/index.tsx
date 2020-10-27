import React, { useEffect, useState } from 'react'
import { Alert, Animated, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import getRealm from '../../../../services/realm'
import FormNewItem from '../FormNewItem'

import OptionsItem from '../OptionsItem'

import {
  Modal,
  ModalArea,
  TextModalTile,
  ModalBody,
  ModalHeader,
  InputArea,
  Input,
  ButtonArea,
  ActionButton,
  ActionButtonText
} from './styles'

type Props = {
  show: boolean
  setShow: any
  selectItem: any
}
interface Item {
  id: number
  codigo: number
  descricao: string
  unidade: string
}

const ModalSelectIIem: React.FC<Props> = ({ show, setShow, selectItem }) => {
  const [scrollY] = useState(new Animated.Value(600))
  const [txtCod, setTxtCod] = useState<string>('')
  const [items, setItems] = useState<Array<Item>>([])
  const [openNewItem, setOpenNewItem] = useState<boolean>(false)

  useEffect(() => {
    async function loadItems() {
      const realm = await getRealm()
      const data: Array<Item> | null = realm
        .objects('Item')
        .sorted('codigo', true)
      setItems(data || [])
    }
    loadItems()
  }, [])

  const handleNewItem = () => {
    setOpenNewItem(!openNewItem)
    if (!openNewItem) {
      Animated.timing(scrollY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false
      }).start()
    } else {
      Animated.timing(scrollY, {
        toValue: 600,
        duration: 1000,
        useNativeDriver: false
      }).start()
    }
  }

  const handleSearchItem = async (text: string) => {
    setTxtCod(text)
    const realm = await getRealm()
    const data: Array<Item> | [] = realm.objects('Item').sorted('codigo', true)
    if (text !== '') {
      const dataFilteredDescrible = data
        ? data.filtered(`descricao LIKE "*${text}*"`)
        : []
      setItems(dataFilteredDescrible)
    } else {
      setItems(data)
    }
  }

  const handleSaveItem = async (item: Item) => {
    if (Number(item.codigo) > 0 && item.id > 0) {
      const realm = await getRealm()
      try {
        realm.write(() => {
          realm.create('Item', item, true)
          selectItem(item)
          Alert.alert('Item', 'Item cadastrado com sucesso')
        })
      } catch (error) {
        Alert.alert(`Item', 'Falha ao cadastrar este item: ${error}`)
      }
    } else {
      Alert.alert('Item', 'Item inválido')
    }
  }

  return (
    <Modal transparent={true} visible={show} animationType="slide">
      <ModalArea>
        <ModalHeader as={Animated.View} style={{ opacity: 1 }}>
          <TextModalTile>Selecione um item</TextModalTile>
          <InputArea>
            <Input
              placeholder="Buscar item"
              onChangeText={handleSearchItem}
              value={txtCod}
              autoCapitalize="characters"
            />
          </InputArea>
          <ButtonArea>
            <ActionButton onPress={handleNewItem}>
              <ActionButtonText>
                {!openNewItem ? 'Novo' : 'Itens'}
              </ActionButtonText>
            </ActionButton>
            <ActionButton onPress={setShow}>
              <ActionButtonText>Sair</ActionButtonText>
            </ActionButton>
          </ButtonArea>

          <FormNewItem saveItem={handleSaveItem} />
        </ModalHeader>

        <ModalBody
          as={Animated.View}
          style={{
            maxHeight: scrollY
          }}
        >
          <FlatList
            data={items}
            keyExtractor={(item: Item) => String(item.codigo)}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectItem(item)}>
                <OptionsItem data={item} />
              </TouchableOpacity>
            )}
          />
        </ModalBody>
      </ModalArea>
    </Modal>
  )
}

export default ModalSelectIIem
