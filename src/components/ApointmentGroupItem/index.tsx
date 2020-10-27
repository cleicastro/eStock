import React from 'react'

import {
  Area,
  InfoArea,
  Describle,
  ItemInfo,
  RowItem,
  ColItem,
  Span
} from './styles'

type Props = {
  data: Array<{
    id: number
    item: {
      id: number
      codigo: number
      descricao: string
      unidade: string
    }
    lote: number
    date: Date
    volume: number
    quantidade: number
  }>
}

const ApointmentGroupItem: React.FC<Props> = ({ data }) => {
  const quantidade = data.reduce((acc, apointment) => {
    return apointment.quantidade + acc
  }, 0)
  const volume = data.reduce((acc, apointment) => apointment.volume + acc, 0)
  return (
    <Area>
      <InfoArea>
        <Describle>{data[0].item.descricao}</Describle>
      </InfoArea>
      <InfoArea style={{ marginTop: 10 }}>
        <Span>Cód.: {data[0].item.codigo}</Span>
      </InfoArea>
      <ItemInfo>
        <RowItem>
          <ColItem>
            <Span>Apontados: </Span>
            <Span>{data.length}</Span>
          </ColItem>
          <ColItem>
            <Span>Volume: </Span>
            <Span>{volume}</Span>
          </ColItem>
          <ColItem>
            <Span>Quantidade: </Span>
            <Span>{quantidade.toFixed(2)}</Span>
          </ColItem>
          <ColItem>
            <Span>Total: </Span>
            <Span>{(quantidade * volume).toFixed(2)}</Span>
          </ColItem>
        </RowItem>
      </ItemInfo>
    </Area>
  )
}

export default ApointmentGroupItem
