import uuid from 'uuid';
// ADD_EXPENSE
export const addTodo = (todo) => ({
    type: 'ADD_TODO',
    todo: {
        id: uuid(),
        todo: todo.todo,
        startDate: todo.startDate
    }
})

export const editTodo = (id, updates) => ({
    type: 'EDIT_TODO',
    id,
    updates
})

export const removeTodo = (id) => ({
    type: 'REMOVE_TODO',
    id
})

