import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
// import MainTab from './src/stacks/MainTab'
import MainStack from './src/stacks/MainStack'
import AppContexProvider from './src/context/AppContext'

const App = () => (
  <AppContexProvider>
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  </AppContexProvider>
)
export default App
