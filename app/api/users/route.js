import User from "@/models/user"
import { connectDB } from "@/utils/db"

export const GET = async () => {
    try {
        await connectDB()
        const users = await User.find({})
        return new Response(JSON.stringify(users), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to get users", { status: 500 })
    }
}