/**
 * Définition le composant Navigation qui permet de gérer les routes de l'application
 * 
 * @version 1.0.0
 */


import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ImageBackground } from 'react-native'

import TodoListsScreen from '../Screen/TodoListsScreen'
import HomeScreen from '../Screen/HomeScreen'
import SignInScreen from '../Screen/SignInScreen'
import SignUpScreen from '../Screen/SignUpScreen'
import SignOutScreen from '../Screen/SignOutScreen'

import { TokenContext } from '../Context/Context'

// import TodoNavigation from './TodoNavigation'

const Tab = createBottomTabNavigator()

export default function Navigation () {
  return (
    <ImageBackground source={require('../assets/todo.jpeg')} style={{ width: '100%', height: '100%' }}>
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <NavigationContainer>
          {token == null ? (
            <Tab.Navigator>
              <Tab.Screen name='SignIn' component={SignInScreen} />
              <Tab.Screen name='SignUp' component={SignUpScreen} />
            </Tab.Navigator>
          ) : (
            <Tab.Navigator>
              <Tab.Screen name='Home' component={HomeScreen} />
              <Tab.Screen name='TodoLists' component={TodoListsScreen} />
              <Tab.Screen name='SignOut' component={SignOutScreen} />
            </Tab.Navigator>
          )}
        </NavigationContainer>
      )}
    </TokenContext.Consumer>
    </ImageBackground>
  )
}
