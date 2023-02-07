/**
 * Définition de la fonction SignUpScreen qui permet d'afficher la page d'inscription
 * 
 * @version 1.0.0
 */

import React from 'react'
import { View } from 'react-native'

import SignUp from '../components/SignUp'

export default function SignUpScreen ({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SignUp />
    </View>
  )
}
