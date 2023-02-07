/**
 * Définition du composant Input qui permet d'ajouter une nouvelle tâche (taskList)
 * 
 * @module Input
 * @requires react
 * @requires react-native
 * @requires Context
 * @requires API
 * 
 * @version 1.0.0
 */


import React, { useState, useContext } from "react";

import { View, TextInput, StyleSheet, Button, Text } from 'react-native';

import { input } from '../../API/todoAPI';

import { TokenContext, UsernameContext } from '../../Context/Context';

/**
 * Définition du composant Input 
 * @param {Object} addTaskList - Fonction qui permet d'ajouter une nouvelle tâche (taskList)
 * @returns {JSX.Element} - Le composant Input
 */
export default function Input({ addTaskList }) {

    /**
     * Définition des variables d'état
     * @param {string} title - Titre de la tâche (taskList)
     * @param {string} username - Nom d'utilisateur
     * @param {string} token - Token d'authentification
     * @param {string} error - Message d'erreur
     * @param {function} setTitle - Fonction qui permet de modifier la variable d'état title
     * @param {function} setUsername - Fonction qui permet de modifier la variable d'état username
     * @param {function} setToken - Fonction qui permet de modifier la variable d'état token
     * @param {function} setError - Fonction qui permet de modifier la variable d'état error
     * @returns {JSX.Element} - Le composant Input  
     */
    const [title, setTitle] = useState("");
    const [username, setUsername] = useContext(UsernameContext);
    const [token, setToken] = useContext(TokenContext);
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);

    /**
     * Définition de la fonction addTodo qui permet d'ajouter une nouvelle tâche (taskList)
     * @returns {JSX.Element} - Le composant Input
     */
    const addTodo = () => {
        if (title.length > 0) {
            setError("");
            return input(title, username, token)
                .then((newTaskList) => addTaskList(newTaskList))
                .catch((err) => {
                    setError(err.message);
                });
        }
        else {
            setError("Veuillez entrer une taskList!");
            setIsError(true);
        }
    };


    return (
        <View style={styles.container}>
            
            <Text style={{color:'red'}}>{isError ? error : ""}</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Add a new task list"
                onChangeText={setTitle}
                onSubmitEditing={addTodo}
                value={title}
            />
            <View style={styles.button}>
            <Button 
                title="Add new task list" 
                onPress={addTodo} />
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 70

    },

    input: {
        paddingBottom:8, 
        backgroundColor: "pink",
        marginBottom:30,
        width: "100%",
        borderRadius: 50,
        borderBottomWidth : "10px",
        overflow: 'hidden',
        marginLeft: 50,
        marginRight: 50,
        textAlign: 'center'
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        backgroundColor: 'aqua',
    }
});

