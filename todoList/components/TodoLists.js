/**
 * Définition du composant TodoLists qui permet d'afficher la liste des tâches (taskList) qui permet de naviguer vers la page de la liste de tâches (tasks)
 * @param {Object} navigation - Objet qui permet de naviguer entre les différentes pages
 * @param {string} listTodo - Liste des tâches (taskList)
 * @param {string} error - Message d'erreur
 * @param {string} username - Nom d'utilisateur
 * @param {string} token - Token d'authentification
 * @param {function} setListTodo - Fonction qui permet de modifier la variable d'état listTodo
 * @param {function} setError - Fonction qui permet de modifier la variable d'état error
 * @param {function} setUsername - Fonction qui permet de modifier la variable d'état username
 * @param {function} setToken - Fonction qui permet de modifier la variable d'état token
 * @param {function} getTaskLists - Fonction qui permet de récupérer la liste des tâches (taskList)
 * @param {function} addTaskList - Fonction qui permet d'ajouter une nouvelle tâche (taskList)
 * @param {function} deleteTaskL - Fonction qui permet de supprimer une tâche (taskList)
 * @returns {JSX.Element} - Le composant TodoLists
 * 
 * @version 1.0.0
 */

import React, { useState, useEffect, useContext } from "react";

import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, ImageBackground} from 'react-native'; 

import { TokenContext, UsernameContext, TodoListsContext } from '../Context/Context';

import { taskLists, deleteTaskList} from '../API/todoAPI';

import Input from './UI/Input';


export default function TodoLists({ navigation }) {
    const [listTodo, setListTodo] = useState(null);   
    const [error, setError] = useState("");
    const [username, setUsername] = useContext(UsernameContext);
    const [token, setToken] = useContext(TokenContext);
    const [todoLists, setTodoLists] = useContext(TodoListsContext);

    /**
     * Définition de la fonction getTaskLists qui permet de récupérer la liste des tâches 
     * (taskList)
     * @returns {Object} - La liste des tâches (taskList)
     */
    const getTaskLists = () => {
        return taskLists(username, token)
            .then((taskLists) => {
                setListTodo(taskLists);
                return taskLists;
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    // Récupération de la liste des tâches (taskList) au chargement du composant
    useEffect(() => {
        getTaskLists().then((data) => setListTodo(data)); 
    }, []);

    useEffect(() => {
        getTaskLists().then((data) => setListTodo(data));
    }, [todoLists]);

    useEffect(() => {}, [listTodo]);

    /**
     * Définition de la fonction addTaskList qui permet d'ajouter une nouvelle tâche (taskList)
     * @param {string} newTaskList 
     * @returns la liste des tâches (taskList)
     */
    const addTaskList = (newTaskList) => {
        const newTaskLists = [...listTodo, newTaskList];
        setListTodo(newTaskLists);
        return listTodo;
        
    };


    /**
     * Définition de la fonction deleteTaskL qui permet de supprimer une tâche (taskList)
     * @param {string} id - Identifiant de la tâche (taskList)      
     */
    const deleteTaskL = (id) => {
        return deleteTaskList(id, token)
            .then(() => {
                const newTaskLists = listTodo.filter((item) => item.id !== id);
                setListTodo(newTaskLists);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

   

    
    return (
        <ImageBackground source={require('../assets/todo.jpeg')} style={{flex: 1,resizeMode: "cover", justifyContent: "center"}}>
        <View>
        <FlatList
            style={{ width: "100%", marginLeft: 460, marginRight: 50 }}
            data={listTodo}
            renderItem={({ item }) => (
            <View style={styles.content}>
                <TouchableOpacity
                onPress={() =>
                    navigation.navigate("TodoList", { title: item.title, id: item.id })
                }
                >
                <Text style={{textAlign: 'center'}}>{item.title}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.image}
                onPress={() => deleteTaskL(item.id)}
                >
                <Image
                    source={require("../assets/trash-can-outline.png")}
                    style={{height : 24, width : 24}}
                />
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.image}
                onPress={() => 
                    navigation.navigate("Edit", { title: item.title, id: item.id })}
                >
                <Image
                    source={require("../assets/edit.png")}
                    style={{height : 24, width : 24}}
                />
                </TouchableOpacity>

            </View>
            )}
        />
        <View>
            <Input addTaskList={addTaskList} />
        </View>
        </View>
        </ImageBackground>
        
    );
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'aqua',
        padding: 6,
        marginVertical: 8,
        marginRight: 50,
        marginLeft : 50,
        width:350,
        marginHorizontal: 16,
        borderRadius: 30,
        textAlign: 'center',
    },
      
    image: {
        marginLeft: 16,
        padding: 5,
        flexDirection: "row",
        backgroundColor: "yellowgreen",
        borderRadius: 60,
    },

    buttons: {
        backgroundColor: "#fb5b5a",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 10,
    },
     
});