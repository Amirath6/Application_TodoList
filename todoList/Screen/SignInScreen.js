/**
 * Définition de la fonction SignInScreen qui permet d'afficher la page de connexion
 * 
 * @version 1.0.0
 */

import React from 'react'
import { View } from 'react-native'

import SignIn from '../components/SignIn'

export default function SignInScreen () {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SignIn/>
    </View>
  )
}
