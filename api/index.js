import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoute from "./routes/auth.js";
import bookingsRoute from "./routes/bookings.js";
import placesRoute from "./routes/places.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import { validateEmailAndPassword } from "./middlewares/validate.js"


const app = express()
dotenv.config()

const connect = async () => {
    try {
    await mongoose.connect(process.env.MONGO);
    console.log("Подключено к базе данных")
  } catch (error) {
    throw error
  }
};

mongoose.connection.on("disconnected", () => {
    console.log("Отключено от базы данных!")
})

app.use(cors())
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", validateEmailAndPassword, authRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api/places", placesRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);

app.use((err,req,res,next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Что-то пошло не так"
    return res.status(errorStatus).json({
      success:false,
      status:errorStatus,
      message:errorMessage,
      stack:err.stack
    })
  })

  app.listen(8900, () => {
    connect()
    console.log("Подключено к серверу.")
})

