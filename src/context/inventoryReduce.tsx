export const ACTIONS = {
  LIST_APOINTMENT: 'LIST_APOINTMENT',
  LIST_APOINTMENT_PF: 'LIST_APOINTMENT_PF'
}

export interface Apointment {
  id: number
  item: {
    id: number
    codigo: number
    descricaco: string
    unidade: string
  }
  lote: number
  date: string
  volume: number
  quantidade: number
  vencimento: string
  created_at: Date
}

export interface Produto {
  id: number
  descricao: string
  quantidade: number
}

export interface ApointmentPF {
  id: number
  item: {
    id: number
    codigo: number
    descricaco: string
    unidade: string
  }
  lote: number
  produtos: Array<Produto>
  vencimento: string
  created_at: Date
}

export type State = {
  apointments: Array<Apointment>
  apointmentsPF: Array<ApointmentPF>
}
export type Actions = {
  type: string
  payload: any
}

export const initialState: State = {
  apointments: [],
  apointmentsPF: []
}

type InventoryState = typeof initialState

export function inventoryReduce(
  state: InventoryState,
  action: Actions
): InventoryState {
  switch (action.type) {
    case ACTIONS.LIST_APOINTMENT:
      return {
        ...state,
        apointments: action.payload
      }
    case ACTIONS.LIST_APOINTMENT_PF:
      return {
        ...state,
        apointmentsPF: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
