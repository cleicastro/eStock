import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Login'
import MainTab from '../stacks/MainTab'
import ReadQrCode from '../screens/ReadQrCode'

const StackBar = createStackNavigator()

const Stacks = () => (
  <StackBar.Navigator
    initialRouteName="Login"
    screenOptions={{ headerShown: false }}
  >
    <StackBar.Screen name="Login" component={Login} />
    <StackBar.Screen name="MainTab" component={MainTab} />
    <StackBar.Screen name="ReadQrCode" component={ReadQrCode} />
  </StackBar.Navigator>
)

export default Stacks
