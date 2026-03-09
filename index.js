require("dotenv").config()

const express = require("express")
const cors = require("cors")

const connectDB = require("./config/config")

const authRoutes = require("./routes/auth.routes")
const todoRoutes = require("./routes/todo.routes")

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use("/auth",authRoutes)
app.use("/todos",todoRoutes)

app.listen(process.env.PORT,()=>{
    console.log("Server running")
})