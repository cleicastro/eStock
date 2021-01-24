import React, { createContext, ReactNode, useReducer } from 'react'
import { inventoryReduce, initialState } from './inventoryReduce'

interface Props {
  children: ReactNode
}

type PropsState = {
  state: any
  dispatch: any
}

export const AppContext = createContext<PropsState | undefined>(undefined)

function AppContexProvider({ children }: Props): CompositionEvent {
  const [state, dispatch] = useReducer(inventoryReduce, initialState)
  const value = { state, dispatch }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export default AppContexProvider
