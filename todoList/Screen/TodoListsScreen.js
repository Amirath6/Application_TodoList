/**
 * Définition de la fonction TodoListsScreen qui permet d'afficher la page de la liste de tâches(taskLists) et qui permet de naviguer vers la page de la liste de tâches (tasks)
 * 
 * @requires react
 * @requires react-native
 * @requires @react-navigation/native-stack
 * @requires ../components/TodoLists
 * @requires ../components/TodoList
 * 
 * Stack Navigator permet à votre application de passer d'un écran à l'autre, chaque nouvel écran étant place
 * au-dessus d'une pile.
 * @see {@link https://reactnavigation.org/docs/native-stack-navigator/|React Navigation Native Stack Navigator}
 * 
 * Stack screen est un composant React qui est utilisé pour configurer divers aspects des écrans à l'intérieur d'un
 * navigateur.
 * 
 * @see {@link https://reactnavigation.org/docs/screen/|React Navigation Stack Screen}
 * 
 * @version 1.0.0
 */

import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TodoLists from "../components/TodoLists";
import TodoList  from "../components/TodoList";
import Edit from "../components/UI/Edit";

const Stack = createNativeStackNavigator();

export default function TodoListsScreen() {
    return (
        <Stack.Navigator initialRouteName='ListTodo'>
            <Stack.Screen name="List of TaskLists" component={TodoLists} />
            <Stack.Screen name="TodoList" component={TodoList} />
            <Stack.Screen name="Edit" component={Edit} />
        </Stack.Navigator>
    );
}
 
 