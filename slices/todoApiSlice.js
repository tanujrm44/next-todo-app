import { TODOS_URL } from "@/constants"
import { apiSlice } from "./apiSlice"

export const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createTodo: builder.mutation({
      query: (data) => ({
        url: `${TODOS_URL}/new`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Todos"],
    }),
    getTodos: builder.query({
      query: () => TODOS_URL,
      keepUnusedDataFor: 5,
      providesTags: ['Todos'],
    }),
    editTodo: builder.mutation({
      query: ({ id, text, completed }) => ({
        url: `${TODOS_URL}/${id}`,
        method: "PUT",
        body: { text, completed },
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: id => ({
        url: `${TODOS_URL}/${id}`,
        method: "DELETE",
      }),
      providesTags: ["Todos"],
    }),
  }),
})

export const {
  useCreateTodoMutation,
  useGetTodosQuery,
  useEditTodoMutation,
  useDeleteTodoMutation,
} = todoApiSlice