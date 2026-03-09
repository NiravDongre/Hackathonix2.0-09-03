require("dotenv").config()

const express = require("express")
const cors = require("cors")

const connectDB = require("./config/config")

const authRoutes = require("./routes/auth.routes")
const todoRoutes = require("./routes/todo.routes")
const userRoutes = require("./routes/user.routes")
const errorHandler = require("./middleware/error.middleware")

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use("/auth",authRoutes)
app.use("/user", userRoutes)
app.use("/todos",todoRoutes)

app.use(errorHandler)
app.listen(process.env.PORT,()=>{
    console.log("Server running")
})