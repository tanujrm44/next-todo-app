import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

let isConnected = false // track the connection

export const connectDB = async () => {
  mongoose.set("strictQuery", true)

  if (isConnected) {
    console.log("MongoDB is already connected")
    return
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "next-crud",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true

    console.log("MongoDB connected")
  } catch (error) {
    console.log(error)
  }
}
