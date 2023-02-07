/**
 * Définition des requêtes GraphQL
 * @module API/todoAPI
 * @requires fetch
 * @requires react
 * @version 1.0.0
 */


// L'URL de l'API
const API_URL = 'http://localhost:4000/';

// Les requêtes pour les utilisateurs (users) pour se connecter
const SIGN_IN =
  'mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}';

// mutation pour créer un utilisateur et s'inscrire
const SIGN_UP =
  'mutation($username:String!, $password:String!){signUp(username:$username, password:$password)}';

// Le query pour récupérer les taskLists
const TASK_LIST = 
  'query taskLists($username: String!) {taskLists(where: { owner: { username: $username } }) {id title}}';

// mutation pour créer une taskList
const INPUT = 
  'mutation($title: String!, $username: String!) {createTaskLists(input: {title: $title owner: { connect: { where: { username: $username } } }}) {taskLists {id title owner {username}}}}';

// mutation pour supprimer une taskList
const DELETE_TASK_LIST = 
  'mutation($id: ID!) {deleteTaskLists(where: { id: $id }) {nodesDeleted}}';
  
// mutation pour modifier une taskList
const UPDATE_TASK_LIST =
  'mutation($id: ID!, $username: String, $newTitle: String!) {updateTaskLists(where: { id: $id, owner: { username: $username } }update: { title: $newTitle }) {taskLists {id title}}}';
  

/****************************************************************
 * les requêtes pour les tâches (tasks)
***************************************************************/

// Le query pour récupérer les tâches
const TASKS = 
  'query($id: ID!) {tasks(where: { belongsTo: {id: $id} }) {id content done}}';
  
// mutation pour créer une tâche
const CREATE_TASK = 
  'mutation createTask($id: ID!, $content: String!) {createTasks(input: {belongsTo: { connect: { where: { id: $id } } } content: $content}) {tasks {id content done}}}'

// mutation pour supprimer une tâche
const DELETE_TASK =
  'mutation($id: ID!) {deleteTasks(where: { id: $id }) {nodesDeleted}}'

// mutation pour changer la valeur de la propriété done d'une tâche
const SWITCH_TASKS = 
  'mutation($id: ID!, $done: Boolean!) {updateTasks(where: { id: $id }, update: { done: $done }) {tasks {id content done}}}';

// mutation pour marquer toutes les tâches
const BRAND_ALL_TASKS =  
  'mutation brandAllTasks($id: ID!, $done: Boolean!) {updateTasks(where: { belongsTo: { id: $id } }update: { done: $done }) {tasks {id content done}}}';
  
  


/*************************************************************************************************************
 * Les fonctions pour se connecter et s'inscrire
 *************************************************************************************************************/
  
/**
 * Définition de la fonction signIn qui permet de se connecter
 * @param username le nom d'utilisateur
 * @param password le mot de passe
 * @returns {Promise<Response>} la réponse de la requête
 */
export function signIn (username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_IN,
      variables: {
        username: username,
        password: password
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.signIn
    })
    .catch(error => {
      throw error
    })
}

/**
 * Définition de la fonction signUp qui permet de s'inscrire
 * @param username le nom d'utilisateur
 * @param password le mot de passe
 * @returns {Promise<Response>} la réponse de la requête
 */
export function signUp (username, password) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SIGN_UP,
      variables: {
        username: username,
        password: password
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.signUp
    })
    .catch(error => {
      throw error
    })
}


/*************************************************************************************************************
 * Les fonctions pour les taskLists
 * @see module:API/todoAPI#taskLists
 * @see module:API/todoAPI#input
 * @see module:API/todoAPI#deleteTaskList
 * @see module:API/todoAPI#updateTaskList
*************************************************************************************************************/

/**
 * Définition de la fonction taskLists qui permet de récupérer les taskLists
 * @param username le nom d'utilisateur
 * @param token le token d'authentification
 * @returns {Promise<Response>} la réponse de la requête
 */
export function taskLists (username, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token,
    },
    body: JSON.stringify({
      query: TASK_LIST,
      variables: {
        username: username,
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.taskLists
    })
    .catch(error => {
      throw error
    })
}


/**
 * Définition de la fonction input qui permet d'ajouter une taskList
 * @param title le titre de la taskList
 * @param username  le nom d'utilisateur
 * @param token le token d'authentification
 * @returns {Promise<Response>} la réponse de la requête
 */
 export function input(title, username, token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json ',
      'authorization': 'Bearer ' + token,
    },
    body: JSON.stringify({
      query: INPUT,
      variables: {
        title: title,
        username: username,
      }
    })    
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.createTaskLists.taskLists[0]
    })
    .catch(error => {
      throw error
    })
}


/**
 * Définition de la fonction deleteTaskList qui permet de supprimer une taskList
 * @param id l'id de la taskList
 * @param token le token d'authentification
 * @returns {Promise<Response>} la réponse de la requête
 */
 export function deleteTaskList(id, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'authorization': "Bearer " + token,
    },
    body: JSON.stringify({
      query: DELETE_TASK_LIST,
      variables: {
        id: id,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.deleteTaskLists;
    })
    .catch((error) => {
      throw error;
    });
}

/**
 * Définition de la fonction updateTaskList qui permet de mettre à jour ou de modifier une taskList
 * @param id l'id de la taskList
 * @param username le nom d'utilisateur
 * @param newTitle le nouveau titre de la taskList
 * @param token le token d'authentification
 * @returns {Promise<Response>} la réponse de la requête
 */
 export function updateTaskList(id, username, newTitle, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'authorization': "Bearer " + token,
    },
    body: JSON.stringify({
      query: UPDATE_TASK_LIST,
      variables: {
        id: id,
        username: username,
        newTitle: newTitle
      },
    }),
  })
    .then((response) => {
      return response.json();
    }
    )
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.updateTaskLists.taskLists[0];
    }
    )
    .catch((error) => {
      throw error;
    }
    );
}


/*************************************************************************************************************
 * Les fonctions pour les tasks
 * @see module:API/todoAPI#tasks
 * @see module:API/todoAPI#addTask
 * @see module:API/todoAPI#deleteTask
 * @see module:API/todoAPI#updateTask
 *************************************************************************************************************/

/**
 * Définition de la fonction tasks qui permet de récupérer les tâches
 * @param id l'id de la taskList
 * @param token le token d'authentification
 * @returns {Promise<Response>} la réponse de la requête
 */
export function tasks(id, token){
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token,
    },
    body: JSON.stringify({
      query: TASKS,
      variables: {
        'id': id,
      }
    })
  })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.tasks
    })
    .catch(error => {
      throw error
    })
}

/**
 * Définition de la fonction addTask qui permet d'ajouter une tâche
 * @param id l'id de la taskList
 * @param content le contenu de la tâche
 * @param token le token d'authentification
 * @returns {Promise<Response>} la réponse de la requête
 */
export function addTask(id, content, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'authorization': "Bearer " + token,
    },
    body: JSON.stringify({
      query: CREATE_TASK,
      variables: {
        id: id,
        content: content,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.createTasks.tasks[0];
    })
    .catch((error) => {
      throw error;
    });
}

/**
 * Définition de la fonction deleteTask qui permet de supprimer une tâche
 * @param id l'id de la tâche
 * @param token le token d'authentification
 * @returns {Promise<Response>} la réponse de la requête
 */
export function deleteTask(id, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'authorization': "Bearer " + token,
    },
    body: JSON.stringify({
      query: DELETE_TASK,
      variables: {
        id: id,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.deleteTasks;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}


/**
 * Définition de la fonction switchTasks qui permet de changer la valeur de la  
 * propriété done d'un todoItem
 * @param id l'id de la tâche
 * @param done la valeur de la propriété (true ou false)
 * @param token le token d'authentification
 * @returns {Promise<Response>} la réponse de la requête
 */
export function switchTasks(id, done, token) {
  console.log(id);
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + token,
    },
    body: JSON.stringify({
      query: SWITCH_TASKS,
      variables: {
        id: id,
        done: done
      },
    }),
  })
    .then((response) => {
      return response.json();
    }
    )
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.updateTasks.tasks[0];
    }
    )
    .catch((error) => {
      console.log(error);
      throw error;
    }
    );
}

/**
 * Définition de la fonction brandAllTasks qui permet de marquer toutes les tâches 
 * @param id l'id de la tâche
 * @param done la valeur de la propriété (true ou false)
 * @param token le token d'authentification
 * @returns {Promise<Response>} la réponse de la requête
 */
export function brandAllTasks(id, done, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + token,
    },
    body: JSON.stringify({
      query: BRAND_ALL_TASKS,
      variables: {
        id: id,
        done: done
      },
    }),
  })
    .then((response) => {
      return response.json();
    }
    )
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.updateTasks.tasks;
    }
    )
    .catch((error) => {
      throw error;
    }
    );
}


