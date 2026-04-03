import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from './routes/authRoutes.js '
import roadmapRoutes from './routes/roadmapRoutes.js'
import { connectDB } from "./config/db.js"
dotenv.config()
connectDB();
const app=express()
app.use(cors())
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/roadmaps",roadmapRoutes)
const PORT= process.env.PORT;
app.listen(PORT,()=>{
console.log(`Connection established at ${PORT}`)
})