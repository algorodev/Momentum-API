import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database'

dotenv.config()

const app: Application = express()

connectDB().then(() => console.log('Connected to DB.'))

app.use(cors())
app.use(express.json())

app.get('/api', (req, res) => {
	res.send({ message: 'Hello World!' })
})

export default app
