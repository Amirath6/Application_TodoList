/**
 * Définition du composant SignIn qui permet de se connecter
 * @param {string} login - Nom d'utilisateur
 * @param {string} password - Mot de passe
 * @param {string} error - Message d'erreur
 * @param {boolean} visible - Booléen qui permet de gérer l'affichage du composant
 * @param {function} setLogin - Fonction qui permet de modifier la variable d'état login
 * @param {function} setPassword - Fonction qui permet de modifier la variable d'état password
 * @param {function} setError - Fonction qui permet de modifier la variable d'état error
 * @param {function} setVisible - Fonction qui permet de modifier la variable d'état visible
 * @param {function} getSignedIn - Fonction qui permet de se connecter
 * @param {string} token - Token d'authentification
 * @param {string} username - Nom d'utilisateur
 * @param {function} setToken - Fonction qui permet de modifier la variable d'état token
 * @param {function} setUsername - Fonction qui permet de modifier la variable d'état username
 * @returns {JSX.Element} - Le composant SignIn
 * 
 * @version 1.0.0
 */


import React, { useState } from 'react'
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { Link } from '@react-navigation/native'


import { signIn } from '../API/todoAPI'

import { TokenContext } from '../Context/Context'
import { UsernameContext } from '../Context/Context'

export default function SignIn () {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(true)
  

  const getSignedIn = (setToken, setUsername) => {
    setError('')
    if (login == '' || password == '') return
    setVisible(false)
    signIn(login, password)
      .then(token => {
        setUsername(login)
        setToken(token)
      })
      .catch(err => {
        setError(err.message)
      })
    setVisible(true)
  }

  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <UsernameContext.Consumer>
          {([username, setUsername]) => {
            return (
              <View style={styles.container}>
                <Text style={styles.logo}> Welcome!</Text>
                {visible ? (
                  <>
                    <View style={styles.inputView} >
                      <TextInput
                        placeholder="username" 
                        placeholderTextColor="#003f5c"
                        style={styles.text_input}
                        onChangeText={setLogin}
                        onSubmitEditing={() =>
                          getSignedIn(setToken, setUsername)
                        }
                        value={login}
                      />
                    </View>
                    <View style={styles.inputView}>
                      <TextInput
                        placeholder="password" 
                        placeholderTextColor="#003f5c"
                        style={styles.text_input}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        onSubmitEditing={() =>
                          getSignedIn(setToken, setUsername)
                        }
                        value={password}
                      />
                    </View>
                    <View style={styles.loginBtn}>
                    <Button
                      onPress={() => getSignedIn(setToken, setUsername)}
                      title='Sign In'
                    />
                    </View>
                    {error ? (
                      <Text style={styles.text_error}>{error}</Text>
                    ) : (
                      []
                    )}

                      <View style={{marginTop: 20}}>
                      <Text style={{color: 'white'}}>
                      If you prefer, you can{' '}
                      <Link
                        style={{ textDecorationLine: 'underline', color: 'aqua' }}
                        to={{ screen: 'SignUp' }}
                      >
                        Sign Up
                      </Link>
                    </Text>
                    </View>
                  </>
                ) : (
                  <ActivityIndicator />
                  
                )}
              
              </View>
              
            )
          }}
        </UsernameContext.Consumer>
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
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },

  text_error: {
    color: 'red'
  },

  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:70,
    marginBottom:20,
    marginLeft: 40,
    marginRight: 40,
    justifyContent:"center",
    padding:20
  },
  text_input: {
    height:90,
    flex:1,
    width:350,
    color:"white",
    textAlign:"center",
  },

  loginBtn:{
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

  loginText:{
    color:"white"
  }
})
