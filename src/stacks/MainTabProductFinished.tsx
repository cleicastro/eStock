/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/HomeProduFinished/HomeProduFinished'
import ApointmentProductFinished from '../screens/ApointmentProductFinished'
import ViewApointment from '../screens/ViewApointment/ViewApointment'
import CustonTabBar from '../components/CustonTabBar'

const Tabbar = createBottomTabNavigator()

const Tab = () => (
  <Tabbar.Navigator tabBar={props => <CustonTabBar {...props} />}>
    <Tabbar.Screen name="Home" component={Home} />
    <Tabbar.Screen name="ViewApointment" component={ViewApointment} />
    <Tabbar.Screen name="Apointment" component={ApointmentProductFinished} />
  </Tabbar.Navigator>
)

export default Tab
