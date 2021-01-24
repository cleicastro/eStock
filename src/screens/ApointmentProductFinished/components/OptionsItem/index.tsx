import React from 'react'

import { Area, InfoArea, Describle, DescribleUnidade } from './styles'

interface Item {
  id: number
  codigo: number
  descricao: string
  unidade: string
}
type Props = {
  data: Item
}

const OptionsItem: React.FC<Props> = ({ data }) => {
  return (
    <Area>
      <InfoArea>
        <Describle>{data.codigo}</Describle>
        <Describle>{data.descricao}</Describle>
        <DescribleUnidade>{data.unidade}</DescribleUnidade>
      </InfoArea>
    </Area>
  )
}

export default OptionsItem
