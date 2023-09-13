"use client"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTodo, deleteTodo, editTodo } from "@/slices/todoSlice"
import { useSession } from "next-auth/react"
import { useCreateTodoMutation, useDeleteTodoMutation, useEditTodoMutation, useGetTodosQuery } from "@/slices/todoApiSlice"

const TodoList = () => {
  const { data: session } = useSession()
  const dispatch = useDispatch()
  //const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")
  const [editTodoMode, setEditTodoMode] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const [createTodo] = useCreateTodoMutation()
  const {data: todos} = useGetTodosQuery()
  const [editTodo] = useEditTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()

  //useEffect(() => {
  //  async function fetchTodos(){
  //    try {
  //      const todos = await getTodos().unwrap();
  //      setTodos(todos);
  //    }
  //    catch (err) {
  //      console.log(err);
  //    }
  //  }
  //  fetchTodos();
  //}, [newTodo])


  const handleAddTodo = async () => {
    console.log("User ID:", session?.user.id); // Debug output
    try {
      await createTodo({
          user: session?.user.id,
          todo: newTodo,
          completed: isCompleted,
      }).unwrap();
    } catch (err) {
      console.log(err);
    }

  }

  const handleEditTodo = async (id) => {
    try {
      await editTodo({
        id,
        text: newTodo,
        completed: isCompleted,
      }).unwrap();
    } catch (err) {
      console.log(err?.data?.message || err.error);
    }
  }

  const handleDeleteTodo = async id => {
    try {
      await deleteTodo(id).unwrap();
    } catch (err) {
      console.log(err?.data?.message || err.error);
    }
  }

  return (
    <div className='max-w-lg mx-auto mt-8 p-4'>
      <div className='mb-4'>
        <input
          type='text'
          className='w-full border text-black border-gray-300 px-4 py-2 rounded-md'
          placeholder='Add a new todo...'
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}  
        />
        <button
          className='ml-2 bg-blue-500 text-white px-4 py-2 rounded-md'
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>
      <ul>
        {todos?.map(todo => (
          <li
            key={todo._id}
            className='border text-black border-gray-300 rounded-md p-4 flex items-center justify-between mb-2'
          >
            {editTodoMode ? (
              <form onSubmit={e => {
                e.preventDefault();
                handleEditTodo(todo._id);
              }}>
                <input
                  type='text'
                  value={newTodo}
                  className='flex-grow border text-black border-gray-300 px-4 py-2 rounded-md mr-2'
                  onChange={e => setNewTodo(e.target.value)}
                />
                <button type="submit" className='text-green-500 px-2 py-1 rounded-md'>Save</button>
              </form>
            ) : (
              <p
                className='flex-grow border text-black border-gray-300 px-4 py-2 rounded-md mr-2'
                onDoubleClick={() => setIsCompleted(!isCompleted)}
              >
                {isCompleted ? <s>{todo.text}</s> : todo.text}
              </p>
            )}
            <div>
              <button
                className='text-yellow-500 px-2 py-1 rounded-md mr-2'
                onClick={() => setEditTodoMode(!editTodoMode)}
              >
                Edit
              </button>
              <button
                className='text-red-500 px-2 py-1 rounded-md'
                onClick={() => handleDeleteTodo(todo._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
