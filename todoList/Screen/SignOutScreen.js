/**
 * Définition de l fonction SignOutScreen qui permet d'afficher la page de déconnexion
 * 
 * @version 1.0.0
 */

import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

import { TokenContext } from '../Context/Context'

export default function SignOut ({ navigation }) {
  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <>

          <View style={styles.container}>
          <Text style={styles.logo}>Sign Out</Text>
          <View style={styles.loginBtn}>
          <Button 
            title='Sign me out' onPress={() => setToken(null)} />
          </View>
          </View>
        </>
      )}
    </TokenContext.Consumer>
  )
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    width:400,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },

  logo:{
  fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
});
