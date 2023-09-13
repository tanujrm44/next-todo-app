import Todo from "@/models/todoModel"
import { connectDB } from "@/utils/db"

export const GET = async () => {
  try {
    await connectDB()
    const todos = await Todo.find({})
    return new Response(JSON.stringify(todos), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Failed to get todos", { status: 500 })
  }
}