import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

interface JwtPayload {
	userId: string
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		const header = req.headers['authorization']
		if (!header) {
			return res.status(401).json({ message: 'Unauthorized' })
		}

		const token = header.split(' ')[1]
		const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload

		req.body.userId = decoded.userId
		next()
	} catch (error: any) {
		console.error(error)
		return res.status(401).json({ message: 'Unauthorized' })
	}
}
