import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import quizRoutes from './routes/quizRoutes.js' // ✅ Added

dotenv.config()
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/quiz', quizRoutes) // ✅ Added

// MongoDB Connection
connectDB()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
