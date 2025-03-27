import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import UserModel from '../model/user.model'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export const registerUser = async (req: Request, res: Response) => {
	try {
		const { email, name, password } = req.body
		if (!email || !name || !password) {
			return res.status(400).json({ message: 'Missing required fields' })
		}

		const existingUser = await UserModel.findOne({ email })
		if (existingUser) {
			return res.status(409).json({ message: 'User already exists' })
		}

		const user = await UserModel.create({ email, name, password })
		return res.status(201).json({ message: 'User registered successfully' })
	} catch (error: any) {
		console.error(error)
		return res.status(500).json({ message: 'Internal server error' })
	}
}

export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body
		if (!email || !password) {
			return res.status(400).json({ message: 'Missing required fields' })
		}

		const user = await UserModel.findOne({ email })
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		const isMatch = await user.comparePassword(password)
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid credentials' })
		}

		const token = jwt.sign({ id: user._id }, JWT_SECRET)
		return res.status(200).json({ id: user._id, token })
	} catch (error: any) {
		console.error(error)
		return res.status(500).json({ message: 'Internal server error' })
	}
}

export const getProfile = async (req: Request, res: Response) => {
	try {
		const userId = req.params.userId
		const user = await UserModel.findById({ _id: userId }).select('-password')
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		return res.status(200).json(user)
	} catch (error: any) {
		console.error(error)
		return res.status(500).json({ message: 'Internal server error' })
	}
}
