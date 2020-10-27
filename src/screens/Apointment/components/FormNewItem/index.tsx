import React, { useState } from 'react'

import {
  Container,
  InputArea,
  Input,
  ButtonArea,
  ActionButton,
  ActionButtonText
} from './styles'

interface Item {
  id: number
  codigo: number
  descricao: string
  unidade: string
}
interface Props {
  saveItem: (item: Item) => void
}

const FormNewItem: React.FC<Props> = ({ saveItem }) => {
  const [codigo, setCodigo] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [unidade, setUnidade] = useState<string>('')
  const id = 0

  return (
    <Container>
      <InputArea>
        <Input
          keyboardType="number-pad"
          placeholder="Código"
          value={codigo}
          onChangeText={setCodigo}
        />
      </InputArea>
      <InputArea>
        <Input
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
          autoCapitalize="characters"
        />
      </InputArea>
      <InputArea>
        <Input
          placeholder="Unidade"
          value={unidade}
          onChangeText={setUnidade}
          autoCapitalize="characters"
        />
      </InputArea>
      <ButtonArea>
        <ActionButton
          onPress={() =>
            saveItem({
              id,
              codigo: codigo !== '' ? Number(codigo) : 0,
              descricao,
              unidade
            })
          }
        >
          <ActionButtonText>Salvar</ActionButtonText>
        </ActionButton>
      </ButtonArea>
    </Container>
  )
}

export default FormNewItem
