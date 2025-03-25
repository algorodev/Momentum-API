import { Router } from 'express'
import { getProfile, loginUser, registerUser } from './controller/auth.controller'
import { authMiddleware } from './middlewares/auth.middleware'

const router = Router()

router.post('/register', async (req, res, next) => {
	await registerUser(req, res)
})
router.post('/login', async (req, res, next) => {
	await loginUser(req, res)
})
router.get('/profile/:userId',
	(req, res, next) => {
		authMiddleware(req, res, next)
	},
	async (req, res, next) => {
		await getProfile(req, res)
	}
)

export default router
