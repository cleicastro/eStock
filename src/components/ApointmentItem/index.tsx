import React, { useState } from 'react'
import ItemModal from '../ItemModal'

import {
  Area,
  InfoArea,
  Describle,
  SeeDetailButton,
  SeeDetailButtonText,
  ItemQuantidade,
  DescribleUnidade
} from './styles'

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
    date: string
    volume: number
    prateleira: string
    corredor: string
    quantidade: number
    vencimento: Date
    obs: string
    created_at: Date
  }
}

const ApointmentItem: React.FC<Props> = ({ data }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <Area onPress={() => setShowModal(!showModal)}>
      <ItemQuantidade>
        {(data.quantidade * data.volume).toFixed(2)}
        <DescribleUnidade> Total</DescribleUnidade>
      </ItemQuantidade>
      <InfoArea>
        <Describle>{data.item.descricao}</Describle>
        <Describle>{data.item.unidade}</Describle>
        <SeeDetailButton>
          <SeeDetailButtonText>Ver Detalhes</SeeDetailButtonText>
        </SeeDetailButton>
      </InfoArea>
      <ItemModal show={showModal} setShow={setShowModal} apontamento={data} />
    </Area>
  )
}

export default ApointmentItem
