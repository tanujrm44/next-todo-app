import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    todos: []
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload)
        },
        editTodo: (state, action) => {
            state.todos.map(todo => todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo)
        },
        deleteTodo: (state, action) => {
            state.todos.filter(todo => todo.id !== action.payload.id)
        }
    }
})

export const { addTodo, editTodo, deleteTodo } = todoSlice.actions

export default todoSlice.reducer