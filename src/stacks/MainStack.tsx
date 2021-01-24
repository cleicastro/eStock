import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Login'
import MainTabStock from './MainTabStock'
import MainTabProductFinished from './MainTabProductFinished'
import ReadQrCode from '../screens/ReadQrCode'
import SelectOperation from '../screens/SelectOperation'

const StackBar = createStackNavigator()

const Stacks = () => (
  <StackBar.Navigator
    initialRouteName="Login"
    screenOptions={{ headerShown: false }}
  >
    <StackBar.Screen name="Login" component={Login} />
    <StackBar.Screen name="MainTabStock" component={MainTabStock} />
    <StackBar.Screen
      name="MainTabProductFinished"
      component={MainTabProductFinished}
    />
    <StackBar.Screen name="ReadQrCode" component={ReadQrCode} />
    <StackBar.Screen name="SelectOperation" component={SelectOperation} />
  </StackBar.Navigator>
)

export default Stacks
