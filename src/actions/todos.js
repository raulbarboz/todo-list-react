import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_TODO
export const addTodo = (todo) => ({
    type: 'ADD_TODO',
    todo
})

// ADD_TODO_BEFORE

export const addTodoBefore = (todo) => {
    return (dispatch) => {
        database.ref('todos').push(todo).then((ref)=>{
            dispatch(addTodo({
                id: ref.key,
                ...todo
            }))
        })
    }
}

export const editTodo = (id, updates) => ({
    type: 'EDIT_TODO',
    id,
    updates
})

export const editTodoBefore = (id, updates) => {
    return (dispatch) => {
        database.ref(`todos/${id}`).update({
            ...updates
        }).then(() => {
            dispatch(editTodo(id, updates))
        })
    }
}

export const removeTodo = (id) => ({
    type: 'REMOVE_TODO',
    id
})

export const removeTodoBefore = (id) => {
    return (dispatch) => {
        database.ref(`todos/${id}`).remove().then(() => {
            dispatch(removeTodo(id))
        })
    }
}

export const setTodos = (todos) => ({
    type: 'SET_TODOS',
    todos
})

export const setTodosBefore = () => {
    return (dispatch) => {
        return database.ref('todos').once('value').then((snapshot) => {
            const todos = [];
            snapshot.forEach((childSnapshot) => {
                todos.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            dispatch(setTodos(todos))
        })
    }
}