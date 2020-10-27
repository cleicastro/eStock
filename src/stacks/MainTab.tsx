import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home/Home'
import Apointment from '../screens/Apointment/Apointment'
import ViewApointment from '../screens/ViewApointment/ViewApointment'
import CustonTabBar from '../components/CustonTabBar'

const Tabbar = createBottomTabNavigator()

const Tab = () => (
  <Tabbar.Navigator tabBar={props => <CustonTabBar {...props} />}>
    <Tabbar.Screen name="Home" component={Home} />
    <Tabbar.Screen name="ViewApointment" component={ViewApointment} />
    <Tabbar.Screen name="Apointment" component={Apointment} />
  </Tabbar.Navigator>
)

export default Tab
