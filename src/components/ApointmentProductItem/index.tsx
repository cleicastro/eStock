import React, { useState } from 'react'
import ItemModal from '../ItemModal'
import ItemModalPF from '../ItemModalPF'
// import ItemModal from '../ItemModal'

import {
  Area,
  InfoArea,
  Describle,
  SeeDetailButton,
  SeeDetailButtonText,
  ItemQuantidade,
  DescribleUnidade
} from './styles'

export interface Produto {
  id: number
  descricao: string
  quantidade: number
}

type Props = {
  data: {
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
}

const ApointmentProductItem: React.FC<Props> = ({ data }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <Area onPress={(): void => setShowModal(!showModal)}>
      <ItemQuantidade>
        {data.produtos.reduce((acc, produto) => produto.quantidade + acc, 0)}
        <DescribleUnidade> Total</DescribleUnidade>
      </ItemQuantidade>
      <InfoArea>
        <Describle>{data.item.descricao}</Describle>
        <Describle>{data.item.unidade}</Describle>
        <SeeDetailButton>
          <SeeDetailButtonText>Ver Detalhes</SeeDetailButtonText>
        </SeeDetailButton>
      </InfoArea>
      <ItemModalPF show={showModal} setShow={setShowModal} apontamento={data} />
    </Area>
  )
}

export default ApointmentProductItem
