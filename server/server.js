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
const allowedOrigins = [
  'http://localhost:5173',
  process.env.CLIENT_URL,
].filter(Boolean);
app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/roadmaps",roadmapRoutes)
// app.use('/api/payments', paymentRoutes);
const PORT= process.env.PORT;
app.listen(PORT,()=>{
console.log(`Connection established at ${PORT}`)
})