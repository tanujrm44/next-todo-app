import User from "@/models/user"
import { connectDB } from "@/utils/db"

export const POST = async (req, res) => {
  const { name, email, password } = await req.json()
  try {
    await connectDB()
    const user = await User.create({name, email, password})
    return new Response(JSON.stringify(user), { status: 201 })
  } catch (error) {
    return new Response("Failed to Register User", { status: 500 })
  }
}
