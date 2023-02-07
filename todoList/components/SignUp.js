/**
 * Définition du composant SignUp qui permet de créer un nouvel utilisateur
 * @returns {JSX.Element} - Le composant SignUp
 * @param {string} token - Token d'authentification
 * @param {string} username - Nom d'utilisateur
 * @param {string} login - Nom d'utilisateur
 * @param {string} password - Mot de passe
 * @param {string} copyPassword - Copie du mot de passe
 * @param {string} error - Message d'erreur
 * @param {boolean} visible - Booléen qui permet de gérer l'affichage du composant
 * @param {Object} setToken - Fonction qui permet de modifier la variable d'état token
 * @param {Object} setUsername - Fonction qui permet de modifier la variable d'état username
 * @param {function} setLogin - Fonction qui permet de modifier la variable d'état login
 * @param {function} setPassword - Fonction qui permet de modifier la variable d'état password
 * @param {function} setCopyPassword - Fonction qui permet de modifier la variable d'état copyPassword
 * @param {function} setError - Fonction qui permet de modifier la variable d'état error
 * @param {function} setVisible - Fonction qui permet de modifier la variable d'état visible
 * @param {function} getSignedUp - Fonction qui permet de créer un nouvel utilisateur
 * @returns {JSX.Element} - Le composant SignUp
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
  ActivityIndicator
} from 'react-native'

import { signUp } from '../API/todoAPI'

import { TokenContext, UsernameContext } from '../Context/Context'

export default function SignUp () {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [copyPassword, setCopyPassword] = useState('')
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(true)

  const getSignedUp = (setToken, setUsername) => {
    setError('')
    if (login == '' || password == '' || copyPassword == '') return
    if (password != copyPassword){
        setError("Passwords don't match")
        return
    } 
    setVisible(false)
    signUp(login, password)
      .then(token => {
        setUsername(login)
        setToken(token)
        console.log('token', token)
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
                    <View style={styles.inputView}>
                      <TextInput
                        placeholder="username" 
                        placeholderTextColor="#003f5c"
                        style={styles.text_input}
                        onChangeText={setLogin}
                        onSubmitEditing={() =>
                          getSignedUp(setToken, setUsername)
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
                          getSignedUp(setToken, setUsername)
                        }
                        value={password}
                      />
                    </View>
                    <View style={styles.inputView}>
                      <TextInput
                        placeholder="password again"
                        placeholderTextColor="#003f5c"
                        style={styles.text_input}
                        onChangeText={setCopyPassword}
                        secureTextEntry={true}
                        onSubmitEditing={() =>
                          getSignedUp(setToken, setUsername)
                        }
                        value={copyPassword}
                      />
                    </View>
                    <View style={styles.loginBtn}>
                    <Button
                      onPress={() => getSignedUp(setToken, setUsername)}
                      title='Sign Up'
                    />
                    </View>
                    {error ? (
                      <Text style={styles.text_error}>{error}</Text>
                    ) : (
                      []
                    )}
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
    height:50,
    marginBottom:20,
    marginLeft: 40,
    marginRight: 40,
    justifyContent:"center",
    padding:20
  },
  text_input: {
    height:80,
    flex:1,
    width:350,
    color:"white"
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
