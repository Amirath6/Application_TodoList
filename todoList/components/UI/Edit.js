/**
 * Définition du composant Edit qui permet d'afficher le formulaire de modification d'une tâche (taskList)
 * 
 * @version 1.0.0
 *
 * @param {Object} route - Objet qui permet de récupérer les paramètres passés à la page
 * @param {Object} navigation - Objet qui permet de gérer la navigation entre les pages
 * 
 * @param {string} title - Titre de la tâche (taskList)
 * @param {string} username - Nom d'utilisateur
 * @param {string} token - Token d'authentification
 * @param {string} error - Message d'erreur
 * 
 * @param {function} setTitle - Fonction qui permet de modifier la variable d'état title
 * @param {function} setUsername - Fonction qui permet de modifier la variable d'état username
 * @param {function} setToken - Fonction qui permet de modifier la variable d'état token
 * @param {function} setError - Fonction qui permet de modifier la variable d'état error
 * 
 * @return {JSX.Element} - Retourne le composant Edit
 * 
 */

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

import { updateTaskList } from '../../API/todoAPI';

import { TokenContext, UsernameContext, TodoListsContext } from '../../Context/Context';

export default function Edit({ route, navigation }) {
    const [id, setId] = useState(route.params.id);
    const [title, setTitle] = useState(route.params.title);
    const [username, setUsername] = useContext(UsernameContext);
    const [token, setToken] = useContext(TokenContext);
    const [error, setError] = useState("");
    const [todoLists, setTodoLists] = useContext(TodoListsContext);

    

    /**
     * Définition de la fonction updateTaskL qui permet de modifier une tâche (taskList)
     * @param {string} id 
     * @param {string} newTitle 
     */

    const updateTaskL = (id, newTitle) => {
        return updateTaskList(id, username, newTitle,token)
            .then(() => {
                const newTaskLists = listTodo.map((item) => {
                    if (item.id === id) {
                        item.title = newTitle;
                    }
                    return item;
                });
                setListTodo(newTaskLists);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

   

    return (
        <ImageBackground source={require('../../assets/todo.jpeg')} style={styles.image}>
        <View style={styles.container}>
            <Text style={styles.title}>Update your TaskList</Text>
            <TextInput
                style={styles.input}
                value={title}
                placeholder="Put your new title here"
                onChangeText={(text) => setTitle(text)}
            />
            
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    updateTaskL(id, title);
                    setTodoLists(!todoLists);
                    navigation.navigate('List of TaskLists', { username: username, token: token });
                }}
            >
                <Text style={styles.buttonText}>Update TaskList</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        width: "80%",
        height: 40,
        marginBottom: 20,
        borderRadius: 60,
        backgroundColor: "aqua",
        textAlign: "center",
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
});