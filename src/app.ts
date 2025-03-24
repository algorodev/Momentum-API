import express, { Application } from 'express'
import cors from 'cors'

const app: Application = express()

app.use(cors())
app.use(express.json())

app.get('/api', (req, res) => {
	res.send({ message: 'Hello World!' })
})

export default app
