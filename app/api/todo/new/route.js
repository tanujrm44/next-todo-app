import Todo from "@/models/todoModel"
import { connectDB } from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async req => {
  const { todo, completed, user } = await req.json()
  try {
    await connectDB()
    const newTodo = new Todo({ todo, completed, user })
    await newTodo.save()
    return NextResponse.json(newTodo, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.error("Failed to create a new Todo", { status: 500 })
  }
}
//try {
//    const user = req.user.id;
//    if (!todo) {
//      return res.status(400).json({ msg: "Please provide a todo" });
//    }
//    const newTodo = await POST({
//    todo,
//    user,
//    });
//    res.status(201).json({ success: true, data: newTodo });
//} catch (error) {
//    console.log(error);
//    res.status(500).json({ msg: "Server Error" });
//}
