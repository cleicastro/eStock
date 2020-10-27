export const ACTIONS = {
  LIST_APOINTMENT: 'LIST_APOINTMENT'
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

export type State = {
  apointments: Array<Apointment>
}
export type Actions = {
  type: string
  payload: any
}

export const initialState: State = {
  apointments: []
}

type InventoryState = typeof initialState

export function inventoryReduce(state: InventoryState, action: Actions) {
  switch (action.type) {
    case ACTIONS.LIST_APOINTMENT:
      return {
        ...state,
        apointments: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
