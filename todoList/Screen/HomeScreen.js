/**
 * Définition de la fonction HomeScreen qui permet d'afficher la page d'accueil
 * 
 * @version 1.0.0
 */

import React from 'react'
import { View, Text, ImageBackground } from 'react-native'

import { UsernameContext } from '../Context/Context'

export default function HomeScreen () {
  return (
    <UsernameContext.Consumer>
      {([username, setUsername]) => {
        return (
          <ImageBackground source={require('../assets/todo.jpeg')} style={{width: '100%', height: '100%'}}>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
          
            <Text style={{fontSize: 24, fontWeight: 'bold' }}>Welcome to your To-do List app!{'\n'}</Text>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>You are logged as <Text style={{color: 'red'}}>{username}</Text>! {'\n'}</Text>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>This app will allow you to create, update or delete your task list.</Text>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>It will allow you to organize yourself for the tasks of a project. </Text>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>These tasks can be independent or must, on the contrary, be carried out in a certain order.</Text>
          
          </View>
          </ImageBackground>
        )
      }}
    </UsernameContext.Consumer>
  )
}
