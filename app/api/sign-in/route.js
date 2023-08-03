import User from "@/models/user"
import { connectDB } from "@/utils/db"

export const POST = async request => {
  const { email, password } = await request.json()

  try {
    await connectDB()

    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
      return new Response(JSON.stringify(user), { status: 200 })
    }
    else{
      return new Response("Invalid Credentials", { status: 401 })
    }
  } catch (error) {
    console.log(error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
