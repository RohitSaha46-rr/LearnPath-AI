import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from './routes/authRoutes.js'
import roadmapRoutes from './routes/roadmapRoutes.js'
// import paymentRoutes from './routes/paymentRoutes.js'
import { connectDB } from "./config/db.js"
dotenv.config()
connectDB();
const app=express()
app.use(cors())
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/roadmaps",roadmapRoutes)
// app.use('/api/payments', paymentRoutes);
const PORT= process.env.PORT;
app.listen(PORT,()=>{
console.log(`Connection established at ${PORT}`)
})