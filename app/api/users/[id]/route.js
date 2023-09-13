import User from "@/models/user"
import { connectDB } from "@/utils/db"

export const GET = async (request, { params }) => {
    try {
        await connectDB()
        const user = await User.findById(params.id)
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to get user", { status: 500 })
    }
}