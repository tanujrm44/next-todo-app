import Todo from "@/models/todoModel"
import User from "@/models/user"
import { connectDB } from "@/utils/db"

export const GET = async (request, { params }) => {
     try{
        await connectDB()
        const user = await User.findById(params.id)
        const todos = await Todo.find({ user: user._id })
        return new Response(JSON.stringify(todos), { status: 200 })
     } catch (error) {
        console.log(error)
        return new Response("Failed to get todos", { status: 500 })
     }
}