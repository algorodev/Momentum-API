import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database'
import authRoutes from './auth.routes'

dotenv.config()

const app: Application = express()

connectDB().then(() => console.log('Connected to DB.'))

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)

export default app
