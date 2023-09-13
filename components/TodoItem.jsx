'use client'
export default function TodoItem({ todo, handleEditTodo, handleDeleteTodo, editMode, editTodoMode, completedHandler, isCompleted}) {
  return (
    <li
            key={todo.id}
            className="border text-black border-gray-300 rounded-md p-4 flex items-center justify-between mb-2"
          >
            {editTodo ? (
              <form onSubmit={handleEditTodo}>
              <input
                type="text"
                value={todo.text}
                className="flex-grow border text-black border-gray-300 px-4 py-2 rounded-md mr-2"
                onChange={(e) => handleEditTodo(todo.id, e.target.value)}
              />
              </form>
            ): (
              <p className="flex-grow border text-black border-gray-300 px-4 py-2 rounded-md mr-2" onDoubleClick={completedHandler(!isCompleted)}>{todo.text}</p>
            )}
            <div>
              <button
                className="text-yellow-500 px-2 py-1 rounded-md mr-2"
                onClick={() => editMode(!editTodoMode) }
              >
                Edit
              </button>
              <button
                className="text-red-500 px-2 py-1 rounded-md"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
  )
}
